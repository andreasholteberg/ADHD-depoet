import { FIRST_PAID_OFFER } from '../../server/payments/firstPaidOffer';

const encoder = new TextEncoder();
const SIGNATURE_TOLERANCE_SECONDS = 300;

export interface StripeCheckoutIdentity {
  userId: string;
  email: string;
}

export interface StripeFulfillment {
  checkoutSessionId: string;
  userId: string;
  productCode: typeof FIRST_PAID_OFFER.code;
  amountTotal: typeof FIRST_PAID_OFFER.priceMinorUnits;
  currency: typeof FIRST_PAID_OFFER.currency;
  livemode: false;
}

interface StripeEventShape {
  id?: unknown;
  type?: unknown;
  livemode?: unknown;
  data?: { object?: unknown };
}

interface StripeCheckoutSessionShape {
  id?: unknown;
  mode?: unknown;
  payment_status?: unknown;
  amount_total?: unknown;
  currency?: unknown;
  metadata?: unknown;
}

export function isStripeTestSecret(value: string | undefined): value is string {
  return typeof value === 'string' && /^sk_test_[A-Za-z0-9_]{16,}$/.test(value);
}

export function isSupabaseSecretKey(value: string | undefined): value is string {
  return typeof value === 'string' && /^sb_secret_[A-Za-z0-9_-]{16,}$/.test(value);
}

export function isAllowedTestCheckoutOrigin(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.origin === 'https://adhd-depoet.com') return true;
    if (url.protocol === 'https:' && url.hostname.endsWith('.adhd-depoet-app.pages.dev')) {
      return true;
    }
    return url.origin === 'http://localhost:3000';
  } catch {
    return false;
  }
}

export function buildCheckoutForm(
  identity: StripeCheckoutIdentity,
  appOrigin: string,
): URLSearchParams {
  if (!isAllowedTestCheckoutOrigin(appOrigin)) throw new Error('invalid_checkout_origin');
  if (!isUuid(identity.userId)) throw new Error('invalid_user_id');
  if (!identity.email.includes('@')) throw new Error('invalid_email');

  const origin = new URL(appOrigin).origin;
  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('customer_creation', 'always');
  form.set('customer_email', identity.email);
  form.set('client_reference_id', identity.userId);
  form.set('success_url', `${origin}/kurs?checkout=success`);
  form.set('cancel_url', `${origin}/kurs?checkout=cancelled`);
  form.set('submit_type', 'pay');
  form.set('line_items[0][quantity]', '1');
  form.set('line_items[0][price_data][currency]', FIRST_PAID_OFFER.currency);
  form.set(
    'line_items[0][price_data][unit_amount]',
    String(FIRST_PAID_OFFER.priceMinorUnits),
  );
  form.set('line_items[0][price_data][product_data][name]', FIRST_PAID_OFFER.name);
  form.set(
    'line_items[0][price_data][product_data][description]',
    FIRST_PAID_OFFER.description,
  );
  form.set(
    'line_items[0][price_data][product_data][metadata][product_code]',
    FIRST_PAID_OFFER.code,
  );
  form.set('metadata[product_code]', FIRST_PAID_OFFER.code);
  form.set('metadata[user_id]', identity.userId);
  form.set('metadata[auto_renews]', String(FIRST_PAID_OFFER.autoRenews));
  form.set('metadata[depot_access_months]', String(FIRST_PAID_OFFER.depotAccessMonths));
  form.set('payment_intent_data[metadata][product_code]', FIRST_PAID_OFFER.code);
  form.set('payment_intent_data[metadata][user_id]', identity.userId);
  return form;
}

function parseSignatureHeader(value: string): { timestamp: number; signatures: string[] } | null {
  let timestamp: number | null = null;
  const signatures: string[] = [];
  for (const part of value.split(',')) {
    const [key, rawValue] = part.split('=', 2);
    if (key === 't' && /^\d+$/.test(rawValue ?? '')) timestamp = Number(rawValue);
    if (key === 'v1' && /^[a-f0-9]{64}$/i.test(rawValue ?? '')) signatures.push(rawValue);
  }
  return timestamp === null || signatures.length === 0 ? null : { timestamp, signatures };
}

async function hmacSha256Hex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function timingSafeHexEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export async function createStripeTestSignature(
  rawBody: string,
  webhookSecret: string,
  timestamp: number,
): Promise<string> {
  return hmacSha256Hex(webhookSecret, `${timestamp}.${rawBody}`);
}

export async function verifyStripeTestSignature(options: {
  rawBody: string;
  signatureHeader: string;
  webhookSecret: string;
  nowSeconds?: number;
}): Promise<boolean> {
  const parsed = parseSignatureHeader(options.signatureHeader);
  if (!parsed || !options.webhookSecret.startsWith('whsec_')) return false;
  const nowSeconds = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - parsed.timestamp) > SIGNATURE_TOLERANCE_SECONDS) return false;
  const expected = await createStripeTestSignature(
    options.rawBody,
    options.webhookSecret,
    parsed.timestamp,
  );
  return parsed.signatures.some((candidate) => timingSafeHexEqual(candidate, expected));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export function parseStripeTestFulfillment(event: StripeEventShape): StripeFulfillment | null {
  if (
    event.type !== 'checkout.session.completed' &&
    event.type !== 'checkout.session.async_payment_succeeded'
  ) {
    return null;
  }
  if (event.livemode !== false) throw new Error('live_event_rejected');
  if (!isRecord(event.data) || !isRecord(event.data.object)) {
    throw new Error('invalid_event_object');
  }
  const session = event.data.object as StripeCheckoutSessionShape;
  if (session.payment_status !== 'paid') return null;
  if (
    typeof session.id !== 'string' ||
    !session.id.startsWith('cs_test_') ||
    session.mode !== 'payment'
  ) {
    throw new Error('invalid_test_checkout_session');
  }
  if (
    session.amount_total !== FIRST_PAID_OFFER.priceMinorUnits ||
    session.currency !== FIRST_PAID_OFFER.currency ||
    !isRecord(session.metadata) ||
    session.metadata.product_code !== FIRST_PAID_OFFER.code ||
    typeof session.metadata.user_id !== 'string' ||
    !isUuid(session.metadata.user_id)
  ) {
    throw new Error('offer_contract_mismatch');
  }
  return {
    checkoutSessionId: session.id,
    userId: session.metadata.user_id,
    productCode: FIRST_PAID_OFFER.code,
    amountTotal: FIRST_PAID_OFFER.priceMinorUnits,
    currency: FIRST_PAID_OFFER.currency,
    livemode: false,
  };
}

export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'private, no-store',
    },
  });
}
