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
- [ ] Laget separat Fase 1-commit.

### Verktøystatus

Prosjektets `.codex/config.toml` peker korrekt mot den prosjektavgrensede OAuth-baserte
Supabase MCP-serveren, uten `account`-feature. MCP-serveren er ikke lastet i denne allerede
åpne Codex-prosessen. Den skrivebeskyttede Fase 1-innhentingen ble derfor gjort i det
innloggede Supabase-panelet. Ingen SQL, migrasjon, funksjonsdeploy eller annen skriving er
utført i Supabase.

## Fase 2 – produkt- og synkroniseringslogikk

- [ ] Ikke startet.

## Fase 3 – Auth-kontrakt

- [ ] Ikke startet i denne ferdigstillingsrunden.
- Ekstern Auth-konfigurasjon, testmail og manuell tokenflyt er stoppunkter som krever
  uttrykkelig godkjenning.

## Fase 4 – Cloudflare Pages-preview

- [ ] Ikke startet.
- Produksjons-apex og eksisterende Worker røres ikke uten separat cutover-godkjenning.
