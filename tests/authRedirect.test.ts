import assert from 'node:assert/strict';
import test from 'node:test';
import {
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

test('lokal utvikling beholder sin egen origin og eksakte callback-rute', () => {
  const callback = resolveAuthCallbackUrl({
    isDevelopment: true,
    currentOrigin: 'http://localhost:5173',
  });

  assert.equal(callback, `http://localhost:5173${AUTH_CALLBACK_PATH}`);
});
