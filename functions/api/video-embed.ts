import { getVideoDescriptor } from '../../server/video/videoCatalog';
import { buildSignedBunnyEmbedUrl } from '../_lib/bunny';
import { jsonResponse } from '../_lib/stripe';

interface VideoEnv {
  BUNNY_EMBED_TOKEN_KEY?: string;
  SUPABASE_URL: string;
  SUPABASE_PUBLISHABLE_KEY: string;
}

interface PagesContext {
  request: Request;
  env: VideoEnv;
}

type FetchLike = typeof fetch;

function bearerHeader(request: Request): string | null {
  const value = request.headers.get('authorization');
  return value?.startsWith('Bearer ') ? value : null;
}

async function hasCourseEntitlement(
  context: PagesContext,
  courseId: string,
  fetchImpl: FetchLike,
): Promise<boolean> {
  const authorization = bearerHeader(context.request);
  if (!authorization) return false;
  const query = new URLSearchParams({
    select: 'course_id',
    course_id: `eq.${courseId}`,
    revoked_at: 'is.null',
    limit: '1',
  });
  const response = await fetchImpl(
    `${context.env.SUPABASE_URL}/rest/v1/course_entitlements?${query}`,
    {
      headers: {
        apikey: context.env.SUPABASE_PUBLISHABLE_KEY,
        authorization,
        accept: 'application/json',
      },
    },
  );
  if (!response.ok) return false;
  const rows = (await response.json()) as Array<{ course_id?: unknown }>;
  return rows.some((row) => row.course_id === courseId);
}

export async function handleVideoEmbed(
  context: PagesContext,
  fetchImpl: FetchLike = fetch,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<Response> {
  const videoKey = new URL(context.request.url).searchParams.get('video')?.trim() ?? '';
  const descriptor = getVideoDescriptor(videoKey);
  if (
    !descriptor ||
    descriptor.status !== 'published' ||
    !descriptor.bunnyLibraryId ||
    !descriptor.bunnyVideoId
  ) {
    return jsonResponse({ error: 'video_not_published' }, 404);
  }
  if (descriptor.courseAvailability === 'later_minicourse') {
    return jsonResponse({ error: 'video_not_available' }, 404);
  }
  if (
    descriptor.courseAvailability === 'first_paid_bundle' &&
    !(await hasCourseEntitlement(context, descriptor.courseId, fetchImpl))
  ) {
    return jsonResponse({ error: 'entitlement_required' }, 403);
  }
  if (!context.env.BUNNY_EMBED_TOKEN_KEY) {
    return jsonResponse({ error: 'video_playback_not_configured' }, 503);
  }

  try {
    const expiresAt = nowSeconds + 600;
    const embedUrl = await buildSignedBunnyEmbedUrl({
      tokenKey: context.env.BUNNY_EMBED_TOKEN_KEY,
      libraryId: descriptor.bunnyLibraryId,
      videoId: descriptor.bunnyVideoId,
      expiresAtSeconds: expiresAt,
    });
    return jsonResponse({ embedUrl, expiresAt });
  } catch {
    return jsonResponse({ error: 'invalid_video_configuration' }, 503);
  }
}

export function onRequestGet(context: PagesContext): Promise<Response> {
  return handleVideoEmbed(context);
}
