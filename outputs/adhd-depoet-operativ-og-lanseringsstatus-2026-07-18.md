# ADHD Depoet – operativ status og lanseringsstatus

**Kartleggingsdato:** 18. juli 2026
**Prosjekt:** `C:\Prosjekter\adhd-depoet`
**Produksjonsdomene:** `https://adhd-depoet.com`
**Supabase-prosjekt:** `uipsaeojwjehrbylfgrx`
**Formål:** Beslutningsgrunnlag før endelig teknisk plan, skriftlig introduksjonslansering, videolansering og full kommersiell lansering.

## Mandat, metode og begrensninger

Dette er en skrivebeskyttet statuskartlegging. Det er ikke gjort deploy, SQL, migrasjon, testkjøp, e-postutsending, DNS-endring, Storage-endring eller annen ekstern skrivehandling. Ingen brukerdata, Auth-logger med personopplysninger eller hemmeligheter er lest. Eksisterende lokale kvalitetskommandoer er kjørt mot den urene arbeidsmappen fordi oppdraget uttrykkelig tillot kontroll av eksisterende byggartefakter.

Bevisgrunnlaget er:

- lokal kildekode, Git-historikk, Git-status, dokumentasjon og `.docx`-manus i prosjektet
- lokalt produksjonsbygg og eksisterende tester
- offentlig HTML, HTTP-headere og aktiv JavaScript-bundle fra `adhd-depoet.com`, hentet med cache-omgåelse
- skrivebeskyttet inspeksjon av Cloudflare-dashboardet
- skrivebeskyttet inspeksjon av Supabase-dashboardet og tidligere prosjektavgrenset MCP-verifikasjon i samme arbeidsforløp
- offentlige DNS-oppslag for e-postautentisering

Det skilles konsekvent mellom fem sannhetsnivåer:

1. **Lokal kilde** – det som ligger i arbeidsmappen nå, inkludert ukommitterte filer.
2. **Lokalt bygg** – det som `npm run build` produserer fra den lokale kilden og lokale miljøvariabler.
3. **Git HEAD / origin** – det som er kommittert og ligger på GitHub.
4. **Cloudflare-produksjon** – det en sluttbruker faktisk får fra `adhd-depoet.com`.
5. **Live Supabase** – den faktiske backend-, Auth- og databasestrukturen i prosjekt `uipsaeojwjehrbylfgrx`.

Statusordene brukes i eksakt betydning:

- **PÅ PLASS** – verifisert og tilstrekkelig for den aktuelle leveransen.
- **DELVIS** – reell implementasjon finnes, men er ufullstendig, ikke integrert eller ikke ende-til-ende-verifisert.
- **MANGLER** – nødvendig element finnes ikke i det undersøkte materialet eller miljøet.
- **UKJENT – KREVER KONTROLL** – kan ikke fastslås uten en avgrenset ekstern eller faglig kontroll.
- **BLOKKERER LANSERING** – avviket gjør at den angitte lanseringen ikke bør gjennomføres.

---

# 1. Repository, versjon og kvalitetsstatus

## 1.1 Versjonsmatrise

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Lokal gren er `main` og Git HEAD er identisk med `origin/main` | PÅ PLASS | `git status --branch`, `git rev-parse`, `git ls-remote`; begge peker på `6e02eff` | Den kommitterte baselinjen er entydig | Ingen handling for selve referansen | Ingen |
| Arbeidsmappen har vesentlige ukommitterte endringer | DELVIS | Endret: `package.json`, `src/App.tsx`, `src/lib/emailService.ts`, `src/lib/syncService.ts`. Usporet: `.codex/`, `leveranse-2026-07-17/`, Auth-hjelpere, `supabase/.temp/`, `tests/` | Det viktigste Auth-arbeidet og alle produksjonsmanusene finnes ikke i GitHub-baselinjen | Avgrens, gjennomgå og commit bevisst etter at backendkontrakten er rettet | Teknisk, skriftlig, video, full |
| Remote er `https://github.com/andreasholteberg/ADHD-depoet.git` | PÅ PLASS | `git remote -v` | Kildeplassering er kjent | Ingen | Ingen |
| README beskriver fortsatt appen som uten backend | DELVIS | `README.md` sier «ingen backend», mens lokal kode og live Supabase har Auth/synkgrunnlag | Driftsdokumentasjonen er ikke en pålitelig kilde til nåstatus | Oppdater README først etter at valgt produksjonsarkitektur faktisk er deployet | Teknisk og full |
| Lokal Supabase-migrasjon er ikke samme schema som live | BLOKKERER LANSERING | Repo har bare `202607130001_lansering_v1_schema.sql`; live viser fire nyere migrasjoner `20260716190000`–`20260716190300` med andre tabeller | Kildekontroll kan ikke reprodusere live database, og klienten er bygget mot gammel kontrakt | Hent inn de godkjente live-migrasjonene eller rekonstruer dem, review diff, generer typer og velg én kilde til sannhet | Teknisk, skriftlig betalt, full |
| Live Edge Function finnes ikke i repo, mens lokale functions ikke er live | BLOKKERER LANSERING | Live: bare `delete-account`. Repo: `request-opt-in`, `confirm-opt-in`, `preferences`, `daily-dispatch`, `unsubscribe`; ingen lokal `delete-account` | To-veis drift: produksjon kan ikke reproduseres, og dokumenterte e-postfunksjoner er ikke operative | Bring live function inn i repo; avgjør hvilke lokale functions som skal deployes; test i staging | Teknisk, full |

## 1.2 Lokale kvalitetskontroller

| Kontroll | Resultat | Bevis og tolkning |
|---|---|---|
| Typekontroll/lint | PÅ PLASS | `npm run lint` (`tsc --noEmit`) besto mot nåværende arbeidsmappe |
| Auth-enhetstester | PÅ PLASS | `npm run test:auth`: 5 av 5 tester besto |
| Kurs-smoke | PÅ PLASS | `npx tsx scripts/smoke-courses.ts`: 9 kurs og 32 moduler, bestått |
| Produksjonsbygg | PÅ PLASS | `npm run build` besto med Vite 6.4.3 |
| Bundle-størrelse | DELVIS | Lokal hovedbundle er 936,93 kB / 267,91 kB gzip; Vite varsler over 500 kB |
| Hemmelighetsskann | PÅ PLASS | Ingen treff på Supabase PAT (`sbp_`), Resend (`re_`), private nøkler, JWT-lignende verdier eller service-role-tildelinger i repo eller `dist`, ekskludert `.git`/`node_modules` |
| Full E2E | MANGLER | Ingen nettleserbasert test for registrering, Auth, synk, sletting, tilgang eller kjøp |

Bundle-størrelsen stopper ikke en kontrollert pilot, men bør splittes før bred lansering: kursdata, store innholdsbanker og sekundære flater er naturlige kandidater til lazy loading. Viktigere enn ytelsen er at alt betalt kursinnhold nå ligger i offentlig klientkode; dette er uforenlig med reell innholdsgating.

## 1.3 Bygg, miljø og deploykonfigurasjon

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| `.env.example` inneholder bare tomme klientvariabler og ingen hemmeligheter | PÅ PLASS | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_EMAIL_ENABLED=false` | Fornuftig klientkontrakt | Dokumenter hvilke miljøer som setter hva | Ingen |
| `.env*`, `dist`, bygg og logger ignoreres | PÅ PLASS | `.gitignore` | Reduserer risiko for hemmeligheter og artefaktstøy | Behold; ikke legg serverhemmeligheter i Vite-variabler | Ingen |
| Lokalt bygg er laget uten Supabase-variabler | DELVIS | Lokal bundle inneholder Auth-UI og `/auth/callback`, men ingen Supabase-URL/prosjektreferanse | Koden kan bygges, men Auth er bevisst deaktivert i dette bygget | Bygg et kontrollert preview med klientvariabler etter schemajustering | Teknisk |
| Ingen GitHub Actions eller sporbart Cloudflare-deployoppsett i repo | MANGLER | Ingen prosjektworkflow eller Wrangler/Pages-konfigurasjon som beskriver faktisk produksjon | Deploy er manuelt og ikke reproduserbart | Velg Pages eller Worker Assets, dokumenter og automatiser én pipeline | Teknisk og full |

---

# 2. Faktisk produksjon og Cloudflare

## 2.1 Offentlig produksjonsbevis

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Apex svarer over HTTPS | PÅ PLASS | `https://adhd-depoet.com` returnerer HTTP 200 | Domenet er tilgjengelig | Ingen for tilgjengeligheten | Ingen |
| `www` videresender permanent til apex | PÅ PLASS | `https://www.adhd-depoet.com/...` returnerer HTTP 301 til samme sti/spørring på apex | Kanonisk domene oppfører seg ønsket offentlig | Behold og dokumenter eier av redirecten | Ingen |
| SPA-fallback virker | PÅ PLASS | `/auth/callback` og `/personvern` returnerer app-HTML med HTTP 200 | Direkte navigasjon krasjer ikke i kantlaget | E2E-verifiser etter ny deploy | Ingen |
| Aktiv produksjonsbundle er gammel | BLOKKERER LANSERING | HTML laster `/assets/index-DXVpyt7u.js`, 648 025 bytes, SHA-256 `e43f...076a` | Sluttbrukere får ikke det lokale Auth- og kodefeltarbeidet | Etabler valgt deploykilde og deploy først etter backend- og juridisk gate | Teknisk, skriftlig betalt, full |
| Produksjonsbundle mangler Supabase | BLOKKERER LANSERING | Ingen Supabase-URL, ingen `uipsaeojwjehrbylfgrx`, ingen Auth callback-streng | Produksjonsappen kan ikke opprette sesjon eller bruke live data | Sett `VITE_SUPABASE_URL` og anon/publishable key som klientvariabler i valgt deploymiljø; verifiser aktiv bundle | Teknisk, skriftlig betalt, full |
| Produksjon viser eksplisitt «Innlogging og skylagring kommer senere» | BLOKKERER LANSERING | Teksten finnes i aktiv bundle | Produktet kan ikke markedsføres som konto-/medlemsprodukt | Deploy og E2E-test reell konto/synk, eller selg ærlig som lokal leseversjon uten medlemsløfte | Skriftlig betalt og full |
| Produksjon har alle ni kurstitler, men gammel funksjonalitet | DELVIS | Titlene finnes i aktiv bundle | Innhold er offentlig distribuert, men operativ logikk er eldre | Avklar om offentlig tilgang er ønsket før prislansering | Skriftlig betalt |
| Ingen Supabase/Bunny-kall eller tredjepartsskript i aktiv bundle | PÅ PLASS | Offentlig bundle-inspeksjon | Dagens lokale preview er enkelt og personvernlett | Status må vurderes på nytt når Auth/video aktiveres | Ingen for gratis preview |

## 2.2 Cloudflare-arkitektur og deploygap

Cloudflare viser tre parallelle leveranseobjekter:

- Worker **`adhd-depoet`**, manuelt deployet med Wrangler for 34 dager siden, med routes `adhd-depoet.com/*` og `www.adhd-depoet.com/*` og en Assets-binding.
- Eldre Worker **`depotet`**, med begge domenene registrert som custom domains.
- Pages-prosjekt **`adhd-depoet-app`**, production branch `main`, siste produksjonsdeploy fra commit `cf314e1` («Lansering v1 env-gated medlemsplattform»), preview `https://2ea8e424.adhd-depoet-app.pages.dev`, uten Git-tilkobling og uten custom domain.

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Apex er ikke koblet til Pages-prosjektet | BLOKKERER LANSERING | Pages → Custom domains er tom | Pages-deployen er ikke det publikum ser | Velg eksplisitt Pages eller Worker Assets som produksjonseier | Teknisk og full |
| To Workers har overlappende domeneansvar | DELVIS | Ny Worker har wildcard routes; eldre Worker har custom domains | Offentlig atferd virker, men rollback, feilsøking og eierskap er uklart | Dokumenter ruteprioritet og avvikle gammel eier kontrollert etter verifisering | Teknisk og full |
| Pages har ingen Git-tilkobling | DELVIS | Settings viser «Connect» | Produksjonsdeploy er manuell og kan drive fra Git HEAD | Koble Git eller etabler eksplisitt, dokumentert manuell releaseprosess | Teknisk |
| Pages mangler `VITE_*`-variabler | BLOKKERER LANSERING | Variables and secrets er tom | Selv Pages-versjonen vil bygge uten backend | Sett bare offentlige klientvariabler etter schema/Auth-gate | Teknisk, skriftlig betalt |
| Worker-logger og traces er deaktivert | DELVIS | Cloudflare-observability viser disabled | Feil i Auth/callback/routing blir vanskelig å diagnostisere | Aktiver personvernbevisst minimumsobservability før bred trafikk | Full |

## 2.3 Headere, cache, routing og video

- Apex HTML ble levert med `CF-Cache-Status: HIT` og `Cache-Control: public,max-age=0,must-revalidate`. Dette er akseptabelt for HTML hvis hash-navngitte assets får lang cache, men asset-policy må verifiseres ved valgt pipeline.
- Følgende sikkerhetsheadere ble ikke observert: Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, COOP og CORP.
- Ingen CSP betyr at Bunny-hostene ikke trenger allow-list i dag, men en sikker videoimplementasjon må definere minst `frame-src`, `img-src`, `media-src` og `connect-src` konkret.
- Kildekartreferanse ble ikke funnet i aktiv bundle. Det er positivt for eksponering, men erstatter ikke en eksplisitt releasepolicy.

**Vurdering:** Header-manglene er **DELVIS** for et gratis statisk preview, men **BLOKKERER LANSERING** av en konto-, betalings- og videoaktivert fullversjon til en minimumspolicy er definert og testet.

---

# 3. Supabase, data og operativ backend

## 3.1 Prosjektidentitet og MCP

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Live prosjekt er `Depoet \| Kontinuum`, ref `uipsaeojwjehrbylfgrx` | PÅ PLASS | Supabase-dashboard og tidligere prosjektavgrenset MCP-kontroll | Riktig backend er identifisert | Ingen | Ingen |
| Prosjekt-URL er `https://uipsaeojwjehrbylfgrx.supabase.co` | PÅ PLASS | Tidligere MCP-verifikasjon i samme oppsett | Klientens forventede URL er entydig | Sett som offentlig deployvariabel når klart | Teknisk |
| Prosjektlokal MCP-konfig er avgrenset og uten account-feature | PÅ PLASS | `.codex/config.toml`: `project_ref=...`, features database/debugging/development/functions/storage/branching/docs, OAuth og write approvals | Tilgangsmodellen i fil følger minste prosjektomfang | Behold; ikke legg til `account` | Ingen |
| MCP er ikke eksponert i denne aktive Codex-runtime | UKJENT – KREVER KONTROLL | Denne sesjonen returnerte «unknown MCP server», mens tidligere kontroll etter OAuth besto | Kan være omstarts-/sesjonsbinding, ikke prosjektfeil | Kontroller etter full Codex-restart før neste MCP-avhengige arbeidsrunde | Teknisk arbeid, ikke offentlig app |

## 3.2 Live schema og RLS

Live database viser 13 tabeller:

`account_deletion_requests`, `course_entitlements`, `course_progress`, `depot_entitlements`, `device_imports`, `observation_notes`, `observations`, `practice_cycles`, `practices`, `profiles`, `saved_language_cards`, `sunday_decisions`, `sunday_notes`.

Alle 13 viser aktiv RLS. Synlige policyer er avgrenset til egen bruker for select og, der de finnes, insert/update/delete. Flere arbeidsflyttabeller har bare select-policy; det er forenlig med at skriving skal skje gjennom kontrollerte `SECURITY DEFINER`-RPC-er, men funksjonsdefinisjonene er ikke gjennomgått i denne runden.

| Område | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| RLS er aktiv på alle live tabeller | PÅ PLASS | Supabase Policies-siden | God minimumsbarriere | Verifiser policysemantikk med testbrukere | Full |
| Profiler, kursprogresjon, språkbank og Depoet-domene finnes live | DELVIS | Tabellnavn og fire live migrasjonsnavn | Backendmodellen er betydelig utviklet | Synk klienten til live kontrakt og legg migrasjoner i repo | Teknisk, skriftlig betalt, full |
| Entitlement-tabeller finnes | DELVIS | `course_entitlements`, `depot_entitlements` | Datamodell for tilgang er påbegynt | Verifiser kolonner, tilstander, utløp, kilde og RPC-kontrakter; koble til UI og betaling | Skriftlig betalt, full |
| Grace/read-only/frys etter utløp | UKJENT – KREVER KONTROLL | Planen beskriver prinsippet; live tabell-/funksjonsnavn indikerer tilgangstilstand, men ingen definisjon eller E2E er kontrollert | Kan ikke love at egne ord forblir lesbare etter utløp | Les migrasjoner/funksjoner, lag tilstandsmatrise og E2E-test aktiv/grace/utløpt/slettet | Skriftlig betalt og full |
| Kontolåsing under sletting | UKJENT – KREVER KONTROLL | `account_deletion_requests` og RPC-navn finnes, men klienten bruker annen slettekontrakt | Risiko for fortsatt skriving eller uklar brukerstatus under sletting | Verifiser `request/cancel/current_account_is_active` og tilgangspolicyer | Full |

## 3.3 Klient–backend-kontrakten

Dette er det mest kritiske tekniske funnet.

Den lokale klienten skriver og leser tabellene `saved_cards`, `progress`, `opt_ins`, `reflections` og `sunday_reports` og kaller RPC `delete_current_user_data`. Ingen av disse tabellene finnes i den observerte live listen. Live bruker blant annet `saved_language_cards`, `course_progress`, `observation_notes`, `sunday_notes` og har en Edge Function `delete-account`.

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Auth-klienten kan opprette Supabase-sesjon lokalt når env finnes | DELVIS | `supabaseClient.ts`, `syncService.ts`, Auth-tester | Sesjonsgrunnlaget finnes | E2E mot live Auth etter OTP-retting | Teknisk |
| Synk bruker gammel tabellkontrakt | BLOKKERER LANSERING | `syncService.ts` mot live tabelliste | Innlogging kan lykkes mens all viktig synk feiler | Skriv klienten mot live RPC-/tabellkontrakt; generer typer; test tom/eksisterende konto og to enheter | Teknisk, skriftlig betalt, full |
| Lokal-first fallback finnes | PÅ PLASS | `AppStateContext`, `localStorage`, trygge parse-hjelpere | Appen er robust som lokalt én-enhetsverktøy | Tydeliggjør begrensning og importer senere | Gratis skriftlig preview kan gå uten backend |
| Offline kø med idempotent replay | MANGLER | Ingen klientkø funnet | Midlertidige nettverksfeil kan gi uavklart synk | Design kø/versjonering eller avgrens v1 til eksplisitt import | Full |
| Live `device_imports`/`local_import` finnes, men brukes ikke i klient | DELVIS | Live migrasjonsnavn/tabell; ingen klientkall | Importarkitektur kan finnes server-side uten brukerflyt | Dokumenter RPC, koble én eksplisitt førstegangsimport, test idempotens | Teknisk og full |
| Separat fritekstsamtykke finnes i UI | PÅ PLASS | Lokal kilde har `syncConsent` og `freeTextSyncConsent` med versjon/tidspunkt | Riktig produktprinsipp | Verifiser at live import/RPC faktisk respekterer samtykket | Full |
| Fritekst-synk er ikke operativ | BLOKKERER LANSERING | Lokal klient skriver til tabeller som ikke finnes live | Samtykketekst alene gir ikke trygg funksjon hvis skyfritekst loves | Hold fritekst lokalt i første lansering eller fullfør DPIA/kontrakt/E2E | Full |
| Lokal eksport fungerer etter kodeinspeksjon | DELVIS | `dataExport.ts` eksporterer seks localStorage-nøkler til JSON | Brukeren kan ta med lokale data | Nettleser-E2E og tilgjengelighetskontroll mangler | Full |
| Servereksport bruker gammel schema | BLOKKERER LANSERING | `exportServerData()` spør gamle tabeller | Rettighetsløftet om utlevering kan feile hvis konto tilbys | Bygg servereksport mot live kontrakt og test kompletthet | Teknisk/full |
| Lokal sletting fjerner kjente nøkler | DELVIS | `resetAllData()` | Lokal kontroll er reell | Test at alle nåværende/fremtidige nøkler omfattes | Full |
| Serversletting er koblet feil | BLOKKERER LANSERING | UI kaller gammel RPC; live har `delete-account` | «Slett alt» kan stoppe før lokal sletting eller ikke slette konto korrekt | Koble live sletteflyt, karantene/lås, bekreftelse og revisjonsbevis uten PII | Teknisk og full |

## 3.4 Functions, Cron, Vault, Storage og rådgivere

- **Edge Functions:** live har bare `delete-account`. Lokale e-postfunksjoner er ikke deployet. Status: **DELVIS**.
- **Cron:** `pg_cron` ble observert som ikke aktivert. Ingen tidsplaner er dokumentert live. Status: **MANGLER** for daglig/søndagsmotor.
- **Vault/secrets for functions:** ikke verifisert og ingen secrets ble lest. Status: **UKJENT – KREVER KONTROLL**.
- **Storage:** ingen bøtter. Det er greit for dagens tekstprodukt, men dokumenterer at video ikke ligger i Supabase. Status: **PÅ PLASS** som tomt avgrenset område, ikke en videoløsning.
- **Security Advisor:** 0 errors, 16 warnings, 0 info. Varslene gjelder at innloggede brukere kan kjøre flere `SECURITY DEFINER`-funksjoner, blant annet tilgang, praksis, import, observasjoner og kontosletting. Dette kan være tilsiktet API-design, men krever funksjon-for-funksjon review av `search_path`, inputvalidering, eierskap og eksplisitte grants. Status: **DELVIS** og blokkerer full lansering inntil review.
- **Performance Advisor:** 0 errors, 0 warnings, 15 info-forslag. Dette er ikke en lanseringsblokker før lasttest, men må inngå i produksjonsherding.
- **Logger:** ikke lest for å unngå personopplysninger. Feilrate, Auth-feil og funksjonsfeil er derfor **UKJENT – KREVER KONTROLL** gjennom en avtalt, sanitert loggrunde.

---

# 4. Auth og e-post

## 4.1 Klientkode

Den ukommitterte lokale kilden har en gjennomtenkt dobbel Auth-flyt:

- produksjonscallback er hardkodet til `https://adhd-depoet.com/auth/callback`
- lokal utvikling bruker aktuell lokal origin og samme callback-sti
- `signInWithOtp` sender `emailRedirectTo`
- manuell kode normaliseres til seks numeriske tegn
- feltet bruker `inputMode="numeric"` og `autoComplete="one-time-code"`
- e-postadressen beholdes i state etter utsending
- verifisering kaller `verifyOtp({ email, token, type: 'email' })`
- feiltekster dekker ugyldig/utløpt kode, rate limit, manglende sesjon og nettverk

Enhetstestene bekrefter kodekontrakten, men ingen av delene er deployet.

## 4.2 Live Auth-konfigurasjon

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Site URL er apex | PÅ PLASS | Supabase Auth URL Configuration: `https://adhd-depoet.com` | Riktig kanonisk produksjonsdomene | Ingen | Ingen |
| Redirect-listen er eksakt | PÅ PLASS | Bare `https://adhd-depoet.com/auth/callback` og `http://localhost:3000/auth/callback`; ingen wildcard/www | God minste tillatelse | Behold, E2E begge miljøer | Teknisk |
| Magic Link-mal har både token og lenke | DELVIS | Live mal inneholder `{{ .Token }}` og `{{ .ConfirmationURL }}` | Begge flyter kan prinsipielt sendes | Rett språk og verifiser rendering | Teknisk |
| Live OTP-lengde er 8 | BLOKKERER LANSERING | Supabase Email Provider viser `Email OTP length: 8` | Lokal UI godtar nøyaktig seks; fersk kode vil bli avvist før API-kall | Sett og GET-verifiser 6, eller endre hele produktbeslutningen og UI/mal samlet | Teknisk, skriftlig betalt, full |
| Malen sier «Bruk denne sekssifrede koden» | BLOKKERER LANSERING | Live Auth-mal sammenholdt med 8-sifferstatus | E-posten lover feil kodeformat | Bruk avtalt «Bruk denne engangskoden» og behold begge templatevariabler | Teknisk |
| E-postemnet er fortsatt «Your sign-in link» | DELVIS | Live template subject | Norsk produkt får uferdig Auth-opplevelse | Beslutt og konfigurer norsk emne i egen kontrollert runde | Skriftlig/full |
| OTP-utløp er 3600 sekunder | DELVIS | Supabase Email Provider | Operativt, men én time kan være lengre enn «kort tid» i malen antyder | Gjør eksplisitt sikkerhets-/brukervennlighetsvalg og samstem tekst | Full |
| Produksjon har ingen Auth-klient | BLOKKERER LANSERING | Aktiv bundle mangler Supabase og callback | Selv korrekt backend kan ikke brukes | Deploy først etter backendkontrakt er rettet | Teknisk/full |

## 4.3 SMTP og DNS

Live Supabase SMTP er verifisert i dashboardet som:

- avsender: `innlogging@auth.kontinuum.work`
- avsendernavn: `ADHD Depoet fra Kontinuum`
- host: `smtp.resend.com`
- port: `465`
- bruker: `resend`
- passord lagret og maskert; hemmeligheten er ikke lest

Offentlig DNS viser:

- DKIM TXT på `resend._domainkey.auth.kontinuum.work`
- MX og SPF TXT på `send.auth.kontinuum.work`
- ingen DMARC-post på `_dmarc.auth.kontinuum.work` eller `_dmarc.kontinuum.work`

| Funn | Status | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|
| Resend SMTP er konfigurert i Supabase | PÅ PLASS | Auth er konfigurert for å sende via eget underdomene | Send én kontrollert Auth-test først etter klientdeploy og tokenopprydding | Teknisk E2E |
| SPF/DKIM DNS finnes | DELVIS | Nødvendige poster er publisert | Bekreft `PASS` i en ny meldings «Vis original» | Full e-postleveranse |
| DMARC mangler | DELVIS | Ingen domene-policy/rapportering observert | Start med faglig valgt policy etter leveransetest; ikke endre før resultater er kjent | Full/skalert e-post, ikke lokal pilot |
| Reell levering, kode og Magic Link er ikke testet separat | BLOKKERER LANSERING | Ingen utsending tillatt i denne kartleggingen | Auth kan ikke regnes som operativ | Etter deploy: fersk e-post kun kode, deretter separat fersk e-post kun lenke; kontroller sesjon, apex og originalheader | Teknisk, skriftlig betalt, full |
| Spamplassering og lenkeskanning | UKJENT – KREVER KONTROLL | Ingen fersk Gmail-test | Kan påvirke konvertering eller konsumere lenker | Kontroller først med separate meldinger og Auth-logger hvis `otp_expired` oppstår | Full |

---

# 5. Betaling, tilgang og medlemslogikk

## 5.1 Hva som faktisk finnes

Det finnes ingen Stripe-avhengighet, Stripe-SDK, produkt-/price-ID, Checkout-rute, Customer Portal, webhook, kvitteringsflyt, refusjonsflyt eller kjøps-UI i kildekoden. Det finnes heller ingen deployet betalingsfunksjon i den observerte Supabase-listen.

Det som finnes er:

- live tabeller for `course_entitlements` og `depot_entitlements`
- funksjonsnavn som indikerer konto- og tilgangstilstand
- en detaljert produktplan i `docs/plan-videreutvikling.md`
- alle kursdata offentlig i klientbundlen og alle kurs åpne i UI

## 5.2 Plan er ikke produkt

Dokumentert plan – ikke en aktiv pris eller et salgbart tilbud – angir:

- gratislaget: 0 kr
- hovedprogram/startkurs som første kjøp: 990–1190 kr
- pakke med hovedprogram + tre måneder Depoet+: 1190–1390 kr
- Depoet+ planlagt lanseringsnivå: 99 kr/mnd eller 790 kr/år, senere mål 149/1190 når e-post og synk er live

Disse tallene må ikke publiseres som gjeldende før Andreas har bekreftet SKU-er, nøyaktig pris, MVA-håndtering, inkludert tilgang og fornyelsesmodell.

| Funn | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Produktprinsippet «kurs som inngang, Depoet som konsistensmotor» er definert | PÅ PLASS | `docs/plan-videreutvikling.md` | Strategien har en sterk og sammenhengende produktlogikk | Lås eksakt v1-tilbud | Ingen for planarbeid |
| Eksakt lanseringspris og SKU-er | UKJENT – KREVER KONTROLL | Bare intervaller/alternativer i plan | Salgstekst og betalingsoppsett kan ikke ferdigstilles | Beslutt én skriftlig launch-SKU og evt. én medlems-SKU | Skriftlig betalt |
| Stripe-modus og konto | MANGLER | Ingen kode eller dashboardbevis | Ingen betaling kan tas imot | Opprett test/production-oppsett med minste secrets og DPA | Skriftlig betalt/full |
| Checkout og Customer Portal | MANGLER | Ingen implementasjon | Ingen kjøp, kvittering, avbestilling eller betalingsmetodeendring | Hosted Checkout/Portal, aldri eget kortskjema | Skriftlig betalt/full |
| Webhook → entitlement | MANGLER | Ingen function/webhook i live listen | Betaling kan ikke gi eller fjerne tilgang pålitelig | Signert, idempotent webhook og tilstandsmaskin | Skriftlig betalt/full |
| UI-gating | MANGLER | `CoursesView` åpner alle kurs | Betalt innhold er gratis tilgjengelig | Flytt betalt innhold ut av offentlig bundle og hent etter tilgangssjekk | Skriftlig betalt/full |
| Bunny-gating | MANGLER | Ingen Bunny IDs eller tokenbeskyttelse | Fremtidige video-URL-er kan deles hvis de legges rett i bundle | Signerte eller tilgangskontrollerte embeds | Video/full |
| Kjøp → aktiv tilgang | UKJENT – KREVER KONTROLL | Live entitlements finnes, men ingen betalingskobling/E2E | Kan ikke love umiddelbar tilgang | Test kjøp, duplikat webhook, forsinkelse, feil og replay i testmodus | Skriftlig betalt/full |
| Refusjon, utløp og grace | MANGLER | Bare produktprinsipp dokumentert; ingen verifisert flyt | Risiko for feil tilgang og ulovlig/uklar kundehåndtering | Definer overgangstabell og koble refund/cancel/expiry/grace/read-only | Skriftlig betalt/full |
| Kvittering og support | MANGLER | Ingen kjøpskommunikasjon/supportflow | Kjøperen mangler forventningsstyring og hjelp | Kvittering, tilgangsbeskjed, kontaktkanal og svartid | Skriftlig betalt/full |
| Kontinuum-avhengigheter | DELVIS | Juridisk enhet og avsender er Kontinuum; ingen egen operativ matrise | Ansvar er synlig, men systemeierskap og support er ikke samlet | Dokumenter Kontinuum som selger/behandlingsansvarlig og Depoet som produkt | Skriftlig/full |

**Konklusjon:** Betalt lansering er **BLOKKERER LANSERING**. En gratis, ærlig og lokal skriftlig pilot kan gjennomføres tidligere, men må ikke beskrives som permanent medlemskap, synkronisert konto eller kjøpt tilgang.

---

# 6. Fullstendig kursinventar

## 6.1 Felles struktur og kvalitet

Kildekoden inneholder 9 kurs og 32 moduler. Hver modul har:

- `video.status = script-ready`, provider `bunny` og unik `videoKey` lik modul-id
- en fullverdig `videoText` som rendres som leseversjon når video mangler
- skjermtekst, 4–6 refleksjonsspørsmål, mikroøvelse, ukesmål, språkkort og `depotExports`
- ingen Bunny library/video/embed/thumbnail/duration/transcript

Kildens korte lese-/videotekster er om lag 9 891 ord totalt, 76–723 ord per modul. De ni produksjonsmanusene i `leveranse-2026-07-17/` dekker de samme 32 modulene og er om lag 23 092 ord totalt. Manusene er altså utvidet i forhold til teksten som nå ligger i appen. Hele `leveranse-2026-07-17/` er usporet og finnes ikke på GitHub.

UI-et gir fremdrift per kurs og kan eksportere språkkort/ukesmål til Depoet. Kursrefleksjonene i selve modulleseren lever derimot bare i React-state og forsvinner når modulen avmonteres eller siden lastes på nytt. Det finnes ingen nedlastbare arbeidsark, utskriftsflate eller lydversjon.

## 6.2 Kurs for kurs

| Kurs | Målgruppe og dokumentert løfte | Moduler | Skriftlig innhold | Øvelse/ark | Video | Progress/Depoet | Entitlement/pris | Skriftlig beredskap | Videoberedskap | Viktigste gap |
|---|---|---:|---|---|---|---|---|---|---|---|
| **Kapasitet før vilje** – Gratis inngang | Foreldre som trenger et første skifte fra vilje til kapasitet og mindre skam | 3 | Komplett i kilde og produksjonsmanus (ca. 1 942 manusord) | 4–5 refleksjoner/modul, mikroøvelse, mål og kort; ingen arbeidsark | 3 manusklare; 0 integrert | Lokal fremdrift og eksport | Merket gratis; ingen server-gate | DELVIS | MANGLER | Gjør språkvask/deploy og bestem om alle tre er permanent gratis |
| **Regulering før retning** – Anbefalt startkurs | Foreldre som vil regulere egen alarm, låne bremser og reparere | 5 | Komplett i kilde og manus (ca. 2 858 ord) | 5–6 refleksjoner, mikroøvelse, mål/kort | 5 manusklare; 0 integrert | Lokal fremdrift/eksport | Ingen faktisk pris/gate | DELVIS | MANGLER | Innholdet er klart; avklar salgspakke, deploy og QA |
| **Førersetet: Øvingsprogrammet** – Hovedprogram | Bokens samlede reise fra blikk og egen regulering til struktur, reparasjon, system og lang sikt | 8 | Komplett i kilde og manus (ca. 6 656 ord) | 5 refleksjoner/modul, mikroøvelse, mål/kort | 8 manusklare; 0 integrert | Lokal fremdrift/eksport; tydelig ryggrad i innhold | Bare planlagt prisintervall; ingen gate | DELVIS | MANGLER | Innholdet er klart, men ikke salgbart; flytt betalt innhold ut av bundle |
| **Skjerm uten krig** – Minikurs | Foreldre som trenger overgangsstøtte uten skjermmoral | 2 | Komplett i kilde og manus (ca. 1 336 ord) | 5 refleksjoner, øvelse, mål/kort | 2 manusklare; 0 integrert | Lokal fremdrift/eksport | Ingen gate/pris | DELVIS | MANGLER | Innholdet er klart; avklar pakking, deploy og QA |
| **Når det smeller: V.A.R.M. og reparasjon** – Minikurs | Foreldre i akutte krasj og reparasjon etterpå | 2 | Komplett i kilde og manus (ca. 1 460 ord) | 4–5 refleksjoner, øvelse, mål/kort | 2 manusklare; 0 integrert | Lokal fremdrift/eksport og kobling til akuttlag | Ingen gate/pris | DELVIS | MANGLER | Innholdet er klart; definer gratis sikkerhetsgrense og gjennomfør sensitiv QA |
| **Legging, morgen og overganger** – Minikurs | Foreldre i dagens mest friksjonsfylte overganger | 3 | Komplett i kilde og manus (ca. 1 565 ord) | 4 refleksjoner, praktiske øvelser/mål/kort | 3 manusklare; 0 integrert | Lokal fremdrift/eksport | Ingen gate/pris | DELVIS | MANGLER | Innholdet er klart; pilotér og vurder utskriftsvennlig plan |
| **Når dere står forskjellig** – Minikurs | To voksne/medforeldre med ulike alarmsystemer og tempo | 3 | Komplett i kilde og manus (ca. 1 643 ord) | 4 refleksjoner, felles avtale, mål/kort | 3 manusklare; 0 integrert | Lokal fremdrift/eksport | Ingen gate/pris | DELVIS | MANGLER | Innholdet er klart; «kommer senere» må bety bevisst tilbakeholdt tilgang |
| **Skolesamarbeid uten skyttergrav** – Minikurs | Foreldre før, under og etter samarbeid med skole | 3 | Komplett i kilde og manus (ca. 1 800 ord) | 4 refleksjoner, konkrete møteøvelser/mål/kort | 3 manusklare; 0 integrert | Lokal fremdrift/eksport | Ingen gate/pris | DELVIS | MANGLER | Innholdet er klart; gjør juridisk/faglig språkpass og vurder møteark |
| **Når du er redd for å miste barnet** – Minikurs | Foreldre i frykt, skam eller overveldelse som trenger fotfeste og hjelpestier | 3 | Komplett i kilde og manus (ca. 1 822 ord) | 4 refleksjoner, små steg, mål/kort | 3 manusklare; 0 integrert | Lokal fremdrift/eksport; sikkerhetskoblinger | Ingen gate/pris | DELVIS | MANGLER | Innholdet er klart; profesjonell review av avgrensning og henvisninger før salg |

## 6.3 Faglig vurdering og innholdsgap

Den separate fagrapporten i leveransen vurderer kjernen som konsistent og sterk, særlig koblingen mellom kurs og Depoet som øvingsmotor. Den peker samtidig på reelle før-lanseringstemaer:

- merk nevrobiologiske metaforer tydelig som forenklede modeller, ikke bokstavelig nevrovitenskap
- bygg en klar bro til utredning, behandling og hjelpeapparat uten at Depoet blir helsetjeneste
- gjør overlapp mellom startkurs, hovedprogram og minikurs eksplisitt, slik at kjøperen forstår hvorfor de ikke er duplikater
- differensier bedre for alder; nå spenner mye av materialet bredt
- vurder senere egne spor for søsken, forelderens egen belastning og styrke-/ressursperspektivet
- publiser en nøktern «faglig grunnlag»-side med kilder og uten valideringspåstander
- vurder lyd, utskrift/kjøleskapskort og «fortsett der du slapp» som tilgjengelighets- og konsistensgrep

Fire konkrete tekstfeil er fortsatt dokumentert i nåværende kilde og bør rettes før publisering: «NAVNGI det tilstanden», «eine stor», «over to neste» og «ta initativet», samt spørsmålet «Hva skjedde overgangen?». Det finnes også flere `han/ham`-formuleringer i sentrale kursmanus; dette er ikke nødvendigvis feil, men bør få en bevisst inkluderingsbeslutning.

**Samlet kurskonklusjon:** Innholdet er **PÅ PLASS** som et omfattende skriftlig kursunivers og **DELVIS** som ferdig digitalt produkt. Det som mangler er først og fremst produktpakking, gating, vedvarende refleksjonslagring, tilgjengelighetsformater, faglig/juridisk sluttreview og produksjonsintegrasjon – ikke flere moduler.

---

# 7. Skriftlig introduksjonslansering

## 7.1 Hva som kan lanseres skriftlig

Den skriftlige verdien er reell uten video. `CoursesView` har en fullverdig leseversjon, øvelser, refleksjonsspørsmål, språkkort, ukesmål og eksport til Depoet. De ni manusene gir dessuten et lengre produksjonsgrunnlag enn det som nå ligger i appen. Video er derfor ikke en innholdsforutsetning for en skriftlig pilot.

Men det er et avgjørende skille mellom:

1. **Gratis, kontrollert skriftlig pilot:** kan tilbys uten betaling og uten konto hvis teksten ærlig sier lokal lagring, ingen synk og ingen video ennå.
2. **Betalt skriftlig introduksjonslansering:** krever fungerende kjøp, tilgang, vilkår, angrerett/digitalt innhold, kvittering, support, serverrettigheter og dataflyt. Dette finnes ikke nå.

## 7.2 Tilbudstekst og forventningsstyring

| Tema | Status | Bevis/vurdering | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|
| Tydelig kjernebudskap | PÅ PLASS | Landingssiden forankrer produktet i Førersetet, kapasitet før vilje, regulering og reparasjon | Stram inn til ett v1-løfte per kjøpsflate | Ingen |
| Skriftlig format som selvstendig produkt | PÅ PLASS | Alle 32 moduler fungerer uten video | Bestem om appteksten eller de lengre DOCX-manusene er launch-versjonen | Skriftlig |
| Introduksjonspris | UKJENT – KREVER KONTROLL | Planen har intervaller, ikke godkjent pris | Andreas må velge eksakt pris/SKU/MVA | Skriftlig betalt |
| Hva kjøperen får nå | MANGLER | Ingen checkout-/produktside eller salgsflate | List kurs, moduler, leseformat, øvelser, lagring, varighet og support helt konkret | Skriftlig betalt |
| Hva som kommer senere | MANGLER | Video, lyd, synk og nye kurs finnes som plan, ikke kontraktsklar tekst | Skill inkluderte framtidige forbedringer fra ikke-bindende veikart | Skriftlig betalt/full |
| Rett til framtidige videoer | UKJENT – KREVER KONTROLL | Ingen vilkår | Avklar om skriftlige kjøpere får alle videoer til kjøpte kurs uten tillegg | Skriftlig betalt |
| «Når dere står forskjellig» som kommende parkurs | DELVIS | Kurset med tre moduler og manus finnes allerede | Velg om det er med ved launch, holdes tilbake, eller markedsføres som senere tillegg; ikke si at innholdet ikke finnes | Skriftlig |
| Kontinuum-relasjon | DELVIS | Kontinuum er juridisk enhet, e-postavsender og grafisk grunnmur, men ikke forklart i kundereisen | Én kort, stabil formulering: Kontinuum er virksomheten; ADHD Depoet er produktet; Førersetet er innholdsgrunnlaget | Skriftlig/full |
| Pedagogisk støtte, ikke behandling | PÅ PLASS | Landingsside, kursflate, personvern og akuttlag har avgrensning | Juridisk/faglig sluttreview | Ingen for pilot |
| Krise- og hjelpelag | PÅ PLASS | 113, 116 117, 116 111 og 116 123 finnes på relevante flater | Kontrollér nummer/ordlyd rett før publisering | Ingen |

## 7.3 Kjøperens realistiske forventning

Hvis en forelder betaler for en «introduksjonslansering», vil en rimelig forventning være:

- at det er tydelig om kjøpet gjelder varig kurstilgang, et abonnement eller en pakke
- at kjøpt innhold ikke er åpent for alle uten innlogging
- at tilgang kommer umiddelbart og kan gjenopprettes på ny enhet
- at progresjon og egne data ikke forsvinner uten varsel
- at det fremgår om video er inkludert nå, kommer senere og følger det opprinnelige kjøpet
- at kvittering, kontakt, angrerett, digitalt innhold og eventuell fornyelse er forklart
- at egne ord kan leses, eksporteres og slettes som lovet

Dagens produksjon oppfyller ingen av disse betalte forventningene ende til ende. Derfor er den skriftlige **betalte** gaten **BLOKKERER LANSERING**, selv om kursinnholdet er godt nok til en gratis pilot.

## 7.4 Kan vente til etter skriftlig pilot

Følgende trenger ikke blokkere en gratis, tydelig avgrenset skriftlig pilot:

- Bunny-video og lyd
- full Depoet+-abonnementsmodell
- avansert partnerdeling
- SMS og automatiske nudger
- analytics
- alle minikurs som separate kommersielle SKU-er
- full utskrifts-/arbeidsarkpakke

Det som ikke kan vente er kilde/deploy-samsvar, sannferdig personverntekst, tydelig lokal lagring, rettede språkfeil, kriseavgrensning og en konkret test av alle offentlige stier.

---

# 8. Bunny/video – full produksjonskartlegging

## 8.1 Plattformstatus

| Område | Status | Bevis | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|
| Videomodell i TypeScript | PÅ PLASS | `ModuleVideo` har provider, videoKey, library/video ID, embed, thumbnail, varighet og transcript | Behold én mapping per modul | Ingen |
| Manus i app | PÅ PLASS | 32 av 32 `script-ready` | Lås hvilken tekstversjon som skal spilles inn | Video |
| Utvidede produksjonsmanus | PÅ PLASS | Ni lokale DOCX, 23 092 ord, alle 32 moduler | Commit/arkiver i valgt kilde etter faglig lock | Video |
| Bunny-konto/bibliotek/region | UKJENT – KREVER KONTROLL | Ingen dashboardkontroll eller konfig i repo | Bekreft konto, EU-lagring, DPA, library ID og leveransehost | Video/full |
| Bunny miljøvariabler | MANGLER | Ingen i `.env.example`, Cloudflare eller kilde | Definer bare nødvendige offentlige/server-side variabler | Video |
| Collections/navnestandard | DELVIS | `videoKey = module-id` er god navnestandard | Opprett samlinger per kurs/wave og produksjonsregister | Video |
| Video-ID-/embedmap | MANGLER | Alle ID-/URL-felt er `null` | Fyll via validert datafil eller backend, ikke ad hoc i 32 steder | Video |
| Player/embed | DELVIS | Iframe rendres hvis `embedUrl` finnes | CSP, privacy params, responsiv QA, feil-/fallbacktilstand | Video |
| Poster/thumbnail | MANGLER | 32 av 32 null | Generer og tilgjengelighetskontroller |
| Undertekster/transcript | MANGLER | 32 av 32 transcript null; ingen `.vtt`/`.srt` | Lag korrekturert norsk VTT og tekstutskrift |
| Signerte URL-er/tilgang | MANGLER | Plan nevner det, ingen kode | Backend-gated token eller Bunny token auth | Video/full |
| Leseversjon som fallback | PÅ PLASS | Appen viser tekst når embed mangler | Behold også etter videolansering | Ingen |
| Audio | MANGLER | Ingen lydfiler eller lydspiller | Kan være senere tilgjengelighetslag | Ikke første videowave |
| CSP for Bunny | MANGLER | Ingen CSP i produksjon | Eksakt allow-list etter valgt Bunny-host | Video/full |
| Reell avspillingstest | MANGLER | Ingen videoer integrert | Mobil/desktop/Safari/Chrome, captions, seek, poster, feiltilstand | Video/full |

## 8.2 Én rad per identifisert video

Alle 32 er identifisert og har manus. «Opptak» og «redigert» står som **UKJENT – KREVER KONTROLL**, fordi fravær av filer i repo ikke beviser at private produksjonsfiler ikke finnes et annet sted. «Lastet opp», «integrert» og «testet» er **MANGLER**, fordi alle Bunny-felt er null og produksjonsbundlen ikke inneholder Bunny.

| # | Kurs | Video/modul | videoKey | Manus | Opptak | Redigert | Bunny | Integrert | Testet |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | Kapasitet før vilje | Når det ikke handler om vilje | `gratis-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 2 | Kapasitet før vilje | Noen ganger begynner det i deg | `gratis-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 3 | Kapasitet før vilje | Når det glipper | `gratis-3` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 4 | Regulering før retning | Din egen beredskapskropp | `start-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 5 | Regulering før retning | Det lille sekundet | `start-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 6 | Regulering før retning | Lånte bremser | `start-3` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 7 | Regulering før retning | Når dine egne bremser er slitne | `start-4` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 8 | Regulering før retning | Reparasjon | `start-5` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 9 | Førersetet: Øvingsprogrammet | Blikket – kapasitet før vilje | `hoved-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 10 | Førersetet: Øvingsprogrammet | Føreren – din egen beredskapskropp | `hoved-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 11 | Førersetet: Øvingsprogrammet | Lånte bremser – samregulering | `hoved-3` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 12 | Førersetet: Øvingsprogrammet | Autovern – struktur som omsorg | `hoved-4` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 13 | Førersetet: Øvingsprogrammet | Krasj og reparasjon – V.A.R.M. | `hoved-5` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 14 | Førersetet: Øvingsprogrammet | Motorveien og trafikkdirigenten | `hoved-6` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 15 | Førersetet: Øvingsprogrammet | De mørke veikryssene | `hoved-7` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 16 | Førersetet: Øvingsprogrammet | Kjørestilen – det lange løpet | `hoved-8` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 17 | Skjerm uten krig | Hvorfor det smeller | `skjerm-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 18 | Skjerm uten krig | Bygg broen, hold grensen | `skjerm-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 19 | Når det smeller | V.A.R.M. i krasjet | `smeller-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 20 | Når det smeller | Reparasjon etterpå | `smeller-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 21 | Legging, morgen og overganger | Veikrysset | `legging-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 22 | Legging, morgen og overganger | Leggetid | `legging-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 23 | Legging, morgen og overganger | Morgen | `legging-3` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 24 | Når dere står forskjellig | To voksne, to alarmsystemer | `forskjellig-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 25 | Når dere står forskjellig | Barnet mellom to tempo | `forskjellig-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 26 | Når dere står forskjellig | En liten avtale når dere er rolige | `forskjellig-3` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 27 | Skolesamarbeid uten skyttergrav | Før møtet | `skole-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 28 | Skolesamarbeid uten skyttergrav | I møtet | `skole-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 29 | Skolesamarbeid uten skyttergrav | Etter møtet | `skole-3` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 30 | Når du er redd for å miste barnet | Når alarmen sier «jeg mister barnet» | `redd-1` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 31 | Når du er redd for å miste barnet | Skam, ansvar og det neste lille steget | `redd-2` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |
| 32 | Når du er redd for å miste barnet | Ikke stå alene med det som er for stort | `redd-3` | PÅ PLASS | UKJENT – KREVER KONTROLL | UKJENT – KREVER KONTROLL | MANGLER | MANGLER | MANGLER |

## 8.3 Anbefalt produksjonskart

**Minimum for skriftlig lansering:** 0 videoer. Leseversjon må omtales som hovedformat, ikke «midlertidig manglende video».

**Video-wave 1 – produktets ryggrad (16 videoer):** gratis inngang 3 + startkurs 5 + hovedprogram 8. Dette gir sammenhengende inngang, grunnkurs og flaggskip før en sprer produksjonen.

**Video-wave 2 – hyppige og akutte brukssituasjoner (7 videoer):** Skjerm 2 + V.A.R.M. 2 + Legging/morgen/overganger 3.

**Video-wave 3 – relasjon, system og sensitiv støtte (9 videoer):** Når dere står forskjellig 3 + Skolesamarbeid 3 + Redd for å miste barnet 3.

Denne rekkefølgen er en produksjonsanbefaling, ikke en innholdsdom. Hvis salgstilbudet lover video i alle ni kurs ved «videolansering», er alle 32 en gate.

## 8.4 Produksjonskjede som må etableres

1. Lås apptekst versus utvidet DOCX-manus per modul.
2. Faglig/språklig gjennomgang og markering av forenklede modeller.
3. Produksjonsark med videoKey, versjon, varighetsmål, bildeplan, status og eier.
4. Opptak med navnestandard `<videoKey>-vNN`.
5. Redigering, lydnivå, intro/outro og tilgjengelig tempo.
6. Korrekturert norsk undertekst og transcript.
7. Poster/thumbnail uten sensitiv personinformasjon.
8. Bunny Stream EU-bibliotek, DPA og samlingsstruktur.
9. Upload/transcode og kontroll av hvert asset.
10. Sikker ID-map og tilgangskontroll; ingen API-nøkkel i klient.
11. CSP og iframe/privacy-konfig.
12. QA på mobil/desktop, tastatur, captions, fallback, tregt nett og manglende video.
13. Produksjonsbundle-verifikasjon og tilgangstest for berettiget/ikke berettiget bruker.

---

# 9. Personvern, juss og tillit

Dette er en operativ vurdering, ikke juridisk rådgivning.

| Område | Status | Bevis | Betydning | Konkret gjenstår | Blokkerer |
|---|---|---|---|---|---|
| Behandlingsansvarlig og kontakt | PÅ PLASS | Lokal kilde oppgir HOLTEBERG KONTINUUM, org.nr. 837 924 782, adresse og `andreas@kontinuum.work` | Brukeren kan identifisere ansvarlig | Verifiser virksomhetsopplysningene og bruk én offentlig kontaktadresse | Full |
| Personvernerklæring finnes | DELVIS | `docs/personvernerklæring.md`, `PrivacyPolicy.tsx`, `/personvern` SPA-rute | Godt grunnlag | Gjør teksten til sannhet for faktisk deploy og leverandørstack | Teknisk/skriftlig/full |
| Personvernteksten er dynamisk for backend | DELVIS | Overskrift/lagring avhenger av `backendEnabled` | Riktig retning | E-postavsnittet sier fortsatt ubetinget at utsending ikke er i gang; må samstemmes før aktivering | Skriftlig/full |
| Brukervilkår | MANGLER | Ingen publisert vilkårsfil/flate | Ingen avtalegrunnlag for betalt tjeneste | Skriv og få review: tjeneste, tilgang, ansvar, opphør, IP, bruk, support | Skriftlig betalt/full |
| Angrerett og digitalt innhold | MANGLER | Ingen kjøpsvilkår/checkout | Betalt digital levering kan ikke lanseres forsvarlig | Avklar 14 dager, uttrykkelig samtykke til oppstart, eventuell tap av angrerett og refusjonspraksis med jurist | Skriftlig betalt/full |
| Cookies og analytics | PÅ PLASS | Dagens kode og produksjonsbundle viser ingen analytics/piksler/tredjepartsskript | Ingen samtykkebanner er nødvendig for ikke-eksisterende ikke-nødvendige cookies | Gjør ny vurdering ved Bunny/Stripe/observability | Full |
| Behandlingsgrunnlag | DELVIS | Omfattende GDPR-plan og samtykkemodell | God analyse, men ikke sluttført operativ protokoll | Oppdater art. 30-kart til faktisk live schema og leverandører | Full |
| Dataminimering | DELVIS | Lokal-first, valgfritt navn, separat fritekstsamtykke, ingen barneprofil/dokumentopplasting | Sterkt produktvalg | Live schema/RPC og logger må bekrefte samme prinsipp | Full |
| Fritekst | DELVIS | Lokalt som standard; særskilt sync-samtykke i lokal kode | Riktig risikoskille | Ikke aktiver skyfritekst før DPIA/rettslig grunnlag/DPA/E2E | Full |
| DPA-er og region | UKJENT – KREVER KONTROLL | Dokumentene sier at Cloudflare, Supabase, Resend og Bunny må avklares; ingen signert status er dokumentert | Leverandørbruk kan ikke anses juridisk ferdig | Lag leverandørregister med dato, region, DPA, underleverandører og overføringsgrunnlag | Skriftlig/full |
| Bunny/Stripe som leverandører | MANGLER | De er ikke operative, og avtalebevis er ikke dokumentert | Fremtidig datadeling er ikke kartlagt ferdig | Gjør leverandørvurdering før aktivering | Video/skriftlig betalt/full |
| Eksport | DELVIS | Lokal JSON-eksport finnes; servereksport er feilkoplet | Rettigheten fungerer bare lokalt | E2E komplett kontoeksport | Full |
| Sletting | BLOKKERER LANSERING | Lokal sletting finnes; server-UI bruker gammel RPC | Løftet om kontosletting er ikke verifisert | Koble live sletteflyt og test lås, gjennomføring, kansellering og bekreftelse | Teknisk/full |
| Retention | UKJENT – KREVER KONTROLL | Plan nevner sletting/lovpålagt kjøpsoppbevaring, men ingen operativ matrise | Data kan bli liggende uten tydelig tidsgrense | Definer per tabell/logg/e-post/betaling/backup | Full |
| Helse-/behandlingsspråk | PÅ PLASS | Tydelige disclaimere og hjelpenumre; ingen diagnosefelt | God tillitsbarriere, med behov for restreview | Profesjonell review av sensitive kurs og salgstekst | Skriftlig/full |
| Sannferdig salg | MANGLER | Ingen kjøpsflate eller produktside | Risiko oppstår først ved prislansering | Beskriv bare det som faktisk er deployet og E2E-testet | Skriftlig betalt |
| Profesjonell juridisk review | MANGLER | Egne planer markerer den som gjenstående | Interne vurderinger er ikke nok for betalt lansering | Kort, avgrenset review av personvern, vilkår, angrerett, art. 9 og leverandøroverføringer | Skriftlig betalt/full |

**Tillitspunkt:** Den sterkeste posisjonen er å beholde «fritekst lokalt som standard», ingen adtech, ingen barnedatafelt, tydelig pedagogisk avgrensning og gratis akutthjelp. Den største tillitsrisikoen er å aktivere konto/synk eller betaling før personverntekst, sletting og faktisk backendkontrakt er sanne samtidig.

---

# 10. Full kundereise

## 10.1 Nåværende og planlagt reise

| Trinn | Nåstatus | Friksjon/risiko | Nødvendig neste bevis |
|---|---|---|---|
| 1. Oppdage ADHD Depoet | DELVIS | Produksjon har tydelig Førersetet-budskap, men er gammel og uten kjøp | Oppdatert, sannferdig landing i valgt produksjon |
| 2. Forstå målgruppe/løfte | DELVIS | Kapasitet før vilje og foreldre til barn med reguleringsvansker er tydelig; alder og produktpakker er mindre tydelig | Én primær målgruppe, ett v1-løfte, tydelig alder/avgrensning |
| 3. Prøve gratis | PÅ PLASS | Gratis inngang og demo-akuttkort finnes; e-postinteresse er lokal i aktiv produksjon | Definer gratisgrense og om e-post faktisk er aktiv |
| 4. Onboarding | PÅ PLASS | Aktivt lokallagringssamtykke, valgfritt navn, behov/energi/startside i lokal kilde | Nettleser-E2E, mobil og forståelsestest med reelle foreldre |
| 5. Første verdi | PÅ PLASS | Lokal kilde lar bruker gå til I dag, Hva gjør jeg nå?, Søndag eller Kurs | Pilotmål: tid til første nyttige handling |
| 6. Velge kurs | PÅ PLASS | Alle ni er åpne i lokal kilde; anbefalt sti peker til hovedprogram | Ved salg: entitlement og tydelig «hvorfor dette kurset» |
| 7. Gjennomføre modul | DELVIS | Leseversjon, spørsmål, øvelse, mål og kort finnes | Vedvarende refleksjon eller tydelig «ikke lagret»; fortsett-funksjon |
| 8. Overføre til Depoet | PÅ PLASS | Lokal modulfullføring kan plante kort/ukesmål; produktlogikken er sterk | E2E at data havner riktig og ikke dupliseres |
| 9. Daglig konsistens | DELVIS | Dagsform, prompt, mikrohandling, refleksjon og språkbank fungerer lokalt | Flere brukstester; synckontrakt; evt. e-post senere |
| 10. Søndagslanding | PÅ PLASS | Lokale rapporter, ukesmål og historikk finnes | Entitlement/free-sample-regler og serverkontrakt |
| 11. Retur etter fravær | PÅ PLASS | Lokal `ReturnWelcome` vises etter fire dager og bruker ikke skyldspråk | Test at det oppleves støttende og at ingen e-post sendes uten samtykke |
| 12. Konto/ny enhet | BLOKKERER LANSERING | Lokal Auth-kode ikke deployet; live OTP 8 vs UI 6; synk bruker gammel schema | Separate Auth-E2E + to-enhets sync/import |
| 13. Kjøp | MANGLER | Ingen Checkout | Stripe testmodus, vilkår, kvittering |
| 14. Tilgang etter kjøp | MANGLER | Entitlement-tabeller uten integrasjon | Kjøp→webhook→tilgang E2E |
| 15. Fornyelse/opphør | MANGLER | Bare plan | Portal, varsling, aktivt valg, utløp/grace/read-only |
| 16. Support/refusjon | MANGLER | Personlig e-post finnes, men ingen operativ kundestøtteflyt | Kontaktflate, SLA, refusjonsrutine og hendelsesprosess |
| 17. Eksport/sletting | BLOKKERER LANSERING | Lokal eksport/sletting finnes, men serverfunksjonen er feilkoplet | E2E komplett kontoeksport og sletting |

## 10.2 Produktlogikken som bør beholdes

Den mest verdifulle kjeden er allerede tydelig i produktet:

**bokperspektiv → kursmodul → ett mikrosteg → én setning/språkkort → ukesmål → daglig gjenfinning → søndagslanding → tilbakekomst uten skam.**

Dette er den operative definisjonen av Depoet som konsistensmotor. Medlemsverdien bør ikke være «mer innhold» alene, men at systemet husker retningen, reduserer valg, henter fram riktig språk og hjelper forelderen tilbake etter glipp. Det bør også være kjernen i senere måling: retur, gjennomført liten øvelse, gjenbruk av kort, søndagslanding og opplevd hjelp – ikke skjermtid eller mengde tekst produsert.

I dag er denne logikken **PÅ PLASS lokalt**, men **DELVIS operativt** fordi den ikke synker, ikke håndhever tilgang og ikke finnes i aktuell produksjonsversjon som medlemsreise.

---

# 11. Synlig forhold mellom ADHD Depoet, Kontinuum, Førersetet, Forankret og parkurset

| Element | Synlig nå | Vurdering | Anbefalt v1-formulering/handling |
|---|---|---|---|
| **Førersetet** | Tydelig på landing, kursflate, README og innhold | PÅ PLASS | «ADHD Depoet er bygget på boken Førersetet av Andreas Holteberg.» |
| **Kontinuum** | Juridisk ansvarlig, Auth-avsender og grafisk grunnmur; lite forklart i salgsreisen | DELVIS | Forklar én gang at Kontinuum er virksomheten bak, uten å gjøre produktet til en merkevarelabyrint |
| **ADHD Depoet** | Tydelig produktnavn | PÅ PLASS | Behold som foreldreprodukt og øvingsrom |
| **Forankret** | Ingen tydelig referanse funnet i offentlig/lokal produktopplevelse | UKJENT – KREVER KONTROLL | Ikke introduser relasjonen før Andreas har bestemt hva Forankret er i porteføljen og hvorfor forelderen trenger å vite det |
| **Når dere står forskjellig** | Fullt tre-modulers kurs og manus finnes | PÅ PLASS | Avklar om det lanseres nå, senere eller som del av medlemskapet; omtalen må følge faktisk tilgang |

Anbefalingen er en enkel hierarkisk fortelling: **Kontinuum** er virksomheten, **Førersetet** er boken/forståelsesrammen, og **ADHD Depoet** er øvings- og konsistensproduktet. Forankret og eventuelle andre produkter bør bare vises hvis de løser en konkret orienteringsoppgave for brukeren.

---

# A. Ledelsesoppsummering

1. ADHD Depoet har et sterkt og sammenhengende innholdsprodukt: 9 kurs, 32 moduler og komplett skriftlig øvingslogikk.
2. Depoet-logikken er produktets sterkeste konkurransefortrinn: kurset planter mikrosteg, språk og ukesmål som hentes fram igjen over tid.
3. Produksjonen viser fortsatt en eldre, lokal-only Worker-bundle uten Supabase, kodeinnlogging eller ny synklogikk.
4. Cloudflare har Pages pluss to Workers med overlappende domeneansvar; produksjonskilden er ikke entydig eller reproduserbar.
5. Lokal kilde, GitHub, aktiv produksjon og live Supabase er fire forskjellige versjoner av produktet.
6. Lokal Auth-UI er godt bygget og testet for seks sifre, men live Supabase sender åtte sifre og e-postmalen sier seks. Dette er en hard Auth-blokker.
7. Live Supabase har en mer moden datamodell med RLS, praksis, import, entitlements og sletting, men migrasjonene finnes ikke i repo.
8. Klienten bruker gamle tabellnavn og gammel slette-RPC. Konto, synk, eksport og sletting vil derfor ikke fungere mot live schema.
9. Custom SMTP, SPF og DKIM er konfigurert, men separat kode/Magic Link-E2E, Gmail-authresultater, spamplassering og DMARC er ikke ferdig.
10. Ingen Stripe-, Checkout-, webhook-, Customer Portal- eller refusjonsflyt finnes. Betalt lansering er ikke mulig ennå.
11. Alle kurs er offentlig tilgjengelige i klientkoden; reell betalingsgating krever at betalt innhold flyttes ut av bundlen.
12. De ni utvidede videomanusene dekker alle 32 videoer, men er usporet; ingen opptak er dokumentert, og ingen Bunny-asset er integrert.
13. En gratis skriftlig pilot er realistisk før video, men bare etter en ryddig deploy, sannferdig personvern og full offentlig QA.
14. En betalt skriftlig introduksjonslansering må vente på Auth/data, betaling/gating, vilkår/angrerett, DPA-status og E2E.
15. Riktig kritisk vei er å stabilisere én produksjonsarkitektur og én datakontrakt før mer innhold, video eller markedsføring produseres.

---

# B. Fire lanseringsgater

## Gate 1 – Teknisk lansering

**Resultat: IKKE BESTÅTT – BLOKKERER LANSERING**

Blokkere:

- aktiv produksjon er gammel og uten Supabase
- Cloudflare-eierskap/pipeline er uklart
- live OTP 8 mot lokal UI 6
- klienten bruker tabeller/RPC som ikke finnes live
- live migrasjoner/function-kilde mangler i repo
- ingen Auth-, sync-, export- eller delete-E2E

Kan vente:

- video, lyd, Stripe og avansert analytics
- bundle-splitting kan tas etter funksjonell stabilisering, men før stor trafikk

## Gate 2 – Skriftlig introduksjonslansering til redusert pris

**Resultat: IKKE BESTÅTT – BLOKKERER LANSERING**

Blokkere:

- ingen godkjent eksakt pris/SKU eller salgsflate
- ingen Checkout, entitlementkobling, kvittering, portal eller refusjon
- ingen brukervilkår/angrerettsflyt for digitalt innhold
- betalt innhold ligger offentlig i bundlen
- konto/synk/sletting fungerer ikke mot live schema
- ingen klar avtale om framtidig videotilgang eller parkursets plass

Ikke-blokkerende for gratis pilot:

- video og lyd
- full Depoet+-abonnementsmotor
- alle minikurs som separate produkter

## Gate 3 – Bunny videolansering

**Resultat: IKKE BESTÅTT – BLOKKERER LANSERING**

Blokkere:

- Bunny-konto, EU-region, DPA og library er ikke verifisert
- 0 av 32 assets er dokumentert lastet opp/integrert/testet
- ingen subtitles, posters, ID-map, signed access eller CSP
- ingen videorettigheter i produktvilkår

Ikke-blokkerende:

- audio kan komme senere
- videowaves kan redusere produksjonsrisiko hvis salgsbudskapet ikke lover alle 32 samtidig

## Gate 4 – Full kundereise og full lansering

**Resultat: IKKE BESTÅTT – BLOKKERER LANSERING**

Blokkere:

- alle blokkere fra gate 1–3
- ingen komplett kjøp→tilgang→bruk→fornyelse/opphør→eksport/sletting-reise
- ingen operativ support-/refusjonsprosess
- DPA/region/retention og profesjonell juridisk review er ikke dokumentert
- Security Advisor-funksjonene er ikke gjennomgått
- observability og sanitert driftskontroll er utilstrekkelig

---

# C. Kritisk vei i avhengighetsrekkefølge

1. **Lås v1-beslutningene:** gratis pilot versus betalt skriftlig launch; eksakt SKU/pris; hvilke kurs; framtidig video; parkurset; Kontinuum/Forankret-relasjon.
2. **Velg én kilde til sannhet:** GitHub-repo og én Cloudflare-leveransemodell. Dokumenter rollback.
3. **Rekonstruer backendkontrakten:** få live migrasjoner og `delete-account` inn i repo, review RLS/RPC, generer klienttyper.
4. **Skriv klienten mot live schema:** profil, førstegangsimport, progresjon, kort, observasjon/notater, søndag, entitlements, eksport og sletting.
5. **Rett Auth som én samlet kontrakt:** seks sifre, avtalt mal/emne, callback, deployvariabler og separat kode/Magic Link-test.
6. **Etabler staging/preview:** ingen ekte kundedata; én testbruker; sanitert observability.
7. **Fullfør personvernminimum:** sann tekst, leverandørregister/DPA, retention, behandlingsprotokoll, fritekstbeslutning og slettebevis.
8. **Hvis betalt skriftlig launch:** brukervilkår/angrerett, Stripe testmodus, webhook/entitlements, gating og testkjøp/refusjon.
9. **Deploy kontrollert til apex:** verifiser aktiv bundle, Supabase-ref, callback, redirect, cache, headere og alle offentlige stier.
10. **Kjør lukket pilot:** gratis først eller en eksplisitt godkjent testbetaling; mål forståelse og bruk, ikke bare teknikk.
11. **Lås videoproduksjon etter pilot:** språk/fag, format og prioritert wave.
12. **Bunny-integrasjon og QA:** DPA/region, uploads, captions, signed access, CSP, entitlement og avspilling.
13. **Full launch-readiness review:** alle fire gater må revideres med nye bevis.

---

# D. Videotall

| Produksjonsstatus | Antall |
|---|---:|
| Identifiserte videoer | 32 |
| Manus i app | 32 |
| Utvidet manus i DOCX | 32 |
| Opptak dokumentert | 0; status for alle 32 er UKJENT – KREVER KONTROLL |
| Redigert dokumentert | 0; status for alle 32 er UKJENT – KREVER KONTROLL |
| Lastet opp til Bunny | 0 verifisert |
| Integrert med ID/embed | 0 |
| Undertekst/transcript integrert | 0 |
| Testet ende til ende | 0 |
| Leseversjon tilgjengelig i kilde | 32 |

---

# E. Eksterne avklaringer – prioritert, maks 10

1. **V1-tilbud:** Skal neste milepæl være gratis skriftlig pilot eller betalt skriftlig introduksjonslansering?
2. **Pris/SKU:** Hvilken eksakt pris, eiermodell, inkludert Depoet-periode og fornyelsesmodell gjelder?
3. **Kurstilgang:** Hvilke av de ni kursene er gratis, inkludert i første kjøp, Depoet+, eller holdes tilbake?
4. **Videoavtale:** Får en skriftlig kjøper framtidige videoer til samme kurs uten tillegg, og når kan dette loves?
5. **Cloudflare:** Skal apex eies av Pages eller Worker Assets, og kan den eldre `depotet`-Worker avvikles etter kontrollert overgang?
6. **Backendkilde:** Hvor er de fire live migrasjonene og kildekoden til `delete-account`, og er de formelt godkjent som målkontrakt?
7. **Auth:** Bekrefter Andreas fortsatt seks sifre og teksten «Bruk denne engangskoden» før en ny kontrollert backendrunde?
8. **Juss/leverandører:** Er DPA, region og overføringsgrunnlag dokumentert for Cloudflare, Supabase og Resend; senere Bunny og Stripe?
9. **Portefølje:** Hvordan skal Kontinuum, Forankret, Førersetet og ADHD Depoet forklares med én setning hver?
10. **Support:** Hvilken offentlig kontaktadresse, forventet svartid, refusjonsmyndighet og hendelsesansvar gjelder ved launch?

---

# F. Realistiske arbeidsmengder

Estimater er arbeidsintervaller, ikke kalenderløfter. De forutsetter raske avklaringer, ingen uventet schemafeil og at én person kan godkjenne produktbeslutninger. «Maskin» er samlet bygg, transkoding, opplasting og automatisert testtid; den krever fortsatt oppfølging. Områdene overlapper, så intervallene skal ikke summeres ukritisk.

| Arbeidsstrøm | Codex/utvikling | Andreas/human-in-the-loop | Maskin/prosess | Viktigste usikkerhet |
|---|---:|---:|---:|---|
| Teknisk stabilisering til kontrollert gratis pilot | 5–9 arbeidsdager | 1–2 dager | 4–12 timer | Live migrasjoner/RPC-definisjoner og valg av Cloudflare-eier |
| Betalt skriftlig introduksjonslansering etter teknisk gate | 5–10 arbeidsdager | 2–4 dager | 6–16 timer | Stripe/vilkår, eksakt tilbud, entitlementtilstander og testkjøp |
| Innholds-/manuslock for 32 videoer | 2–4 arbeidsdager | 3–6 dager | 2–6 timer | Valg mellom apptekst og utvidet manus; faglig review |
| Opptak og redigering av alle 32 videoer | 2–4 dager produksjonsstøtte | 12–25 dager, avhengig av opptaksform og egen redigering | 30–100 timer eksport/render | Presentasjonsform, antall takes, grafikk og ekstern klipp |
| Bunny-oppsett, upload, integrasjon og QA | 2–5 arbeidsdager | 0,5–1,5 dag | 12–40 timer | Transkoding, captions, tokenbeskyttelse, browser/device-matrise |
| Full kundereise etter tidligere gater | 7–15 arbeidsdager | 3–6 dager | 12–36 timer | Fornyelse/refusjon/grace/sletting, observability og juridisk review |

Ekstern juridisk/faglig gjennomgang er ikke inkludert i Codex- eller Andreas-tallene. For en smal norsk lansering bør det reserveres minst én avgrenset juridisk runde og én faglig/språklig runde før betaling åpnes.

---

## Endelig beslutningskonklusjon

ADHD Depoet er ikke et prosjekt som trenger flere ideer før det kan bli godt. Det trenger nå konvergens: én kilde, én produksjonsvei, én live datakontrakt og ett presist første tilbud.

Det mest forsvarlige neste målet er en **kontrollert skriftlig pilot** med den eksisterende sterke kurs- og Depoet-logikken, uten å late som konto, synk, medlemskap, betaling eller video er ferdig. Parallelt stabiliseres backend og den kommersielle reisen. Først når Auth, datarettigheter, betaling og tilgang består egne ende-til-ende-tester, kan «introduksjonspris» bli en faktisk lansering og ikke bare en innholdsvisjon.

Video bør behandles som et separat produksjonsprogram med 32 sporbare assets og tre waves. Det skal forsterke produktet, ikke forsinke en ærlig skriftlig validering eller skjule de operative blokkeringene.
