# PHASE 1 – LANDINGSSIDE OG AKUTTFUNKSJON

## Formål

Bygg første fungerende versjon av nettsiden.

Denne fasen skal ikke bygge hele Depotet.

Den skal etablere:

1. Forside
2. Global navigasjon
3. “Det smeller nå”
4. Nødbremsen-side
5. Depotet-presentasjon
6. Kursoversikt
7. Veiledningsside
8. Logg inn-placeholder
9. Enkel visuell identitet

## Viktig begrensning

Ikke implementer:

- innlogging
- database
- AI
- RAG
- abonnement
- booking
- CMS
- admin
- brukerprofiler
- betalingsflyt
- e-postsystem
- kursavspiller

Dette kommer senere.

## Primært mål

Brukeren skal raskt forstå:

1. Her forstår de meg.
2. Jeg kan få hjelp i kveld.
3. Depotet er systemet som hjelper meg videre.

## Sekundært mål

Prosjektet skal få en ryddig kodebase som senere kan utvides uten å bygges om fra bunnen.

## Sider som skal bygges

### `/`

Forside.

Skal inneholde:

- Hero med hovedbudskap
- Tydelig knapp til “Det smeller nå”
- Tydelig knapp til “Få hjelp i kveld”
- 3-stegs modell: Forstå, håndtere, opprettholde
- Kort presentasjon av Nødbremsen
- Kort presentasjon av Depotet
- Kort presentasjon av temakurs
- Kort presentasjon av veiledning
- Avsluttende CTA

Hero-tekst:

```txt
Når det smeller hjemme – hva gjør du da?
```

Undertekst:

```txt
Du trenger ikke bli roligere. Du trenger noe å gjøre.
```

CTA-er:

```txt
Det smeller nå
Få hjelp i kveld
```

Forsiden skal ikke starte med:

* lang forklaring om ADHD
* teknisk forklaring
* AI
* kursoversikt
* premiumtilbud
* blogg

### `/det-smeller-na`

Akuttfunksjon.

Skal være:

* mørk
* enkel
* rask
* uten distraksjoner
* mobil-først
* statisk
* uavhengig av backend

Innhold:

```txt
Stopp opp.

Pust.

Si rolig:
“Dette ble for mye. Vi tar en pause.”

Gå unna i noen minutter.
```

Etter hovedinstruksjon:

```txt
Når du har gått unna, kan du ta neste steg.
```

CTA:

```txt
Jeg har gått unna. Hva gjør jeg nå?
```

Neste seksjon:

```txt
Dette var nødbremsen.

Vil du ha hjelp til resten av kvelden?
```

CTA:

```txt
Se Nødbremsen
```

Akuttsiden skal ikke ha salg først.

Akuttsiden skal ikke ha teori.

Akuttsiden skal ikke ha flere valg.

## Kritisk teknisk krav for `/det-smeller-na`

Ruten `/det-smeller-na` skal være 100 % statisk.

Den skal ikke være avhengig av:

* server-side rendering
* database
* API-kall
* auth
* cookies
* AI
* Stripe
* eksterne data
* dynamisk personalisering

Siden skal kunne lastes umiddelbart på dårlig mobilnett.

Krav:

* ingen `fetch`
* ingen server actions
* ingen dynamiske imports for hovedinnholdet
* ingen loading state
* ingen suspense boundary for hovedinnholdet
* ingen tung JavaScript
* ingen klientlogikk som trengs for første visning
* ingen bilder
* ingen video
* ingen analytics scripts
* ingen tredjeparts embeds
* ingen eksterne fonter

Hvis prosjektet bruker Next.js App Router, skal siden være statisk generert.

Bruk gjerne:

```ts
export const dynamic = "force-static";
```

Dersom dette ikke passer teknisk, skal Codex dokumentere hvorfor i `docs/CHANGELOG.md`.

## Preload / tilgjengelighet

Lenken til `/det-smeller-na` skal være synlig i global header.

På forsiden skal lenken være høyt prioritert.

Siden skal ikke gjemmes bak meny, modal eller klientstyrt navigasjon.

## Ytelseskrav for akuttsiden

`/det-smeller-na` skal:

* ha minimalt med CSS
* ikke laste bilder
* ikke laste video
* ikke laste store ikoner
* ikke bruke animasjoner
* ikke bruke eksterne scripts

Akuttsiden skal være den raskeste siden i hele prosjektet.

### `/nodbremsen`

Salgsside for Nødbremsen.

Mål:

* lav terskel
* konkret hjelp
* ikke overforklare
* bygge tillit
* lede videre til Depotet

Hovedbudskap:

```txt
Nødbremsen hjelper deg å stoppe konflikten før den tar over hele kvelden.
```

Innhold:

* hva det er
* hvem det er for
* hva brukeren får
* hvorfor det virker i hverdagen
* hvorfor det ikke er hele løsningen
* bro til Depotet
* CTA til kjøp

I Phase 1 skal kjøpsknapp være placeholder:

```txt
Kjøp Nødbremsen
```

Den kan peke til `#` eller en midlertidig seksjon.

### `/depotet`

Presentasjon av kjerneproduktet.

Hovedbudskap:

```txt
Depotet gir deg én tydelig retning hver dag.
```

Skal forklare:

* I DAG
* Søndagsverkstedet
* Verktøykassa
* Det smeller nå
* hvorfor dette ikke er et vanlig kurs
* hvorfor kontinuitet er viktigere enn mer kunnskap

CTA:

```txt
Sett meg på interesseliste
```

I Phase 1 kan dette være placeholder.

Depotet-siden skal ikke love ferdig abonnement før dette er bygget.

### `/kurs`

Temakursoversikt.

Skal presentere kurs som problemløsere, ikke som helhetlig løsning.

Start med:

```txt
Hvor krasjer det oftest?
```

Eksempler:

* Skjerm
* Morgen
* Legging
* Skole
* Forelderens egen regulering

Alle kurskort skal avslutte med retning mot Depotet:

```txt
Dette løser én situasjon. Depotet hjelper deg å holde retningen over tid.
```

### `/veiledning`

Premium-side.

Skal være nøktern.

Skal inneholde:

* 1:1 foreldreveiledning
* profesjonell veiledning
* familieveiledning som begrenset tilbud

Må presisere:

```txt
Dette er ikke terapi. Dette er operativ veiledning for å justere hverdagen rundt barnet.
```

Skal ikke inneholde booking i Phase 1.

### `/logg-inn`

Placeholder.

Skal si at innlogging kommer senere.

Eksempel:

```txt
Depotet åpner snart.

Innlogging blir tilgjengelig når første versjon av systemet er klar.
```

Skal ikke implementere auth.

## Komponenter som skal lages

Anbefalte komponenter:

* `Header`
* `Footer`
* `CrisisButton`
* `CTAButton`
* `Section`
* `Card`
* `Hero`
* `ThreeStepModel`
* `CrisisFlow`

Ikke lag unødvendig mange komponenter.

Ikke overarkitekter Phase 1.

## Innholdsfiler

Lag gjerne enkle innholdsfiler:

* `src/content/courses.ts`
* `src/content/products.ts`
* `src/content/copy.ts`

Disse skal være statiske.

Ingen CMS i Phase 1.

Visible copy skal fortsatt bare komme fra `docs/CONTENT_SOURCE.md` og `docs/COPY_BANK.md`.

Innholdsfiler er bare teknisk organisering av allerede godkjent tekst.

## Visuell retning

Følg `docs/DESIGN_SYSTEM.md`.

Foreslått uttrykk:

* lys varm bakgrunn på vanlige sider
* mørk bakgrunn på akuttfunksjon
* varm nøytral palett
* tydelig typografi
* god luft
* store trykkflater på mobil
* ingen generisk SaaS-estetikk

## Ferdig når

Fasen er ferdig når:

* alle sidene finnes
* navigasjonen fungerer
* “Det smeller nå” er globalt synlig
* forsiden leder tydelig til Nødbremsen og Depotet
* `/det-smeller-na` er statisk og lett
* ingen forbudte Phase 2-funksjoner er implementert
* designet følger `DESIGN_SYSTEM.md`
* synlig tekst bygger på `CONTENT_SOURCE.md` og `COPY_BANK.md`
* prosjektet bygger uten feil
* `CHANGELOG.md` er oppdatert
