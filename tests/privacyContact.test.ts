/* Personvernkontakt — isolert produksjonshotfix.
 *
 * Behandlingsansvarliges menneskelige kontaktadresse er endret fra
 * andreas@kontinuum.work til andreas@kontinuum.no. Adressen fungerte fortsatt,
 * men .work er naa et rent redirectdomene som senere skal bli en separat
 * engelsk tjeneste. En norsk personvernkontakt hoerer ikke hjemme der.
 *
 * VIKTIG SKILLE: testen forbyr ikke alle .work-adresser.
 * innlogging@auth.kontinuum.work er teknisk avsenderadresse for
 * innloggingslenker, med egen SPF, DKIM og DMARC paa auth-underdomenet. Den er
 * korrekt og skal bestaa. Det som forbys er den gamle MENNESKELIGE
 * kontaktadressen.
 *
 * OM «RENDERER»: dette repoet har ingen DOM-testinfrastruktur — verken jsdom
 * eller @testing-library. Aa innfoere det ville vaert en stor
 * avhengighetsendring, og hoerer ikke hjemme i en isolert produksjonshotfix.
 * At komponenten fortsatt bygger og rendrer dekkes derfor av `npm run lint`
 * (tsc --noEmit) og av full `vite build`, i tillegg til de strukturelle
 * kontrollene under.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import test from 'node:test';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const les = (rel: string) => readFileSync(join(ROOT, rel), 'utf8');

const PERSONVERN = les('src/components/PrivacyPolicy.tsx');
const INDEX_HTML = les('index.html');

const NY_ADRESSE = 'andreas@kontinuum.no';
const GAMMEL_ADRESSE = 'andreas@kontinuum.work';
/** Teknisk autentiseringsinfrastruktur. Skal bestaa uendret. */
const AUTH_ADRESSE = 'innlogging@auth.kontinuum.work';

test('personvernsiden oppgir den norske kontaktadressen', () => {
  assert.ok(PERSONVERN.includes(NY_ADRESSE), `mangler ${NY_ADRESSE}`);
});

test('personvernsiden har ingen spor av den gamle adressen', () => {
  assert.ok(!PERSONVERN.includes(GAMMEL_ADRESSE), `${GAMMEL_ADRESSE} finnes fortsatt`);
});

test('mailto peker paa den nye adressen', () => {
  assert.match(PERSONVERN, /href="mailto:andreas@kontinuum\.no"/);
  assert.doesNotMatch(PERSONVERN, /mailto:andreas@kontinuum\.work/);
});

test('adressen staar begge stedene den skal', () => {
  // Ett sted under «Hvem er ansvarlig?» (mailto + synlig tekst) og ett under
  // «Dine rettigheter». Til sammen tre forekomster.
  const antall = PERSONVERN.split(NY_ADRESSE).length - 1;
  assert.equal(antall, 3, `forventet 3 forekomster, fant ${antall}`);
});

test('komponenten er strukturelt intakt', () => {
  // Proxy for «rendrer fortsatt»: eksport, dialogrolle, lukkeknapp og alle
  // seks seksjonsoverskrifter er paa plass. Reell rendering dekkes av
  // typecheck og produksjonsbuild.
  assert.match(PERSONVERN, /export const PrivacyPolicy: React\.FC/);
  assert.match(PERSONVERN, /role="dialog"/);
  assert.match(PERSONVERN, /aria-label="Personvernerklæring"/);
  assert.match(PERSONVERN, /useEscapeClose\(onClose\)/);
  for (const overskrift of [
    'Slik fungerer lagring nå',
    'Hva betyr det for deg?',
    'E-post til innlogging og påminnelser',
    'Supabase, Resend og samtykke',
    'Hvem er ansvarlig?',
    'Dine rettigheter',
    'Hva vi aldri ber om',
  ]) {
    assert.ok(PERSONVERN.includes(overskrift), `mangler seksjon: ${overskrift}`);
  }
});

test('juridisk innhold er uendret', () => {
  assert.match(PERSONVERN, /HOLTEBERG KONTINUUM/);
  assert.match(PERSONVERN, /org\.nr\. 837 924 782/);
  assert.match(PERSONVERN, /Bårågerveien 21, 4641 SØGNE/);
  assert.match(PERSONVERN, /svar innen 30 dager/);
  assert.match(PERSONVERN, /innsyn, retting, sletting og utlevering/);
  assert.match(PERSONVERN, /Datatilsynet/);
  assert.match(PERSONVERN, /ikke en\s+helsetjeneste/);
  assert.match(PERSONVERN, /ingen sporingscookies/);
});

test('produksjonsdomenet er fortsatt adhd-depoet.com', () => {
  // Merk: denne commiten har ingen <link rel="canonical">. Open Graph-URL-en
  // er det kanoniske signalet, og den skal ikke roeres av en hotfix.
  assert.match(INDEX_HTML, /property="og:url" content="https:\/\/adhd-depoet\.com"/);
  assert.match(INDEX_HTML, /property="og:image" content="https:\/\/adhd-depoet\.com\//);
  assert.doesNotMatch(INDEX_HTML, /adhd-depoet\.no/);
});

test('autentiseringsadressen er uendret i relevante kilder', () => {
  const rapport = les('outputs/adhd-depoet-operativ-og-lanseringsstatus-2026-07-18.md');
  assert.ok(rapport.includes(AUTH_ADRESSE), 'avsenderadressen for innlogging skal staa uendret');
  assert.ok(rapport.includes('resend._domainkey.auth.kontinuum.work'));
  assert.ok(rapport.includes('send.auth.kontinuum.work'));
});

test('hotfixen roerer ikke autentiseringskilden', () => {
  // Ingen .work-adresse skal vaere fjernet fra auth-relatert runtimekode.
  const authRedirect = les('src/lib/authRedirect.ts');
  const authCode = les('src/lib/authCode.ts');
  for (const kilde of [authRedirect, authCode]) {
    assert.ok(!kilde.includes(GAMMEL_ADRESSE), 'auth-kilden skal ikke inneholde kontaktadressen i det hele tatt');
  }
});
