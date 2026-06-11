import { DailyPrompt } from '../types';
import { todayIsoDate } from './parentState';

/**
 * Usett-prioritert rotasjon for daglige prompts.
 * - Husker lokalt hvilke prompts brukeren har fått, og foretrekker usette.
 * - Dagens valg låses per dato+fokus, så kortet er stabilt hele dagen.
 * - Når alt er sett: rolig ny runde for det fokuset – ingen melding, ingen telling.
 * - All lagring er try/catch-beskyttet; korrupt lagring gir bare vanlig rotasjon.
 */

const KEY = 'depoet_seen_prompts';
const MAX_SEEN = 500;

interface RotationStore {
  seen: string[];
  today?: { date: string; focus: string; promptId: string };
}

function loadStore(): RotationStore {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      seen: Array.isArray(parsed?.seen) ? parsed.seen.filter((x: unknown) => typeof x === 'string') : [],
      today:
        parsed?.today &&
        typeof parsed.today.date === 'string' &&
        typeof parsed.today.focus === 'string' &&
        typeof parsed.today.promptId === 'string'
          ? parsed.today
          : undefined,
    };
  } catch {
    return { seen: [] };
  }
}

function saveStore(store: RotationStore): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // Lagringsfeil skal aldri stoppe dagens kort
  }
}

export function pickDailyPrompt(focus: string, list: DailyPrompt[]): DailyPrompt {
  const date = todayIsoDate();
  const store = loadStore();

  // Dagens kort er allerede valgt for dette fokuset – hold det stabilt hele dagen
  if (store.today && store.today.date === date && store.today.focus === focus) {
    const locked = list.find((p) => p.id === store.today!.promptId);
    if (locked) return locked;
  }

  const seen = new Set(store.seen);
  let candidates = list.filter((p) => !seen.has(p.id));

  if (candidates.length === 0) {
    // Alt er sett: start rolig på ny runde for akkurat dette fokuset
    const focusIds = new Set(list.map((p) => p.id));
    store.seen = store.seen.filter((id) => !focusIds.has(id));
    candidates = list;
  }

  // Deterministisk valg blant kandidatene (datostyrt, ingen tilfeldighet)
  const day = new Date().getDate();
  const prompt = candidates[day % candidates.length];

  store.today = { date, focus, promptId: prompt.id };
  if (!store.seen.includes(prompt.id)) store.seen.push(prompt.id);
  if (store.seen.length > MAX_SEEN) store.seen = store.seen.slice(-MAX_SEEN);
  saveStore(store);

  return prompt;
}
