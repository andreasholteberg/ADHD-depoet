import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleOptions, jsonResponse } from '../_shared/cors.ts';
import { verifyToken } from '../_shared/tokens.ts';

serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;
  if (request.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, { status: 405 });

  const { token, pauseUntil, resumeAt } = await request.json().catch(() => ({}));
  const signingSecret = Deno.env.get('EMAIL_SIGNING_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (typeof token !== 'string' || !signingSecret || !supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: 'missing_configuration_or_token' }, { status: 400 });
  }

  try {
    const payload = await verifyToken<{ purpose: string; subscriberId: string }>(token, signingSecret);
    if (payload.purpose !== 'preferences') throw new Error('wrong_purpose');

    const admin = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await admin.from('pauses').insert({
      subscriber_id: payload.subscriberId,
      pause_until: typeof pauseUntil === 'string' ? pauseUntil : null,
      resume_at: typeof resumeAt === 'string' ? resumeAt : null,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return jsonResponse({ ok: true, message: 'Preferansene er lagret.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown_error';
    return jsonResponse({ error: message }, { status: 400 });
  }
});
