export type CourseAvailability = 'public' | 'first_paid_bundle' | 'later_minicourse';

export interface CourseCatalogItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  moduleCount: number;
  availability: CourseAvailability;
}

export const COURSE_CATALOG: CourseCatalogItem[] = [
  {
    id: 'gratis-inngang',
    title: 'Kapasitet før vilje',
    description: 'Tre skriftlige moduler om kapasitet, egen beredskap og reparasjon.',
    badge: 'Gratis',
    moduleCount: 3,
    availability: 'public',
  },
  {
    id: 'startkurs',
    title: 'Regulering før retning',
    description: 'Fem skriftlige moduler i den første betalte kurspakken.',
    badge: 'Første kurspakke',
    moduleCount: 5,
    availability: 'first_paid_bundle',
  },
  {
    id: 'førersetet-hoved',
    title: 'Førersetet: Øvingsprogrammet',
    description: 'Åtte skriftlige moduler som gjør bokas forståelsesramme til praksis.',
    badge: 'Første kurspakke',
    moduleCount: 8,
    availability: 'first_paid_bundle',
  },
  {
    id: 'skjerm-uten-krig',
    title: 'Skjerm uten krig',
    description: 'Minikurs som pakkes og prises senere.',
    badge: 'Senere minikurs',
    moduleCount: 2,
    availability: 'later_minicourse',
  },
  {
    id: 'minikurs-naar-det-smeller',
    title: 'Når det smeller: V.A.R.M. og reparasjon',
    description: 'Minikurs som pakkes og prises senere.',
    badge: 'Senere minikurs',
    moduleCount: 2,
    availability: 'later_minicourse',
  },
  {
    id: 'minikurs-legging-morgen-overganger',
    title: 'Legging, morgen og overganger',
    description: 'Minikurs som pakkes og prises senere.',
    badge: 'Senere minikurs',
    moduleCount: 3,
    availability: 'later_minicourse',
  },
  {
    id: 'minikurs-staa-forskjellig',
    title: 'Når dere står forskjellig',
    description: 'Et Depoet-minikurs for voksne med ulike tempo og alarmsystemer. Det er ikke Kontinuums parkurs.',
    badge: 'Senere minikurs',
    moduleCount: 3,
    availability: 'later_minicourse',
  },
  {
    id: 'minikurs-skolesamarbeid',
    title: 'Skolesamarbeid uten skyttergrav',
    description: 'Minikurs som pakkes og prises senere.',
    badge: 'Senere minikurs',
    moduleCount: 3,
    availability: 'later_minicourse',
  },
  {
    id: 'minikurs-redd-miste-barnet',
    title: 'Når du er redd for å miste barnet',
    description: 'Minikurs som pakkes og prises senere.',
    badge: 'Senere minikurs',
    moduleCount: 3,
    availability: 'later_minicourse',
  },
];
