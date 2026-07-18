/**
 * Dataportabilitet (GDPR art. 20): samler alt Depoet har lagret i denne
 * nettleseren i én lesbar JSON-fil og laster den ned – uten at noe sendes
 * noe sted. Feiler stille med false, slik at UI kan vise en rolig melding.
 */

const EXPORT_KEYS = [
  'depoet_user',
  'depoet_sunday_reports',
  'depoet_reflections',
  'depoet_seen_prompts',
  'depoet_visited_app',
  'depoet_theme',
  'depoet_structured_sync_queue_v1',
] as const;

function readKey(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw; // ren streng (f.eks. depoet_theme)
    }
  } catch {
    return null;
  }
}

export function exportAllData(serverData?: unknown): boolean {
  try {
    const payload = {
      eksportertFra: 'ADHD Depoet',
      eksportertDato: new Date().toISOString(),
      merknad: serverData
        ? 'Dette er alt Depoet fant lokalt i nettleseren din, pluss serverdata hentet fra innlogget konto på eksporttidspunktet.'
        : 'Dette er alt Depoet hadde lagret lokalt i nettleseren din på eksporttidspunktet. Ingenting av dette finnes hos oss.',
      data: Object.fromEntries(EXPORT_KEYS.map((k) => [k, readKey(k)])),
      serverData: serverData ?? null,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `depoet-mine-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}
