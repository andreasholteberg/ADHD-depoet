const runtimeEnv = import.meta.env ?? {};
const supabaseUrl = runtimeEnv.VITE_SUPABASE_URL?.trim() || '';
const supabasePublishableKey =
  runtimeEnv.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  runtimeEnv.VITE_SUPABASE_ANON_KEY?.trim() ||
  '';
const emailFlag = runtimeEnv.VITE_EMAIL_ENABLED?.trim().toLowerCase() || '';
const backendEnabled = Boolean(supabaseUrl && supabasePublishableKey);

export const appConfig = {
  supabaseUrl,
  supabasePublishableKey,
  backendEnabled,
  emailEnabled: backendEnabled && emailFlag === 'true',
} as const;

export type AppConfig = typeof appConfig;
