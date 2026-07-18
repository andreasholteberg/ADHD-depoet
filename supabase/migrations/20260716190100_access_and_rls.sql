-- Imported from the live Supabase migration history for project uipsaeojwjehrbylfgrx.
-- Live migration name: access_and_rls. Do not edit retroactively.

create or replace function public.current_account_is_active()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (
      select p.account_status = 'active'
      from public.profiles p
      where p.user_id = (select auth.uid())
    ),
    false
  );
$$;
create or replace function public.current_depot_access_state()
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_account_status text;
begin
  if v_user_id is null then
    return 'guest';
  end if;

  select p.account_status
  into v_account_status
  from public.profiles p
  where p.user_id = v_user_id;

  if v_account_status is null then
    return 'unclaimed';
  end if;

  if v_account_status = 'deletion_pending' then
    return 'locked';
  end if;

  if exists (
    select 1
    from public.depot_entitlements e
    where e.user_id = v_user_id
      and e.revoked_at is null
      and e.active_until is not null
      and now() <= e.active_until
  ) then
    return 'active';
  end if;

  if exists (
    select 1
    from public.depot_entitlements e
    where e.user_id = v_user_id
      and e.revoked_at is null
      and e.active_until is not null
      and e.grace_until is not null
      and e.active_until < now()
      and now() <= e.grace_until
  ) then
    return 'grace';
  end if;

  if exists (
    select 1
    from public.depot_entitlements e
    where e.user_id = v_user_id
      and e.grant_kind = 'included'
      and e.revoked_at is null
      and e.activated_at is null
  ) then
    return 'eligible_to_activate';
  end if;

  return 'read_only';
end;
$$;
revoke all on function public.current_account_is_active() from public, anon;
revoke all on function public.current_depot_access_state() from public, anon;
grant execute on function public.current_account_is_active() to authenticated;
grant execute on function public.current_depot_access_state() to authenticated;
alter table public.profiles enable row level security;
alter table public.account_deletion_requests enable row level security;
alter table public.course_entitlements enable row level security;
alter table public.depot_entitlements enable row level security;
alter table public.course_progress enable row level security;
alter table public.saved_language_cards enable row level security;
alter table public.practices enable row level security;
alter table public.practice_cycles enable row level security;
alter table public.observations enable row level security;
alter table public.observation_notes enable row level security;
alter table public.sunday_decisions enable row level security;
alter table public.sunday_notes enable row level security;
alter table public.device_imports enable row level security;
create policy profiles_select_own
on public.profiles for select to authenticated
using ((select auth.uid()) = user_id);
create policy profiles_update_display_name
on public.profiles for update to authenticated
using ((select auth.uid()) = user_id and account_status = 'active')
with check ((select auth.uid()) = user_id and account_status = 'active');
create policy deletion_requests_select_own
on public.account_deletion_requests for select to authenticated
using ((select auth.uid()) = user_id);
create policy course_entitlements_select_own
on public.course_entitlements for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy depot_entitlements_select_own
on public.depot_entitlements for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy course_progress_select_own
on public.course_progress for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy course_progress_insert_own
on public.course_progress for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy course_progress_update_own
on public.course_progress for update to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
)
with check (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy course_progress_delete_own
on public.course_progress for delete to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy saved_cards_select_own
on public.saved_language_cards for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy saved_cards_insert_own
on public.saved_language_cards for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy saved_cards_update_own
on public.saved_language_cards for update to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
)
with check (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy saved_cards_delete_own
on public.saved_language_cards for delete to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy practices_select_own
on public.practices for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy cycles_select_own
on public.practice_cycles for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy observations_select_own
on public.observations for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy observation_notes_select_own
on public.observation_notes for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy observation_notes_delete_own
on public.observation_notes for delete to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy sunday_decisions_select_own
on public.sunday_decisions for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy sunday_notes_select_own
on public.sunday_notes for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy sunday_notes_delete_own
on public.sunday_notes for delete to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
create policy device_imports_select_own
on public.device_imports for select to authenticated
using (
  (select auth.uid()) = user_id
  and (select public.current_account_is_active())
);
revoke all on table public.profiles from anon, authenticated;
revoke all on table public.account_deletion_requests from anon, authenticated;
revoke all on table public.course_entitlements from anon, authenticated;
revoke all on table public.depot_entitlements from anon, authenticated;
revoke all on table public.course_progress from anon, authenticated;
revoke all on table public.saved_language_cards from anon, authenticated;
revoke all on table public.practices from anon, authenticated;
revoke all on table public.practice_cycles from anon, authenticated;
revoke all on table public.observations from anon, authenticated;
revoke all on table public.observation_notes from anon, authenticated;
revoke all on table public.sunday_decisions from anon, authenticated;
revoke all on table public.sunday_notes from anon, authenticated;
revoke all on table public.device_imports from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (display_name) on table public.profiles to authenticated;
grant select on table public.account_deletion_requests to authenticated;
grant select on table public.course_entitlements to authenticated;
grant select on table public.depot_entitlements to authenticated;
grant select, insert, update, delete on table public.course_progress to authenticated;
grant select, insert, update, delete on table public.saved_language_cards to authenticated;
grant select on table public.practices to authenticated;
grant select on table public.practice_cycles to authenticated;
grant select on table public.observations to authenticated;
grant select, delete on table public.observation_notes to authenticated;
grant select on table public.sunday_decisions to authenticated;
grant select, delete on table public.sunday_notes to authenticated;
grant select on table public.device_imports to authenticated;
create or replace function public.ensure_profile()
returns public.profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_profile public.profiles;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  insert into public.profiles (user_id)
  values (v_user_id)
  on conflict (user_id) do nothing;

  select p.* into v_profile
  from public.profiles p
  where p.user_id = v_user_id;

  return v_profile;
end;
$$;
create or replace function public.get_account_state()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_state text;
  v_entitlement public.depot_entitlements;
  v_deletion public.account_deletion_requests;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  v_state := public.current_depot_access_state();

  select e.* into v_entitlement
  from public.depot_entitlements e
  where e.user_id = v_user_id and e.revoked_at is null
  order by e.active_until desc nulls last, e.granted_at desc
  limit 1;

  select d.* into v_deletion
  from public.account_deletion_requests d
  where d.user_id = v_user_id;

  return jsonb_build_object(
    'state', v_state,
    'activatedAt', v_entitlement.activated_at,
    'activeUntil', v_entitlement.active_until,
    'graceUntil', v_entitlement.grace_until,
    'deletionExecuteAfter', v_deletion.execute_after
  );
end;
$$;
create or replace function public.activate_included_depot_access()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_now timestamptz := now();
  v_entitlement public.depot_entitlements;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  if not public.current_account_is_active() then
    raise exception 'account_locked' using errcode = '42501';
  end if;

  select e.* into v_entitlement
  from public.depot_entitlements e
  where e.user_id = v_user_id
    and e.grant_kind = 'included'
    and e.revoked_at is null
  order by e.granted_at
  limit 1
  for update;

  if v_entitlement.id is null then
    raise exception 'included_entitlement_required' using errcode = '42501';
  end if;

  if v_entitlement.activated_at is null then
    update public.depot_entitlements e
    set activated_at = v_now,
        active_until = v_now + interval '3 months',
        grace_until = v_now + interval '3 months 7 days'
    where e.id = v_entitlement.id
    returning e.* into v_entitlement;
  end if;

  return jsonb_build_object(
    'state', public.current_depot_access_state(),
    'activatedAt', v_entitlement.activated_at,
    'activeUntil', v_entitlement.active_until,
    'graceUntil', v_entitlement.grace_until
  );
end;
$$;
create or replace function public.request_account_deletion()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_request public.account_deletion_requests;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  perform public.ensure_profile();

  insert into public.account_deletion_requests (user_id, execute_after)
  values (v_user_id, now() + interval '7 days')
  on conflict (user_id) do nothing;

  update public.profiles
  set account_status = 'deletion_pending'
  where user_id = v_user_id;

  select d.* into v_request
  from public.account_deletion_requests d
  where d.user_id = v_user_id;

  return jsonb_build_object(
    'state', 'locked',
    'requestId', v_request.request_id,
    'requestedAt', v_request.requested_at,
    'executeAfter', v_request.execute_after
  );
end;
$$;
create or replace function public.cancel_account_deletion()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_execute_after timestamptz;
begin
  if v_user_id is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;

  select d.execute_after into v_execute_after
  from public.account_deletion_requests d
  where d.user_id = v_user_id
  for update;

  if v_execute_after is null then
    raise exception 'deletion_request_not_found' using errcode = 'P0002';
  end if;

  if now() >= v_execute_after then
    raise exception 'deletion_deadline_passed' using errcode = '42501';
  end if;

  delete from public.account_deletion_requests where user_id = v_user_id;
  update public.profiles set account_status = 'active' where user_id = v_user_id;

  return jsonb_build_object('state', public.current_depot_access_state());
end;
$$;
revoke all on function public.ensure_profile() from public, anon;
revoke all on function public.get_account_state() from public, anon;
revoke all on function public.activate_included_depot_access() from public, anon;
revoke all on function public.request_account_deletion() from public, anon;
revoke all on function public.cancel_account_deletion() from public, anon;
grant execute on function public.ensure_profile() to authenticated;
grant execute on function public.get_account_state() to authenticated;
grant execute on function public.activate_included_depot_access() to authenticated;
grant execute on function public.request_account_deletion() to authenticated;
grant execute on function public.cancel_account_deletion() to authenticated;
