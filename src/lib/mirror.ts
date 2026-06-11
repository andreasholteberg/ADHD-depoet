import { ReflectionEntry } from './reflections';
import { SundayWorkshop } from '../types';

/**
 * Varsom mestringsspeiling: finner brukerens egne ord fra to forskjellige
 * tidspunkter og legger dem ved siden av hverandre – uten tolkning,
 * uten statistikk og uten vurdering. Vi siterer bare, vi konkluderer aldri.
 *
 * Vises kun når det finnes ekte bevegelse i tid: minst to innslag
 * med minst sju dagers mellomrom. Ellers: ingenting.
 */

export interface MirrorEntry {
  date: Date;
  dateLabel: string;
  text: string;
}

export interface MirrorPair {
  earlier: MirrorEntry;
  later: MirrorEntry;
}

const MIN_GAP_DAYS = 7;
const MIN_TEXT_LENGTH = 8;

/** Tolker refleksjonsdatoer på no-NO-format (dd.mm.yyyy). Ugyldige datoer hoppes over. */
function parseNoDate(value: string): Date | null {
  const parts = value.split('.');
  if (parts.length !== 3) return null;
  const [d, m, y] = parts.map((p) => parseInt(p, 10));
  if (!d || !m || !y) return null;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatLabel(date: Date): string {
  try {
    return date.toLocaleDateString('no-NO');
  } catch {
    return '';
  }
}

export function getMirrorPair(reflections: ReflectionEntry[], sundayReports: SundayWorkshop[]): MirrorPair | null {
  try {
    const entries: MirrorEntry[] = [];

    for (const r of reflections) {
      if (typeof r?.reflection !== 'string' || r.reflection.trim().length < MIN_TEXT_LENGTH) continue;
      const date = parseNoDate(r.date || '');
      if (!date) continue;
      entries.push({ date, dateLabel: formatLabel(date), text: r.reflection.trim() });
    }

    for (const s of sundayReports) {
      if (typeof s?.learning !== 'string' || s.learning.trim().length < MIN_TEXT_LENGTH) continue;
      const date = new Date(s.date);
      if (Number.isNaN(date.getTime())) continue;
      entries.push({ date, dateLabel: formatLabel(date), text: s.learning.trim() });
    }

    if (entries.length < 2) return null;

    entries.sort((a, b) => a.date.getTime() - b.date.getTime());
    const earlier = entries[0];
    const later = entries[entries.length - 1];

    const gapDays = (later.date.getTime() - earlier.date.getTime()) / (1000 * 60 * 60 * 24);
    if (gapDays < MIN_GAP_DAYS) return null;

    return { earlier, later };
  } catch {
    return null;
  }
}
