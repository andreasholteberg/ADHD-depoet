import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleOptions, jsonResponse } from '../_shared/cors.ts';
import { sendPlainEmail } from '../_shared/resend.ts';
import { signToken } from '../_shared/tokens.ts';
import { buildDailyMessage } from '../_shared/variantBank.ts';

serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const emailFrom = Deno.env.get('EMAIL_FROM');
  const signingSecret = Deno.env.get('EMAIL_SIGNING_SECRET');
  const appUrl = Deno.env.get('APP_URL') ?? 'https://adhd-depoet.com';
  if (!supabaseUrl || !serviceRoleKey || !resendKey || !emailFrom || !signingSecret) {
    return jsonResponse({ error: 'missing_server_configuration' }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);
  const { data: subscribers, error } = await admin
    .from('subscribers')
    .select('id,email,status')
    .eq('status', 'active');
  if (error) return jsonResponse({ error: error.message }, { status: 500 });

  const subscriberIds = (subscribers ?? []).map((subscriber) => subscriber.id);
  const { data: pauses } = subscriberIds.length > 0
    ? await admin
        .from('pauses')
        .select('subscriber_id,pause_until,resume_at')
        .in('subscriber_id', subscriberIds)
    : { data: [] };
  const pausedSubscriberIds = new Set(
    (pauses ?? [])
      .filter((pause) => {
        if (pause.pause_until === 'indefinite') return true;
        if (typeof pause.resume_at !== 'string') return false;
        return new Date(pause.resume_at).getTime() > Date.now();
      })
      .map((pause) => pause.subscriber_id),
  );

  let sent = 0;
  for (const subscriber of subscribers ?? []) {
    if (pausedSubscriberIds.has(subscriber.id)) continue;
    const unsubscribeToken = await signToken(
      {
        purpose: 'unsubscribe',
        subscriberId: subscriber.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
      },
      signingSecret,
    );
    const unsubscribeUrl = new URL('/unsubscribe', new URL(request.url).origin);
    unsubscribeUrl.searchParams.set('token', unsubscribeToken);

    const message = buildDailyMessage(appUrl);
    const providerMessageId = await sendPlainEmail(
      {
        to: subscriber.email,
        from: emailFrom,
        subject: message.subject,
        text: `${message.text}\n\nMeld deg av: ${unsubscribeUrl.toString()}`,
      },
      resendKey,
    );

    await admin.from('send_log').insert({
      subscriber_id: subscriber.id,
      message_type: 'daily_email',
      variant_key: message.variantKey,
      provider_message_id: providerMessageId,
    });
    sent += 1;
  }

  return jsonResponse({ ok: true, sent });
});
