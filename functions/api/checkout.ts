import { FIRST_PAID_OFFER } from '../../server/payments/firstPaidOffer';
import {
  buildCheckoutForm,
  isStripeTestPrice,
  isStripeTestSecret,
  jsonResponse,
  type StripeCheckoutIdentity,
} from '../_lib/stripe';

interface CheckoutEnv {
  APP_URL?: string;
  STRIPE_TEST_PRICE_ID?: string;
  STRIPE_TEST_SECRET_KEY?: string;
  SUPABASE_URL: string;
  SUPABASE_PUBLISHABLE_KEY: string;
}

interface PagesContext {
  request: Request;
  env: CheckoutEnv;
}

type FetchLike = typeof fetch;

function bearerToken(request: Request): string | null {
  const value = request.headers.get('authorization');
  return value?.startsWith('Bearer ') ? value.slice('Bearer '.length).trim() : null;
}

async function loadIdentity(
  env: CheckoutEnv,
  accessToken: string,
  fetchImpl: FetchLike,
): Promise<StripeCheckoutIdentity | null> {
  const response = await fetchImpl(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: env.SUPABASE_PUBLISHABLE_KEY,
      authorization: `Bearer ${accessToken}`,
      accept: 'application/json',
    },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { id?: unknown; email?: unknown };
  return typeof data.id === 'string' && typeof data.email === 'string'
    ? { userId: data.id, email: data.email }
    : null;
}

async function alreadyOwnsBundle(
  env: CheckoutEnv,
  accessToken: string,
  fetchImpl: FetchLike,
): Promise<boolean> {
  const query = new URLSearchParams({
    select: 'course_id',
    course_id: `in.(${FIRST_PAID_OFFER.courseIds.join(',')})`,
    revoked_at: 'is.null',
  });
  const response = await fetchImpl(`${env.SUPABASE_URL}/rest/v1/course_entitlements?${query}`, {
    headers: {
      apikey: env.SUPABASE_PUBLISHABLE_KEY,
      authorization: `Bearer ${accessToken}`,
      accept: 'application/json',
    },
  });
  if (!response.ok) throw new Error('entitlement_check_failed');
  const rows = (await response.json()) as Array<{ course_id?: unknown }>;
  const owned = new Set(
    rows.filter((row) => typeof row.course_id === 'string').map((row) => row.course_id as string),
  );
  return FIRST_PAID_OFFER.courseIds.every((courseId) => owned.has(courseId));
}

export async function handleCheckout(
  context: PagesContext,
  fetchImpl: FetchLike = fetch,
): Promise<Response> {
  if (
    !isStripeTestSecret(context.env.STRIPE_TEST_SECRET_KEY) ||
    !isStripeTestPrice(context.env.STRIPE_TEST_PRICE_ID)
  ) {
    return jsonResponse({ error: 'test_checkout_not_configured' }, 503);
  }
  const accessToken = bearerToken(context.request);
  if (!accessToken) return jsonResponse({ error: 'authentication_required' }, 401);

  try {
    const identity = await loadIdentity(context.env, accessToken, fetchImpl);
    if (!identity) return jsonResponse({ error: 'invalid_session' }, 401);
    if (await alreadyOwnsBundle(context.env, accessToken, fetchImpl)) {
      return jsonResponse({ error: 'bundle_already_owned' }, 409);
    }

    const checkoutBody = buildCheckoutForm(
      identity,
      context.env.APP_URL ?? new URL(context.request.url).origin,
      context.env.STRIPE_TEST_PRICE_ID,
    );
    const stripeResponse = await fetchImpl('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${context.env.STRIPE_TEST_SECRET_KEY}`,
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: checkoutBody,
    });
    if (!stripeResponse.ok) return jsonResponse({ error: 'checkout_unavailable' }, 502);
    const session = (await stripeResponse.json()) as {
      id?: unknown;
      livemode?: unknown;
      url?: unknown;
    };
    if (
      typeof session.id !== 'string' ||
      !session.id.startsWith('cs_test_') ||
      session.livemode !== false ||
      typeof session.url !== 'string' ||
      new URL(session.url).hostname !== 'checkout.stripe.com'
    ) {
      return jsonResponse({ error: 'invalid_checkout_response' }, 502);
    }
    return jsonResponse({ url: session.url });
  } catch {
    return jsonResponse({ error: 'checkout_unavailable' }, 502);
  }
}

export function onRequestPost(context: PagesContext): Promise<Response> {
  return handleCheckout(context);
}
