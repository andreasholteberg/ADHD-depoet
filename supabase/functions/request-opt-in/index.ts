import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleOptions, jsonResponse } from '../_shared/cors.ts';
import { sendPlainEmail } from '../_shared/resend.ts';
import { signToken } from '../_shared/tokens.ts';

serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, { status: 405 });

  const { email, consentVersion = 'landing-epostdrypp-v1' } = await request.json().catch(() => ({}));
  if (typeof email !== 'string' || !email.includes('@')) {
    return jsonResponse({ error: 'invalid_email' }, { status: 400 });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const emailFrom = Deno.env.get('EMAIL_FROM');
  const signingSecret = Deno.env.get('EMAIL_SIGNING_SECRET');
  if (!supabaseUrl || !serviceRoleKey || !resendKey || !emailFrom || !signingSecret) {
    return jsonResponse({ error: 'missing_server_configuration' }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);
  const normalizedEmail = email.trim().toLowerCase();
  const now = new Date().toISOString();

  const { data: subscriber, error: subscriberError } = await admin
    .from('subscribers')
    .upsert({ email: normalizedEmail, status: 'pending', updated_at: now }, { onConflict: 'email' })
    .select('id,email')
    .single();
  if (subscriberError) return jsonResponse({ error: subscriberError.message }, { status: 500 });

  const { error: consentError } = await admin.from('consents').insert({
    subscriber_id: subscriber.id,
    type: 'email_opt_in',
    status: 'pending',
    version: consentVersion,
    text_snapshot: 'Brukeren ber aktivt om Depoets gratis e-postdrypp. Double opt-in kreves for utsending.',
  });
  if (consentError) return jsonResponse({ error: consentError.message }, { status: 500 });

  const token = await signToken(
    {
      purpose: 'confirm_email',
      subscriberId: subscriber.id,
      email: normalizedEmail,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    signingSecret,
  );
  const confirmUrl = new URL('/confirm-opt-in', new URL(request.url).origin);
  confirmUrl.searchParams.set('token', token);

  const messageId = await sendPlainEmail(
    {
      to: normalizedEmail,
      from: emailFrom,
      subject: 'Bekreft Depoet-dryppene',
      text:
        `Hei.\n\nBekreft at du vil motta Depoets e-postdrypp her:\n${confirmUrl.toString()}\n\n` +
        'Hvis du ikke ba om dette, kan du ignorere denne e-posten.',
    },
    resendKey,
  );

  await admin.from('send_log').insert({
    subscriber_id: subscriber.id,
    message_type: 'double_opt_in',
    variant_key: 'confirm_email',
    provider_message_id: messageId,
  });

  return jsonResponse({ ok: true, message: 'Sjekk e-posten din for bekreftelseslenken.' });
});
