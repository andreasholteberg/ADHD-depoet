/**
 * Hero-teksten på landingssiden.
 *
 * Ligger her fordi den brukes to steder: av LandingPage i React, og av
 * scripts/prerender.ts som skriver den inn i dist/index.html ved bygg.
 * Uten en felles kilde ville de to kunne drive fra hverandre, og den
 * prerendrede teksten ville til slutt lyve om hva siden faktisk sier.
 */

export const HERO = {
  eyebrow: 'ADHD Depoet · bygget på boken Førersetet',
  title: 'Forstå mer av det som skjer',
  lede:
    'Et digitalt øvingsrom for foreldre som vil forstå ADHD og ' +
    'reguleringsvansker bedre – og finne måter å møte barnet og hverdagen ' +
    'på som passer for deres familie.',
  subtle:
    'Ikke en metode med fasit. Et blikk, et språk og en retning – og et sted ' +
    'å komme tilbake til når hverdagen skjer.',
  primaryCta: 'Start gratis',
  primaryHref: '#gratis',
  // Samme ord som knappen i toppmenyen. Én handling bør hete én ting.
  secondaryCta: 'Gå til Depoet-appen',
  // «Akuttkort» er husets eget ord for korttypen, ikke noe en førstegangs-
  // besøkende kjenner. Utenfor appen leses «akutt» som nødhjelp, og det
  // visker ut grensen sikkerhetsbanneret jobber for å trekke. Inne i appen,
  // der «akutt» viser til reell fare og nødnumre, står ordet urørt.
  demoCta: 'Se ett kort for de harde minuttene – uten å registrere noe',
} as const;
