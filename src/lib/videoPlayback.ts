import { getCurrentSession } from './supabaseClient';

export interface VideoPlaybackResult {
  embedUrl: string;
  expiresAt: number;
}

export async function loadVideoPlayback(
  videoKey: string,
  fetchImpl: typeof fetch = fetch,
): Promise<VideoPlaybackResult | null> {
  const session = await getCurrentSession();
  const headers = new Headers({ accept: 'application/json' });
  if (session?.access_token) headers.set('authorization', `Bearer ${session.access_token}`);
  try {
    const response = await fetchImpl(`/api/video-embed?video=${encodeURIComponent(videoKey)}`, {
      headers,
      credentials: 'same-origin',
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { embedUrl?: unknown; expiresAt?: unknown };
    if (typeof body.embedUrl !== 'string' || typeof body.expiresAt !== 'number') return null;
    const url = new URL(body.embedUrl);
    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'player.mediadelivery.net' ||
      !url.searchParams.has('token') ||
      !url.searchParams.has('expires')
    ) {
      return null;
    }
    return { embedUrl: body.embedUrl, expiresAt: body.expiresAt };
  } catch {
    return null;
  }
}
