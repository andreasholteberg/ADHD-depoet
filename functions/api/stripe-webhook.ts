import {
  isSupabaseSecretKey,
  jsonResponse,
  parseStripeTestFulfillment,
  verifyStripeTestSignature,
} from '../_lib/stripe';

interface StripeWebhookEnv {
  STRIPE_TEST_WEBHOOK_SECRET?: string;
  SUPABASE_STRIPE_SECRET_KEY?: string;
  SUPABASE_URL: string;
}

interface PagesContext {
  request: Request;
  env: StripeWebhookEnv;
}

type FetchLike = typeof fetch;

export async function handleStripeWebhook(
  context: PagesContext,
  fetchImpl: FetchLike = fetch,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<Response> {
  const signature = context.request.headers.get('stripe-signature');
  const rawBody = await context.request.text();
  if (!signature || !context.env.STRIPE_TEST_WEBHOOK_SECRET) {
    return jsonResponse({ error: 'invalid_signature' }, 400);
  }
  const validSignature = await verifyStripeTestSignature({
    rawBody,
    signatureHeader: signature,
    webhookSecret: context.env.STRIPE_TEST_WEBHOOK_SECRET,
    nowSeconds,
  });
  if (!validSignature) return jsonResponse({ error: 'invalid_signature' }, 400);

  let fulfillment;
  try {
    fulfillment = parseStripeTestFulfillment(JSON.parse(rawBody));
  } catch {
    return jsonResponse({ error: 'invalid_test_event' }, 400);
  }
  if (!fulfillment) return jsonResponse({ received: true, fulfilled: false });
  if (!isSupabaseSecretKey(context.env.SUPABASE_STRIPE_SECRET_KEY)) {
    return jsonResponse({ error: 'fulfillment_not_configured' }, 503);
  }

  const response = await fetchImpl(
    `${context.env.SUPABASE_URL}/rest/v1/rpc/fulfill_stripe_test_checkout`,
    {
      method: 'POST',
      headers: {
        apikey: context.env.SUPABASE_STRIPE_SECRET_KEY,
        authorization: `Bearer ${context.env.SUPABASE_STRIPE_SECRET_KEY}`,
        'content-type': 'application/json; charset=utf-8',
        accept: 'application/json',
      },
      body: JSON.stringify({
        p_checkout_session_id: fulfillment.checkoutSessionId,
        p_user_id: fulfillment.userId,
        p_product_code: fulfillment.productCode,
        p_amount_total: fulfillment.amountTotal,
        p_currency: fulfillment.currency,
        p_livemode: fulfillment.livemode,
      }),
    },
  );
  if (!response.ok) return jsonResponse({ error: 'fulfillment_failed' }, 502);
  return jsonResponse({ received: true, fulfilled: true });
}

export function onRequestPost(context: PagesContext): Promise<Response> {
  return handleStripeWebhook(context);
}
