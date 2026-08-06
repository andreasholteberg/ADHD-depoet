# ADHD-depoet — agentregler

Dette repoet følger Kontinuums overordnede arbeidsmåte, men har egne sikkerhetskrav fordi innholdet gjelder foreldre, barn, ADHD, brukerdata og tilgangsstyring.

## Oppdrag

Gjør små, vurderbare og reversible forbedringer som øker nytte, trygghet eller lanseringsklarhet. Ikke bygg funksjoner bare fordi de er teknisk mulige.

## Autoritetskilder

Ved motstrid gjelder:

1. Den konkrete oppgaven fra Andreas.
2. Endelig bokmanus og godkjent faglig grunnlag som oppgaven peker til.
3. `docs/Samsvarsvurdering-Depoet-mot-endelig-bok.md` og relevante `docs/innhold-*.md`.
4. Personvern-, GDPR-, sikkerhets- og auth-dokumentene i `docs/`.
5. Dagens kode, migrasjoner, tester og bygge-/deploydokumentasjon.
6. Eldre planer og rapporter.

Ikke anta at en plan er implementert. Verifiser mot kode og tester.

## Roller

Velg én hovedrolle og oppgi den i rapporten:

- **Produkt og foreldrebehov**
- **Redaksjon og språk**
- **Fag- og sikkerhetskontroll**
- **Frontend og tilgjengelighet**
- **Backend, data og tilgang**
- **Test og publisering**

Ved vesentlige endringer skal ikke samme agent være eneste produsent og eneste godkjenner.

## Arbeidsflyt

1. Les relevante kilder og dagens implementasjon.
2. Oppgi mål, ikke-mål, berørte filer og risiko.
3. Arbeid på egen gren med tematiske commits.
4. Endre autoritativ kilde før speil, kataloger eller genererte data.
5. Kjør relevante tester og bygg.
6. Lever konkret rapport med endrede filer, bevis, usikkerhet og neste beslutning.
7. Stopp før merge, deploy, utsendelse, migrasjon eller publisering.

## Sikkerhetsregler

- Ikke legg inn ekte navn, e-post, fødselsdata, helseopplysninger, refleksjoner eller andre brukerdata i kode, test eller prompt.
- Ikke diagnostiser, lov effekt eller fremstille innholdet som behandling.
- Ikke svekk sikkerhetsbanner, ansvarsavgrensning eller henvisning til akutt hjelp uten eksplisitt faglig og menneskelig godkjenning.
- Ikke endre autentisering, RLS, tilgangsbundles, sletting eller dataeksport uten egen risikoanalyse og tester.
- Ikke kjør Supabase-migrasjoner eller produksjonskommandoer fra en vanlig utviklingsoppgave.
- Ikke publiser kurs, video eller betalt innhold ved å endre katalog/status uten uttrykkelig bestilling.
- Ikke legg til analyse-, sporings- eller AI-tjenester som sender brukerdata til tredjepart uten personvernsvurdering.
- Ikke hevde at en flyt er verifisert uten å oppgi test, miljø og resultat.

## Standardkontroller

Fra repo-roten:

```bash
npm ci
npm run lint
npm test
npm run build
```

Bruk også `npm run test:auth` ved endringer i innlogging eller tilgang og `npm run test:phase2` ved endringer i synkronisering eller fase 2-funksjoner.

## Ferdig betyr

Diffen er avgrenset, faglige og personvernmessige grenser er bevart, relevante tester er dokumentert, ingen produksjonshandling er utført, og Andreas ser tydelig hva som må avgjøres videre.