# Backend-plan: Enkel samtykkebasert måling

> Status: PLAN – ikke implementert. Det finnes ingen tracking i appen i dag, og det skal
> ikke legges inn noe før dette er godkjent som egen fase.
> Sist oppdatert: juni 2026.

## Hvorfor måle i det hele tatt

I dag flyr vi blindt: vi vet ikke om akuttlaget brukes, om Søndagsverkstedet fullføres, eller
hvor i onboardingen folk faller fra. Uten det blir alle produktvalg gjetning. Men målgruppen
og temaet (ADHD, foreldreskap, slitasje) gjør tillit viktigere enn innsikt – derfor måles det
mindre enn vanlig, med eksplisitt samtykke, og helt anonymt.

## Hva det er nyttig å måle (anonymt)

Formålet er ett: forstå hvilke deler av Depoet som faktisk hjelper, så de kan prioriteres.

| Hendelse | Hvorfor |
|----------|---------|
| `onboarding_startet` | Sammen med neste: hvor stor er muren inn? |
| `onboarding_fullfort` | Frafall i onboarding = viktigste adopsjonssignal |
| `akuttkort_apnet` (kun kategori, f.eks. «Skjerm») | Er akuttlaget kjernebruken vi tror? Hvilke situasjoner trengs mest? |
| `sondagsverksted_fullfort` | Lever ukerytmen? |
| `sprakkort_lagret` | Bygger folk depot? (Antall, aldri hvilket kort) |
| `demo_apnet` (landingssiden) | Virker «prøv uten å registrere»-inngangen? |

Aggregert per dag er nok. Ingen brukerreiser, ingen sesjonsopptak, ingen tidslinjer per person.

## Hva som IKKE skal måles

- Aldri innhold: ikke hvilke kort som lagres, ikke refleksjonstekst, ikke innsjekk-tilstand,
  ikke søndagssvar. Innhold er brukerens, punktum.
- Aldri fravær eller frekvens per bruker («brukte ikke appen på N dager» finnes ikke som hendelse).
- Ingen enhets-fingerprinting, ingen IP-lagring, ingen tredjeparts annonse-/analyse-SDK-er
  (ikke Google Analytics, ikke Meta-pixel).
- Ingen måling i e-post/SMS (åpning/klikk) – avklart i e-postplanen.
- Ingen kobling mellom målehendelser og konto/e-post, heller ikke når sync finnes.

## Samtykke

- Spørres én gang, etter onboarding (ikke i den – onboardingen skal forbli kort), med
  Depoet-stemmen: «Vil du hjelpe oss å forstå hva som faktisk hjelper? Vi teller bare hvilke
  deler av Depoet som brukes – aldri hva du skriver, og aldri hvem du er. Du kan si nei, og
  alt virker akkurat like godt.»
- To likeverdige knapper («Ja, det er greit» / «Nei takk») – nei er ikke grått, lite eller gjemt.
- Valget lagres lokalt (`depoet_consent_analytics`: yes/no + tidsstempel) og kan endres når som
  helst i profilen.
- Ingen måling skjer før eksplisitt ja. Ikke noe «legitim interesse»-smutthull.

## Hvordan brukeren kan si nei (og angre)

- «Nei» ved første spørsmål → ingen hendelser sendes, og spørsmålet gjentas aldri.
- Bryter i profilen («Del anonym bruksstatistikk») kan skrus av når som helst → sending stopper
  umiddelbart. Allerede sendte hendelser er anonyme og kan ikke knyttes tilbake, og det sies ærlig.
- Å si nei endrer ingenting i funksjonalitet. Ingen påminnelser, ingen "hjelp oss"-nag.

## Hvordan målingen gjøres uten å bryte tillit

1. **Selvhostet og minimal:** et enkelt endepunkt (eller selvhostet Plausible/Umami i EU) som tar
   imot `{hendelse, dato, appversjon}` – ingenting annet. Ingen cookies, ingen ID-er.
2. **Anonymt på avsendersiden:** klienten sender aldri bruker-id, e-post eller enhetsdata.
   Anonymiteten skal være garantert av hva som sendes, ikke av hva serveren lover å kaste.
3. **Synlig i koden:** én liten modul (`lib/telemetry.ts` når den bygges) med hele hendelseslisten
   hardkodet – ny hendelse krever kodeendring og gjennomgang, ikke konfig.
4. **Ærlig utad:** personvernerklæringen lister de konkrete hendelsene. Gjerne også en kort
   «hva vi måler og hvorfor»-side i appen – åpenhet er billig og bygger tillit.
5. **Sletting ved tvil:** rådata eldre enn 12 måneder slettes; aggregater (tall per dag) beholdes.

## Forutsetninger før bygging

- Personvernerklæring på adhd-depoet.com (delt forutsetning med e-post- og sync-planene).
- Samtykke-UI i profilen + engangsspørsmålet etter onboarding.
- Beslutning om selvhostet løsning vs. eget endepunkt (begge OK; tredjeparts skyanalyse er ikke).

## Eksplisitt IKKE i scope

- A/B-testing av formuleringer rettet mot sårbare tilstander («nesten tom»-tekster skal aldri
  optimaliseres mot konvertering).
- Vekstmål som belønner avhengighet. Suksessmålet for Depoet er at riktig del brukes når det
  trengs – ikke maksimal tid i appen.
