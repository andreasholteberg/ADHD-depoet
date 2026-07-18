import { createClient } from 'npm:@supabase/supabase-js@2';
import {
  createDeleteAccountHandler,
  createSecretKeyFetch,
  type DeleteAccountOperations,
} from './handler.ts';

Deno.serve(
  createDeleteAccountHandler({
    getEnv: (name) => Deno.env.get(name),
    createOperations: (supabaseUrl, secretKey): DeleteAccountOperations => {
      const admin = createClient(supabaseUrl, secretKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: createSecretKeyFetch(secretKey) },
      });

      return {
        async readDatabaseState() {
          const { count, error } = await admin
            .from('account_deletion_requests')
            .select('user_id', { count: 'exact', head: true });
          if (error) throw new Error('database_access_failed');
          return count ?? 0;
        },

        async readAuthAdminState() {
          const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 });
          if (error) throw new Error('auth_admin_access_failed');
          return data.total ?? data.users.length;
        },

        async executeDueDeletions() {
          const { data: dueRequests, error: readError } = await admin
            .from('account_deletion_requests')
            .select('user_id')
            .lte('execute_after', new Date().toISOString())
            .order('execute_after', { ascending: true })
            .limit(50);

          if (readError) throw new Error('due_requests_unavailable');

          let deleted = 0;
          let failed = 0;
          for (const item of dueRequests ?? []) {
            const { error: deleteError } = await admin.auth.admin.deleteUser(item.user_id);
            if (deleteError) failed += 1;
            else deleted += 1;
          }

          return { inspected: dueRequests?.length ?? 0, deleted, failed };
        },
      };
    },
  }),
);
