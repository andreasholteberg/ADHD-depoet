export const AUTH_CALLBACK_PATH = '/auth/callback';
export const PRODUCTION_APP_ORIGIN = 'https://adhd-depoet.com';
export const APPROVED_PREVIEW_CALLBACK_URL =
  'https://codex-depoet-launch-converge.adhd-depoet-app.pages.dev/auth/callback';

interface AuthRedirectContext {
  isDevelopment: boolean;
  currentOrigin: string;
  explicitCallbackUrl?: string;
}

export function resolveAuthCallbackUrl({
  isDevelopment,
  currentOrigin,
  explicitCallbackUrl,
}: AuthRedirectContext): string {
  if (isDevelopment) {
    return new URL(AUTH_CALLBACK_PATH, `${currentOrigin}/`).toString();
  }

  const productionCallback = `${PRODUCTION_APP_ORIGIN}${AUTH_CALLBACK_PATH}`;
  if (
    explicitCallbackUrl === APPROVED_PREVIEW_CALLBACK_URL ||
    explicitCallbackUrl === productionCallback
  ) {
    return explicitCallbackUrl;
  }

  return productionCallback;
}

export function getAuthCallbackUrl(): string {
  return resolveAuthCallbackUrl({
    isDevelopment: import.meta.env.DEV,
    currentOrigin: window.location.origin,
    explicitCallbackUrl: import.meta.env.VITE_AUTH_CALLBACK_URL,
  });
}
