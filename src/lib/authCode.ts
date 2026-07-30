import type { Session } from '@supabase/supabase-js';

export const EMAIL_OTP_LENGTH = 6;

export interface EmailOtpVerifyError {
  code?: string;
  message?: string;
}

export type EmailOtpVerificationResult =
  | { ok: true; message: string; session: Session }
  | { ok: false; message: string; session: null };

export type VerifyEmailOtpRequest = (params: {
  email: string;
  token: string;
  type: 'email';
}) => Promise<{
  data: { session: Session | null };
  error: EmailOtpVerifyError | null;
}>;

export function normalizeEmailOtpInput(value: string): string {
  return value.replace(/\D/g, '').slice(0, EMAIL_OTP_LENGTH);
}

export function isEmailOtpCode(value: string): boolean {
  return new RegExp('^\\d{' + EMAIL_OTP_LENGTH + '}$').test(value.trim());
}

export function getEmailOtpErrorMessage(error: EmailOtpVerifyError): string {
  const details = [error.code, error.message].filter(Boolean).join(' ').toLowerCase();

  if (details.includes('otp_expired') || details.includes('expired') || details.includes('invalid')) {
    return 'Koden er ugyldig eller har utløpt. Be om en ny kode og prøv igjen.';
  }

  if (details.includes('rate') || details.includes('too many')) {
    return 'For mange forsøk på kort tid. Vent litt og prøv igjen.';
  }

  return 'Vi klarte ikke å bekrefte koden. Kontroller koden og prøv igjen.';
}

export async function verifyEmailOtpWith(
  verifyOtp: VerifyEmailOtpRequest,
  email: string,
  code: string,
): Promise<EmailOtpVerificationResult> {
  const normalizedEmail = email.trim();
  const token = code.trim();

  if (!normalizedEmail) {
    return {
      ok: false,
      message: 'E-postadressen mangler. Be om en ny kode og prøv igjen.',
      session: null,
    };
  }

  if (!isEmailOtpCode(token)) {
    return {
      ok: false,
      message: 'Skriv inn alle seks sifrene fra e-posten.',
      session: null,
    };
  }

  try {
    const { data, error } = await verifyOtp({
      email: normalizedEmail,
      token,
      type: 'email',
    });

    if (error) {
      return { ok: false, message: getEmailOtpErrorMessage(error), session: null };
    }

    if (!data.session) {
      return {
        ok: false,
        message: 'Koden ble godkjent, men innloggingen ble ikke fullført. Prøv igjen.',
        session: null,
      };
    }

    return {
      ok: true,
      message: 'Du er logget inn. Depoet kan nå synke mellom enhetene dine.',
      session: data.session,
    };
  } catch {
    return {
      ok: false,
      message: 'Vi fikk ikke kontakt med innloggingstjenesten. Prøv igjen om litt.',
      session: null,
    };
  }
}
