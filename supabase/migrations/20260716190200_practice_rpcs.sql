-- Imported from the live Supabase migration history for project uipsaeojwjehrbylfgrx.
-- Live migration name: practice_rpcs. Do not edit retroactively.

create or replace function public.activate_practice(
  p_payload jsonb,
  p_replace_active boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_practice jsonb := p_payload -> 'practice';
  v_cycle jsonb := p_payload -> 'cycle';
  v_practice_id uuid;
  v_cycle_id uuid;
  v_existing_owner uuid;
  v_now timestamptz := now();
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  if public.current_depot_access_state() <> 'active' then
    raise exception 'active_membership_required' using errcode = '42501';
  end if;

  if jsonb_typeof(v_practice) <> 'object' or jsonb_typeof(v_cycle) <> 'object' then
    raise exception 'invalid_practice_payload' using errcode = '22023';
  end if;

  v_practice_id := (v_practice ->> 'id')::uuid;
  v_cycle_id := (v_cycle ->> 'id')::uuid;

  select p.user_id into v_existing_owner
  from public.practices p
  where p.id = v_practice_id;

  if v_existing_owner is not null then
    if v_existing_owner <> v_user_id then
      raise exception 'identifier_conflict' using errcode = '23505';
    end if;
    return jsonb_build_object(
      'practiceId', v_practice_id,
      'cycleId', (
        select c.id from public.practice_cycles c
        where c.user_id = v_user_id and c.practice_id = v_practice_id and c.status = 'active'
        limit 1
      ),
      'idempotent', true
    );
  end if;

  if exists (
    select 1 from public.practices p
    where p.user_id = v_user_id and p.status = 'active'
  ) then
    if not p_replace_active then
      raise exception 'active_practice_exists' using errcode = '23505';
    end if;

    update public.practice_cycles c
    set status = 'landed', ended_at = v_now
    where c.user_id = v_user_id and c.status = 'active';

    update public.practices p
    set status = 'retired'
    where p.user_id = v_user_id and p.status = 'active';
  end if;

  if nullif(trim(v_practice ->> 'boundary'), '') is null then
    raise exception 'practice_boundary_required' using errcode = '22023';
  end if;

  insert into public.practices (
    id,
    user_id,
    template_id,
    template_version,
    principle_id,
    title,
    status,
    revision,
    age_track,
    expression_variant,
    situation,
    signal,
    value,
    normal_action,
    tired_action,
    low_capacity_action,
    boundary,
    language_self,
    language_child,
    language_other_adult,
    created_at,
    updated_at
  ) values (
    v_practice_id,
    v_user_id,
    v_practice ->> 'templateId',
    (v_practice ->> 'templateVersion')::integer,
    v_practice ->> 'principleId',
    v_practice ->> 'title',
    'active',
    greatest(coalesce((v_practice ->> 'revision')::integer, 1), 1),
    v_practice ->> 'ageTrack',
    v_practice ->> 'expressionVariant',
    v_practice -> 'situation',
    v_practice -> 'signal',
    v_practice -> 'value',
    v_practice -> 'normalAction',
    v_practice -> 'tiredAction',
    v_practice -> 'lowCapacityAction',
    trim(v_practice ->> 'boundary'),
    nullif(trim(v_practice ->> 'languageSelf'), ''),
    nullif(trim(v_practice ->> 'languageChild'), ''),
    nullif(trim(v_practice ->> 'languageOtherAdult'), ''),
    v_now,
    v_now
  );

  insert into public.practice_cycles (
    id,
    user_id,
    practice_id,
    practice_revision,
    plan_snapshot,
    status,
    current_step,
    started_at
  ) values (
    v_cycle_id,
    v_user_id,
    v_practice_id,
    greatest(coalesce((v_practice ->> 'revision')::integer, 1), 1),
    v_practice,
    'active',
    1,
    v_now
  );

  return jsonb_build_object(
    'practiceId', v_practice_id,
    'cycleId', v_cycle_id,
    'createdAt', v_now,
    'idempotent', false
  );
end;
$$;
create or replace function public.record_observation(p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_state text;
  v_observation_id uuid := (p_payload ->> 'id')::uuid;
  v_cycle_id uuid := (p_payload ->> 'cycleId')::uuid;
  v_practice_id uuid := (p_payload ->> 'practiceId')::uuid;
  v_action text := p_payload ->> 'actionChoice';
  v_cycle public.practice_cycles;
  v_active_until timestamptz;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  if p_payload ? 'userNote' then
    raise exception 'free_text_requires_separate_consent' using errcode = '22023';
  end if;

  if exists (
    select 1 from public.observations o
    where o.id = v_observation_id and o.user_id = v_user_id
  ) then
    return jsonb_build_object('observationId', v_observation_id, 'idempotent', true);
  end if;

  v_state := public.current_depot_access_state();
  if v_state not in ('active', 'grace') then
    raise exception 'practice_write_not_allowed' using errcode = '42501';
  end if;

  select c.* into v_cycle
  from public.practice_cycles c
  where c.id = v_cycle_id
    and c.user_id = v_user_id
    and c.practice_id = v_practice_id
  for update;

  if v_cycle.id is null or v_cycle.status <> 'active' then
    raise exception 'active_cycle_required' using errcode = '42501';
  end if;

  if v_state = 'grace' then
    select max(e.active_until) into v_active_until
    from public.depot_entitlements e
    where e.user_id = v_user_id
      and e.revoked_at is null
      and e.active_until < now()
      and now() <= e.grace_until;

    if v_active_until is null or v_cycle.started_at > v_active_until then
      raise exception 'cycle_not_eligible_for_grace' using errcode = '42501';
    end if;
  end if;

  insert into public.observations (
    id,
    user_id,
    practice_id,
    cycle_id,
    step,
    parent_energy,
    action_choice,
    observation_choice
  ) values (
    v_observation_id,
    v_user_id,
    v_practice_id,
    v_cycle_id,
    v_cycle.current_step,
    nullif(p_payload ->> 'parentEnergy', ''),
    v_action,
    nullif(p_payload ->> 'observationChoice', '')
  );

  if v_action <> 'not_today' then
    update public.practice_cycles c
    set current_step = least(7, c.current_step + 1)
    where c.id = v_cycle_id;
  end if;

  return jsonb_build_object(
    'observationId', v_observation_id,
    'currentStep', (
      select c.current_step from public.practice_cycles c where c.id = v_cycle_id
    ),
    'idempotent', false
  );
end;
$$;
create or replace function public.land_practice_cycle(p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_state text;
  v_decision_id uuid := (p_payload ->> 'id')::uuid;
  v_cycle_id uuid := (p_payload ->> 'cycleId')::uuid;
  v_practice_id uuid := (p_payload ->> 'practiceId')::uuid;
  v_next_cycle_id uuid;
  v_choice text := p_payload ->> 'decision';
  v_cycle public.practice_cycles;
  v_practice public.practices;
  v_now timestamptz := now();
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  if p_payload ? 'userNote' or p_payload ? 'explicitObservation' then
    raise exception 'free_text_requires_separate_consent' using errcode = '22023';
  end if;

  if exists (
    select 1 from public.sunday_decisions d
    where d.id = v_decision_id and d.user_id = v_user_id
  ) then
    return jsonb_build_object('decisionId', v_decision_id, 'idempotent', true);
  end if;

  v_state := public.current_depot_access_state();
  if v_state not in ('active', 'grace') then
    raise exception 'practice_write_not_allowed' using errcode = '42501';
  end if;

  select c.* into v_cycle
  from public.practice_cycles c
  where c.id = v_cycle_id
    and c.user_id = v_user_id
    and c.practice_id = v_practice_id
  for update;

  select p.* into v_practice
  from public.practices p
  where p.id = v_practice_id and p.user_id = v_user_id
  for update;

  if v_cycle.id is null or v_cycle.status <> 'active' or v_practice.id is null then
    raise exception 'active_cycle_required' using errcode = '42501';
  end if;

  insert into public.sunday_decisions (
    id, user_id, practice_id, cycle_id, size_choice, decision, created_at
  ) values (
    v_decision_id,
    v_user_id,
    v_practice_id,
    v_cycle_id,
    p_payload ->> 'sizeChoice',
    v_choice,
    v_now
  );

  update public.practice_cycles
  set status = 'landed', ended_at = v_now
  where id = v_cycle_id;

  if v_state = 'grace' or v_choice in ('replace', 'retire') then
    update public.practices
    set status = 'retired'
    where id = v_practice_id;

    return jsonb_build_object(
      'decisionId', v_decision_id,
      'nextCycleId', null,
      'membershipState', v_state,
      'idempotent', false
    );
  end if;

  v_next_cycle_id := (p_payload ->> 'nextCycleId')::uuid;

  if v_choice = 'shrink' then
    update public.practices p
    set normal_action = p.tired_action,
        tired_action = p.low_capacity_action,
        revision = p.revision + 1
    where p.id = v_practice_id
    returning p.* into v_practice;
  elsif v_choice = 'move' then
    if jsonb_typeof(p_payload -> 'movedSituation') <> 'object' then
      raise exception 'moved_situation_required' using errcode = '22023';
    end if;
    update public.practices p
    set situation = p_payload -> 'movedSituation',
        revision = p.revision + 1
    where p.id = v_practice_id
    returning p.* into v_practice;
  elsif v_choice <> 'repeat' then
    raise exception 'invalid_sunday_decision' using errcode = '22023';
  end if;

  insert into public.practice_cycles (
    id,
    user_id,
    practice_id,
    practice_revision,
    plan_snapshot,
    status,
    current_step,
    started_at
  ) values (
    v_next_cycle_id,
    v_user_id,
    v_practice_id,
    v_practice.revision,
    to_jsonb(v_practice) - 'user_id',
    'active',
    1,
    v_now
  );

  return jsonb_build_object(
    'decisionId', v_decision_id,
    'nextCycleId', v_next_cycle_id,
    'practiceRevision', v_practice.revision,
    'membershipState', v_state,
    'idempotent', false
  );
end;
$$;
create or replace function public.save_observation_note(
  p_observation_id uuid,
  p_body text,
  p_consent boolean
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_state text := public.current_depot_access_state();
  v_exists boolean;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;
  if not p_consent then
    raise exception 'note_sync_consent_required' using errcode = '22023';
  end if;
  if nullif(trim(p_body), '') is null or length(p_body) > 5000 then
    raise exception 'invalid_note' using errcode = '22023';
  end if;

  select exists (
    select 1 from public.observation_notes n
    where n.observation_id = p_observation_id and n.user_id = v_user_id
  ) into v_exists;

  if v_state = 'active' or (v_state = 'grace' and v_exists) then
    insert into public.observation_notes (
      observation_id, user_id, body, sync_consent_at
    )
    select p_observation_id, v_user_id, trim(p_body), now()
    where exists (
      select 1 from public.observations o
      where o.id = p_observation_id and o.user_id = v_user_id
    )
    on conflict (observation_id) do update
      set body = excluded.body;

    if not found then
      raise exception 'observation_not_found' using errcode = 'P0002';
    end if;
  else
    raise exception 'note_write_not_allowed' using errcode = '42501';
  end if;

  return jsonb_build_object('observationId', p_observation_id, 'synced', true);
end;
$$;
create or replace function public.delete_observation_note(p_observation_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;
  if not public.current_account_is_active() then
    raise exception 'account_locked' using errcode = '42501';
  end if;

  delete from public.observation_notes n
  where n.observation_id = p_observation_id and n.user_id = v_user_id;
  return found;
end;
$$;
create or replace function public.save_sunday_note(
  p_decision_id uuid,
  p_observation_text text,
  p_user_note text,
  p_consent boolean
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_state text := public.current_depot_access_state();
  v_exists boolean;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;
  if not p_consent then
    raise exception 'note_sync_consent_required' using errcode = '22023';
  end if;
  if nullif(trim(coalesce(p_observation_text, '')), '') is null
     and nullif(trim(coalesce(p_user_note, '')), '') is null then
    raise exception 'invalid_note' using errcode = '22023';
  end if;
  if length(coalesce(p_observation_text, '')) > 5000
     or length(coalesce(p_user_note, '')) > 5000 then
    raise exception 'invalid_note' using errcode = '22023';
  end if;

  select exists (
    select 1 from public.sunday_notes n
    where n.decision_id = p_decision_id and n.user_id = v_user_id
  ) into v_exists;

  if v_state = 'active' or (v_state = 'grace' and v_exists) then
    insert into public.sunday_notes (
      decision_id, user_id, observation_text, user_note, sync_consent_at
    )
    select
      p_decision_id,
      v_user_id,
      nullif(trim(coalesce(p_observation_text, '')), ''),
      nullif(trim(coalesce(p_user_note, '')), ''),
      now()
    where exists (
      select 1 from public.sunday_decisions d
      where d.id = p_decision_id and d.user_id = v_user_id
    )
    on conflict (decision_id) do update
      set observation_text = excluded.observation_text,
          user_note = excluded.user_note;

    if not found then
      raise exception 'sunday_decision_not_found' using errcode = 'P0002';
    end if;
  else
    raise exception 'note_write_not_allowed' using errcode = '42501';
  end if;

  return jsonb_build_object('decisionId', p_decision_id, 'synced', true);
end;
$$;
create or replace function public.delete_sunday_note(p_decision_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;
  if not public.current_account_is_active() then
    raise exception 'account_locked' using errcode = '42501';
  end if;

  delete from public.sunday_notes n
  where n.decision_id = p_decision_id and n.user_id = v_user_id;
  return found;
end;
$$;
revoke all on function public.activate_practice(jsonb, boolean) from public, anon;
revoke all on function public.record_observation(jsonb) from public, anon;
revoke all on function public.land_practice_cycle(jsonb) from public, anon;
revoke all on function public.save_observation_note(uuid, text, boolean) from public, anon;
revoke all on function public.delete_observation_note(uuid) from public, anon;
revoke all on function public.save_sunday_note(uuid, text, text, boolean) from public, anon;
revoke all on function public.delete_sunday_note(uuid) from public, anon;
grant execute on function public.activate_practice(jsonb, boolean) to authenticated;
grant execute on function public.record_observation(jsonb) to authenticated;
grant execute on function public.land_practice_cycle(jsonb) to authenticated;
grant execute on function public.save_observation_note(uuid, text, boolean) to authenticated;
grant execute on function public.delete_observation_note(uuid) to authenticated;
grant execute on function public.save_sunday_note(uuid, text, text, boolean) to authenticated;
grant execute on function public.delete_sunday_note(uuid) to authenticated;
