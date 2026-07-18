import assert from 'node:assert/strict';
import test from 'node:test';
import {
  SUPABASE_PROJECT_REF,
  SUPABASE_PROJECT_URL,
  isSupabasePublishableKey,
  resolveAppConfig,
} from '../src/lib/config';

const TEST_PUBLISHABLE_KEY = `sb_publishable_${'a'.repeat(24)}`;

test('locks the client to the ADHD Depoet Supabase project', () => {
  assert.equal(SUPABASE_PROJECT_REF, 'uipsaeojwjehrbylfgrx');
  assert.equal(SUPABASE_PROJECT_URL, 'https://uipsaeojwjehrbylfgrx.supabase.co');

  const config = resolveAppConfig({
    VITE_SUPABASE_URL: SUPABASE_PROJECT_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: TEST_PUBLISHABLE_KEY,
  });

  assert.equal(config.backendEnabled, true);
  assert.equal(config.supabasePublishableKey, TEST_PUBLISHABLE_KEY);
});

test('rejects another project URL even with a publishable key', () => {
  const config = resolveAppConfig({
    VITE_SUPABASE_URL: 'https://another-project.supabase.co',
    VITE_SUPABASE_PUBLISHABLE_KEY: TEST_PUBLISHABLE_KEY,
  });

  assert.equal(config.backendEnabled, false);
});

test('accepts only the modern publishable key format', () => {
  assert.equal(isSupabasePublishableKey(TEST_PUBLISHABLE_KEY), true);
  assert.equal(isSupabasePublishableKey(`sb_secret_${'a'.repeat(24)}`), false);
  assert.equal(isSupabasePublishableKey('eyJhbGciOiJIUzI1NiJ9.test.signature'), false);
  assert.equal(isSupabasePublishableKey(''), false);
});

test('does not fall back to the removed legacy anon environment variable', () => {
  const legacyEnv = {
    VITE_SUPABASE_URL: SUPABASE_PROJECT_URL,
    VITE_SUPABASE_ANON_KEY: 'legacy-value-must-be-ignored',
  } as Parameters<typeof resolveAppConfig>[0] & { VITE_SUPABASE_ANON_KEY: string };

  const config = resolveAppConfig(legacyEnv);

  assert.equal(config.backendEnabled, false);
  assert.equal(config.supabasePublishableKey, '');
});

test('enables email only with a valid backend and an explicit true flag', () => {
  const enabled = resolveAppConfig({
    VITE_SUPABASE_URL: SUPABASE_PROJECT_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: TEST_PUBLISHABLE_KEY,
    VITE_EMAIL_ENABLED: ' TRUE ',
  });
  const disabled = resolveAppConfig({
    VITE_SUPABASE_URL: SUPABASE_PROJECT_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: 'not-a-publishable-key',
    VITE_EMAIL_ENABLED: 'true',
  });

  assert.equal(enabled.emailEnabled, true);
  assert.equal(disabled.emailEnabled, false);
});
