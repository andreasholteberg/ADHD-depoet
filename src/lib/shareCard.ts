/**
 * Deling av språkkort – kun selve kortteksten med nøktern kontekst.
 * Web Share API der det finnes (mobil), ellers kopiering til utklippstavlen.
 * Ingen sporing, ingen innsamling, ingenting annet enn teksten deles.
 */
export type ShareResult = 'shared' | 'copied' | 'dismissed';

export function buildShareText(cardText: string): string {
  return `Et språkkort fra Depoet: «${cardText}»\nSmå setninger for store øyeblikk.`;
}

export async function shareLanguageCard(cardText: string): Promise<ShareResult> {
  const message = buildShareText(cardText);

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ text: message });
      return 'shared';
    } catch {
      // Brukeren avbrøt delingsdialogen – det er et fullverdig valg, ikke en feil
      return 'dismissed';
    }
  }

  try {
    await navigator.clipboard.writeText(message);
    return 'copied';
  } catch {
    return 'dismissed';
  }
}
