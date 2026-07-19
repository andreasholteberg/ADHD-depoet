import { COURSE_CATALOG, type CourseAvailability } from '../../src/data/courseCatalog';
import { COURSES } from '../../src/data/courses';
import type { ModuleVideoStatus } from '../../src/types';

export interface VideoDescriptor {
  videoKey: string;
  courseId: string;
  courseAvailability: CourseAvailability;
  moduleTitle: string;
  status: ModuleVideoStatus;
  bunnyLibraryId: string | null;
  bunnyVideoId: string | null;
}

export const VIDEO_TECHNICAL_KEYS = ['gratis-1', 'hoved-1'] as const;

export const VIDEO_DESCRIPTORS: VideoDescriptor[] = COURSES.flatMap((course) => {
  const catalogItem = COURSE_CATALOG.find((item) => item.id === course.id);
  if (!catalogItem) throw new Error(`missing_course_catalog:${course.id}`);
  return course.modules.map((module) => {
    if (!module.video) throw new Error(`missing_video_descriptor:${module.id}`);
    return {
      videoKey: module.video.videoKey,
      courseId: course.id,
      courseAvailability: catalogItem.availability,
      moduleTitle: module.title,
      status: module.video.status,
      bunnyLibraryId: module.video.bunnyLibraryId,
      bunnyVideoId: module.video.bunnyVideoId,
    };
  });
});

export function getVideoDescriptor(videoKey: string): VideoDescriptor | null {
  return VIDEO_DESCRIPTORS.find((descriptor) => descriptor.videoKey === videoKey) ?? null;
}
