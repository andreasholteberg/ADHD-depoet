import { appConfig } from './config';
import { getAuthCallbackUrl } from './authRedirect';
import { getSupabaseClient } from './supabaseClient';

export async function requestEmailOptIn(email: string): Promise<{ ok: boolean; message: string }> {
  if (!appConfig.emailEnabled) {
    return {
      ok: false,
      message: 'E-post er ikke aktivert i dette bygget.',
    };
  }

  const supabase = await getSupabaseClient();
  if (!supabase) {
    return {
      ok: false,
      message: 'E-postflyten mangler backend-konfigurasjon.',
    };
  }

  const { data, error } = await supabase.functions.invoke('request-opt-in', {
    body: {
      email,
      consentVersion: 'landing-epostdrypp-v1',
      redirectTo: getAuthCallbackUrl(),
    },
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  const message =
    typeof data === 'object' && data && 'message' in data && typeof data.message === 'string'
      ? data.message
      : 'Sjekk e-posten din for bekreftelseslenken.';

  return { ok: true, message };
}
