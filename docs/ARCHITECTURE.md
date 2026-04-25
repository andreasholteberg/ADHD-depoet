# ARCHITECTURE – DEPOTET

## Teknisk mål

Bygg en rask, mobil-først nettside som kan starte enkelt, men senere utvides til en full plattform med innlogging, Stripe, database, AI-motor og RAG.

Phase 1 skal være enkel og statisk nok til å kunne deployes raskt.

## Anbefalt stack

- Framework: Next.js App Router
- Styling: Tailwind CSS
- Hosting: Cloudflare Pages
- Senere backend: Cloudflare Workers
- Senere database: Cloudflare D1
- Senere AI: Cloudflare Workers AI
- Senere RAG: Cloudflare Vectorize
- Senere betaling: Stripe

## Arkitektonisk hovedregel

Frontend skal bygges slik at Phase 1 fungerer uten database, AI og Stripe-integrasjon.

Ingen fremtidig funksjon skal hardkodes inn på en måte som blokkerer senere utvidelse.

Phase 1 skal være statisk først.

Fremtidig arkitektur i dette dokumentet er kun planlegging.

Codex skal ikke opprette fremtidige mapper, modeller, API-ruter, auth-oppsett eller backend-filer i Phase 1 bare fordi de er nevnt her.

## Statisk først

Phase 1 skal bygges som statiske sider.

Alle sider i Phase 1 skal kunne fungere uten backend.

Følgende ruter skal være statiske:

- `/`
- `/det-smeller-na`
- `/nodbremsen`
- `/depotet`
- `/kurs`
- `/veiledning`
- `/logg-inn`

Ingen rute i Phase 1 skal kreve:

- database
- autentisering
- API-kall
- AI
- RAG
- Stripe
- cookies
- server actions

## Foreslått rutestruktur

```txt
/
  Forside

/det-smeller-na
  Akutt reguleringsside

/nodbremsen
  Salgsside for Nødbremsen

/depotet
  Presentasjon av kjerneproduktet

/kurs
  Oversikt over temakurs

/veiledning
  Premium / 1:1 / profesjonelle

/logg-inn
  Placeholder i Phase 1

/app
  Fremtidig innlogget Depotet-visning
```

## Prosjektstruktur

Prosjektet skal bygges med denne toppnivåstrukturen:

```txt
adhd-depotet/
├── AGENTS.md
├── docs/
│   ├── MASTERPLAN.md
│   ├── CONTENT_SOURCE.md
│   ├── COPY_BANK.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── GUARDRAILS.md
│   ├── PHASE_1.md
│   ├── ACCEPTANCE_CRITERIA.md
│   └── CHANGELOG.md
├── src/
├── public/
├── package.json
└── README.md
```

Appkode i Next.js skal ligge under `src/`, ikke direkte i prosjektroten.

## Foreslått komponentstruktur

```txt
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── det-smeller-na/
│   │   └── page.tsx
│   ├── nodbremsen/
│   │   └── page.tsx
│   ├── depotet/
│   │   └── page.tsx
│   ├── kurs/
│   │   └── page.tsx
│   ├── veiledning/
│   │   └── page.tsx
│   ├── logg-inn/
│   │   └── page.tsx
│   └── app/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── CrisisButton.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ThreeStepModel.tsx
│   │   ├── FirstAidSection.tsx
│   │   ├── DepotetSection.tsx
│   │   └── GuideSection.tsx
│   ├── crisis/
│   │   └── CrisisFlow.tsx
│   └── shared/
│       ├── CTAButton.tsx
│       ├── Section.tsx
│       └── Card.tsx
├── content/
│   ├── products.ts
│   ├── courses.ts
│   └── copy.ts
└── styles/
```

Dette er en anbefalt struktur, ikke et krav om å lage alle filene i første omgang.

Lag bare filer som faktisk trengs for Phase 1.

## Global navigasjon

Header skal ha få valg:

* Logo
* Det smeller nå
* Få hjelp i kveld
* Depotet
* Logg inn

Lenken “Få hjelp i kveld” skal peke til `/nodbremsen`.

Ingen stor meny i Phase 1.

“Det smeller nå” skal være visuelt tydeligere enn resten av navigasjonen.

## Forsidearkitektur

Forsiden skal ha denne rekkefølgen:

1. Hero
2. Akutt CTA
3. 3-stegs modell
4. Nødbremsen / bok
5. Temakurs som problemløsere
6. Depotet som kjerneprodukt
7. Kort om guider
8. Veiledning som premium
9. Avsluttende CTA

## “Det smeller nå”-arkitektur

Denne siden skal være ekstremt enkel.

Krav:

* mørk bakgrunn
* stor tekst
* ingen menyvalg utover nødvendig
* ingen teori
* ingen salg først
* én instruksjon om gangen
* ingen bilder
* ingen video
* ingen tunge komponenter

Foreslått flyt:

1. Stopp opp.
2. Pust.
3. Si: “Dette ble for mye. Vi tar en pause.”
4. Gå unna.
5. Etterpå: “Vil du ha hjelp til resten av kvelden?”

CTA etter regulering:

* Gå til Nødbremsen

## Akuttruten er særskilt beskyttet

`/det-smeller-na` skal ikke gjenbruke tunge komponenter dersom de øker lastetid eller kompleksitet.

Den kan ha egen minimal layout.

Akuttsiden trenger ikke samme visuelle struktur som resten av siden.

Hvis prosjektet bruker Next.js App Router, skal siden være statisk generert.

Bruk gjerne:

```ts
export const dynamic = "force-static";
```

Hvis dette ikke passer teknisk, skal Codex dokumentere hvorfor i `docs/CHANGELOG.md`.

Akuttruten skal heller ikke laste:

* analytics-scripts
* tredjeparts widgets
* embeds
* tracking-piksler
* eksterne fontavhengigheter

## Nødbremsen-arkitektur

Siden `/nodbremsen` skal være en enkel salgsside.

Innhold:

* hero
* konkret problem
* hva produktet hjelper med
* hva brukeren får
* hvorfor dette ikke er en full løsning
* bro til Depotet
* CTA

I Phase 1 skal kjøpsknapp være placeholder.

## Depotet-presentasjon

Depotet-siden skal ikke selge “masse innhold”.

Den skal selge:

* én retning hver dag
* mindre kaos
* mindre dårlig samvittighet
* mer kontinuitet
* støtte når man ikke orker å tenke

## Kursarkitektur

Kurs skal presenteres problemstyrt.

Ikke start med:

> Våre kurs

Start heller med:

> Hvor krasjer det oftest?

Hvert kurskort skal ha:

* problem
* kort forklaring
* hva kurset hjelper med
* bro til Depotet

## Veiledningsarkitektur

Veiledning er premium.

Skal ikke bygges som booking i Phase 1.

Kun statisk presentasjon.

Mulige nivåer:

* 1:1 foreldreveiledning
* begrenset familieveiledning
* profesjonell veiledning

## Fremtidig innlogget Depotet

Ikke bygg full funksjonalitet i Phase 1, men strukturen må kunne støtte dette senere:

```txt
/app
  I DAG

/app/sondag
  Søndagsverkstedet

/app/verktoykassa
  Sekundært fordypningslag

/app/det-smeller-na
  Akuttfunksjon for innloggede brukere
```

Ikke opprett disse rutene i Phase 1.

## Fremtidige datamodeller

Ikke implementer database i Phase 1, men planlegg for:

```ts
User {
  id
  email
  createdAt
  stripeCustomerId
  subscriptionStatus
}

Profile {
  userId
  currentCrashArea
  onboardingCompleted
}

DailyAction {
  id
  userId
  date
  actionText
  sourceTheme
}

WeeklyReflection {
  id
  userId
  week
  crashCount
  note
}
```

Ikke opprett schema-filer, ORM-oppsett, migrasjoner eller mock-data for dette i Phase 1.

## Fremtidige funksjoner skal isoleres

Ikke bland fremtidig AI-, database- eller betalingslogikk inn i Phase 1-komponenter.

Bruk heller placeholders med tydelig tekst.

Eksempel:

```tsx
// TODO Phase 2: Replace placeholder CTA with Stripe checkout.
```

Ikke opprett `lib/ai`, `lib/auth`, `lib/stripe`, API-ruter eller tilsvarende Phase 2-filer i Phase 1.

## AI-prinsipp for senere fase

AI skal ikke være synlig som produktfeature.

AI skal kun:

* velge dagens handling
* formulere kort
* hente fra godkjent faglig materiale
* redusere kompleksitet
* speile progresjon nøkternt
* koble handling til riktig tema

AI skal ikke:

* opptre som terapeut
* gi medisinske råd
* gi mange alternativer
* skrive lange forklaringer
* gi diagnoser
* anbefale medisiner
* overstyre fagpersonell

## Fremtidig AI-format

AI-svar skal følge dette mønsteret:

1. Empatisk validering.
2. Én konkret handling.
3. Kort bro til relevant verktøy eller tema.

Maks 3–5 setninger.

Ingen punktlister i akuttmodus.

## Ytelseskrav

Phase 1 skal prioritere:

* rask lasting
* lite JavaScript
* enkel CSS
* statiske sider
* mobil først
* god lesbarhet

Unngå:

* store animasjonsbiblioteker
* tunge UI-biblioteker
* unødvendige ikoner
* store bilder
* video på første visning
* dynamisk rendering
