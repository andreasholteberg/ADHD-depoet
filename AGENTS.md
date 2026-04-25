# AGENTS.md – DEPOTET

Du er kodeagent for Depotet.

Depotet er en nettside og senere digital plattform for foreldre til barn med ADHD, reguleringsvansker og hyppige konflikter hjemme.

## Absolutt kjerne

Bygg aldri en vanlig kursplattform.

Depotet skal være et rolig, operativt system som gir brukeren én tydelig handling av gangen.

Hovedprinsipp:

> Kompleksitet i systemet. Ekstrem enkelhet for brukeren.

Brukeren skal ikke møte mange valg, tung teori eller et stort kursbibliotek som første opplevelse.

## Nåværende fase

Nåværende fase er:

> PHASE 1 – LANDINGSSIDE OG AKUTTFUNKSJON

I denne fasen skal du kun bygge:

- forside
- global navigasjon
- `/det-smeller-na`
- `/nodbremsen`
- `/depotet`
- `/kurs`
- `/veiledning`
- `/logg-inn`
- enkel statisk struktur
- rolig mobil-først design

## Ikke bygg nå

Du skal ikke implementere:

- autentisering
- database
- AI
- RAG
- chat
- Stripe
- abonnement
- booking
- CMS
- adminpanel
- brukerprofiler
- betalingsflyt
- e-postsystem
- dashboard
- progresjonssystem
- kursavspiller
- videoplattform

Hvis du mener noe av dette trengs, skal du stoppe og dokumentere det i `docs/CHANGELOG.md` i stedet for å bygge det.

## Dokumentlesing

Les alltid denne filen først.

Les deretter bare dokumenter som er relevante for oppgaven:

- Ved strategi eller produktspørsmål: `docs/MASTERPLAN.md`
- Ved synlig tekst eller faglig innhold: `docs/CONTENT_SOURCE.md` og `docs/COPY_BANK.md`
- Ved ruter, komponenter og teknisk struktur: `docs/ARCHITECTURE.md`
- Ved design, farger, typografi og layout: `docs/DESIGN_SYSTEM.md`
- Ved usikkerhet om hva som er lov: `docs/GUARDRAILS.md`
- Ved fasearbeid: `docs/PHASE_1.md`
- Før du avslutter fasen: `docs/ACCEPTANCE_CRITERIA.md`

Ikke last inn alle dokumenter for små endringer.

Eksempel:

- Hvis oppgaven gjelder farge på knapp: les `AGENTS.md` og `DESIGN_SYSTEM.md`.
- Hvis oppgaven gjelder ny rute: les `AGENTS.md`, `ARCHITECTURE.md` og `PHASE_1.md`.
- Hvis oppgaven gjelder synlig tekst: les `AGENTS.md`, `CONTENT_SOURCE.md` og `COPY_BANK.md`.
- Hvis oppgaven gjelder om noe er lov å bygge: les `AGENTS.md` og `GUARDRAILS.md`.
- Hvis oppgaven gjelder faseavslutning: les `AGENTS.md`, `PHASE_1.md` og `ACCEPTANCE_CRITERIA.md`.

## Innholdskilder

Når du skriver synlig tekst for nettsiden, skal du lese:

- `docs/CONTENT_SOURCE.md`
- `docs/COPY_BANK.md`

Du skal ikke finne opp nye faglige forklaringer, produktnavn, metaforer eller løfter.

Hvis du trenger tekst som ikke finnes i disse dokumentene, skal du skrive en kort placeholder og notere i `docs/CHANGELOG.md`:

“Trenger godkjent tekst fra innholdskilde.”

## Innholdsregel

Synlig tekst skal være lojal mot Depotets begreper:

- kapasitet før vilje
- kraftig motor
- forsinket styringssystem
- lånte bremser
- Det smeller nå
- Nødbremsen
- Depotet
- I DAG
- Søndagsverkstedet
- Verktøykassa
- Øvelseskjøring
- Autovern
- Trafikkdirigenten
- Det relasjonelle kompasset
- Sjåførens eget maskineri
- kontinuitet over tid

Ikke innfør nye modeller uten godkjenning.

## Produktregler

- Én tydelig hovedhandling per skjerm.
- Ingen komplekse dashboards.
- Ingen synlig AI.
- Ingen medisinske eller terapeutiske løfter.
- Ingen språkbruk som gir forelderen skyld.
- Ingen store menyer.
- Ingen generisk SaaS-estetikk.
- Ingen unødvendige animasjoner.
- Ingen funksjoner som øker kognitiv belastning.
- Ingen ny funksjonalitet uten at den støtter Phase 1.

## Språk

Stemmen skal være:

- varm
- nøktern
- konkret
- rolig
- handlingsorientert

Ikke bruk hype.

Ikke bruk fraser som:

- revolusjonerende
- banebrytende
- transformer livet ditt
- AI-drevet
- smart plattform
- fremtidens foreldrestøtte
- magisk
- endelig løsningen
- ta kontroll over barnet
- bli en bedre forelder

Bruk korte setninger.

Skriv for en utslitt forelder.

Ikke skriv for en investor, teknolog eller kurskjøper.

## Teknisk arbeidsmåte

Gjør små, avgrensede endringer.

Ikke omskriv hele prosjektet hvis oppgaven gjelder én komponent.

Ikke installer nye biblioteker uten tydelig grunn.

Ikke legg inn API-nøkler eller hemmeligheter.

Ikke hardkod fremtidige backend-løsninger.

Ikke bygg mock-backend hvis Phase 1 ikke trenger det.

Ikke introduser teknisk kompleksitet for å “forberede fremtiden”.

Phase 1 skal være enkel, statisk og robust.

## Ytelse

`/det-smeller-na` er kritisk.

Den skal være raskeste side i prosjektet.

Den skal ikke være avhengig av:

- server-side rendering
- database
- API
- auth
- cookies
- AI
- Stripe
- bilder
- video
- tung JavaScript

## Etter hver arbeidsøkt

Oppdater `docs/CHANGELOG.md` med:

- hva som ble opprettet
- hva som ble endret
- hva som ikke ble gjort
- tester som ble kjørt
- kjente problemer

Kjør når relevant:

```bash
npm run lint
npm run build
```

Hvis noe feiler, dokumenter feilen konkret.

## Stoppregel

Hvis du er usikker på om en funksjon hører hjemme i Phase 1, skal du ikke bygge den.

Dokumenter heller usikkerheten i `docs/CHANGELOG.md`.
