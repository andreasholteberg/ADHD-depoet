# ADHD Depoet

Et digitalt øvingsrom for foreldre til barn med ADHD og reguleringsutfordringer, bygget på
boken **Førersetet** av Andreas Holteberg. Ikke en metode med fasit – et blikk, et språk og
en retning, i små daglige doser.

## Personvernprinsipp (viktigst først)

Appen er **lokal først**. Uten klientvariabler lagres alt bare i brukerens nettleser. Når den
prosjektlåste Supabase-konfigurasjonen er aktiv, kan strukturert konto- og progresjonsdata
synkroniseres etter aktiv godkjenning. Fritekst forblir lokal i denne versjonen. Appen har ingen
analyse- eller annonseverktøy og ingen AI-integrasjon. Se
`docs/GDPR-personvernplan-Depoet.md` og `docs/personvernerklæring.md`.

Endringer som innebærer at data forlater enheten (konto, synk, e-postutsending) skal følge
faseplanen og stoppunktene i personvernplanen – aldri innføres i forbifarten.

## Kjøre lokalt

Krever Node.js.

```bash
npm install
npm run dev        # utviklingsserver på port 3000
npm run lint       # typesjekk (tsc --noEmit)
npm run build      # produksjonsbygg til dist/
npx tsx scripts/smoke-courses.ts   # innholdsrøyk-test for kursene
```

Ingen miljøvariabler er nødvendige for lokal-først-modus. Backend aktiveres bare med den eksakte
prosjekt-URL-en for ADHD Depoet og en moderne `sb_publishable_…`-nøkkel:

```text
VITE_SUPABASE_URL=https://uipsaeojwjehrbylfgrx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<navngitt publishable key>
VITE_EMAIL_ENABLED=false
```

Legacy `anon`-JWT aksepteres ikke av klienten. Cloudflare Pages Functions bruker tilsvarende
offentlige `SUPABASE_URL` og `SUPABASE_PUBLISHABLE_KEY` uten `VITE_`-prefiks. Ingen secret key,
PAT eller serverhemmelighet skal legges i Vite-miljøet eller klientbygget.

## Struktur

- `src/components/` – flatene: I dag, Hva gjør jeg nå?, Søndagsverkstedet, Kurs, Språkbank, Mitt depot
- `src/data/` – alt innhold: kurs (9 kurs / 32 moduler), dagsprompts, språkkort, situasjonskort, meldingsmaler
- `src/context/AppStateContext.tsx` – all tilstand, lagres i localStorage (`depoet_*`-nøkler)
- `src/lib/` – hjelpere (eksport av egne data, deling, temavalg, rotasjon, speiling)
- `docs/` – planer, GDPR-dokumentasjon, innholdsplaner og lanseringssjekkliste

## Dokumentasjon

Start med `docs/LANSERING-sjekkliste.md` (status og rekkefølge) og
`docs/rapport-innhold-utforming-gdpr-juli2026.md` (siste helhetsgjennomgang).
