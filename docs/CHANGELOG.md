# CHANGELOG – DEPOTET

Denne filen skal oppdateres av Codex etter hver arbeidsøkt.

Ikke skriv lange refleksjoner.

Skriv konkret hva som faktisk ble gjort.

## Format

```md
## YYYY-MM-DD – Kort tittel

### Opprettet

- fil

### Endret

- fil

### Fjernet

- fil

### Beslutninger

- kort beslutning

### Ikke gjort

- ting som bevisst ble utsatt

### Tester

- kommando: resultat

### Kjente problemer

- problem eller “Ingen kjente”
```

---

## 2026-04-25 – Initial dokumentstruktur

### Opprettet

* `AGENTS.md`
* `docs/MASTERPLAN.md`
* `docs/CONTENT_SOURCE.md`
* `docs/COPY_BANK.md`
* `docs/ARCHITECTURE.md`
* `docs/DESIGN_SYSTEM.md`
* `docs/GUARDRAILS.md`
* `docs/PHASE_1.md`
* `docs/ACCEPTANCE_CRITERIA.md`
* `docs/CHANGELOG.md`

### Endret

* Ingen appfiler ennå.

### Fjernet

* Ingenting.

### Beslutninger

* Phase 1 begrenses til landingsside, akuttfunksjon og statiske produktsider.
* Innlogging, AI, RAG, Stripe og database utsettes til senere fase.
* “Det smeller nå” skal være globalt synlig og prioriteres høyest.
* `/det-smeller-na` skal være statisk, lett og uavhengig av backend.
* `AGENTS.md` brukes som primær agentinstruks for å unngå kontekstkollaps.
* `CONTENT_SOURCE.md` og `COPY_BANK.md` brukes som autoritativ innholdskilde for synlig tekst.
* `DESIGN_SYSTEM.md` brukes for å hindre generisk SaaS-design.

### Ikke gjort

* Ingen autentisering.
* Ingen database.
* Ingen AI-integrasjon.
* Ingen Stripe-integrasjon.
* Ingen booking.
* Ingen CMS.
* Ingen admin.
* Ingen brukerprofiler.
* Ingen appkode.

### Tester

* Ikke kjørt ennå.

### Kjente problemer

* Prosjektet er ikke initialisert ennå.

## 2026-04-25 – Dokumentaudit før implementasjon

### Opprettet

* Ingen nye filer.

### Endret

* `docs/ARCHITECTURE.md`
* `docs/DESIGN_SYSTEM.md`
* `docs/GUARDRAILS.md`
* `docs/PHASE_1.md`
* `docs/ACCEPTANCE_CRITERIA.md`

### Fjernet

* Ingenting.

### Beslutninger

* Klargjort at fremtidig arkitektur i `docs/ARCHITECTURE.md` ikke skal implementeres i Phase 1.
* Presisert at `/depotet` er presentasjon av kjerneproduktet, ikke av et ferdig abonnement.
* Strammet inn kravene til `/det-smeller-na` ved å forby analytics-scripts, embeds og eksterne fontavhengigheter.
* Presisert at “Få hjelp i kveld” skal peke til `/nodbremsen`.
* Justert innholdsfil-eksempler i `docs/PHASE_1.md` til `content/*` slik at dokumentene er konsistente med `docs/ARCHITECTURE.md`.
* Strammet inn designregler for å redusere risiko for generisk SaaS-uttrykk.

### Ikke gjort

* Ingen appkode.
* Ingen initialisering av Next.js.
* Ingen installasjon av pakker.
* Ingen autentisering, database, AI, Stripe, booking, CMS eller admin.

### Tester

* Ingen kjørt. Dokumentaudit kun.

### Kjente problemer

* Prosjektet er fortsatt ikke initialisert.

## 2026-04-25 – Initialisering av Next.js Phase 1

### Opprettet

* `app/`
* `public/`
* `.gitignore`
* `eslint.config.mjs`
* `next-env.d.ts`
* `next.config.ts`
* `package-lock.json`
* `package.json`
* `postcss.config.mjs`
* `tsconfig.json`

### Endret

* `app/layout.tsx`
* `app/page.tsx`
* `app/globals.css`
* `package.json`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Next.js App Router ble initialisert som et enkelt Phase 1-grunnoppsett.
* Starteren ble generert i en midlertidig mappe først fordi root allerede inneholdt `AGENTS.md` og dokumentfiler.
* Standard Google-fontoppsett fra starteren ble fjernet for å unngå ekstern fontavhengighet.
* Standard demo-innhold og eksterne Next/Vercel-lenker ble erstattet med en nøytral lokal placeholder.
* Prosjektet ble holdt statisk og uten auth, database, AI, Stripe, booking, CMS eller admin.

### Ikke gjort

* Ingen auth.
* Ingen database.
* Ingen AI eller RAG.
* Ingen Stripe eller betalingsflyt.
* Ingen booking.
* Ingen CMS eller admin.
* Ingen produktsider utover teknisk starter-side.

### Tester

* `npm run lint`: passerte.
* `npm run build`: feilet først i sandbox på grunn av Turbopack-portbegrensning.
* `npm run build`: passerte utenfor sandbox.

### Kjente problemer

* `next build` kan feile i denne sandboxen selv når prosjektet er korrekt, fordi Turbopack forsøker en operasjon som blir blokkert av miljøet.

## 2026-04-25 – Justert prosjektstruktur til src

### Opprettet

* `README.md`
* `src/`

### Endret

* `docs/ARCHITECTURE.md`
* `docs/PHASE_1.md`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Prosjektet skal følge toppnivåstrukturen med `AGENTS.md`, `docs/`, `src/`, `public/`, `package.json` og `README.md`.
* Next-appens kode skal ligge under `src/` i stedet for direkte i root.

### Ikke gjort

* Ingen ny produktfunksjonalitet.
* Ingen auth, database, AI, Stripe, booking, CMS eller admin.

### Tester

* Ikke kjørt ennå etter strukturflytting.

### Kjente problemer

* Ingen kjente.

## 2026-04-25 – Final copy audit

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `src/app/(site)/kurs/page.tsx`
* `src/app/(site)/veiledning/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Kjørte en siste norsk copy-audit på alle synlige Phase 1-sider.
* Beholdt de definerte kjerneformuleringene uendret.
* Strammet noen få formuleringer nærmere `docs/CONTENT_SOURCE.md` og `docs/COPY_BANK.md`.
* Lot eksisterende korte placeholders stå der godkjent tekst fortsatt mangler, i stedet for å dikte nye påstander.

### Ikke gjort

* Ingen nye funksjoner.
* Ingen nye sider eller ruter.
* Ingen endringer i arkitektur.
* Ingen Phase 2-funksjonalitet som auth, database, AI, RAG, Stripe, booking, CMS, admin, brukerprofiler eller betalingsflyt.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* Korte placeholders er fortsatt beholdt der godkjent tekst mangler:
  * `src/components/home/GuideSection.tsx`
  * `src/app/(site)/nodbremsen/page.tsx`
  * `src/app/(site)/depotet/page.tsx`
  * `src/app/(site)/kurs/page.tsx`
  * `src/app/(site)/veiledning/page.tsx`
* Ingen Phase 2-funksjonalitet ble implementert i copy-audit.

## 2026-04-25 – Phase 1 frozen

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Markerte Phase 1 som fryst etter avsluttende freeze-review.
* Bekreftet at følgende ruter er fullført i Phase 1:
  * `/`
  * `/det-smeller-na`
  * `/nodbremsen`
  * `/depotet`
  * `/kurs`
  * `/veiledning`
  * `/logg-inn`
* Bekreftet at primær navigasjon peker til eksisterende ruter.
* Bekreftet at `/det-smeller-na` fortsatt er statisk og lett.

### Ikke gjort

* Følgende Phase 2-funksjoner er eksplisitt utsatt:
  * auth
  * database
  * AI
  * RAG
  * Stripe
  * checkout
  * booking
  * CMS
  * admin
  * user profiles
  * dashboard
  * course player
  * email automation

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* Korte placeholders er fortsatt beholdt der godkjent tekst mangler:
  * `src/components/home/GuideSection.tsx`
  * `src/app/(site)/nodbremsen/page.tsx`
  * `src/app/(site)/depotet/page.tsx`
  * `src/app/(site)/kurs/page.tsx`
  * `src/app/(site)/veiledning/page.tsx`
* Kjente begrensninger i Phase 1 er bevisste placeholders for interesseliste, kjøps-CTA og kontakt-CTA uten backend eller skjema.
* Ingen Phase 2-funksjonalitet ble implementert i freeze-review.

## 2026-04-25 – Phase 1 acceptance audit

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `src/app/(site)/logg-inn/page.tsx`
* `src/app/(site)/depotet/page.tsx`
* `src/app/(site)/veiledning/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Kjørte full acceptance-audit mot `docs/ACCEPTANCE_CRITERIA.md`, `docs/PHASE_1.md`, `docs/GUARDRAILS.md`, `docs/DESIGN_SYSTEM.md`, `docs/CONTENT_SOURCE.md`, `docs/COPY_BANK.md` og `docs/ARCHITECTURE.md`.
* Bekreftet at alle Phase 1-ruter finnes: `/`, `/det-smeller-na`, `/nodbremsen`, `/depotet`, `/kurs`, `/veiledning` og `/logg-inn`.
* Bekreftet at global navigasjon peker til eksisterende ruter.
* Bekreftet at `/det-smeller-na` er statisk og lett, uten API, database, auth, AI, Stripe, cookies, bilder, video, loading state eller tung klientlogikk.
* Strammet noen synlige formuleringer i `/logg-inn`, `/depotet` og `/veiledning` nærmere godkjent innholdskilde før endelig godkjenning.

### Ikke gjort

* Ingen nye produktfunksjoner.
* Ingen auth.
* Ingen database.
* Ingen AI eller RAG.
* Ingen Stripe, checkout eller betalingsflyt.
* Ingen booking, skjema eller kalender.
* Ingen CMS eller admin.
* Ingen brukerprofiler.
* Ingen kursavspiller eller dashboard.
* Ingen e-postautomasjon.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* Phase 1 acceptance criteria er oppfylt.
* Fortsatt kjente begrensninger i Phase 1 er bevisste placeholders som interesseliste, kjøps-CTA og kontakt-CTA uten backend eller skjema.
* Ingen Phase 2-funksjonalitet ble implementert i acceptance-audit.

## 2026-04-25 – Fullførte `/logg-inn` som Phase 1-placeholder

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `src/app/(site)/logg-inn/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Strammet inn `/logg-inn` som en kort, rolig placeholder-side i stedet for å ligne en ekte innlogging.
* Beholdt godkjent hovedtekst om at Depotet åpner snart og at innlogging ikke er tilgjengelig ennå.
* La inn CTA tilbake til `/depotet` og sekundær krise-CTA til `/det-smeller-na`.
* Holdt siden helt fri for falsk auth-UI, disabled felter og skjemaelementer.

### Ikke gjort

* Ingen login form.
* Ingen auth.
* Ingen magic link.
* Ingen session-håndtering.
* Ingen database.
* Ingen brukerprofiler.
* Ingen passordfelt.
* Ingen e-postfelt.
* Ingen OAuth-knapper.
* Ingen AI eller RAG.
* Ingen Stripe.
* Ingen CMS.
* Ingen admin.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* Ingen kjente.

## 2026-04-25 – Fullførte `/veiledning` for Phase 1

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `src/app/(site)/veiledning/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Erstattet placeholder på `/veiledning` med en full statisk Phase 1-side.
* Holdt veiledning tydelig sekundær til Depotet med hoved-CTA tilbake til `/depotet`.
* La inn tilgang til `/det-smeller-na` for akutte situasjoner.
* Brukte godkjent copy for 1:1 foreldreveiledning, begrenset familieveiledning og profesjonell veiledning.
* Brukte korte placeholders der eksplisitt godkjent tekst manglet om kontakt/booking og erstatning for annen hjelp.

### Ikke gjort

* Ingen booking.
* Ingen kalender.
* Ingen kontaktskjema-håndtering.
* Ingen betaling.
* Ingen checkout.
* Ingen Stripe.
* Ingen auth.
* Ingen database.
* Ingen AI eller RAG.
* Ingen CMS.
* Ingen admin.
* Ingen brukerprofiler.
* Ingen terapi-flyt.
* Ingen vurderingsflyt.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* `src/app/(site)/veiledning/page.tsx`: “Trenger godkjent tekst fra innholdskilde.” for kontakt-placeholder.
* `src/app/(site)/veiledning/page.tsx`: “Trenger godkjent tekst fra innholdskilde.” for eksplisitt formulering om at veiledning ikke erstatter helsehjelp, akutt hjelp eller behandling.

## 2026-04-25 – Fullførte `/kurs` for Phase 1

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `src/app/(site)/kurs/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Erstattet placeholder på `/kurs` med en full statisk Phase 1-side.
* Presenterte temakurs som avgrensede problemløsere, ikke som komplett kursplattform.
* La inn kurskort for `Skjerm`, `Morgen`, `Legging`, `Skole` og `Sjåførens eget maskineri` med godkjent copy.
* Holdt Depotet visuelt tydelig som neste steg, ikke som ett valg blant mange.
* Lot kurskortene bruke placeholder-CTA uten å opprette nye ruter.

### Ikke gjort

* Ingen kursavspiller.
* Ingen checkout eller betalingsflyt.
* Ingen Stripe.
* Ingen auth.
* Ingen database.
* Ingen AI eller RAG.
* Ingen booking.
* Ingen CMS.
* Ingen admin.
* Ingen brukerprofiler.
* Ingen filtersystem.
* Ingen kompleks kategorinavigasjon.
* Ingen full kursplattform.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* `src/app/(site)/kurs/page.tsx`: “Trenger godkjent tekst fra innholdskilde.” for kurs-placeholder.

## 2026-04-25 – Fullførte `/depotet` for Phase 1

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `src/app/(site)/depotet/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Erstattet placeholder på `/depotet` med en full statisk Phase 1-side.
* Ga `I DAG` sterkest visuell prioritet og holdt `Verktøykassa` tydelig sekundær.
* Lot siden peke naturlig videre til `/det-smeller-na`, `/nodbremsen` og `/kurs`.
* Holdt CTA `Sett meg på interesseliste` som placeholder på samme side.
* La inn `export const dynamic = "force-static"` for å holde ruten statisk.

### Ikke gjort

* Ingen interesseliste-funksjonalitet.
* Ingen skjemahåndtering.
* Ingen auth.
* Ingen database.
* Ingen AI eller RAG.
* Ingen Stripe.
* Ingen checkout.
* Ingen abonnement.
* Ingen booking.
* Ingen CMS.
* Ingen admin.
* Ingen brukerprofiler.
* Ingen innlogget `/app`-funksjonalitet.
* Ingen dashboard.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* `src/app/(site)/depotet/page.tsx`: “Trenger godkjent tekst fra innholdskilde.” for interesseliste-placeholder.

## 2026-04-25 – Fullførte `/nodbremsen` for Phase 1

### Opprettet

* Ingen nye filer opprettet.

### Endret

* `src/app/(site)/nodbremsen/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Erstattet placeholder på `/nodbremsen` med en full statisk Phase 1-side.
* Bygget siden med godkjent copy fra `docs/CONTENT_SOURCE.md` og `docs/COPY_BANK.md`.
* Holdt CTA `Kjøp Nødbremsen` som placeholder på samme side.
* Ledet brukeren videre til `/det-smeller-na` og `/depotet` uten å opprette nye ruter.
* La inn `export const dynamic = "force-static"` for å holde ruten statisk.

### Ikke gjort

* Ingen Stripe.
* Ingen checkout.
* Ingen betalingsflyt.
* Ingen auth.
* Ingen database.
* Ingen AI eller RAG.
* Ingen booking.
* Ingen CMS.
* Ingen admin.
* Ingen brukerprofiler.
* Ingen videospiller.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* `src/app/(site)/nodbremsen/page.tsx`: “Trenger godkjent tekst fra innholdskilde.” for kjøpsplaceholder.

## 2026-04-25 – Stabiliserte Phase 1 etter review

### Opprettet

* `src/app/(site)/nodbremsen/page.tsx`
* `src/app/(site)/depotet/page.tsx`
* `src/app/(site)/kurs/page.tsx`
* `src/app/(site)/veiledning/page.tsx`
* `src/app/(site)/logg-inn/page.tsx`

### Endret

* `src/components/shared/Button.tsx`
* `src/app/(site)/page.tsx`
* `src/components/home/DepotetSection.tsx`
* `src/components/home/GuideSection.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* La inn enkle statiske placeholder-ruter for resterende Phase 1-sider for å unngå brutt navigasjon.
* Holdt placeholder-sidene enkle og bygget kun med godkjent copy fra `docs/CONTENT_SOURCE.md` og `docs/COPY_BANK.md`.
* La inn tydelig `focus-visible`-stil i delt knappkomponent slik at tastaturnavigasjon blir synlig og konsekvent.
* Strammet inn forsidetekst som var for løs eller syntetisk mot godkjent innholdskilde.
* Beholdt `/det-smeller-na` uendret som statisk og lett kriserute.

### Ikke gjort

* Ingen auth, database, AI, RAG, Stripe, booking, CMS eller admin.
* Ingen betalingsflyt.
* Ingen utvidelse av `/det-smeller-na`.
* Ingen ferdig fullversjon av produktsidene ennå, kun stabile placeholder-sider.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* `src/components/home/GuideSection.tsx`: “Trenger godkjent tekst fra innholdskilde.”

## 2026-04-25 – Designsystem teknisk grunnlag

### Opprettet

* `src/components/shared/Button.tsx`
* `src/components/shared/Card.tsx`
* `src/components/shared/Container.tsx`
* `src/components/shared/Section.tsx`

### Endret

* `src/app/globals.css`
* `src/app/layout.tsx`
* `src/app/page.tsx`
* `tsconfig.json`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* La inn globale design tokens fra `docs/DESIGN_SYSTEM.md` i `src/app/globals.css`.
* Etablerte varm bakgrunn, tekstfarger, systemtypografi og en enkel container-/section-base uten generisk SaaS-uttrykk.
* Opprettet gjenbrukbare shared-komponenter for knapp, kort, seksjon og container som grunnlag for videre Phase 1-arbeid.
* Holdt startsiden minimal som teknisk placeholder for å verifisere foundation-laget uten å bygge faktiske produktsider.
* Oppdaterte TypeScript-alias til `@/* -> ./src/*` for å passe prosjektstrukturen med `src/`.

### Ikke gjort

* Ingen global navigasjon ennå.
* Ingen ferdige Phase 1-sider.
* Ingen auth, database, AI, RAG, Stripe, booking, CMS eller admin.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* Ingen kjente.

## 2026-04-25 – Global layout og navigasjon

### Opprettet

* `src/components/layout/CrisisButton.tsx`
* `src/components/layout/Footer.tsx`
* `src/components/layout/Header.tsx`

### Endret

* `src/app/layout.tsx`
* `src/app/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* La inn global header og footer for Phase 1.
* Holdt header-lenkene begrenset til `Depotet`, `Det smeller nå`, `Få hjelp i kveld`, `Depotet` og `Logg inn`, uten dropdown eller stor meny.
* Prioriterte “Det smeller nå” visuelt med egen `CrisisButton`.
* Gjorde mobilnavigasjonen enkel med kriseknappen alltid synlig og øvrige lenker som korte sekundærvalg.

### Ikke gjort

* Ingen ferdige produktsider ennå.
* Ingen auth, database, AI, RAG, Stripe, booking, CMS eller admin.
* Ingen ekstra navigasjonskategorier utover det Phase 1 tillater.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* Ingen kjente.

## 2026-04-25 – Bygget `/det-smeller-na`

### Opprettet

* `src/app/(site)/layout.tsx`
* `src/app/det-smeller-na/page.tsx`

### Endret

* `src/app/layout.tsx`
* `src/app/(site)/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Flyttet vanlig header/footer-layout til `src/app/(site)/layout.tsx` slik at `/det-smeller-na` kan stå uten den vanlige markeds-layouten.
* Bygget `/det-smeller-na` som en egen, minimal kriserute med mørk palett og kun godkjent tekst fra `docs/COPY_BANK.md`.
* La inn `export const dynamic = "force-static"` på akuttruten.
* Holdt akuttsiden fri for bilder, video, teori, ekstra valg og salgsbudskap før reguleringsinstruksjonen.
* Første CTA går til neste steg på samme side, og andre CTA går videre til `/nodbremsen`.

### Ikke gjort

* Ingen API-kall.
* Ingen database.
* Ingen auth.
* Ingen AI eller RAG.
* Ingen Stripe.
* Ingen cookies.
* Ingen bilder eller video.
* Ingen tung klientlogikk.
* Ingen loading state eller suspense for hovedinnholdet.
* Ingen animasjoner.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* `/det-smeller-na` er statisk og har ingen API-, database-, auth-, AI-, bilde- eller videoavhengigheter.

## 2026-04-25 – Bygget forsiden

### Opprettet

* `src/components/home/Hero.tsx`
* `src/components/home/ThreeStepModel.tsx`
* `src/components/home/FirstAidSection.tsx`
* `src/components/home/DepotetSection.tsx`
* `src/components/home/GuideSection.tsx`

### Endret

* `src/app/(site)/page.tsx`
* `docs/CHANGELOG.md`

### Fjernet

* Ingen filer fjernet.

### Beslutninger

* Erstattet teknisk placeholder på `/` med en faktisk Phase 1-forside.
* Bygget forsiden i seksjoner som følger rekkefølgen i `docs/ARCHITECTURE.md` og `docs/PHASE_1.md`.
* Brukte kun godkjent innhold fra `docs/CONTENT_SOURCE.md` og `docs/COPY_BANK.md` for synlig tekst.
* Holdt forsiden kort, varm og operativ uten AI-språk, lang teori eller kursbibliotek-uttrykk.
* Ledet brukeren tydelig mot `Det smeller nå`, `Nødbremsen` og `Depotet`.

### Ikke gjort

* Ingen auth, database, AI, RAG, Stripe, booking, CMS eller admin.
* Ingen ferdige sider for `/nodbremsen`, `/depotet`, `/kurs`, `/veiledning` eller `/logg-inn` ennå.

### Tester

* `npm run lint`: passerte.
* `npm run build`: passerte.

### Kjente problemer

* Ingen kjente.
