export const FIRST_PAID_OFFER = {
  code: 'depoet-first-bundle-v1',
  name: 'Regulering før retning + Førersetet: Øvingsprogrammet',
  description:
    '13 skriftlige moduler, tre måneders Depoet-tilgang og fremtidige videoer til de kjøpte modulene.',
  courseIds: ['startkurs', 'førersetet-hoved'],
  moduleCount: 13,
  currency: 'nok',
  priceMinorUnits: 99_000,
  priceNok: 990,
  depotAccessMonths: 3,
  autoRenews: false,
  futureVideosIncluded: true,
} as const;

export type FirstPaidCourseId = (typeof FIRST_PAID_OFFER.courseIds)[number];

export function isFirstPaidCourseId(value: string): value is FirstPaidCourseId {
  return FIRST_PAID_OFFER.courseIds.some((courseId) => courseId === value);
}
