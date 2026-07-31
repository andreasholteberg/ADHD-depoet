# Bygg og deploy — ADHD Depoet

Gjelder Cloudflare Pages-prosjektet `adhd-depoet-app`, som betjener
`https://adhd-depoet.com`.

Skrevet 31. juli 2026, etter at produksjonsbygget ble reprodusert byte-identisk
fra kilde. Bakgrunnen var konkret: en isolert hotfix kunne ikke deployes fordi
byggmiljøet ikke var dokumentert noe sted, og et bygg uten de riktige
variablene ville sendt ut en app uten Supabase-konfigurasjon — altså med
ødelagt innlogging.

## Kort oppsummert

| | |
|---|---|
| Pages-prosjekt | `adhd-depoet-app` |
| Produksjonsbranch (etikett) | `main` |
| Git-integrasjon | **ingen** — Cloudflare bygger ikke kildekoden |
| Deploymetode | **Direct Upload** med Wrangler |
| Bygget lages | **lokalt**, av deg |

Fordi prosjektet ikke er koblet til Git, finnes det ingen automatisk bygging.
Det som lastes opp, er nøyaktig den `dist/` du har bygget på egen maskin. Da er
det byggmiljøet ditt — ikke Cloudflare — som avgjør hva kundene får.

## Påkrevde produksjonsvariabler

Disse **skal** være satt:

| Variabel | Leses i | Virkning |
|---|---|---|
| `VITE_SUPABASE_URL` | `src/lib/config.ts` | Supabase-klientens URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `src/lib/config.ts` | Publishable client key |

`resolveAppConfig` setter `backendEnabled` til `true` bare når URL-en er
nøyaktig lik `SUPABASE_PROJECT_URL` (utledet av `SUPABASE_PROJECT_REF`, som er
hardkodet i samme fil) **og** nøkkelen matcher
`^sb_publishable_[A-Za-z0-9_-]{16,}$`. Er én av dem feil, faller hele
kontofunksjonen bort uten feilmelding — appen laster, men innlogging virker
ikke.

## Variabler som skal være USATT

Disse **skal ikke** settes hvis du vil reprodusere dagens produksjon:

| Variabel | Hvorfor usatt |
|---|---|
| `VITE_AUTH_CALLBACK_URL` | Se under |
| `VITE_EMAIL_ENABLED` | Se under |

**`VITE_AUTH_CALLBACK_URL`.** `resolveAuthCallbackUrl` i
`src/lib/authRedirect.ts` godtar bare to verdier: produksjonscallbacken eller
den godkjente preview-callbacken. Alt annet ignoreres, og funksjonen faller
tilbake til `https://adhd-depoet.com/auth/callback`. Når variabelen er usatt,
inliner Vite den som `void 0`, og oppførselen blir nøyaktig den samme som om
den var satt til produksjonscallbacken. Setter du den likevel, endrer du
bundelens bytes uten å endre oppførselen — og et bygg som skal sammenliknes
med produksjon blir plutselig ulikt.

**`VITE_EMAIL_ENABLED`.** `emailEnabled` blir
`backendEnabled && flag === 'true'`. Uten flagget blir `emailFlag` en tom
streng, og e-postfunksjonen er avslått. Det er dagens produksjonstilstand:
daglige utsendinger er ikke aktivert. Å sette flagget til `'true'` skrur på en
funksjon som ikke er klar.

**`DISABLE_HMR`** leses bare i `vite.config.ts` for dev-serverens HMR og
filovervåking. Den har **ingen** effekt på et produksjonsbygg.

## `.env.production.local`

Bygget leser variablene fra `.env.production.local` i prosjektroten.

- Fila er **gitignorert** via `.env*` i `.gitignore`.
- Den skal **aldri** committes.
- Den skal inneholde **kun** de to `VITE_`-variablene over.

`VITE_`-variabler er **offentlig klientkonfigurasjon**. Vite baker dem inn i
JavaScript-bundelen som leveres til enhver besøkende. Behandle dem deretter:
de er ikke hemmeligheter, men de er heller ikke et sted å legge noe som er det.

**Service-role key skal aldri inn i klientbygget.** Den omgår RLS fullstendig.
Havner den i en `VITE_`-variabel, ligger den lesbar i bundelen for alle. Server-
siden hemmeligheter hører hjemme i Pages-prosjektets krypterte secrets, ikke i
byggmiljøet.

## Byggeprosedyre

Bruk en **ren checkout eller worktree** på den commiten som skal deployes. Ikke
bygg fra et arbeidstre med ukommitterte endringer — da vet du ikke hva du
sender ut.

```bash
git worktree add --detach ../_build <commit>
cd ../_build
cp <sted>/.env.production.local .env.production.local

npm ci
npm install --include=dev --no-save   # se merknad under
npm run lint                          # typecheck
npm test                              # enhetstester
npm run build
```

**Merknad om devDependencies.** Er `NODE_ENV=production` satt i miljøet, hopper
`npm ci` over devDependencies, og `tsc` mangler. Da feiler typecheck med
«'tsc' is not recognized». Det andre installasjonssteget retter dette.
Byggeresultatet er upåvirket — verifisert med identiske SHA-256-hasher før og
etter.

### Kontroller før deploy

```bash
# 1. De to Supabase-variablene skal ligge i bundelen
grep -o 'VITE_SUPABASE_URL:"[^"]*"' dist/assets/index-*.js
grep -oE 'VITE_SUPABASE_PUBLISHABLE_KEY:"sb_publishable_[A-Za-z0-9_-]{4}' dist/assets/index-*.js

# 2. Callback skal falle tilbake til produksjon, ikke være eksplisitt satt
grep -c 'VITE_AUTH_CALLBACK_URL' dist/assets/index-*.js     # forventet: 0
grep -c 'adhd-depoet.com/auth/callback' dist/assets/index-*.js  # forventet: 1

# 3. E-postflagget skal ikke stå i env-objektet
#    (navnet forekommer 1x som property-oppslag, men ikke som nøkkel med verdi)

# 4. Ingen serverhemmeligheter
grep -E 'service_role|sk_live|whsec_|-----BEGIN' dist/assets/*.js   # forventet: ingen treff

# 5. Domener
grep -c 'adhd-depoet\.com' dist/assets/index-*.js   # forventet: 3
grep -c 'adhd-depoet\.no'  dist/assets/index-*.js   # forventet: 0
```

Skal du verifisere at bygget matcher dagens produksjon, last ned den aktive
bundelen fra `https://adhd-depoet.com/assets/index-*.js` og sammenlikn SHA-256.
Bygget er deterministisk: samme commit og samme to variabler gir samme hash,
inkludert filnavn.

## Deploy

```bash
npx wrangler pages deploy dist \
  --project-name adhd-depoet-app \
  --branch main \
  --commit-hash <full-sha>
```

`--branch main` er prosjektets eksisterende produksjonsbranch-etikett. Å bruke
den endrer **ingen** prosjektinnstilling. `--commit-hash` er det eneste som
knytter deploymentet til en bestemt commit, og uten den blir sporbarheten borte
— derfor er den obligatorisk her, ikke valgfri.

**Ikke endre** production branch, Git-integrasjon, DNS, Workers-ruter, Supabase,
autentiseringskonfigurasjon eller Stripe for å få ut et bygg.

### Etter deploy

Kontroller på alle tre flatene, som skal servere samme bundle:

- immutable URL: `https://<deployment-id>.adhd-depoet-app.pages.dev`
- prosjektalias: `https://adhd-depoet-app.pages.dev`
- live domene: `https://adhd-depoet.com`

Sjekk at `/`, `/auth/callback` og `/api/content` svarer 200, at appen
initialiseres uten konsollfeil, og at innloggingsgrensesnittet lastes. **Ikke
fullfør en innlogging som sender e-post** uten at det er avtalt.

En merknad om HTML-sammenlikning: Cloudflare injiserer et
`__CF$cv$params`-skript på rundt 930 tegn i den serverte HTML-en. Det er
botdeteksjon lagt til på edge og finnes ikke i `dist/index.html`. Det er ikke
et avvik.

## Rollback

Deployments er immutable. Rull tilbake ved å forfremme en tidligere deployment
i Cloudflare-dashboardet under Pages → `adhd-depoet-app` → Deployments.

| Deployment | Kildecommit | Merknad |
|---|---|---|
| `a280cbdd-5928-4eb9-bb3d-941e78b3a53a` | `51adfc5` | Aktiv per 31. juli 2026 |
| `1fa36429-cfd3-4c02-9c54-c6e7242520a5` | `a6298c5` | Primært rollbackpunkt |
| `2ad77d3a-10bc-489a-a9d7-e14a45aaf259` | `aa9935d` | Sekundært rollbackpunkt |

## Branchmodell

`main` peker på commiten som kjører i produksjon. Etter justeringen 31. juli
2026 er dette `51adfc5`.

Fram til da var `main` 23 commits bak produksjon, mens deployments likevel bar
etiketten `main`. Etiketten løy, og det var ikke mulig å lese av hva som faktisk
kjørte uten å sammenlikne bundler. Sikkerhetstaggen
`backup/main-before-production-alignment-2026-07-31` bevarer den gamle
posisjonen.

Produksjonsreleaser tagges annotert etter mønsteret
`release/adhd-depoet-<dato>-<kort-beskrivelse>`.
