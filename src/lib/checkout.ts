import { getCurrentSession } from './supabaseClient';

export type CheckoutStartResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

export async function startFirstPaidBundleTestCheckout(
  fetchImpl: typeof fetch = fetch,
): Promise<CheckoutStartResult> {
  const session = await getCurrentSession();
  if (!session?.access_token) {
    return { ok: false, message: 'Logg inn før du åpner testbetalingen.' };
  }
  try {
    const response = await fetchImpl('/api/checkout', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${session.access_token}`,
        accept: 'application/json',
      },
    });
    const body = (await response.json()) as { url?: unknown; error?: unknown };
    if (!response.ok || typeof body.url !== 'string') {
      return {
        ok: false,
        message:
          body.error === 'bundle_already_owned'
            ? 'Denne kurspakken er allerede tilgjengelig på kontoen din.'
            : 'Testbetalingen er ikke tilgjengelig akkurat nå.',
      };
    }
    const url = new URL(body.url);
    if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') {
      return { ok: false, message: 'Ugyldig Checkout-adresse.' };
    }
    return { ok: true, url: body.url };
  } catch {
    return { ok: false, message: 'Testbetalingen er ikke tilgjengelig akkurat nå.' };
  }
}
