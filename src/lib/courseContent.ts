import type { Course } from '../types';
import type { CourseCatalogItem } from '../data/courseCatalog';
import { getCurrentSession } from './supabaseClient';

export interface CourseContentResponse {
  catalog: Array<CourseCatalogItem & { unlocked: boolean }>;
  courses: Course[];
}

export async function loadCourseContent(): Promise<CourseContentResponse | null> {
  try {
    const session = await getCurrentSession();
    const headers = new Headers({ Accept: 'application/json' });
    if (session?.access_token) headers.set('Authorization', 'Bearer ' + session.access_token);
    const response = await fetch('/api/content', {
      method: 'GET',
      headers,
      credentials: 'same-origin',
    });
    if (!response.ok) return null;
    return (await response.json()) as CourseContentResponse;
  } catch {
    return null;
  }
}
