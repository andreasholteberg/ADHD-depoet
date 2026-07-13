# ADHD Depoet

Et digitalt øvingsrom for foreldre til barn med ADHD og reguleringsutfordringer, bygget på
boken **Førersetet** av Andreas Holteberg. Ikke en metode med fasit – et blikk, et språk og
en retning, i små daglige doser.

## Personvernprinsipp (viktigst først)

**Alt lagres kun lokalt i brukerens nettleser (localStorage). Ingenting sendes til noen server.**
Appen har ingen backend, ingen sporing, ingen analytics, ingen tredjepartsskript og ingen
AI-integrasjon. Dette er et bevisst arkitekturvalg («lokal først»), ikke en midlertidighet –
se `docs/GDPR-personvernplan-Depoet.md` (master for personvernarbeidet) og
`docs/personvernerklæring.md` (kilde til sannhet for brukervendt personverntekst).

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

Ingen miljøvariabler er nødvendige. Appen er en ren statisk frontend (React 19 + Vite +
Tailwind v4) og kan deployes som statiske filer (f.eks. Cloudflare Pages).

## Struktur

- `src/components/` – flatene: I dag, Hva gjør jeg nå?, Søndagsverkstedet, Kurs, Språkbank, Mitt depot
- `src/data/` – alt innhold: kurs (9 kurs / 32 moduler), dagsprompts, språkkort, situasjonskort, meldingsmaler
- `src/context/AppStateContext.tsx` – all tilstand, lagres i localStorage (`depoet_*`-nøkler)
- `src/lib/` – hjelpere (eksport av egne data, deling, temavalg, rotasjon, speiling)
- `docs/` – planer, GDPR-dokumentasjon, innholdsplaner og lanseringssjekkliste

## Dokumentasjon

Start med `docs/LANSERING-sjekkliste.md` (status og rekkefølge) og
`docs/rapport-innhold-utforming-gdpr-juli2026.md` (siste helhetsgjennomgang).
