# ADHD Depoet – ferdigstillingslogg

Dato: 18. juli 2026
Arbeidsgren: `codex/depoet-launch-convergence`

Denne loggen er den løpende, operative sporingen for ferdigstillingen. Statusrapporten
`adhd-depoet-operativ-og-lanseringsstatus-2026-07-18.md` er kartleggingen som ligger til grunn.

## Faste produktbeslutninger

- Gratis inngang: **Kapasitet før vilje**, 3 moduler.
- Første betalte produkt: **Regulering før retning**, 5 moduler, og
  **Førersetet: Øvingsprogrammet**, 8 moduler – til sammen 13 moduler.
- Planlagt retning: 990 kroner som engangskjøp, tre måneder Depoet inkludert,
  ingen automatisk fornyelse. Betaling aktiveres ikke i denne ferdigstillingen.
- Første port er en lukket, gratis pilot.
- Produksjonsdomene og DNS flyttes ikke før en separat, uttrykkelig godkjenning.
- `Når dere står forskjellig` er et minikurs i Depoet, ikke parkurset.
- Porteføljelinje: «Fra Kontinuum: Et eget parkurs er under utvikling.»
- Forankret og det fremtidige parkurset er separate Kontinuum-produkter.

## Endringsklassifisering ved start

| Område | Startstatus | Behandling |
|---|---|---|
| `src/App.tsx`, `src/lib/emailService.ts`, `package.json` | Påbegynt seks-sifret Auth-flyt | Beholdes og fullføres i Fase 3 |
| `src/lib/authCode.ts`, `src/lib/authRedirect.ts`, `tests/authCode.test.ts` | Nye, lokale Auth-filer | Beholdes og verifiseres i Fase 3 |
| `src/lib/syncService.ts` | Blanding av ny Auth og foreldet databaseskjema | Erstattes av typed tjenestelag i Fase 2 |
| `supabase/migrations/202607130001_lansering_v1_schema.sql` | Foreldet lokalskjema; er ikke live-kontrakten | Erstattes av de fire faktiske live-migrasjonene i Fase 1 |
| Lokale e-postfunksjoner i `supabase/functions/` | Ikke deployet i live-prosjektet | Flyttes ut av aktiv deployflate i Fase 1 |
| `leveranse-2026-07-17/` | Manusleveranse og kildemateriale | Beholdes urørt; ikke commits som appkode |
| `outputs/adhd-depoet-operativ-og-lanseringsstatus-2026-07-18.md` | Evidensrapport | Beholdes som dokumentasjon |
| `.wrangler/`, `dist/`, `supabase/.temp/`, lokale dev-logger | Genererte eller lokale filer | Ignoreres; skal ikke commits |

## Fase 1 – én teknisk sannhetskilde

- [x] Opprettet arbeidsgrenen `codex/depoet-launch-convergence` uten å endre den skitne arbeidsflaten.
- [x] Bekreftet prosjekt-ID `uipsaeojwjehrbylfgrx` i Supabase-panelet.
- [x] Bekreftet fire live-migrasjoner: `depot_schema`, `access_and_rls`,
  `practice_rpcs` og `local_import`.
- [x] Lest de fire migrasjonene komplett og skrivebeskyttet fra migrasjonshistorikken.
- [x] Bekreftet 13 public-tabeller og tilhørende RLS/grants gjennom live-migrasjonene.
- [x] Lest den deployede Edge Function-kilden `delete-account` skrivebeskyttet.
- [x] Lagret live-migrasjonene og Edge Function-kilden lokalt.
- [x] Opprettet typed databasekontrakt for alle 13 tabeller og alle live-RPC-er.
- [x] Fjernet aktiv deployrisiko fra foreldet lokalskjema og ikke-deployede funksjoner.
- [x] Typekontroll bestått: `npm run lint`.
- [x] Auth-regresjon bestått: 5 av 5 tester.
- [x] Produksjonsbygg bestått. Bundlevarselet over 500 kB følges opp i Fase 4.
- [x] Hemmelighetsskann av kilde, Supabase-filer, `.codex` og produksjonsbygg uten nøkkeltreff.
- [x] Laget separat Fase 1-commit: `7a46040 chore(supabase): align local contract with live project`.

### Verktøystatus

Prosjektets `.codex/config.toml` peker korrekt mot den prosjektavgrensede OAuth-baserte
Supabase MCP-serveren, uten `account`-feature. MCP-serveren er ikke lastet i denne allerede
åpne Codex-prosessen. Den skrivebeskyttede Fase 1-innhentingen ble derfor gjort i det
innloggede Supabase-panelet. Ingen SQL, migrasjon, funksjonsdeploy eller annen skriving er
utført i Supabase.

## Fase 2 – produkt- og synkroniseringslogikk

- [x] Klienten bruker genererte databasetyper og live tabell-/RPC-navn.
- [x] Lokal-first er beholdt: fritekst forblir lokalt og inngår ikke i skyimport eller synk.
- [x] Eksplisitt førstegangsimport viser strukturert omfang og lokalt fritekstomfang før samtykke.
- [x] Vedvarende, dedupliserende synk-kø med stabil operasjons-id og kontrollert retry er lagt til.
- [x] Tilstandene aktiv, grace, read-only og låst har eksplisitte klientegenskaper.
- [x] Servereksport dekker alle 13 live-tabeller.
- [x] Kontosletting bruker live request/cancel-kontrakt og viser sju dagers låseperiode.
- [x] Gratisproduktet `Kapasitet før vilje` er offentlig og begrenset til tre moduler.
- [x] Første betalte bundle består bare av `Regulering før retning` og
  `Førersetet: Øvingsprogrammet`.
- [x] Betalt kursmanus er flyttet ut av klientens importgraf og leveres fra en serverrute etter
  gyldig sesjon og RLS-verifiserte entitlements. Klientbundlen inneholder bare offentlig kurs,
  katalogmetadata og låst tilstand.
- [x] Minikurs er holdt utenfor første bundle. `Når dere står forskjellig` er fortsatt et
  Depoet-minikurs, mens den separate porteføljelinjen er ordrett:
  `Fra Kontinuum: Et eget parkurs er under utvikling.`
- [x] Pilotmigrasjon er skrevet lokalt, men ikke kjørt: service-role-avgrenset RPC gir de to
  kurs-entitlementene og tre måneders Depoet-tilgang uten automatisk fornyelse.
- [x] Testmatrise bestått: 17 av 17 tester, inkludert tom konto, lokal bruker, førstegangsimport,
  retry, to klienter, tilgangstilstander, eksport, sletteforespørsel/kansellering og innholdsgating.
- [x] Typekontroll og produksjonsbygg bestått.
- [x] Ingen sourcemaps eller nøkkeltreff i kilde/bygg. Fem unike betalte modulfraser ble
  eksplisitt kontrollert og finnes ikke i klientbundlen.
- [x] React-kvalitetskontroll utført; asynkron kursinnlasting og status-timer rydder nå opp ved
  avmontering.
- [ ] Pilotmigrasjonen er ikke brukt eksternt. Før eventuell kjøring skal eksakt SQL vises og
  én separat, prosjektavgrenset godkjenning innhentes.
- [x] Separat Fase 2-commit opprettes ved dette fasepunktet.

## Fase 3 – Auth-kontrakt

- [x] Lokal seks-sifret kodeflyt er kontrollert: e-post beholdes, bare numeriske sifre godtas,
  og verifisering bruker `type: 'email'`.
- [x] Produksjonscallback er låst til `https://adhd-depoet.com/auth/callback`; localhost brukes
  bare i utvikling. Egne callback-tester er lagt til.
- [x] TEMP-skriptet finnes og er statisk kontrollert uten kjøring eller nettverk. SHA-256 er
  `C95AADDA252B3362D0C42C55D1BE73E2A56BEB4B2FF1978798906F1DB3B07208`.
- [x] Preflight bekrefter riktig prosjekt, riktig klient-URL, nøyaktig to JSON-felter,
  heltallet `6`, korrekt tekst og begge malplassholderne, to HTTP-kall (PATCH, GET), skjult
  tokeninput, opprydding og ingen innebygd hemmelighet.
- [x] Manuell korttidstokenflyt og sanitert PATCH-/GET-verifikasjon er fullført. PATCH og GET
  returnerte `200`, `mailer_otp_length` er heltallet `6`, og den lagrede malen inneholder
  «Bruk denne engangskoden», `{{ .Token }}` og `{{ .ConfirmationURL }}`.
- [x] Separat kode-test er fullført med en fersk e-post og `type: 'email'`: gyldig sesjon,
  publishable key og RLS-støttet kontotilstand ble bekreftet uten å åpne Magic Link.
- [ ] Separat Magic Link-test nådde apex-callback, men produksjonsbundlen opprettet ikke sesjonen.
- [ ] Norsk e-postemne utsettes til riktig felt er verifisert mot offisiell dokumentasjon i en
  egen, avgrenset Auth-endring.

### Auth-kontroll og sikkerhetsstopp

- [x] Sanitert backendrapport mottatt: PATCH `200`, GET `200`, alle fire kontroller `True`,
  ingen retry og korttidstokenet bekreftet tilbakekalt.
- [x] To separate, ferske Auth-meldinger ble sendt. Koden fra den første ble brukt uten å åpne
  lenken. Magic Link fra den andre ble åpnet uten å bruke koden.
- [!] Gmail plasserte begge meldingene i spam. Emnet er fortsatt «Your sign-in link»; SPF og
  DKIM er `PASS`, mens Gmail ikke rapporterte noe DMARC-resultat.
- [!] Testen ble stoppet før utsending fordi Supabase-dashboardets maskinlesbare sidevisning
  uventet eksponerte hele den eldre `service_role`-nøkkelen uten at Reveal eller Copy ble brukt.
  Nøkkelen ble ikke kopiert, lagret eller brukt, og nettleserfanen ble lukket.
- [x] Avhengigheten til legacy `service_role` er migrert ut av `delete-account` i commitene
  `20746f8` og `3240d6e`. Den deployede canonical-funksjonen samsvarer med `3240d6e` og velger
  bare `edge_delete_account` fra `SUPABASE_SECRET_KEYS`.
- [x] Menneskestyrt, ikke-muterende dry-run returnerte HTTP `200` og verifiserte både database-
  og Auth Admin-tilgang med uendret tilstand. Ingen retry eller reell kontosletting ble utført.
- [x] Skrivebeskyttet sluttkontroll fant ingen aktive `SUPABASE_SERVICE_ROLE_KEY`-avhengigheter,
  ingen `401`/`Invalid JWT`, ingen nøkkel- eller persondatafunn og ingen mutasjoner i sanitiserte
  logger.
- [!] Supabase kan ikke deaktivere legacy `service_role` separat. Dashboard-porten deaktiverer
  legacy `anon` og `service_role` samlet. Klienten må derfor konvergeres til en navngitt
  publishable key før den manuelle deaktiveringsporten åpnes.

## Sikkerhetsrunde A – moderne API-nøkler

### Fase A1 – klient uavhengig av legacy anon

- [x] Opprettet navngitt publishable key `web_production`. Supabase tillot ikke bindestrek i
  nøkkelnavnet; dette er den nærmeste gyldige varianten av det foretrukne `web-production`.
- [x] Fjernet klientfallback til `VITE_SUPABASE_ANON_KEY`; bare
  `VITE_SUPABASE_PUBLISHABLE_KEY` aksepteres. Lokal migrering er commit `0983377`.
- [x] Oppdatert typer, konfigurasjonstester, `.env.example` og aktiv dokumentasjon.
- [x] Test bestått, 32 av 32. Prosjektets `npm run lint` er eksplisitt typekontroll med
  `tsc --noEmit` og besto. Produksjonsbygg besto.
- [x] Sanitert lokal og publisert bundle-skanning bekrefter riktig prosjekt-URL og moderne
  publishable-format, med null treff på legacy JWT, `sb_secret_`, `service_role`, PAT eller
  sourcemaps.
- [x] Cloudflare Pages Preview har prosjekt-URL og publishable key for både Vite-klienten og
  Pages Function-runtime. `VITE_EMAIL_ENABLED=false` er beholdt frem til Auth-runden.
- [x] Separat preview er deployet på
  `https://codex-depoet-launch-converge.adhd-depoet-app.pages.dev`; aktiv bundle er
  `/assets/index-CAKb7N1c.js`. Produksjonsbranch, apex og dagens produksjons-Workers er urørt.

### Fase A2 – manuell deaktiveringsport

- [x] Siste name-only-kontroll fant null aktive kildekodereferanser til
  `VITE_SUPABASE_ANON_KEY` eller `SUPABASE_SERVICE_ROLE_KEY`.
- [x] Canonical `delete-account` har ingen diff mot commit `3240d6e`, bruker bare
  `edge_delete_account` fra `SUPABASE_SECRET_KEYS`, og har `verify_jwt = false`.
- [x] Preview/lokal klient bruker publishable key. Aktiv produksjonsbundle
  `/assets/index-DXVpyt7u.js` inneholder verken legacy anon eller andre Supabase-nøkler.
- [x] Eksakt instruks og rollback for samlet deaktivering er klargjort ved den manuelle porten.
- [x] Brukeren bekreftet `LEGACY_JWT_KEYS_DISABLED=True`. Legacy `anon` og `service_role` er
  deaktivert samlet; Codex åpnet eller deaktiverte ikke nøkkelverdiene.

## Fase B – Auth etter legacy-deaktivering

- [x] Kodeflyt med første ferske e-post besto på Pages-preview: sekssifret kode ga gyldig
  sesjon, status «Innlogget», strukturert synk tilgjengelig og RLS-støttet kontotilstand.
- [x] Kodesesjonen ble avsluttet før andre utsending. Kode og lenke fra samme melding ble ikke
  brukt i samme test.
- [x] Magic Link fra andre ferske e-post nådde nøyaktig
  `https://adhd-depoet.com/auth/callback`. URL-fragmentet inneholdt access- og refresh-token,
  uten Auth-feil, som bekrefter at Supabase verifiserte lenken.
- [ ] Den aktive produksjonsbundlen mangler fortsatt Supabase-URL og publishable key og kunne
  derfor ikke konsumere Auth-fragmentet eller opprette klientøkten. Magic Link-flyten er ikke
  godkjent ende-til-ende.
- [x] Dette er ikke en feil i de nye API-nøklene: kodeflyten med samme publishable key besto.
  Legacy-nøklene er derfor ikke reaktivert.
- [!] Neste port er eksplisitt produksjonsgodkjenning for å deploye publishable-only-klienten
  til apex før Magic Link-testen gjentas. Eksisterende produksjons-Worker er fortsatt urørt.

## Fase 4 – Cloudflare Pages-preview

- [x] Teknisk previewflate er deployet uten produksjonscutover.
- [ ] Full teknisk kundereise starter først etter manuell legacy-deaktivering og godkjente,
  separate Auth-tester i Fase B.
- Produksjons-apex og eksisterende Worker røres ikke uten separat cutover-godkjenning.

## Fase B2 – preview-port og kontrollert produksjonscutover

- [x] Callback-støtten fra commit `aa9935d` er intakt. Det verifiserte preview-bygget har
  riktig Supabase-prosjekt, én moderne publishable key og null treff på legacy JWT eller
  hemmelige nøkkelformater.
- [x] Den midlertidige, eksakte preview-callbacken ble lagt til. Én fersk Magic Link ble sendt
  uten rate limit, nådde preview-callbacken, ble verifisert av Supabase og opprettet en gyldig
  preview-sesjon med RLS-støttet kontotilstand. Koden fra meldingen ble ikke brukt.
- [x] Lokal produksjonspreflight på `aa9935d` besto 34 av 34 tester, typekontroll og build.
  Bundle-skanningen fant én publishable key, riktig prosjekt og null legacy JWT, secret key,
  service-role, PAT, localhost-callback eller sourcemap.
- [x] Pages Production er konfigurert med bare de offentlige variabelnavnene `SUPABASE_URL`,
  `SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_URL` og `VITE_SUPABASE_PUBLISHABLE_KEY`.
  Ingen e-postflagg, secret key eller legacy-nøkkel ble lagt til.
- [x] Verifisert Pages-produksjonsdeploy er `2ad77d3a-10bc-489a-a9d7-e14a45aaf259`, kilde
  `aa9935d`, med aktiv bundle `/assets/index-C8dKuT0T.js`. Immutable URL og
  `adhd-depoet-app.pages.dev` samsvarer med lokal produksjonsbuild. `/auth/callback`,
  SPA-rute og uautentisert `/api/content` svarte `200` før domeneflytting.
- [x] Eksakt rollbacktilstand er dokumentert og bevart. Worker `adhd-depoet` står fortsatt på
  versjon `49694666-27a5-4720-ba8c-5dc5b192bd4a` med www-ruten intakt. Worker `depotet`
  står fortsatt på versjon `3d76bdb3-048f-4457-9b8a-4c1bc49ad030` med www custom domain
  intakt. Bare de to konkurrerende apex-tilknytningene ble fjernet.
- [x] Apex `adhd-depoet.com` er aktiv på Cloudflare Pages med SSL. Pages opprettet den
  nødvendige proxiede apex-CNAME-en til `adhd-depoet-app.pages.dev`; ingen andre DNS-poster
  ble endret. www beholdt gammel Worker-kjede og svarer `301` til apex.
- [x] Etter cutover svarer apex, `/auth/callback` og SPA-ruten `200`. Aktiv bundle er den
  verifiserte Pages-bundlen, med riktig prosjektreferanse, én publishable key og null funn i
  produksjonens hemmelighetsskanning. Sekssifret kodegrensesnitt lastes.
- [x] Én ny produksjons-Magic Link ble sendt uten retry. Den nådde
  `https://adhd-depoet.com/auth/callback`, ble verifisert av Supabase og opprettet gyldig
  apex-sesjon. Profilen viste strukturert synk klar uten RLS-feil. Ingen kode fra meldingen
  ble brukt.
- [x] Uautentisert kall til beskyttet kontotilstand ble avvist med HTTP `401`; ingen
  responsdata ble logget.
- [x] Den midlertidige preview-callbacken er fjernet. Auth allow-listen inneholder igjen bare
  eksakt apex-callback og lokal utviklingscallback; Site URL er fortsatt apex.
- [x] Legacy JWT-nøklene forblir deaktivert. Ingen Auth-rategrenser, SMTP, Resend, DMARC eller
  JWT-hemmelighet ble endret. Rollback ble ikke nødvendig, og begge gamle Workers er bevart.
