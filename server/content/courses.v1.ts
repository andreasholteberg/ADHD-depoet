import type { Course } from '../../src/types';
import { COURSES } from '../../src/data/courses';
import { PUBLIC_COURSES } from '../../src/data/publicCourses';
import { COURSE_CATALOG, type CourseCatalogItem } from '../../src/data/courseCatalog';

const FIRST_PAID_IDS = new Set(['startkurs', 'førersetet-hoved']);

export function coursesForEntitlements(entitlementIds: ReadonlySet<string>): Course[] {
  return [
    ...PUBLIC_COURSES,
    ...COURSES.filter(
      (course) => FIRST_PAID_IDS.has(course.id) && entitlementIds.has(course.id),
    ),
  ];
}

export function catalogForEntitlements(
  entitlementIds: ReadonlySet<string>,
): Array<CourseCatalogItem & { unlocked: boolean }> {
  return COURSE_CATALOG.map((course) => ({
    ...course,
    unlocked:
      course.availability === 'public' ||
      (course.availability === 'first_paid_bundle' && entitlementIds.has(course.id)),
  }));
}
