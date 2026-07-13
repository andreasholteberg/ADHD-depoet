const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';
const emailFlag = import.meta.env.VITE_EMAIL_ENABLED?.trim().toLowerCase() || '';
const backendEnabled = Boolean(supabaseUrl && supabaseAnonKey);

export const appConfig = {
  supabaseUrl,
  supabaseAnonKey,
  backendEnabled,
  emailEnabled: backendEnabled && emailFlag === 'true',
} as const;

export type AppConfig = typeof appConfig;
