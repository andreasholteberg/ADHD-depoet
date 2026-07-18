export const AUTH_CALLBACK_PATH = '/auth/callback';
export const PRODUCTION_APP_ORIGIN = 'https://adhd-depoet.com';

interface AuthRedirectContext {
  isDevelopment: boolean;
  currentOrigin: string;
}

export function resolveAuthCallbackUrl({
  isDevelopment,
  currentOrigin,
}: AuthRedirectContext): string {
  const origin = isDevelopment ? currentOrigin : PRODUCTION_APP_ORIGIN;

  return new URL(AUTH_CALLBACK_PATH, `${origin}/`).toString();
}

export function getAuthCallbackUrl(): string {
  return resolveAuthCallbackUrl({
    isDevelopment: import.meta.env.DEV,
    currentOrigin: window.location.origin,
  });
}
