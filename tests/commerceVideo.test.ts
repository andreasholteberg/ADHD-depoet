import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { handleCheckout } from '../functions/api/checkout';
import { handleStripeWebhook } from '../functions/api/stripe-webhook';
import { handleVideoEmbed } from '../functions/api/video-embed';
import { buildSignedBunnyEmbedUrl } from '../functions/_lib/bunny';
import {
  buildCheckoutForm,
  createStripeTestSignature,
  parseStripeTestFulfillment,
  verifyStripeTestSignature,
} from '../functions/_lib/stripe';
import { FIRST_PAID_OFFER } from '../server/payments/firstPaidOffer';
import {
  getVideoDescriptor,
  VIDEO_DESCRIPTORS,
  VIDEO_TECHNICAL_KEYS,
} from '../server/video/videoCatalog';

const USER_ID = '00000000-0000-4000-8000-000000000042';
const TEST_STRIPE_KEY = 'sk_' + 'test_' + 'x'.repeat(24);
const TEST_STRIPE_PRICE = 'price_' + 'p'.repeat(24);
const TEST_WEBHOOK_SECRET = 'whsec_' + 'w'.repeat(24);
const TEST_SUPABASE_SECRET = 'sb_' + 'secret_' + 's'.repeat(24);
const SUPABASE_URL = 'https://uipsaeojwjehrbylfgrx.supabase.co';

test('første betalte pakke er eksakt, engangsbetalt og uten parkurs', () => {
  assert.equal(FIRST_PAID_OFFER.priceNok, 990);
  assert.equal(FIRST_PAID_OFFER.priceMinorUnits, 99_000);
  assert.equal(FIRST_PAID_OFFER.currency, 'nok');
  assert.equal(FIRST_PAID_OFFER.moduleCount, 13);
  assert.equal(FIRST_PAID_OFFER.depotAccessMonths, 3);
  assert.equal(FIRST_PAID_OFFER.autoRenews, false);
  assert.equal(FIRST_PAID_OFFER.futureVideosIncluded, true);
  assert.deepEqual(FIRST_PAID_OFFER.courseIds, ['startkurs', 'førersetet-hoved']);
  assert.doesNotMatch(JSON.stringify(FIRST_PAID_OFFER), /parkurs|forankret/i);
});

test('Checkout-body bruker kun testpakkens faste kontrakt', () => {
  const form = buildCheckoutForm(
    { userId: USER_ID, email: 'pilot@example.test' },
    'https://adhd-depoet.com',
    TEST_STRIPE_PRICE,
  );
  assert.equal(form.get('mode'), 'payment');
  assert.equal(form.get('line_items[0][price]'), TEST_STRIPE_PRICE);
  assert.equal(form.get('line_items[0][quantity]'), '1');
  assert.equal(form.get('metadata[product_code]'), 'depoet-first-bundle-v1');
  assert.equal(form.get('metadata[auto_renews]'), 'false');
  assert.equal(form.get('metadata[depot_access_months]'), '3');
  assert.equal(form.get('success_url'), 'https://adhd-depoet.com/kurs?checkout=success');
  assert.equal(form.get('cancel_url'), 'https://adhd-depoet.com/kurs?checkout=cancelled');
  assert.equal([...form.keys()].some((key) => key.includes('price_data')), false);
  assert.equal([...form.keys()].some((key) => key.includes('recurring')), false);
});

test('Checkout-endepunktet avviser manglende testnøkkel uten nettverkskall', async () => {
  let calls = 0;
  const response = await handleCheckout(
    {
      request: new Request('https://adhd-depoet.com/api/checkout', {
        method: 'POST',
        headers: { authorization: 'Bearer session-token' },
      }),
      env: {
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_localdummy000000',
      },
    },
    (async () => {
      calls += 1;
      return new Response(null, { status: 500 });
    }) as typeof fetch,
  );
  assert.equal(response.status, 503);
  assert.equal(calls, 0);
});

test('Checkout oppretter én hosted test-session etter Auth- og entitlement-kontroll', async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fetchMock = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    if (url.endsWith('/auth/v1/user')) {
      return Response.json({ id: USER_ID, email: 'pilot@example.test' });
    }
    if (url.includes('/course_entitlements?')) return Response.json([]);
    if (url === 'https://api.stripe.com/v1/checkout/sessions') {
      return Response.json({
        id: 'cs_test_local0001',
        livemode: false,
        url: 'https://checkout.stripe.com/c/pay/cs_test_local0001',
      });
    }
    throw new Error('unexpected_mock_url');
  }) as typeof fetch;

  const response = await handleCheckout(
    {
      request: new Request('https://adhd-depoet.com/api/checkout', {
        method: 'POST',
        headers: { authorization: 'Bearer session-token' },
      }),
      env: {
        APP_URL: 'https://adhd-depoet.com',
        STRIPE_TEST_PRICE_ID: TEST_STRIPE_PRICE,
        STRIPE_TEST_SECRET_KEY: TEST_STRIPE_KEY,
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_localdummy000000',
      },
    },
    fetchMock,
  );
  assert.equal(response.status, 200);
  assert.equal(calls.length, 3);
  assert.deepEqual(await response.json(), {
    url: 'https://checkout.stripe.com/c/pay/cs_test_local0001',
  });
  const stripeBody = calls[2].init?.body;
  assert.ok(stripeBody instanceof URLSearchParams);
  assert.equal(stripeBody.get('line_items[0][price]'), TEST_STRIPE_PRICE);
});

test('Stripe-signaturen bruker rå body og fem minutters toleranse', async () => {
  const timestamp = 1_800_000_000;
  const rawBody = '{"id":"evt_test"}';
  const signature = await createStripeTestSignature(rawBody, TEST_WEBHOOK_SECRET, timestamp);
  assert.equal(
    await verifyStripeTestSignature({
      rawBody,
      signatureHeader: `t=${timestamp},v1=${signature}`,
      webhookSecret: TEST_WEBHOOK_SECRET,
      nowSeconds: timestamp + 299,
    }),
    true,
  );
  assert.equal(
    await verifyStripeTestSignature({
      rawBody,
      signatureHeader: `t=${timestamp},v1=${signature}`,
      webhookSecret: TEST_WEBHOOK_SECRET,
      nowSeconds: timestamp + 301,
    }),
    false,
  );
});

function paidTestEvent() {
  return {
    id: 'evt_test_checkout',
    type: 'checkout.session.completed',
    livemode: false,
    data: {
      object: {
        id: 'cs_test_local0001',
        mode: 'payment',
        payment_status: 'paid',
        amount_total: 99_000,
        currency: 'nok',
        metadata: { product_code: FIRST_PAID_OFFER.code, user_id: USER_ID },
      },
    },
  };
}

test('webhook-parser avviser live-hendelser og feil tilbudskontrakt', () => {
  assert.throws(() => parseStripeTestFulfillment({ ...paidTestEvent(), livemode: true }));
  const wrongAmount = paidTestEvent();
  wrongAmount.data.object.amount_total = 1;
  assert.throws(() => parseStripeTestFulfillment(wrongAmount));
});

test('webhook-parser ignorerer ukjent produkt uten fulfillment', () => {
  const unknownProduct = paidTestEvent();
  (unknownProduct.data.object.metadata as { product_code: string; user_id: string }).product_code =
    'annet-produkt';
  assert.equal(parseStripeTestFulfillment(unknownProduct), null);
});

test('signert testwebhook gjør nøyaktig ett sanitert fulfillment-kall', async () => {
  const timestamp = 1_800_000_000;
  const rawBody = JSON.stringify(paidTestEvent());
  const signature = await createStripeTestSignature(rawBody, TEST_WEBHOOK_SECRET, timestamp);
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fetchMock = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init });
    return Response.json({ fulfilled: true });
  }) as typeof fetch;
  const response = await handleStripeWebhook(
    {
      request: new Request('https://adhd-depoet.com/api/stripe-webhook', {
        method: 'POST',
        headers: { 'stripe-signature': `t=${timestamp},v1=${signature}` },
        body: rawBody,
      }),
      env: {
        STRIPE_TEST_WEBHOOK_SECRET: TEST_WEBHOOK_SECRET,
        SUPABASE_STRIPE_SECRET_KEY: TEST_SUPABASE_SECRET,
        SUPABASE_URL,
      },
    },
    fetchMock,
    timestamp,
  );
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /fulfill_stripe_test_checkout$/);
  assert.deepEqual(JSON.parse(String(calls[0].init?.body)), {
    p_checkout_session_id: 'cs_test_local0001',
    p_user_id: USER_ID,
    p_product_code: FIRST_PAID_OFFER.code,
    p_amount_total: 99_000,
    p_currency: 'nok',
    p_livemode: false,
  });
});

test('testmodusmigrasjonen er idempotent og utilgjengelig for klientroller', () => {
  const sql = readFileSync(
    new URL('../supabase/migrations/20260719000100_stripe_test_entitlements.sql', import.meta.url),
    'utf8',
  );
  assert.match(sql, /current_user <> 'service_role'/);
  assert.match(sql, /live_stripe_event_rejected/);
  assert.match(sql, /p_amount_total <> 99000/);
  assert.match(sql, /on conflict \(source_ref\) do nothing/g);
  assert.match(sql, /'startkurs'/);
  assert.match(sql, /'førersetet-hoved'/);
  assert.match(sql, /revoke all[\s\S]+from public, anon, authenticated/);
  assert.doesNotMatch(sql, /parkurs|forankret/i);
});

test('videoinventaret har 32 unike Depoet-moduler og to tekniske startfiler', () => {
  assert.equal(VIDEO_DESCRIPTORS.length, 32);
  assert.equal(new Set(VIDEO_DESCRIPTORS.map((item) => item.videoKey)).size, 32);
  assert.deepEqual(VIDEO_TECHNICAL_KEYS, ['gratis-1', 'hoved-1']);
  assert.doesNotMatch(JSON.stringify(VIDEO_DESCRIPTORS), /parkurs|forankret/i);
});

test('Bunny embed signeres server-side med kort utløp', async () => {
  const url = new URL(
    await buildSignedBunnyEmbedUrl({
      tokenKey: 'local-token-key',
      libraryId: '12345',
      videoId: '11111111-2222-4333-8444-555555555555',
      expiresAtSeconds: 1_800_000_600,
    }),
  );
  assert.equal(url.hostname, 'player.mediadelivery.net');
  assert.equal(url.searchParams.get('expires'), '1800000600');
  assert.match(url.searchParams.get('token') ?? '', /^[a-f0-9]{64}$/);
});

test('betalt Bunny-video krever entitlement før signert URL utstedes', async () => {
  const descriptor = getVideoDescriptor('hoved-1');
  assert.ok(descriptor);
  const original = { ...descriptor };
  Object.assign(descriptor, {
    status: 'published',
    bunnyLibraryId: '12345',
    bunnyVideoId: '11111111-2222-4333-8444-555555555555',
  });
  try {
    let calls = 0;
    const response = await handleVideoEmbed(
      {
        request: new Request('https://adhd-depoet.com/api/video-embed?video=hoved-1'),
        env: {
          BUNNY_EMBED_TOKEN_KEY: 'local-token-key',
          SUPABASE_URL,
          SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_localdummy000000',
        },
      },
      (async () => {
        calls += 1;
        return Response.json([]);
      }) as typeof fetch,
    );
    assert.equal(response.status, 403);
    assert.equal(calls, 0);
  } finally {
    Object.assign(descriptor, original);
  }
});

test('RLS-verifisert entitlement gir kortlivet Bunny-URL uten å eksponere tokennøkkelen', async () => {
  const descriptor = getVideoDescriptor('hoved-1');
  assert.ok(descriptor);
  const original = { ...descriptor };
  Object.assign(descriptor, {
    status: 'published',
    bunnyLibraryId: '12345',
    bunnyVideoId: '11111111-2222-4333-8444-555555555555',
  });
  try {
    const response = await handleVideoEmbed(
      {
        request: new Request('https://adhd-depoet.com/api/video-embed?video=hoved-1', {
          headers: { authorization: 'Bearer session-token' },
        }),
        env: {
          BUNNY_EMBED_TOKEN_KEY: 'local-token-key',
          SUPABASE_URL,
          SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_localdummy000000',
        },
      },
      (async () => Response.json([{ course_id: 'førersetet-hoved' }])) as typeof fetch,
      1_800_000_000,
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as { embedUrl: string; expiresAt: number };
    assert.equal(body.expiresAt, 1_800_000_600);
    assert.match(body.embedUrl, /^https:\/\/player\.mediadelivery\.net\/embed\//);
    assert.doesNotMatch(JSON.stringify(body), /local-token-key/);
  } finally {
    Object.assign(descriptor, original);
  }
});
