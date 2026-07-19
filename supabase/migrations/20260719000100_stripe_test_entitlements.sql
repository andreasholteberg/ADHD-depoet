-- Local, forward-only preparation for Stripe test mode.
-- NOT applied to the live project without a separate reviewed SQL approval.
create or replace function public.fulfill_stripe_test_checkout(
  p_checkout_session_id text,
  p_user_id uuid,
  p_product_code text,
  p_amount_total bigint,
  p_currency text,
  p_livemode boolean
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_now timestamptz := now();
  v_source_base text;
begin
  if current_user <> 'service_role' then
    raise exception 'service_role_required' using errcode = '42501';
  end if;

  if p_livemode is distinct from false then
    raise exception 'live_stripe_event_rejected' using errcode = '22023';
  end if;

  if p_checkout_session_id !~ '^cs_test_[A-Za-z0-9_]+$' then
    raise exception 'test_checkout_session_required' using errcode = '22023';
  end if;

  if p_product_code <> 'depoet-first-bundle-v1'
    or p_amount_total <> 99000
    or lower(p_currency) <> 'nok'
  then
    raise exception 'offer_contract_mismatch' using errcode = '22023';
  end if;

  v_source_base := 'stripe_test:checkout:' || p_checkout_session_id;

  insert into public.profiles (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  insert into public.course_entitlements (
    user_id, course_id, source, source_ref
  ) values
    (p_user_id, 'startkurs', 'purchase', v_source_base || ':startkurs'),
    (p_user_id, 'førersetet-hoved', 'purchase', v_source_base || ':førersetet-hoved')
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
    'included',
    v_now,
    v_now,
    v_now + interval '3 months',
    v_now + interval '3 months 7 days',
    v_source_base || ':depot'
  )
  on conflict (source_ref) do nothing;

  return jsonb_build_object(
    'fulfilled', true,
    'productCode', p_product_code,
    'courseIds', jsonb_build_array('startkurs', 'førersetet-hoved'),
    'depotActiveUntil', v_now + interval '3 months',
    'autoRenews', false
  );
end;
$$;

revoke all on function public.fulfill_stripe_test_checkout(
  text, uuid, text, bigint, text, boolean
) from public, anon, authenticated;
grant execute on function public.fulfill_stripe_test_checkout(
  text, uuid, text, bigint, text, boolean
) to service_role;
