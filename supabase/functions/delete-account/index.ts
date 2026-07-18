import { createClient } from 'npm:@supabase/supabase-js@2';

function constantTimeEqual(left: string, right: string): boolean {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const expectedSecret = Deno.env.get('DELETE_JOB_SECRET');
  const suppliedSecret = request.headers.get('x-depot-job-secret') ?? '';
  if (!expectedSecret || !constantTimeEqual(suppliedSecret, expectedSecret)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json({ error: 'server_configuration_missing' }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: dueRequests, error: readError } = await admin
    .from('account_deletion_requests')
    .select('user_id')
    .lte('execute_after', new Date().toISOString())
    .order('execute_after', { ascending: true })
    .limit(50);

  if (readError) {
    return Response.json({ error: 'due_requests_unavailable' }, { status: 500 });
  }

  let deleted = 0;
  let failed = 0;
  for (const item of dueRequests ?? []) {
    const { error: deleteError } = await admin.auth.admin.deleteUser(item.user_id);
    if (deleteError) failed += 1;
    else deleted += 1;
  }

  return Response.json({ inspected: dueRequests?.length ?? 0, deleted, failed });
});
