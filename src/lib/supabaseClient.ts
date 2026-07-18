import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import { appConfig } from './config';
import type { Database } from './database.generated';

let client: SupabaseClient<Database> | null = null;

export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (!appConfig.backendEnabled) return null;
  if (!client) {
    client = createClient<Database>(appConfig.supabaseUrl, appConfig.supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

export async function getCurrentSession(): Promise<Session | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}
