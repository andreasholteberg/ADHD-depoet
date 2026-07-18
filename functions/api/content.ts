import { catalogForEntitlements, coursesForEntitlements } from '../../server/content/courses.v1';

interface Env {
  SUPABASE_URL: string;
  SUPABASE_PUBLISHABLE_KEY: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'private, no-store',
    },
  });
}

export async function onRequestGet(context: PagesContext): Promise<Response> {
  const auth = context.request.headers.get('authorization');
  const entitlementIds = new Set<string>();

  if (auth?.startsWith('Bearer ')) {
    const url =
      context.env.SUPABASE_URL +
      '/rest/v1/course_entitlements?select=course_id&revoked_at=is.null';
    const response = await fetch(url, {
      headers: {
        apikey: context.env.SUPABASE_PUBLISHABLE_KEY,
        authorization: auth,
        accept: 'application/json',
      },
    });
    if (!response.ok) return json({ error: 'entitlements_unavailable' }, 502);
    const rows = (await response.json()) as Array<{ course_id?: unknown }>;
    for (const row of rows) {
      if (typeof row.course_id === 'string') entitlementIds.add(row.course_id);
    }
  }

  return json({
    catalog: catalogForEntitlements(entitlementIds),
    courses: coursesForEntitlements(entitlementIds),
  });
}
