# Codex-oppdrag: ADHD Depoet – fra forhåndsvisning til lanserbart medlemsprodukt (v1)

Du er Codex som jobber i git-klonet `C:\Prosjekter\adhd-depoet` (branch `main`, origin er GitHub).
Målet i denne runden er å bygge appen fra «tidlig forhåndsvisning» til et **fullt, lanserbart
medlemsprodukt i kode**: passordfri innlogging, skysynkronisering, ekte e-postutsending med
dobbel opt-in, og GDPR-wiring – pluss to små visuelle polish-punkter.

Dette er et stort oppdrag. Jobb i **fasede workstreams (WS1–WS8)**, commit per workstream, og
lever til slutt en **strukturert rapport** (mal nederst) som er skrevet slik at en gjennomgang
i etterkant kan verifisere invarianter og plukke en siste polish-runde. Rapporten er en del av
leveransen, ikke valgfri.

---

## 0. Styrende prinsipp: env-gatet, ærlig degradering (LES FØRST)

Appen skal **aldri påstå** at innlogging, sync eller e-post virker før det faktisk gjør det for
den aktuelle byggekonfigurasjonen. Målgruppa er slitne foreldre med lav kapasitet; én «vi sendte
deg en e-post» som aldri kom koster mer tillit enn ti ærlige «dette kommer senere». Derfor:

- Bygg **hele** medlemsproduktet i kode, men la det være **konfigurasjonsstyrt**:
  - **Backend ikke konfigurert** (ingen Supabase-nøkler i miljøet, slik preview-bygget er nå):
    appen kjører nøyaktig som i dag – lokal-først, med dagens ærlige «alt lagres lokalt»-tekster.
  - **Backend konfigurert** (Supabase-nøkler til stede): innlogging + sync aktiveres, og de
    tilhørende tekstene bytter til den ærlige «innlogget/synkronisert»-varianten.
  - **E-post konfigurert** (Resend-nøkkel + bekreftet avsenderdomene til stede server-side):
    ekte dobbel-opt-in-flyt aktiveres, og «e-postdryppene er ikke i gang ennå» fjernes.
- Ingen simulerte/fake tilstander i frontend. Ingen «magic link»-simulering. Enten ekte, eller
  ærlig «kommer når tjenesten er klar», styrt av faktisk konfigurasjon.
- **Ingen hemmeligheter i repoet.** Alle nøkler leses fra miljøvariabler / Supabase-secrets.
  Lever en `.env.example` med nøkkelnavn og forklaring, aldri reelle verdier.

Konsekvens: preview-bygget (uten Andreas' nøkler) forblir ærlig lokal-først. Idet Andreas legger
inn nøkler + inngår DPA-er + kobler domenet, blir det et ekte produkt – uten ny kodeendring.

---

## 1. Harde invarianter (må IKKE endres/svekkes)

1. **Depoet-logoen bevares** – begge varianter (`/depoet-logo-transparent.png` og
   `-dark-mode.png`) i nav og footer. Ikke erstatt med wordmark.
2. **Sikkerhetsnumre** (113 / 116 117 / 116 111 / 116 123) og SafetyBanner-teksten beholdes ordrett.
3. **Disclaimere/avgrensning** («øvingsrom, ikke behandling») beholdes og svekkes ikke.
4. **Samtykkelogikk** beholdes: aktiv avkryssing, aldri forhåndsvalgt, samtykkelogg med
   tidspunkt + tekstversjon. `wantsReminder` default forblir `false`.
5. **Lokal-først-fallback** forblir en fullverdig førsteklasses modus – innlogging er ALDRI et
   krav for å bruke appen.
6. **Kontinuum grafisk profil** (én oliven-aksent, varmt papir, Lora+Inter, hårfine rammer,
   moss/cream mørke paneler) – ikke bryt den. Ikke endre innholdsstruktur, routing eller kurs.
7. **Ingen infrastruktur denne runden:** ikke rør Cloudflare Worker-ruter, domenekobling
   (`adhd-depoet.com`), DNS eller GitHub Actions. Kun kode + bygg + push + ny Pages-preview.
8. **Kryss-plattform:** commit/push/build kjøres på Windows (unngå CRLF/LF-korrupsjon).

Kildereferanser i repoet du skal følge (de er fasit ved tvil):
`docs/backend-plan-synkronisering.md`, `docs/backend-plan-daglig-epost.md`,
`docs/gdpr-compliance-analyse.md`, `docs/GDPR-personvernplan-Depoet.md`,
`docs/personvernerklæring.md`, `src/data/variantBank.ts`.

---

## 2. Workstreams

### WS1 – Konfigurasjon og miljø-scaffolding
- Legg til en `src/lib/config.ts` som leser `import.meta.env.VITE_*` og eksponerer
  `backendEnabled` (Supabase-nøkler finnes) og `emailEnabled` (flagg satt når Resend-domene er
  bekreftet). Alt annet i appen skal gate på disse, ikke på `import.meta.env.DEV`.
- `.env.example` med: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_EMAIL_ENABLED`
  (+ server-side secrets dokumentert: `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_SIGNING_SECRET`).
- Verifiser at bygg **uten** noen av disse fortsatt kompilerer og kjører som dagens lokal-først-app.

### WS2 – Passordfri innlogging (Supabase magic link)
- Installer `@supabase/supabase-js`. Init klient fra `config.ts` (kun når `backendEnabled`).
- Bygg ekte magic-link-innlogging (e-postlenke, ingen passord, ingen tredjeparts-login i v1).
  Erstatt/gjenbruk den gamle dev-gatede simulerte flyten – ingen simulering skal stå igjen.
- Sesjonshåndtering + utlogging i Profil. Når `backendEnabled` er false: skjul innlogging helt,
  behold dagens «Innlogging og skylagring kommer senere»-tekst.

### WS3 – Synkronisering (lokal ↔ Supabase)
Følg `docs/backend-plan-synkronisering.md` nøyaktig.
- SQL-migrasjon i `supabase/migrations/` med tabeller: `profiles`, `saved_cards`, `reflections`,
  `sunday_reports`, `opt_ins`, `progress`. **RLS på alt**: bruker kan kun lese/skrive egne rader.
- **Synk kun** det planen sier (savedCards, ukesmål/fokus, søndagslandinger, refleksjoner,
  onboarding-svar/optIns/pauseUntil, fullførte moduler). **IKKE synk**: `depoet_seen_prompts`,
  `depoet_visited_app`, `lastCheckIn` (v1), `depoet_theme`.
- Migrering ved første innlogging: last opp hele lokalt depot som utgangspunkt, **idempotent**,
  flett uten tap (savedCards = union; refleksjoner/rapporter slås sammen på id/dato; ved tvil
  behold begge). Aldri «velg hvilken versjon»-skjema.
- localStorage beholdes som offline-cache; sync er bakgrunnsjobb («sist vunnet per felt»), ikke
  blokkerende. Ved `backendEnabled=false`: uendret lokal oppførsel.
- Refleksjoner er svært private: hvis mulig, legg til rette for kryptering på applikasjonsnivå
  (eller dokumenter tydelig i rapporten hvorfor det utsettes).

### WS4 – E-post: dobbel opt-in + utsending (Resend, EU/DPF)
Følg `docs/backend-plan-daglig-epost.md` nøyaktig.
- Server-side via **Supabase Edge Functions** (EU-region). Tabeller: `subscribers`, `consents`,
  `send_log`, `pauses`.
- **Dobbel opt-in:** bryter i app melder interesse; abonnement aktiveres først når bruker klikker
  bekreftelseslenke i en engangs-e-post. Ingen utsendinger før det.
- Endepunkter: bekreft samtykke, avmeld (signert token, **ingen innlogging** nødvendig),
  preferanser. Hver e-post har én-klikks avmelding.
- Daglig cron 07:00 Europe/Oslo som velger variant per abonnent fra `variantBank.ts`
  (flyttes/kopieres til delt bruk slik at app-forhåndsvisning og faktisk utsending aldri drifter).
  Roter så ingen ser samme variant to dager på rad. Ingen åpnings-/klikksporing.
- `pauseUntil` (uke/måned/ubestemt) stopper alle utsendinger server-side; gjenopptak uten
  kommentar om pausen. De fire `optIns`-bryterne mappes til reelle samtykkerecords, ikke bare
  lokale flagg.
- Resend-nøkkel leses fra Edge Function secrets. SPF/DKIM/DMARC er Andreas' DNS-oppgave –
  **ikke gjør det**, men dokumenter nøyaktig hvilke records som trengs i rapporten.
- Ved `emailEnabled=false`: behold «e-postdryppene er ikke i gang ennå / ikke legg inn sensitiv
  informasjon», og la e-postfeltet fungere som ærlig venteliste (interesse lagres, ingen falsk
  «e-post kommer nå»-melding).

### WS5 – GDPR-wiring for serverdata
Følg `docs/gdpr-compliance-analyse.md` Del 5.
- Ekte server-sletting (art. 17) direkte fra app-UI (ikke bare lokal nullstilling); backup-rutiner
  må respektere sletting.
- «Last ned mine data» (art. 20) skal inkludere serverdata når `backendEnabled`.
- Samtykkerecords server-side med tidsstempel + tekstversjonen brukeren faktisk så.
- **Nytt samtykke ved vesentlig endring:** når en eksisterende lokal-kun-bruker slår på sync for
  første gang, vis tydelig at data nå også lagres på server (EU/EØS) og krev nytt aktivt samtykke.
- Oppdater `docs/personvernerklæring.md` + publiser som **/personvern-rute** i appen: fyll inn
  Resend + Supabase som databehandlere, legg til art. 9 særlig-kategori-språk og alderssetning
  («rettet mot voksne over 18 år i foreldrerollen»). Ikke fjern eksisterende korrekt innhold.
- Ikke endre ordlyden i `parentState`-valgene i denne runden (innholdsbeslutning) – men noter i
  rapporten om art. 9-nøytralisering bør vurderes.

### WS6 – Betingede, ærlige frontend-labels + opprydding
- Gjør ALLE «tidlig forhåndsvisning / meldinger sendes ikke ennå / ikke legg inn sensitiv
  informasjon / alt lagres lokalt / kommer senere»-strenger **betinget** på `backendEnabled` /
  `emailEnabled` (se WS1). Ingen streng skal love mer enn konfigurasjonen faktisk leverer.
  Berørte steder minst: `LandingPage.tsx` (linje ~50, ~266, ~350), `App.tsx` (~320-324, ~548,
  ~675, ~784, ~1169), `Onboarding.tsx` (~303), `PrivacyPolicy.tsx` (~44, ~68, ~77),
  `DemoAcuteCard.tsx`.
- Fjern/`import.meta.env.DEV`-gate rene utviklerflater fra produksjonsbygg: seksjon «4. Utgående
  meldingsmaler (forhåndsvisning)» og `previewTab`-blokken i `App.tsx`, samt dev-knapp/dev-panel.
  Behold ekte funksjonalitet.
- Bevar invariantene i §1 gjennom hele denne oppryddingen.

### WS7 – Visuell polish (Kontinuum-disiplin)
- **Sikkerhetsboksens ikon** (⚠︎ ved «Når du trenger mer enn dette», landingssiden): gi det samme
  dempede oliven/amber-tone som resten av profilen i stedet for nøytralt grått.
- **Footer-microcopy** («Tidlig forhåndsvisning · …»): løft kontrasten ett hakk for lesbarhet
  (fortsatt dempet, ikke brødtekst-svart).
- Valgfritt hvis tid (ikke blokkerende, behold Depoet-logoen): bølge-skilletegn/«pust»-laster,
  hero-tekstur/display-vekt. Hopp over hvis det setter hovedleveransen i fare.

### WS8 – Bygg, verifiser, deploy, rapporter
- `npm run lint` (tsc --noEmit) → PASS. `npm run build` (vite) → PASS. `npx tsx
  scripts/smoke-courses.ts` → PASS. Kjør også et bygg **uten** miljønøkler for å bevise at
  lokal-først-fallbacken kompilerer og kjører.
- Commit per workstream med tydelige meldinger; push `origin/main`.
- Deploy **ny Pages-preview** (`*.pages.dev`). Ikke rør domene/Worker-ruter.
- Skriv rapporten (mal under).

---

## 3. Hva Andreas må skaffe før dette går LIVE (kode ≠ juridisk live)

List dette eksplisitt i rapporten, med status og hva som mangler:
1. Supabase-prosjekt i EU-region + `VITE_SUPABASE_URL` / anon-key + service-role for Edge Functions.
2. Resend-konto, verifisert avsenderdomene, `RESEND_API_KEY`, signert **DPA**.
3. DNS: SPF, DKIM, DMARC for e-postdomenet (oppgi eksakte records).
4. Cloudflare DPA verifisert + dokumentert; Supabase + Resend DPA-er signert.
5. Jurist-gjennomgang av art. 9 (særlige kategorier) før ekte brukere.
6. Domenebytte (fjern Worker-ruter, koble Pages) – gjøres av Andreas i en senere runde.
7. WCAG 2.1 AA-audit før bred lansering.

---

## 4. Rapportmal (OBLIGATORISK – skrives til `docs/CODEX-RAPPORT-lansering-v1.md`)

Skriv rapporten slik at en etterkontroll raskt kan verifisere invarianter og plukke siste polish:

1. **Sammendrag** – hva ble gjort, hva ble bevisst utsatt, og hvorfor.
2. **Per workstream (WS1–WS8):** status (ferdig/delvis/utsatt), filer endret, viktige
   beslutninger/antakelser, og hva som IKKE ble gjort + begrunnelse.
3. **Invariant-sjekkliste** – bekreft punkt for punkt (§1): logo bevart, sikkerhetsnumre uendret,
   disclaimere uendret, samtykkelogikk uendret, lokal-først-fallback intakt, ingen hemmeligheter
   committet, Kontinuum-profil intakt, ingen infrastruktur rørt.
4. **Tekst-diff for brukervendte strenger** – tabell: fil/sted, gammel tekst, ny tekst, hvilken
   config-tilstand den vises i. (Slik at ingen ærlig label ble villedende.)
5. **Datamodell** – tabeller, RLS-policyer, hva som synkes / ikke synkes, migrerings-idempotens.
6. **E-post** – opt-in-flyt, avmeldingsmekanisme, cron, variant-rotasjon, nødvendige DNS-records.
7. **GDPR** – art. 17-sletting, art. 20-eksport, samtykkerecords, /personvern-rute, endringer i
   personvernerklæringen.
8. **Bygg/verifisering** – utskrift/resultat av lint, build, smoke, og fallback-bygg (uten nøkler).
9. **«Må skaffes før live»** – §3-listen med status.
10. **Avvik fra denne prompten** + begrunnelse.
11. **Åpne spørsmål / risikoer** som trenger menneskelig avgjørelse.
12. **Ny preview-URL** + en liste over UI-tilstander som bør sjekkes visuelt (backend av/på,
    e-post av/på, lys/mørk), gjerne med skjermbilder.

Ikke marker oppdraget som fullført med feilende lint/build/smoke eller delvis implementasjon –
da beskriver du det ærlig som «delvis» i rapporten.
