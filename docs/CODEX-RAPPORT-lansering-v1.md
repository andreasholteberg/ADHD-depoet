# CODEX-RAPPORT – lansering v1 medlemsplattform

Dato: 2026-07-13

## Kort status

Depoet er oppdatert fra ren statisk lokal preview til en env-gatet, kodeklar medlemsplattform.
Standardbygg uten nøkler fungerer fortsatt lokal-først: ingen login, ingen sync-løfter, ingen
e-postutsending og ingen Resend-servernøkler i frontend.

## Implementert

- `src/lib/config.ts` styrer `backendEnabled` og `emailEnabled`.
- Supabase-klient og sync-service er lagt inn, men er inaktive uten `VITE_SUPABASE_URL` og
  `VITE_SUPABASE_ANON_KEY`.
- Magic-link-login vises bare når backend er konfigurert.
- Sync krever aktivt samtykke.
- Fritekst-sync krever eget aktivt samtykke og er av som standard.
- Lokal lagring beholdes som fallback/offline-cache.
- Dataeksport inkluderer serverdata når bruker er innlogget og backend er aktiv.
- Sletting forsøker server-sletting når bruker er innlogget, og sletter ellers lokalt.
- Landingsside-e-post lagrer interesse lokalt når e-post ikke er aktiv.
- E-postflyt går via Supabase Edge Function bare når `emailEnabled=true`.
- Dev-/meldingspreviewer er produksjonsgated.
- Google Fonts-import er fjernet; Inter/Lora lastes via `@fontsource`.
- Ubrukt Express/dotenv-hygiene er ryddet.
- Gemini-capability er fjernet fra `metadata.json`.
- `/personvern`-rute er lagt til via eksisterende SPA-fallback.
- Personverndokumentasjon er oppdatert med live-status, Supabase/Resend som planlagt,
  art. 9-vurdering og voksenmålgruppe.
- Visuell polish: safety-ikonet er dempet amber, footer-microcopy har høyere kontrast.

## Supabase/Resend-kode

Lagt inn som kildekode, ikke deployet/applied:

- `supabase/migrations/202607130001_lansering_v1_schema.sql`
- `supabase/functions/request-opt-in`
- `supabase/functions/confirm-opt-in`
- `supabase/functions/unsubscribe`
- `supabase/functions/preferences`
- `supabase/functions/daily-dispatch`
- felles CORS, signerte tokens, Resend-hjelper og meldingsbank i `supabase/functions/_shared`

Tabeller med RLS/kodeklar struktur:

- `profiles`
- `saved_cards`
- `progress`
- `opt_ins`
- `reflections`
- `sunday_reports`
- `subscribers`
- `consents`
- `send_log`
- `pauses`

## Verifisering

- `npm run lint`: OK
- `npm run build`: OK
- `npx tsx scripts/smoke-courses.ts`: OK
  - Output: `SMOKE-TEST: PASS - 9 kurs, 32 moduler, alle kontrakter OK`
- Build uten env-nøkler: OK
  - Lokal sjekk viste bare `.env.example`.
  - Dist-søk fant ingen `RESEND_API_KEY`, `EMAIL_SIGNING_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`
    eller `resend.com` i frontendbygget.
- `dist`: opprettet

Build-merknad:

- Vite gir chunk-size-warning for hovedbundle ca. 933 kB minified. Dette er en ytelsesmerknad,
  ikke build-feil.

## Preview

- Pages-preview: venter på deploy

## Viktige avgrensninger

- Ingen DNS, domener, Worker-ruter eller GitHub Actions er rørt.
- Ingen Supabase-migrasjoner er kjørt live.
- Ingen Edge Functions er deployet live.
- Ingen Resend-nøkler eller andre hemmeligheter er committet.
- SMS er fortsatt bare et lokalt preferansefelt/ønske i v1; ingen SMS-provider er koblet.
- Fritekst-sync er kodeklart og samtykkegatet, men live personvernvurdering/DPIA bør gjøres før
  bred aktivering.
- Førsteinnloggings-synk laster lokale data idempotent til server. Full konflikt-UI og avansert
  server-til-lokal merge bør herdes i neste fase.

## Bør vente til neste fase

- Supabase-prosjekt, DPA og migrasjon/apply i live miljø.
- Resend-konto, domeneverifisering, DPA og produksjonssecrets.
- Cron-oppsett for daglig dispatch kl. 07:00 Europe/Oslo.
- Deno/Supabase function-lint og lokal Supabase-test.
- Juridisk gjennomgang av personvernerklæring og art. 9-vurdering.
- Konflikt- og eksport-QA med reell Supabase-session.
- Ytelsespass/code splitting av hovedbundle hvis Pages-målinger tilsier det.
