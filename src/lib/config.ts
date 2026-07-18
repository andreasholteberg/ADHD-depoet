export const SUPABASE_PROJECT_REF = 'uipsaeojwjehrbylfgrx';
export const SUPABASE_PROJECT_URL = `https://${SUPABASE_PROJECT_REF}.supabase.co`;

export interface PublicClientEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_EMAIL_ENABLED?: string;
}

export function isSupabasePublishableKey(value: string): boolean {
  return /^sb_publishable_[A-Za-z0-9_-]{16,}$/.test(value.trim());
}

export function resolveAppConfig(runtimeEnv: PublicClientEnv) {
  const supabaseUrl = runtimeEnv.VITE_SUPABASE_URL?.trim() || '';
  const supabasePublishableKey =
    runtimeEnv.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || '';
  const emailFlag = runtimeEnv.VITE_EMAIL_ENABLED?.trim().toLowerCase() || '';
  const backendEnabled =
    supabaseUrl === SUPABASE_PROJECT_URL &&
    isSupabasePublishableKey(supabasePublishableKey);

  return {
    supabaseUrl,
    supabasePublishableKey,
    backendEnabled,
    emailEnabled: backendEnabled && emailFlag === 'true',
  } as const;
}

export const appConfig = resolveAppConfig(import.meta.env ?? {});

export type AppConfig = typeof appConfig;
