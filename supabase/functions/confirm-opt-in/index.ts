import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleOptions } from '../_shared/cors.ts';
import { verifyToken } from '../_shared/tokens.ts';

serve(async (request) => {
  const options = handleOptions(request);
  if (options) return options;

  const token = new URL(request.url).searchParams.get('token') ?? '';
  const signingSecret = Deno.env.get('EMAIL_SIGNING_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!token || !signingSecret || !supabaseUrl || !serviceRoleKey) {
    return new Response('Lenken mangler konfigurasjon eller token.', { status: 400, headers: corsHeaders });
  }

  try {
    const payload = await verifyToken<{ purpose: string; subscriberId: string; email: string }>(token, signingSecret);
    if (payload.purpose !== 'confirm_email') throw new Error('wrong_purpose');

    const admin = createClient(supabaseUrl, serviceRoleKey);
    const now = new Date().toISOString();
    await admin
      .from('subscribers')
      .update({ status: 'active', confirmed_at: now, updated_at: now })
      .eq('id', payload.subscriberId);
    await admin
      .from('consents')
      .update({ status: 'granted', consented_at: now })
      .eq('subscriber_id', payload.subscriberId)
      .eq('type', 'email_opt_in')
      .eq('status', 'pending');

    return new Response('Takk. E-postdryppene er bekreftet.', { headers: corsHeaders });
  } catch {
    return new Response('Lenken er ugyldig eller utløpt.', { status: 400, headers: corsHeaders });
  }
});
