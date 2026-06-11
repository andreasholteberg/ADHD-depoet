/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EmailVariant {
  subjects: string[];
  bodies: string[];
}

export interface SmsVariant {
  bodies: string[];
}

export const VARIANT_BANK = {
  dailyEmail: {
    subjects: [
      "Dagens pusterom",
      "En liten ting, hvis du vil",
      "Ett lite sekund i dag",
      "God morgen – ett spørsmål til deg",
      "Hvor er vinduet ditt i dag?",
      "En setning du kan ta med deg"
    ],
    bodies: [
      "God morgen. Først, et lite spørsmål til deg selv: hvor er vinduet ditt i dag – litt rom, sliten, eller nesten tom? Svaret bestemmer resten. Dagens lille ting: [mikrohandling]. Og en setning du kan ta med deg: «[språkkort]». Kom du ikke til det, er det helt greit. Vi er her i morgen.",
      "God morgen. Ingen krav i dag – bare en liten ting, hvis du har rom: [mikrohandling]. Og en setning til lomma: «[språkkort]». Det er alt.",
      "Hei. Du skal ikke prestere i dag. Men hvis det er en dag for én liten ting, er det denne: [mikrohandling]. En setning du kan låne: «[språkkort]». Og glemmer du det, har du ikke mislyktes.",
      "God morgen. Et lite holdepunkt for dagen: [mikrohandling]. Hvis det smeller, kan denne hjelpe: «[språkkort]». Vi er her, uansett hvordan dagen blir."
    ]
  },
  dailySms: {
    bodies: [
      "Depoet: Dagens lille ting – [mikrohandling]. Kom du ikke til det, er det greit. Svar STOPP for å avslutte.",
      "Depoet: I dag, hvis du har rom: [mikrohandling]. Ingen krav. Svar STOPP for å avslutte.",
      "Depoet: En liten ting til dagen – [mikrohandling]. En setning: «[språkkort]». Svar STOPP for å avslutte.",
      "Depoet: [mikrohandling]. Glemmer du det, har du ikke mislyktes. Vi er her i morgen. Svar STOPP for å avslutte."
    ]
  },
  sundayWorkshop: {
    subjects: [
      "Ti minutter, hvis du vil",
      "Det er søndag",
      "Vil du lande uka?"
    ],
    bodies: [
      "Det er søndag. Vil du lande uka? Ti minutter i Søndagsverkstedet: se tilbake uten fasit, og velg én liten ting for uka som kommer. Ingenting å ta igjen.",
      "Søndag. Ti rolige minutter, hvis du vil: hva ble litt lettere, hvor ble det for mye, og én ting du tar med deg videre. Ingen fasit.",
      "Det er søndag. Du trenger ikke oppsummere alt – bare puste, og velge én liten ting for uka. Verkstedet venter når du vil."
    ],
    smsBodies: [
      "Depoet: Det er søndag. Ti minutter til å lande uka, hvis du vil. [lenke] Svar STOPP for å avslutte.",
      "Depoet: Søndag – én liten ting for uka som kommer? [lenke] Svar STOPP for å avslutte."
    ]
  },
  returnWelcome: {
    bodies: [
      "Hei. Vi har ikke holdt regnskap, og du skal ikke ta igjen noe. Verktøykassa di ligger akkurat der du forlot den. Hvis i dag er en dag for én liten ting, er vi her. Hvis ikke, er det også helt greit.",
      "Hei. Det er godt å se deg. Du trenger ikke forklare noe, og det er ingenting å ta igjen. Vi starter akkurat der du er, i dag.",
      "Hei. Hverdagen tar oss alle iblant. Døren her står åpen, verktøyene dine ligger klare, og det finnes ingen vei å ta igjen. Bare et sted å begynne, når du vil."
    ],
    smsBodies: [
      "Depoet: Velkommen tilbake. Du skal ikke ta igjen noe – vi starter der du er, i dag. [lenke]",
      "Depoet: Godt å se deg. Ingenting å ta igjen. Verktøykassa di ligger klar. [lenke]"
    ]
  }
};

/**
 * Replaces placeholders with safe fallbacks if they are empty, as requested under 'Substitusjons-sjekk'.
 */
export function substitutePlaceholders(
  text: string,
  microAction: string | null | undefined,
  languageCardText: string | null | undefined
): string {
  const fallbackAction = "ta en pustepause og legg merke til dine egne skuldre";
  const fallbackCard = "Du trenger ikke yte eller fikse alt i kveld, bare kom som du er.";

  let result = text;
  result = result.replace(/\[mikrohandling\]/g, microAction || fallbackAction);
  result = result.replace(/\[språkkort\]/g, languageCardText || fallbackCard);
  result = result.replace(/\[lenke\]/g, "https://depoet.no/s");

  return result;
}

/**
 * Decides whether to bias or weight towards milder variants based on 'unndragelse' or 'nesten tom' dagsform.
 * "Vekt mot dagsform om mulig. Hvis siste innsjekk var «nesten tom», foretrekk de mildeste variantene (e-post 3, SMS 4)."
 */
export function getDagsformBiasedIndex(
  channel: 'email' | 'sms',
  isNestenTom: boolean,
  stateIndex: number,
  totalCount: number
): number {
  if (isNestenTom) {
    if (channel === 'email') return 2; // index 2 is option 3: "Hei. Du skal ikke prestere i dag..."
    if (channel === 'sms') return 3;   // index 3 is option 4: "[mikrohandling]. Glemmer du det, har du ikke mislyktes..."
  }
  return stateIndex % totalCount;
}
