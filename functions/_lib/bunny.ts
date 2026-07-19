const encoder = new TextEncoder();

export async function buildSignedBunnyEmbedUrl(options: {
  tokenKey: string;
  libraryId: string;
  videoId: string;
  expiresAtSeconds: number;
}): Promise<string> {
  if (!/^\d+$/.test(options.libraryId)) throw new Error('invalid_bunny_library_id');
  if (!/^[0-9a-f-]{36}$/i.test(options.videoId)) throw new Error('invalid_bunny_video_id');
  if (!Number.isInteger(options.expiresAtSeconds) || options.expiresAtSeconds <= 0) {
    throw new Error('invalid_bunny_expiry');
  }
  const digest = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(options.tokenKey + options.videoId + options.expiresAtSeconds),
  );
  const token = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  const url = new URL(
    `https://player.mediadelivery.net/embed/${options.libraryId}/${options.videoId}`,
  );
  url.searchParams.set('token', token);
  url.searchParams.set('expires', String(options.expiresAtSeconds));
  url.searchParams.set('preload', 'false');
  return url.toString();
}
