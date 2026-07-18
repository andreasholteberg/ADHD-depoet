-- Forward-only preparation for the closed free pilot.
-- NOT applied to the live project without a separate reviewed SQL approval.
create or replace function public.grant_pilot_bundle(
  p_user_id uuid,
  p_source_ref text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_now timestamptz := now();
begin
  if current_user <> 'service_role' then
    raise exception 'service_role_required' using errcode = '42501';
  end if;

  if nullif(trim(p_source_ref), '') is null then
    raise exception 'source_ref_required' using errcode = '22023';
  end if;

  insert into public.profiles (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  insert into public.course_entitlements (
    user_id, course_id, source, source_ref
  ) values
    (p_user_id, 'startkurs', 'manual', trim(p_source_ref) || ':startkurs'),
    (p_user_id, 'førersetet-hoved', 'manual', trim(p_source_ref) || ':førersetet-hoved')
  on conflict (source_ref) do nothing;

  insert into public.depot_entitlements (
    user_id,
    grant_kind,
    granted_at,
    activated_at,
    active_until,
    grace_until,
    source_ref
  ) values (
    p_user_id,
    'manual',
    v_now,
    v_now,
    v_now + interval '3 months',
    v_now + interval '3 months 7 days',
    trim(p_source_ref) || ':depot'
  )
  on conflict (source_ref) do nothing;

  return jsonb_build_object(
    'courseIds', jsonb_build_array('startkurs', 'førersetet-hoved'),
    'depotActiveUntil', v_now + interval '3 months',
    'autoRenews', false
  );
end;
$$;

revoke all on function public.grant_pilot_bundle(uuid, text) from public, anon, authenticated;
grant execute on function public.grant_pilot_bundle(uuid, text) to service_role;
