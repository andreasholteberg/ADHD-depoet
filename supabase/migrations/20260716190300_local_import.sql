-- Imported from the live Supabase migration history for project uipsaeojwjehrbylfgrx.
-- Live migration name: local_import. Do not edit retroactively.

create or replace function public.import_local_practice_batch(
  p_payload jsonb,
  p_batch_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_state text;
  v_fingerprint text := nullif(trim(p_payload ->> 'sourceFingerprint'), '');
  v_conflict_choice text := p_payload ->> 'activeConflictChoice';
  v_existing public.device_imports;
  v_item jsonb;
  v_owner uuid;
  v_status text;
  v_practice_count integer := 0;
  v_cycle_count integer := 0;
  v_observation_count integer := 0;
  v_decision_count integer := 0;
  v_row_count integer;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  v_state := public.current_depot_access_state();
  if v_state not in ('active', 'eligible_to_activate') then
    raise exception 'practice_import_not_allowed' using errcode = '42501';
  end if;

  if coalesce((p_payload ->> 'schemaVersion')::integer, 0) <> 1
     or v_fingerprint is null then
    raise exception 'invalid_import_metadata' using errcode = '22023';
  end if;

  select i.* into v_existing
  from public.device_imports i
  where i.user_id = v_user_id and i.batch_id = p_batch_id;

  if v_existing.id is not null then
    if v_existing.source_fingerprint <> v_fingerprint then
      raise exception 'import_batch_fingerprint_mismatch' using errcode = '22023';
    end if;
    return jsonb_build_object(
      'batchId', p_batch_id,
      'practices', v_existing.imported_practices,
      'cycles', v_existing.imported_cycles,
      'observations', v_existing.imported_observations,
      'decisions', v_existing.imported_decisions,
      'idempotent', true
    );
  end if;

  if jsonb_typeof(coalesce(p_payload -> 'practices', '[]'::jsonb)) <> 'array'
     or jsonb_typeof(coalesce(p_payload -> 'cycles', '[]'::jsonb)) <> 'array'
     or jsonb_typeof(coalesce(p_payload -> 'observations', '[]'::jsonb)) <> 'array'
     or jsonb_typeof(coalesce(p_payload -> 'sundayDecisions', '[]'::jsonb)) <> 'array' then
    raise exception 'invalid_import_arrays' using errcode = '22023';
  end if;

  if jsonb_array_length(coalesce(p_payload -> 'practices', '[]'::jsonb)) > 100
     or jsonb_array_length(coalesce(p_payload -> 'cycles', '[]'::jsonb)) > 500
     or jsonb_array_length(coalesce(p_payload -> 'observations', '[]'::jsonb)) > 5000
     or jsonb_array_length(coalesce(p_payload -> 'sundayDecisions', '[]'::jsonb)) > 500 then
    raise exception 'import_batch_too_large' using errcode = '22023';
  end if;

  if jsonb_path_exists(p_payload, '$.observations[*].userNote')
     or jsonb_path_exists(p_payload, '$.sundayDecisions[*].userNote')
     or jsonb_path_exists(p_payload, '$.sundayDecisions[*].explicitObservation') then
    raise exception 'free_text_requires_separate_consent' using errcode = '22023';
  end if;

  if exists (
    select 1 from public.practices p
    where p.user_id = v_user_id and p.status = 'active'
  ) and exists (
    select 1
    from jsonb_array_elements(coalesce(p_payload -> 'practices', '[]'::jsonb)) value
    where value ->> 'status' = 'active'
  ) then
    if v_conflict_choice is null then
      raise exception 'active_practice_conflict' using errcode = '23505';
    elsif v_conflict_choice = 'use_device' then
      update public.practice_cycles c
      set status = 'landed', ended_at = now()
      where c.user_id = v_user_id and c.status = 'active';
      update public.practices p
      set status = 'retired'
      where p.user_id = v_user_id and p.status = 'active';
    elsif v_conflict_choice <> 'keep_cloud' then
      raise exception 'invalid_active_conflict_choice' using errcode = '22023';
    end if;
  end if;

  for v_item in
    select value from jsonb_array_elements(coalesce(p_payload -> 'practices', '[]'::jsonb))
  loop
    v_owner := null;
    select p.user_id into v_owner
    from public.practices p
    where p.id = (v_item ->> 'id')::uuid;
    if v_owner is not null and v_owner <> v_user_id then
      raise exception 'identifier_conflict' using errcode = '23505';
    end if;

    v_status := case
      when v_item ->> 'status' = 'active' and v_conflict_choice = 'keep_cloud' then 'retired'
      when v_item ->> 'status' = 'active' then 'active'
      else 'retired'
    end;

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
      (v_item ->> 'id')::uuid,
      v_user_id,
      v_item ->> 'templateId',
      (v_item ->> 'templateVersion')::integer,
      v_item ->> 'principleId',
      v_item ->> 'title',
      v_status,
      greatest(coalesce((v_item ->> 'revision')::integer, 1), 1),
      v_item ->> 'ageTrack',
      v_item ->> 'expressionVariant',
      v_item -> 'situation',
      v_item -> 'signal',
      v_item -> 'value',
      v_item -> 'normalAction',
      v_item -> 'tiredAction',
      v_item -> 'lowCapacityAction',
      trim(v_item ->> 'boundary'),
      nullif(trim(v_item ->> 'languageSelf'), ''),
      nullif(trim(v_item ->> 'languageChild'), ''),
      nullif(trim(v_item ->> 'languageOtherAdult'), ''),
      coalesce((v_item ->> 'createdAt')::timestamptz, now()),
      coalesce((v_item ->> 'updatedAt')::timestamptz, now())
    )
    on conflict (id) do nothing;
    get diagnostics v_row_count = row_count;
    v_practice_count := v_practice_count + v_row_count;
  end loop;

  for v_item in
    select value from jsonb_array_elements(coalesce(p_payload -> 'cycles', '[]'::jsonb))
  loop
    v_owner := null;
    select c.user_id into v_owner
    from public.practice_cycles c
    where c.id = (v_item ->> 'id')::uuid;
    if v_owner is not null and v_owner <> v_user_id then
      raise exception 'identifier_conflict' using errcode = '23505';
    end if;

    v_status := case
      when v_item ->> 'status' = 'active' and v_conflict_choice = 'keep_cloud' then 'landed'
      when v_item ->> 'status' = 'active' then 'active'
      else 'landed'
    end;

    insert into public.practice_cycles (
      id,
      user_id,
      practice_id,
      practice_revision,
      plan_snapshot,
      status,
      current_step,
      started_at,
      ended_at
    ) values (
      (v_item ->> 'id')::uuid,
      v_user_id,
      (v_item ->> 'practiceId')::uuid,
      greatest(coalesce((v_item ->> 'practiceRevision')::integer, 1), 1),
      v_item -> 'planSnapshot',
      v_status,
      greatest(1, least(7, coalesce((v_item ->> 'currentStep')::integer, 1))),
      coalesce((v_item ->> 'startedAt')::timestamptz, now()),
      case
        when v_status = 'landed'
          then coalesce((v_item ->> 'endedAt')::timestamptz, now())
        else null
      end
    )
    on conflict (id) do nothing;
    get diagnostics v_row_count = row_count;
    v_cycle_count := v_cycle_count + v_row_count;
  end loop;

  for v_item in
    select value from jsonb_array_elements(coalesce(p_payload -> 'observations', '[]'::jsonb))
  loop
    v_owner := null;
    select o.user_id into v_owner
    from public.observations o
    where o.id = (v_item ->> 'id')::uuid;
    if v_owner is not null and v_owner <> v_user_id then
      raise exception 'identifier_conflict' using errcode = '23505';
    end if;

    insert into public.observations (
      id,
      user_id,
      practice_id,
      cycle_id,
      step,
      parent_energy,
      action_choice,
      observation_choice,
      created_at
    ) values (
      (v_item ->> 'id')::uuid,
      v_user_id,
      (v_item ->> 'practiceId')::uuid,
      (v_item ->> 'cycleId')::uuid,
      (v_item ->> 'step')::integer,
      nullif(v_item ->> 'parentEnergy', ''),
      v_item ->> 'actionChoice',
      nullif(v_item ->> 'observationChoice', ''),
      coalesce((v_item ->> 'createdAt')::timestamptz, now())
    )
    on conflict (id) do nothing;
    get diagnostics v_row_count = row_count;
    v_observation_count := v_observation_count + v_row_count;
  end loop;

  for v_item in
    select value from jsonb_array_elements(coalesce(p_payload -> 'sundayDecisions', '[]'::jsonb))
  loop
    v_owner := null;
    select d.user_id into v_owner
    from public.sunday_decisions d
    where d.id = (v_item ->> 'id')::uuid;
    if v_owner is not null and v_owner <> v_user_id then
      raise exception 'identifier_conflict' using errcode = '23505';
    end if;

    insert into public.sunday_decisions (
      id,
      user_id,
      practice_id,
      cycle_id,
      size_choice,
      decision,
      created_at
    ) values (
      (v_item ->> 'id')::uuid,
      v_user_id,
      (v_item ->> 'practiceId')::uuid,
      (v_item ->> 'cycleId')::uuid,
      v_item ->> 'sizeChoice',
      v_item ->> 'decision',
      coalesce((v_item ->> 'createdAt')::timestamptz, now())
    )
    on conflict (id) do nothing;
    get diagnostics v_row_count = row_count;
    v_decision_count := v_decision_count + v_row_count;
  end loop;

  insert into public.device_imports (
    user_id,
    batch_id,
    source_schema_version,
    source_fingerprint,
    imported_practices,
    imported_cycles,
    imported_observations,
    imported_decisions
  ) values (
    v_user_id,
    p_batch_id,
    1,
    v_fingerprint,
    v_practice_count,
    v_cycle_count,
    v_observation_count,
    v_decision_count
  );

  return jsonb_build_object(
    'batchId', p_batch_id,
    'practices', v_practice_count,
    'cycles', v_cycle_count,
    'observations', v_observation_count,
    'decisions', v_decision_count,
    'idempotent', false
  );
end;
$$;
revoke all on function public.import_local_practice_batch(jsonb, uuid) from public, anon;
grant execute on function public.import_local_practice_batch(jsonb, uuid) to authenticated;
