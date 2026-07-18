import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import type { Session } from '@supabase/supabase-js';
import {
  EMAIL_OTP_LENGTH,
  getEmailOtpErrorMessage,
  isEmailOtpCode,
  normalizeEmailOtpInput,
  verifyEmailOtpWith,
  type VerifyEmailOtpRequest,
} from '../src/lib/authCode';

test('normalizes input to six numeric digits', () => {
  assert.equal(EMAIL_OTP_LENGTH, 6);
  assert.equal(normalizeEmailOtpInput('1a 2b3-4567'), '123456');
  assert.equal(normalizeEmailOtpInput('１２３456'), '456');
  assert.equal(isEmailOtpCode(' 123456 '), true);
  assert.equal(isEmailOtpCode('12345'), false);
});

test('does not call Supabase for an incomplete code', async () => {
  let called = false;
  const verifyOtp: VerifyEmailOtpRequest = async () => {
    called = true;
    return { data: { session: null }, error: null };
  };

  const result = await verifyEmailOtpWith(verifyOtp, 'forelder@example.no', '12345');

  assert.equal(called, false);
  assert.deepEqual(result, {
    ok: false,
    message: 'Skriv inn alle seks sifrene fra e-posten.',
    session: null,
  });
});

test('verifies the trimmed code with type email and retains the requested email', async () => {
  const session = { access_token: 'test-access-token' } as Session;
  let received: Parameters<VerifyEmailOtpRequest>[0] | null = null;
  const verifyOtp: VerifyEmailOtpRequest = async (params) => {
    received = params;
    return { data: { session }, error: null };
  };

  const result = await verifyEmailOtpWith(
    verifyOtp,
    '  forelder@example.no  ',
    ' 123456 ',
  );

  assert.deepEqual(received, {
    email: 'forelder@example.no',
    token: '123456',
    type: 'email',
  });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.session, session);
});

test('maps expired and invalid OTP errors to a helpful message', async () => {
  const verifyOtp: VerifyEmailOtpRequest = async () => ({
    data: { session: null },
    error: { code: 'otp_expired', message: 'Token has expired or is invalid' },
  });

  const result = await verifyEmailOtpWith(verifyOtp, 'forelder@example.no', '123456');

  assert.deepEqual(result, {
    ok: false,
    message: 'Koden er ugyldig eller har utløpt. Be om en ny kode og prøv igjen.',
    session: null,
  });
  assert.equal(
    getEmailOtpErrorMessage({ message: 'Invalid OTP' }),
    'Koden er ugyldig eller har utløpt. Be om en ny kode og prøv igjen.',
  );
});

test('shows a calm network error when verification throws', async () => {
  const verifyOtp: VerifyEmailOtpRequest = async () => {
    throw new Error('network unavailable');
  };

  const result = await verifyEmailOtpWith(verifyOtp, 'forelder@example.no', '123456');

  assert.deepEqual(result, {
    ok: false,
    message: 'Vi fikk ikke kontakt med innloggingstjenesten. Prøv igjen om litt.',
    session: null,
  });
});
