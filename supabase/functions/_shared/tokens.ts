const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64UrlEncode(input: Uint8Array | string): string {
  const bytes = typeof input === 'string' ? encoder.encode(input) : input;
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function hmac(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function signToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmac(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifyToken<T extends Record<string, unknown>>(token: string, secret: string): Promise<T> {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) throw new Error('invalid_token');
  const expected = await hmac(encodedPayload, secret);
  if (expected !== signature) throw new Error('invalid_signature');

  const payload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload))) as T;
  if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('expired_token');
  }
  return payload;
}
