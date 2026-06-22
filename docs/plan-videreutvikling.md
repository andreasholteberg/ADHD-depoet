# Depoet – plan for videreutvikling

> Status: levende plan. Sist oppdatert juni 2026, rett etter første publisering på adhd-depoet.com.
> Arbeidsmåte: én fase om gangen, verifisering etter hver fase, stopp og godkjenning før neste.
> Søsterdokumenter: `backend-plan-daglig-epost.md`, `backend-plan-synkronisering.md`, `backend-plan-maling.md`.

## Hvor vi står

Live i produksjon: landingsside med demo-akuttkort, onboarding med smakebit, de seks fanene
(I dag, Hva gjør jeg?, Søndag, Kurs, Språkbank, Mitt depot), søndagsnudge, deling av språkkort,
usett-prioritert rotasjon, mestringsspeiling, grønn grafisk profil, ærlig forhåndsvisningsmerking.
Strict TypeScript, DOM-røyktester for alle nye flater. Ingen backend – alt lagres lokalt.

## Faste prinsipper (gjelder alle faser)

1. Skamfritt: aldri streaks, poeng, skyldspråk eller press. Pause og fravær er fullverdige valg.
2. Ærlig: ingen løfter i brukerflaten før funksjonen faktisk finnes.
3. Akutthjelpen er alltid gratis – «Hva gjør jeg nå?» og sikkerhetslaget legges aldri bak betaling.
4. Lokal og anonym bruk forblir en førsteklasses modus, også etter at konto finnes.
5. Stegvis arbeid med verifisering og stopp-punkter, som i fasene vi allerede har kjørt.

---

## FASE A – Rydding og trygghet (backend-fritt, kan starte nå)

Mål: tette de kjente hullene rundt dagens forhåndsvisning, uten ny funksjonalitet.

| # | Oppgave | Hvorfor | Størrelse |
|---|---------|---------|-----------|
| A1 | **www-redirect**: pek `www.adhd-depoet.com` til apex (redirect rule eller worker-rute), avklar hvor det gamle «Depotet»-nettstedet skal bo | Besøkende treffer i dag to ulike produkter | Liten (Cloudflare-konfig) |
| A2 | **Personvernerklæring** på adhd-depoet.com | Forutsetning for e-post, sync OG måling; bør finnes selv for localStorage-versjonen | Middels (tekst + enkel side) |
| A3 | **Eksport/import-livbåt**: «Last ned depotet ditt som fil» + gjenoppretting | Beskytter brukernes depot mot nettleserbytte/tømming FØR sync finnes | Liten–middels |
| A4 | **Tilgjengelighetsrunde**: focus-trap + Escape i modaler (profil, retur, sikkerhet, demo), erstatte native `confirm()`/`alert()`, aria-roller | Målgruppen er sliten og ofte på mobil om kvelden; og det er rett | Middels |
| A5 | **Cloudflare deploy-config i repo** (wrangler-config + dokumentert deploy-rutine) | Reproduserbare deploys, mindre menneskelig feilrisiko | Liten |
| A6 | **Chunk-splitting**: lazy-load visninger (kursinnholdet er størst) + vendor-chunk | 648 kB → raskere førstegang på mobilnett | Liten–middels |
| A7 | **Opprydding**: package.json (navn «react-example», ubrukte `@google/genai`/`express`/`dotenv`), README erstattes med ekte prosjektbeskrivelse | Hygiene før flere bidragsytere/verktøy kobles på | Liten |
| A8 | **Grønn logo-variant / logo-runde**: mykere ordmerke, beholde DD-monogrammet | Logoen er siste rest av «gammel» identitet | Design, ikke kode |

Definisjon på ferdig: begge domenevarianter viser samme app, depotet kan reddes som fil,
modaler kan betjenes med tastatur, deploy er én dokumentert kommando.

## FASE B – Video i kursene (krever bare Bunny-konto)

Mål: filmene ut til folk. Arkitekturen er ferdig forberedt («manus-først»).

1. Bunny Stream-bibliotek i EU-region; last opp filmer navngitt etter modul-id (`videoKey`).
2. Fyll inn `bunnyLibraryId`, `bunnyVideoId`, `embedUrl`, `status: 'published'` (+ gjerne
   `durationSeconds`, `thumbnailUrl`, etter hvert `transcript`) per modul i `courses.ts`.
3. Oppdater forhåndsvisningstekstene («…video kommer senere») i app-footer og landingsside.
4. Kurs-synlighet: egen kursseksjon på landingssiden med direkte inngang.

Kan gjøres gradvis – moduler uten video forblir fullverdige leseversjoner.
NB: alt innhold er fortsatt åpent; ikke last opp innhold som skal være betalt før Fase D.

## FASE C – Fundament: konto og synkronisering

Mål: depotet følger brukeren. Detaljert i `backend-plan-synkronisering.md`.

1. Minimal backend i EU (auth + lagring) med magisk lenke-innlogging.
2. Migrering av lokalt depot (lokal data er sannheten første gang; tapsfri fletting senere).
3. Først når de seks «trygg lagring»-kravene i sync-planen er oppfylt: oppdater tekstene
   i appen («Synkronisert»-tilstanden finnes allerede som dev-gatet UI).

Avhengighet: A2 (personvernerklæring). Dette er forutsetningen for både D og E.

## FASE D – Kommersiell modell: kjøp og abonnement

Mål: bærekraftig økonomi uten å bryte prinsipp 1–4.

**Grunnidé: kursene er inngangen, abonnementet er videreføringen.**
Først tillit og verdi (gratiskjernen + et kurs man eier), deretter tilbys Depoet+ som
kontinuitet – «vil du at dette skal leve videre i hverdagen?» – aldri som første mur.

**Modell** (besluttet juni 2026: konsistensmotoren er det betalte kjerneproduktet):

| Fase i kundereisen | Produkt | Pris |
|--------------------|---------|------|
| Gratis – alltid | Akuttlag + sikkerhetslag, daglig pusterom i enkel form, lesing i språkbanken, Gratis inngang, **én full søndagslanding som smakebit** | 0 kr |
| Første kjøp | Hovedprogrammet (ev. Startkurs) – eies | 990–1190 kr |
| Anbefalt hovedprodukt | **Pakke: Hovedprogrammet + 3 mnd Depoet+ inkludert** | 1190–1390 kr |
| Videreføring etter kurs/pakke | **Depoet+ (konsistensmotoren)** | Lansering: 99 kr/mnd · 790 kr/år. Mål: 149/1190 når e-post + sync er live – nye kunder, eksisterende beholder pris (grandfathering) |

Ved lansering kun to SKU-er: pakken og Depoet+. Minikurs kommer senere (egne innganger
eller som innhold i Depoet+). Etter de 3 inkluderte månedene: et vennlig, aktivt valg om å
fortsette – ingen stille auto-konvertering.

**Hva Depoet+ inneholder:**

Hele konsistensmotoren – det som holder retningen levende over tid:
- Søndagsverkstedet med historikk
- Mitt depot: samlinger, egne notater, mestringsspeiling og tilbakeblikk over tid
- Full lagring i språkbanken og usett-prioritert rotasjon
- Daglig e-post/SMS (Fase E), synkronisering (Fase C)
- Nye moduler/minikurs etter hvert som de lages, lyd- og videoversjoner
- Partner-/familiefunksjoner senere

**Ufravikelige vern i betalingsmodellen:**

1. Akutthjelpen og sikkerhetslaget er alltid gratis.
2. **Brukeren mister aldri lesetilgang til egne ord.** Ved utløpt abonnement fryses depotet:
   alt kan leses og eksporteres, men nye landinger/lagringer/speiling krever Depoet+.
   Vi selger påfyll og kontinuitet – aldri gisler.
3. Paywall-tekster i Depoet-stemmen: aldri skyldspråk, aldri «du mister», alltid
   «dette er Depoet+» som invitasjon.

**For at 149 kr/mnd skal kjennes selvsagt** (verdiløft-backlog): Fase C + E levert,
månedlige/kvartalsvise tilbakeblikk i depotet («dine ord over en sesong»), partnerdeling,
lydversjoner av modulene, jevn tilførsel av nye minikurs.

**Teknisk:**
1. Stripe Checkout + Customer Portal (hosted; aldri eget kortskjema). Stripe Tax for MVA.
   Vipps vurderes senere ved synlig friksjon. Pakken = Checkout med kurs + 3 mnd trial-pris
   på abonnementet, med eksplisitt fornyelsesvalg mot slutten av perioden.
2. Entitlements-tabell ved siden av sync-dataene; webhook fra Stripe; appen spør
   «hva har jeg tilgang til?» ved innlasting.
3. **Innholdsgating**: betalt kursinnhold må UT av den offentlige JS-bundelen (hentes fra
   backend med tilgangssjekk) og Bunny-embeds over på token-beskyttelse.
4. Kjøpsflate i Depoet-stemmen: pris + «Lås opp» på kurskortet. Depoet+ presenteres først
   etter fullført kurs eller tydelig opplevd verdi – som vedlikehold og kontinuitet, ikke
   som mer innhold. Aldri popup, aldri nedtelling. 14 dagers angrerett uten spørsmål.

Avhengighet: Fase C (konto). Delvis B (videoene er kursets verdi).

## FASE E – Daglig e-post og SMS

Mål: Depoet kommer til brukeren, ikke bare omvendt. Detaljert i `backend-plan-daglig-epost.md`.
Dobbel opt-in, pause-respekt, variantbanken som delt kilde, ingen åpningssporing.
Avhengighet: Fase C + A2. Dette er den enkeltinvesteringen som trolig betyr mest for retensjon.

## FASE F – Innsikt og vekst

1. **Samtykkebasert måling** per `backend-plan-maling.md` (seks hendelser, anonymt, selvhostet).
2. **Mer innhold**: flere daglige prompts per fokus (Skjerm har i dag bare 2!), innhold for
   Skole og Søsken som mangler helt i daglig-banken. Innholdsarbeid i Andreas-stemmen.
3. **Partner-deling** som konsept: invitér den andre forelderen (eget samtykkedesign, egen fase).
4. **PWA**: manifest + installerbarhet, ev. push som alternativ til SMS.

## Bevisst IKKE planlagt

- AI-genererte råd eller analyse av brukernes tekst.
- Gamification i enhver form.
- Annonsering/tredjepartssporing.
- Native apper (PWA dekker behovet inntil noe konkret krever mer).

## Anbefalt rekkefølge, kort

**A1 + A2 + A3 først** (dager, ikke uker – og A1 haster siden www viser feil produkt i dag).
Deretter B (filmene er ferdige og gir synlig verdi raskt), så A4–A8 i ledige mellomrom.
C som første store backend-løft, så D og E i den rekkefølgen økonomien krever.
F løpende etter at C er trygt i drift.
