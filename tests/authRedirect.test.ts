import assert from 'node:assert/strict';
import test from 'node:test';
import {
  APPROVED_PREVIEW_CALLBACK_URL,
  AUTH_CALLBACK_PATH,
  PRODUCTION_APP_ORIGIN,
  resolveAuthCallbackUrl,
} from '../src/lib/authRedirect';

test('produksjon bruker alltid apex-callback og aldri localhost', () => {
  const callback = resolveAuthCallbackUrl({
    isDevelopment: false,
    currentOrigin: 'http://localhost:3000',
  });

  assert.equal(callback, `${PRODUCTION_APP_ORIGIN}${AUTH_CALLBACK_PATH}`);
  assert.doesNotMatch(callback, /localhost/);
  assert.doesNotMatch(callback, /www\./);
});

test('godkjent preview kan bruke den eksakte Pages-callbacken', () => {
  const callback = resolveAuthCallbackUrl({
    isDevelopment: false,
    currentOrigin: 'https://codex-depoet-launch-converge.adhd-depoet-app.pages.dev',
    explicitCallbackUrl: APPROVED_PREVIEW_CALLBACK_URL,
  });

  assert.equal(callback, APPROVED_PREVIEW_CALLBACK_URL);
});

test('ukjent callback-overstyring avvises til fordel for apex', () => {
  const callback = resolveAuthCallbackUrl({
    isDevelopment: false,
    currentOrigin: 'https://example.pages.dev',
    explicitCallbackUrl: 'https://example.pages.dev/auth/callback',
  });

  assert.equal(callback, `${PRODUCTION_APP_ORIGIN}${AUTH_CALLBACK_PATH}`);
});

test('lokal utvikling beholder sin egen origin og eksakte callback-rute', () => {
  const callback = resolveAuthCallbackUrl({
    isDevelopment: true,
    currentOrigin: 'http://localhost:5173',
    explicitCallbackUrl: APPROVED_PREVIEW_CALLBACK_URL,
  });

  assert.equal(callback, `http://localhost:5173${AUTH_CALLBACK_PATH}`);
});
