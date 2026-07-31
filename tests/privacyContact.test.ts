/* Personvernkontakt og domenegrenser.
 *
 * Bakgrunn: fram til 31. juli 2026 oppga personvernerklæringen
 * `andreas@kontinuum.work` som kontaktpunkt for behandlingsansvarlig, både i
 * kilden og i den live JS-bundelen på adhd-depoet.com. Adressen fungerte, men
 * `.work` er nå et rent redirectdomene som senere skal bli en separat engelsk
 * tjeneste. En norsk personvernkontakt hører ikke hjemme der.
 *
 * VIKTIG SKILLE: testene forbyr IKKE alle .work-adresser.
 * `innlogging@auth.kontinuum.work` er teknisk avsenderadresse for
 * innloggingslenker, med egen SPF, DKIM og DMARC på auth-underdomenet. Den er
 * korrekt og skal beholdes. Det som forbys er de gamle MENNESKELIGE
 * kontaktadressene.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import test from 'node:test';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const les = (rel: string) => readFileSync(join(ROOT, rel), 'utf8');

const PERSONVERN_TSX = les('src/components/PrivacyPolicy.tsx');

/** Gamle menneskelige kontaktadresser. Skal ikke finnes i aktiv kilde. */
const FORBUDTE_KONTAKTADRESSER = [
  'andreas@kontinuum.work',
  'hei@kontinuum.work',
  'kontakt@kontinuum.work',
];

/** Teknisk autentiseringsinfrastruktur. Skal bestå. */
const TILLATT_AUTH_ADRESSE = 'innlogging@auth.kontinuum.work';

test('personvernsiden oppgir norsk kontaktadresse på kontinuum.no', () => {
  assert.match(PERSONVERN_TSX, /andreas@kontinuum\.no/);
});

test('personvernsiden bruker mailto til riktig adresse', () => {
  assert.match(PERSONVERN_TSX, /href="mailto:andreas@kontinuum\.no"/);
});

test('ingen gammel menneskelig kontaktadresse i personvernkilden', () => {
  for (const adresse of FORBUDTE_KONTAKTADRESSER) {
    assert.doesNotMatch(
      PERSONVERN_TSX,
      new RegExp(adresse.replace(/[.@]/g, '\\$&')),
      `PrivacyPolicy.tsx skal ikke oppgi ${adresse}`,
    );
  }
});

test('juridisk innhold er ellers uendret', () => {
  // Behandlingsansvarlig, orgnummer, adresse, rettigheter og svarfrist skal
  // stå akkurat som før. Bare e-postadressen er byttet.
  assert.match(PERSONVERN_TSX, /HOLTEBERG KONTINUUM/);
  assert.match(PERSONVERN_TSX, /837 924 782/);
  assert.match(PERSONVERN_TSX, /Bårågerveien 21, 4641 SØGNE/);
  assert.match(PERSONVERN_TSX, /svar innen 30 dager/);
  assert.match(PERSONVERN_TSX, /innsyn, retting, sletting og utlevering/);
  assert.match(PERSONVERN_TSX, /Datatilsynet/);
  assert.match(PERSONVERN_TSX, /ikke en\s+helsetjeneste/);
});

test('autentiseringsadressen er bevart der den skal være', () => {
  const veiledning = les('docs/lukket-pilot-veiledning.md');
  const invitasjon = les('docs/lukket-pilot-invitasjon.md');
  assert.ok(
    veiledning.includes(TILLATT_AUTH_ADRESSE),
    'pilotveiledningen skal fortsatt oppgi avsenderen for innloggingsmail',
  );
  assert.ok(
    invitasjon.includes(TILLATT_AUTH_ADRESSE),
    'pilotinvitasjonen skal fortsatt oppgi avsenderen for innloggingsmail',
  );
});

test('pilotdokumentasjonen bruker norsk kontaktadresse for tilbakemeldinger', () => {
  const veiledning = les('docs/lukket-pilot-veiledning.md');
  assert.match(veiledning, /andreas@kontinuum\.no/);
  assert.doesNotMatch(veiledning, /hei@kontinuum\.work/);
});

test('personvernerklæringen i docs bruker samme adresse som appen', () => {
  const dok = les('docs/personvernerklæring.md');
  assert.match(dok, /andreas@kontinuum\.no/);
  assert.doesNotMatch(dok, /andreas@kontinuum\.work/);
});

test('adhd-depoet.com er fortsatt kanonisk produksjonsdomene', () => {
  const indexHtml = les('index.html');
  assert.match(indexHtml, /property="og:url" content="https:\/\/adhd-depoet\.com"/);
  assert.match(indexHtml, /property="og:image" content="https:\/\/adhd-depoet\.com\//);
});

test('adhd-depoet.no er ikke tatt i bruk som canonical eller Open Graph', () => {
  const indexHtml = les('index.html');
  assert.doesNotMatch(
    indexHtml,
    /adhd-depoet\.no/,
    'adhd-depoet.no er kjøpt og reservert, men skal ikke brukes ennå. Se docs/DOMAIN_MIGRATION_NO.md',
  );
});

test('migreringsplanen finnes og autoriserer ikke migrering', () => {
  const plan = les('docs/DOMAIN_MIGRATION_NO.md');
  assert.match(plan, /autoriserer ikke migrering, deploy eller DNS-endringer/);
  assert.match(plan, /adhd-depoet\.no/);
});
