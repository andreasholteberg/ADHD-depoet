import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  ACCOUNT_AND_DATA_STATUS,
  COURSE_LAUNCH_STATUS,
  PARKURS_STATUS,
  REMINDER_STATUS,
} from '../src/lib/productCopy';

test('produktstatus beskriver live konto, lagring, eksport og sletting', () => {
  assert.match(ACCOUNT_AND_DATA_STATUS, /Innlogging og konto er tilgjengelig/);
  assert.match(ACCOUNT_AND_DATA_STATUS, /Strukturert praksis kan synkroniseres etter aktivt samtykke/);
  assert.match(ACCOUNT_AND_DATA_STATUS, /Fritekst er lokal som standard/);
  assert.match(ACCOUNT_AND_DATA_STATUS, /eget, aktivt samtykke/);
  assert.match(ACCOUNT_AND_DATA_STATUS, /Eksport og kontosletting er tilgjengelig/);
});

test('kursstatus lover ikke aktiv betaling, men forklarer introduksjonspris og videoinkludering', () => {
  assert.match(COURSE_LAUNCH_STATUS, /lanseres til redusert introduksjonspris når kjøp åpner/);
  assert.match(COURSE_LAUNCH_STATUS, /Videokursene er på vei/);
  assert.match(COURSE_LAUNCH_STATUS, /uten ny betaling/);
  assert.doesNotMatch(COURSE_LAUNCH_STATUS, /kjøp nå|betaling er tilgjengelig/i);
});

test('parkurs og Depoet-minikurs holdes tydelig adskilt', () => {
  assert.match(PARKURS_STATUS, /separat kommende produkt fra Kontinuum/);
  assert.match(PARKURS_STATUS, /«Når dere står forskjellig» forblir et Depoet-minikurs/);
});

test('påminnelsestekst skiller Auth-e-post fra daglige utsendinger', () => {
  assert.match(REMINDER_STATUS, /Innlogging på e-post er tilgjengelig separat i Profil/);
  assert.match(REMINDER_STATUS, /Daglige e-post- og SMS-påminnelser er ikke aktivert ennå/);
});

test('brukervendte produksjonsflater inneholder ikke gammel kommer-senere-copy for konto', () => {
  const files = [
    'src/App.tsx',
    'src/components/LandingPage.tsx',
    'src/components/Onboarding.tsx',
    'src/components/PrivacyPolicy.tsx',
    'src/components/CoursesView.tsx',
  ];
  const source = files.map((file) => readFileSync(file, 'utf8')).join('\n');
  assert.doesNotMatch(source, /Innlogging(?: og skylagring)? kommer senere/i);
  assert.doesNotMatch(source, /Supabase og Resend er lagt inn som kodeklare, planlagte databehandlere/i);
  assert.doesNotMatch(source, /Tidlig forhåndsvisning/);
});
