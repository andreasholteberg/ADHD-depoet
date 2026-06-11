# Backend-plan: Daglig e-post (og SMS)

> Status: PLAN – ikke implementert. Ingenting i frontend skal late som dette finnes.
> Sist oppdatert: juni 2026.

## Hvorfor dette ikke bygges som simulert funksjon i frontend

Tre grunner, i prioritert rekkefølge:

1. **Tillit er produktet.** Målgruppen er slitne foreldre med lav kapasitet og ofte dårlige erfaringer
   med systemer som lover og ikke leverer. Én "vi sendte deg en e-post" som aldri kom, koster mer
   tillit enn ti ærlige "dette kommer senere".
2. **Frontend kan ikke sende.** En nettleserfane som er lukket kan ikke gjøre noe som helst.
   Hele verdien av daglig e-post er at den kommer *uten* at brukeren åpner appen – det krever
   en server med tidsstyring.
3. **Simulering forurenser koden.** Den gamle "magisk lenke"-simuleringen måtte DEV-gates og
   ryddes i publiseringsrunden. Vi gjentar ikke det mønsteret.

## Hva som skal sendes

Tre meldingstyper, alle allerede skrevet og kvalitetssikret i `src/data/variantBank.ts`:

| Type            | Frekvens               | Innhold |
|-----------------|------------------------|---------|
| Daglig e-post   | Hver morgen (~07:00)   | Emne + brødtekst fra `dailyEmail`-varianter, med dagens mikrohandling og språkkort flettet inn |
| Daglig SMS      | Hver morgen            | Én kort melding fra `dailySms`-varianter, alltid med "Svar STOPP for å avslutte" |
| Søndagspuff     | Søndag ettermiddag     | `sundayWorkshop`-varianter, lenke til verkstedet |
| Returpuff       | Etter 4+ dager uten besøk | `returnWelcome`-varianter – aldri "du har vært borte i X dager" |

Tonekrav (arvet fra frontend, ufravikelige): aldri streaks, aldri fraværstelling synlig for bruker,
aldri skyldspråk, alltid avmelding i hver melding.

## Hvordan innhold velges fra variantbanken

- Variantbanken og flettelogikken (`substitutePlaceholders`, `getDagsformBiasedIndex`) flyttes til
  en delt pakke (eller kopieres til backend med frontend som fasit) slik at forhåndsvisningene i
  appen og faktiske utsendinger aldri kan drifte fra hverandre.
- Server holder en utsendingslogg per bruker (meldingstype, variant-indeks, dato) og roterer slik
  at ingen ser samme variant to dager på rad – samme prinsipp som `depoet_seen_prompts` lokalt.
- Dagsform-bias: hvis brukerens siste innsjekk (når sync finnes) var «nesten tom», foretrekkes de
  mildeste variantene. Uten sync brukes nøytral rotasjon – ingen gjetting.
- Mikrohandling/språkkort hentes fra brukerens fokus (samme mapping som `getPromptForUser`).

## Samtykke

- **Dobbel opt-in for e-post:** bryteren i appen melder interesse; selve abonnementet aktiveres
  først når brukeren klikker bekreftelseslenken i en engangs-e-post. Ingen utsendinger før det.
- **SMS:** eksplisitt opt-in med telefonnummer + bekreftelses-SMS («Svar JA for å starte»).
- Samtykket lagres med tidsstempel, type og tekstversjonen brukeren faktisk så (dokumentasjonsplikt).
- Frontendens fire brytere (`optIns` i `types.ts`) beholdes som modell – men de skal mappes til
  reelle samtykkerecords server-side, ikke bare et lokalt flagg.

## Pause og avslutning

- **Hver e-post** har én-klikks avmeldingslenke (per meldingstype) + lenke til full preferanseside.
  Ingen innlogging nødvendig for å melde seg av (signert token i lenken).
- **Hver SMS** respekterer STOPP umiddelbart (krav fra norske SMS-leverandører uansett).
- **Pausefunksjonen** fra appen (`pauseUntil`: én uke / én måned / ubestemt) skal stoppe alle
  utsendinger server-side – og gjenopptak skjer uten kommentar om pausen. Aldri "velkommen tilbake
  fra pausen din".
- Avmelding sletter ikke brukerdata – den stopper bare utsendinger. Sletting er en egen, tydelig handling.

## Sikkerhet og personvern

- **Dataminimering:** serveren trenger kun e-post/telefon, samtykker, fokus-tema, pausetilstand og
  utsendingslogg. Refleksjoner og andre private notater skal IKKE til serveren i denne tjenesten.
- **Region:** databehandling og lagring i EU/EØS. Leverandørvalg må ha databehandleravtale (DPA):
  f.eks. Postmark/Resend (e-post, EU-region), Sveve eller Link Mobility (norsk SMS).
- **Behandlingsgrunnlag:** samtykke (GDPR art. 6-1-a). Personvernerklæring må finnes på
  adhd-depoet.com FØR første utsending – den finnes ikke i dag og er et eget arbeidsstykke.
- Merk at temaet (ADHD/foreldreskap) gjør selve abonnementet til en opplysning av sensitiv karakter
  – behandle e-postlisten deretter (tilgangsstyring, kryptering at rest, ingen tredjeparts-deling).
- Tekniske basics: SPF/DKIM/DMARC for domenet, rate-limiting på påmelding, signerte tokens med utløp.

## Foreslått minimal arkitektur (når det bygges)

1. Liten backend (f.eks. Supabase/Postgres eller tilsvarende i EU) med tabeller:
   `subscribers`, `consents`, `send_log`, `pauses`.
2. Én daglig cron-jobb (07:00 Europe/Oslo) som velger variant per abonnent og kaller e-post-/SMS-API.
3. Tre små endepunkter: bekreft samtykke, avmeld (token), preferanser.
4. Frontend-endring først NÅR dette kjører: bryterne kobles til ekte endepunkter, og
   forhåndsvisningsteksten «meldinger sendes ikke ennå» fjernes.

## Eksplisitt IKKE i scope

- Ingen utsendinger før dobbel opt-in og personvernerklæring er på plass.
- Ingen åpnings-/klikksporing i meldingene (brudd med tillitsprinsippet, og unødvendig).
- Ingen "vi savner deg"-kampanjer. Returpuffen er den eneste fraværsrelaterte meldingen, og den
  teller aldri dager utad.
