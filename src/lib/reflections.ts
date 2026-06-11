export interface ReflectionEntry {
  id: string;
  date: string;
  checkIn: string;
  reflection: string;
}

const REFLECTIONS_KEY = 'depoet_reflections';

/** Leser refleksjoner trygt fra localStorage – korrupt lagring gir tom liste, aldri krasj. */
export function loadReflections(): ReflectionEntry[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(REFLECTIONS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Lagrer refleksjoner – feiler stille (f.eks. fullt lager), innholdet beholdes i minnet. */
export function saveReflections(entries: ReflectionEntry[]): void {
  try {
    localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(entries));
  } catch {
    // Bevisst stille – lagringsfeil skal aldri stoppe brukeren
  }
}
