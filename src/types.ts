/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Intern, visningsuavhengig representasjon av forelderens kapasitet.
 * Brukes som felles valuta mellom onboarding, dagens innsjekk og variantbank,
 * slik at vi aldri sammenligner på visningstekster.
 */
export type ParentEnergyLevel = 'rom' | 'sliten' | 'tom';

export interface DailyCheckIn {
  date: string; // ISO-dato (YYYY-MM-DD)
  state: ParentEnergyLevel | null; // null = ikke sjekket inn i dag (f.eks. bare oppfølging registrert)
  completedStatus?: 'provd' | 'kom-ikke' | null;
}

export interface UserOnboarding {
  heaviestNow: string; // Morgen, Skjerm, Legging, Overganger, Skole, Søsken, Min egen reaksjon, Ungdom, Annet
  parentState: string; // Jeg har litt rom, Jeg er sliten, Jeg er nesten tom
  desiredHelp: string; // Forstå barnet, Regulere meg selv, Håndtere konkrete situasjoner, Reparere etter konflikt, Holde retning over tid
  wantsReminder: boolean;
  startingPage: 'today' | 'nowWhat' | 'sunday' | 'courses';
}

export interface User {
  id: string;
  name: string;
  onboardingAnswers: UserOnboarding | null;
  selectedWeeklyGoal: string | null;
  currentFocus: string | null; // e.g., Skjerm, Morgen, Legging, Ungdom, etc.
  savedCards: string[]; // LanguageCard IDs
  completedModules: string[]; // CourseModule IDs
  lastActiveAt: string; // ISO String
  wantsDailyReminder: boolean;
  // New backend and sync settings
  email?: string;
  isAnonymous?: boolean;
  situationTags?: string[];
  optIns?: {
    dailyEmail: boolean;
    dailySms: boolean;
    weeklyPuff: boolean;
    returnOptIn: boolean;
  };
  pauseUntil?: 'one_week' | 'one_month' | 'indefinite' | null;
  lastCheckIn?: DailyCheckIn | null;
}

export type ModuleVideoStatus = 'script-ready' | 'uploaded' | 'published';

// Bunny-klar, manus-først video-modell. Video er et senere publiseringslag,
// ikke et krav for at modulen fungerer. Ingen API-nøkler hører hjemme her – kun offentlige felt.
export interface ModuleVideo {
  status: ModuleVideoStatus;
  provider: 'bunny';
  videoKey: string;            // Stabil, menneskelesbar, unik per modul (= modul-id).
  bunnyLibraryId: string | null;
  bunnyVideoId: string | null;
  embedUrl: string | null;     // null = vis modulen som fullverdig leseversjon.
  thumbnailUrl: string | null;
  durationSeconds: number | null;
  transcript: string | null;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  videoText: string; // Videomanuset / leseteksten. Rendres som fullverdig leseversjon når video.embedUrl mangler.
  // Manus-først: når video.embedUrl er null vises modulen som leseversjon, aldri som en tom videomodul.
  video?: ModuleVideo;
  screenText: string;
  reflectionQuestions: string[];
  microExercise: string;
  weeklyGoal: string;
  languageCards: string[]; // Custom small cards for this module
  situationCardId?: string; // Links to a situation card
  depotExports: {
    todayAction: string;
    languageCards: string[];
    situationCardId?: string;
    sundayQuestion: string;
    weeklyGoal: string;
    returnMessage: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  badge?: string; // Startkurs, Gratis, Hovedkurs, Minikurs
  modules: CourseModule[];
}

export interface LanguageCard {
  id: string;
  category: string;
  text: string;
  sourceModule?: string;
}

export interface SituationCard {
  id: string;
  situation: string;
  category: string; // Skjerm, Morgen, Legging, Overgang, Barnet eksploderer, Barnet trekker seg unna, Jeg ropte igjen, etc.
  firstStep: string;
  underTheHood: string;
  immediateAction: string;
  sentenceToSay: string;
  repairAfterward: string;
  isCustom?: boolean;
  contactEmergency?: boolean;
  situationTags?: string[];
}

export interface SundayWorkshop {
  id: string;
  date: string;
  stateCheckIn: string; // Jeg har litt rom, Jeg er sliten, Jeg er nesten helt tom
  whatWasLighter: string; // Ja et lite øyeblikk, Kanskje, Ikke som jeg la merke til, Custom...
  whereWasTooMuch: string[]; // Morgen, Skjerm, Legging, Overganger, Lekser, Skole, Søsken, Min egen reaksjon, Annet
  learning: string;
  nextGoal: string;
  whatToPutDown: string;
  supportNeeded: string;
}

export interface DailyPrompt {
  id: string;
  theme: string;
  validationText: string;
  microAction: string;
  languageCard: {
    text: string;
    category: string;
  };
  reflectionQuestion: string;
}
