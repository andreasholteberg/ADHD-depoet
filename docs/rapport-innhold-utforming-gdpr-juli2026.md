# Rapport: Innhold, utforming og GDPR – vurdering og utbedringsplan

> Skrevet 2. juli 2026. Basert på full gjennomgang av kildekoden (src/), bygget versjon (dist/)
> og alle dokumenter i docs/. Alle funn er verifisert direkte mot koden – ikke mot planene.
> Dette er ikke juridisk rådgivning; punkter merket (jurist) bør bekreftes av personvernrådgiver.

---

## STATUS: GJENNOMFØRT SAMME DAG (2. juli 2026)

Alle P0-tiltak pluss V3/V4 og U1–U6 er implementert i koden og verifisert
(`tsc` 0 feil, `vite build` OK, smoke-test 9 kurs/32 moduler PASS, nytt bygg i dist/):

- **K1–K3** ✅ Samtykkesteg med personvernlenke i onboarding steg 1, samtykke logges med
  tidspunkt + tekstversjon (`localStorageConsent`), påminnelser uten forhåndsvalg
  (`wantsReminder: null` til aktivt valg), navn valgfritt.
- **K4–K5** ✅ «Dine data» i profilmodalen: vis/fjern lagret e-post (med samtykkedato),
  «Last ned mine data (JSON)» (`src/lib/dataExport.ts`), «Slett alt» (renser alle depoet-nøkler).
- **K6** ✅ Én personvernerklæring («i dag / senere»-struktur): docs-versjonen er kilde,
  modal synkronisert, lenket fra app-footer, onboarding, profil og landingsside. Alderssetning inne.
- **K7 + kap. 4.2** ✅ Positive lagringstekster ved refleksjonsfelt, Søndagsverkstedet, app-footer
  og profil; «ikke legg inn sensitiv info» beholdt kun ved e-postfeltet. Samtykkelogg også ved
  e-postfangst på landingssiden (`emailConsent`).
- **I1–I5** ✅ Modulleser-tekstene omskrevet bevisst generiske; tre tekstfeil i situations.ts +
  én i dailyPrompts rettet; ny «Annet»-promptliste (5 prompts).
- **U1–U6** ✅ text-xxs 11→12 px; meningsbærende 10–11 px-tekster hevet; Escape + role/dialog +
  aria-modal på alle fem modaler (`src/lib/useEscapeClose.ts`); `prefers-reduced-motion` i CSS +
  MotionConfig; emojis aria-hidden i onboarding; forklaring ved deaktiverte knapper.
- **V3–V4** ✅ @google/genai fjernet (package.json + lock), nytt README, .env.example renset,
  datakart oppdatert i begge GDPR-dokumenter, personvernplanen utpekt som master,
  lanseringssjekklisten oppdatert.

**Gjenstår (krever deg/eksterne):** jurist-gjennomgang (art. 9-posisjon + spørsmålene i
personvernplanen del D), V1 server-side samtykkeregister og V2 domenevalg (før e-postutsending),
DPA-er/EU-region (Fase 2), egen /personvern-rute ved deploy, WCAG-audit (U7), sjargongpass etter
pilot, org.nr. i erklæringen. NB: `.sync-probe.txt` i rotmappen er en tom testfil som kan slettes.

---

## 1. Hovedkonklusjon

Depoet står på et uvanlig godt personvernfundament: **ingen data forlater nettleseren i dag**.
Verifisert i både src/ og dist/: ingen eksterne nettverkskall (eneste `fetch` i bygget er Vites
interne forhåndslasting av egne filer), null sporing, null analytics, null cookies utover
localStorage. Den lokale-først-arkitekturen i GDPR-personvernplanen er riktig strategi og
er reelt gjennomført i koden.

Problemet er ikke arkitekturen, men at **tre lag forteller tre ulike historier**:

1. **Koden** lagrer alt lokalt, men mangler samtykkeflyt, sletting, eksport og informasjonstekster.
2. **Personvernerklæringen** (modal + docs) beskriver dels en tjeneste som ikke finnes ennå
   (konto, synk, IP-behandling), dels feilinformerer den («i dag lagres kun e-postadressen» – e-posten
   lagres faktisk bare lokalt, sammen med alt annet).
3. **Brukertekstene** sier «Ikke legg inn sensitiv informasjon» – samtidig som hele appens verdi
   ligger i at foreldre sjekker inn kapasitet og reflekterer over vanskelige øyeblikk.

Den siste motsetningen er kjernen i bestillingen din: foreldre skal kunne dele det de trenger for å
ha utbytte av innholdet. Svaret er ikke å advare mindre eller samle mer – det er å **erstatte vage
advarsler med presis informasjon om hvor data bor**. «Dette blir på din enhet» gjør det trygt å dele;
«ikke legg inn sensitiv info» gjør det utrygt å bruke appen som tiltenkt. Se kapittel 4.

Fem av punktene fra gdpr-compliance-analyse.md (juni 2026) som er merket «må gjøres før bredere
lansering» er fortsatt ikke rettet i koden. De er tatt inn i tiltakslisten her.

---

## 2. Verifisert faktagrunnlag: hva appen faktisk gjør i dag

### 2.1 Datalagring (alle sju localStorage-nøkler)

| Nøkkel | Innhold | Sensitivitet | Merknad |
|---|---|---|---|
| `depoet_user` | Navn, onboarding-svar (tyngst nå, egen tilstand, ønsket hjelp), **e-postadresse fra landingssiden**, opt-ins, ukemål, daglig innsjekk, lagrede kort, fullførte moduler | Høy | E-posten er usynlig for brukeren etter innsending og kan ikke fjernes i UI |
| `depoet_sunday_reports` | Søndagsverksted: fritekst om læring, mål, «hva ble for mye» | Høy (art. 9-nær) | Ingen informasjonstekst ved feltene |
| `depoet_reflections` | Fritekstrefleksjoner fra «I dag» | Høy (art. 9-nær) | Ingen informasjonstekst ved feltet |
| `depoet_seen_prompts` | Rotasjonslogg for dagskort | Lav | – |
| `depoet_visited_app` | Har besøkt appen (boolean) | Lav | – |
| `depoet_theme` | Lys/mørk-preferanse | Lav | **Mangler i datakartleggingen** i begge GDPR-dokumenter |
| *(delte kort)* | shareCard.ts deler kun korttekst via Web Share/utklippstavle | Ingen | Ryddig – ingen brukerdata følger med |

### 2.2 Bekreftet fravær av risiko

Ingen fetch/XHR, ingen tredjepartsskript, ingen Gemini-kall (biblioteket `@google/genai` ligger i
package.json men brukes aldri), ingen sporing i dist/-bygget, testpanel og simulert innlogging er
korrekt sperret bak `import.meta.env.DEV`. Samtykkeboksen på landingssiden er aktiv (ikke
forhåndsavkrysset) og sperrer innsending. Opt-ins i profilen er av som standard.

### 2.3 Avvik mellom egne planer og koden (verifisert)

| Krav fra egne dokumenter | Status i koden |
|---|---|
| Samtykke-/informasjonssteg i onboarding (analyse 3.2) | **Mangler.** Lagring starter uten informasjon; ingen personvernlenke i hele onboardingflyten |
| `wantsReminder` default `false` (analyse 3.3) | **Ikke rettet.** Fortsatt `true` som forhåndsvalg (Onboarding.tsx, initial state + steg 5) |
| Personvernlenke i appen, ikke bare landingssiden (analyse 3.4) | **Mangler.** PrivacyPolicy-komponenten brukes kun av LandingPage |
| «Last ned mine data» (analyse 3.5 / plan del 10) | **Mangler** |
| Sletteknapp for bruker (plan del 10) | **Mangler i produksjon.** `resetAllData` finnes kun i dev-testpanelet |
| Standardtekst ved fritekstfelt (plan del 4) | **Mangler** ved refleksjonsfeltet i TodayView og alle fire tekstfelt i SundayWorkshopView |
| Samtykkelogg med tidspunkt og ordlyd (analyse 3.3) | **Mangler.** Kun boolean-opt-ins lagres |
| Navn/kallenavn valgfritt (plan del 5) | **Brutt i praksis.** Neste-knappen i onboarding steg 1 er deaktivert til navn er fylt ut |

---

## 3. GDPR: det som må rettes

### 3.1 Kritisk (før pilot med ekte foreldre)

**K1 – Informasjon og samtykke i onboarding.**
Legg inn i steg 1: én rolig setning om at alle svar lagres kun i nettleseren på denne enheten,
lenke til personvernerklæringen, og aktiv avkryssing før lagring starter. Lagre tidspunkt og
tekstversjon for avkryssingen i `depoet_user`. Hjemmel: GDPR art. 13 + ekomloven § 3-15.

**K2 – Fjern forhåndsvalgt påminnelses-ja.**
`wantsReminder: true` → `false`, og steg 5 uten forhåndsvalgt knapp (krev aktivt valg).
Forhåndsavkrysset samtykke er ugyldig (art. 7, mfl. § 15) – og signalet det sender er feil for
akkurat denne målgruppen.

**K3 – Gjør navn reelt valgfritt.**
Fjern kravet om utfylt navn i steg 1 (fallback «Forelder» finnes allerede i koden). I dag lover
erklæringen «valgfritt kallenavn» mens UI-et tvinger det frem.

**K4 – Sletting i produksjons-UI.**
«Slett alt jeg har lagret her»-knapp i profilmodalen (gjenbruk `resetAllData`, med bekreftelse).
I dag har en vanlig bruker ingen vei til sletting utenom å tømme nettleserdata – og vet ikke at
det er metoden. Spesielt alvorlig for e-postadressen fra landingssiden: den lagres, vises aldri
igjen, og kan ikke fjernes enkeltvis. Vis lagret e-post i profilen med egen «fjern»-knapp
(koden for dette finnes allerede, men bare i synkronisert dev-tilstand).

**K5 – Eksport («Last ned mine data»).**
Én knapp som samler de fire datanøklene i én JSON-fil. Teknisk trivielt siden alt er lokalt,
oppfyller art. 20, og er samtidig en tillitsfunksjon: foreldre kan ta med seg egne refleksjoner.

**K6 – Én sann personvernerklæring.**
Tre versjoner eksisterer (modal, docs/personvernerklæring.md, virkeligheten). Skriv én, strukturert
som «Slik er det i dag» (alt lokalt, ingenting sendes til oss) + «Dette endres når konto/e-post
lanseres» (varsles og krever nytt samtykke). Rett feilen i modalen: i dag «samles» ingenting inn –
heller ikke e-posten. Publiser på egen rute/URL (f.eks. /personvern) og lenk fra footer i selve
appen, ikke bare landingssiden.

**K7 – Informasjonstekst ved alle fritekstfelt.**
Bruk standardteksten fra personvernplanen del 4 ved refleksjonsfeltet i TodayView og tekstfeltene
i SundayWorkshopView – men i den positive formen fra kapittel 4 under.

### 3.2 Viktig (før backend, e-post eller pilot-påmelding utenfor appen)

**V1 – Samtykkeregister.** Ved e-postfangst: lagre tidspunkt + eksakt samtykketekst (nå lagres bare
adresse og boolean). Kreves som dokumentasjon (art. 7 nr. 1).

**V2 – Avsenderdomene og lenker.** variantBank bruker `depoet.no/s` mens alt annet sier
`adhd-depoet.com` – avklar domenet. Vurder samtidig (jurist/design): e-post fra et domene med
«adhd» i navnet røper kontekst i mottakerens innboks og varsler. Planens krav om nøytral ordlyd
(del 12) bør utvides til avsenderadresse.

**V3 – Rydd bort ubrukt AI-avhengighet.** Fjern `@google/genai` fra package.json, og erstatt
README.md (som fortsatt er AI Studio-boilerplate med Gemini-instruksjoner) og GEMINI_API_KEY i
.env.example. Ikke et GDPR-brudd i dag, men det motsier «ingen AI»-posisjonen i planen og gir
unødig angrepsflate og forvirring.

**V4 – Datakartlegging à jour.** Legg `depoet_theme` og e-postadressen-i-localStorage inn i
tabellene i begge GDPR-dokumenter. Utpek GDPR-personvernplan-Depoet.md som master og la
gdpr-compliance-analyse.md peke dit, så de ikke driver fra hverandre.

### 3.3 Fortsatt gyldig fra eksisterende planer

Fase-kravene i GDPR-personvernplanen (DPA-er, EU-region, DPIA før fritekst-i-sky, uttrykkelig
art. 9-samtykke, § 15-samtykke før nudger) er riktige og dekkende – ingen grunn til å gjenta dem her.
Jurist-spørsmålene i planens del D er gode; still dem før Fase 2.

---

## 4. Balansen: samsvar uten å miste nytten

Bestillingen: foreldre skal kunne dele det de trenger for å ha utbytte av innholdet, innenfor GDPR.
Arkitekturen løser allerede dette – personalisering skjer på enheten, uten identifisering. Det som
gjenstår er å **si det slik at foreldre tør å bruke det**.

### 4.1 Prinsippet

Alt en forelder deler for å få nytte (kapasitetsnivå, hva som er tyngst, refleksjoner) forblir på
enheten. Da «behandler» ikke tjenesten art. 9-data, og forelderen kan skrive fritt. Compliance-
tiltakene skal derfor aldri formuleres som «ikke del» – men som «dette blir hos deg».

### 4.2 Tekstendringer (konkret)

| Sted | I dag | Anbefalt |
|---|---|---|
| Footer i appen (App.tsx) | «Ikke legg inn sensitiv informasjon ennå.» | «Alt du skriver og velger lagres kun i nettleseren på denne enheten – ingenting sendes til oss.» |
| Refleksjonsfelt (TodayView) | Ingen tekst | «Skriv for din egen del – dette blir på din enhet og sendes ikke til oss. Tips: bruk gjerne fornavn eller "barnet" i stedet for fullt navn.» |
| Søndagsverkstedets tekstfelt | Ingen tekst | Én felles linje øverst i verkstedet, samme budskap som over |
| Profilmodal, anonym status | «Ikke legg inn sensitiv informasjon i denne forhåndsvisningen.» | Behold lokal-forklaringen, stryk advarselen (den motsier refleksjonsfunksjonen) |
| E-postfeltet på landingssiden | «Ikke legg inn sensitiv informasjon.» | **Behold.** E-post er det eneste som en dag skal forlate enheten – her er advarselen riktig |

### 4.3 Når synkronisering kommer (lagdelt deling)

1. **Synkes på avtalegrunnlag:** kursprogresjon, lagrede kort-ID-er, innstillinger – strukturert og
   lite avslørende.
2. **Forblir lokalt som standard:** all fritekst, innsjekk-historikk, søndagsrapporter.
3. **Kan senere tilbys i sky bak eget, uttrykkelig samtykke + DPIA** (personvernplanens Fase 4) –
   som et aktivt tilvalg formulert som fordel («ta refleksjonene med til ny telefon»), aldri som
   forutsetning for å bruke appen.

Dette gir foreldrene full nytte i dag, og en tydelig, frivillig trapp senere.

---

## 5. Innhold: vurdering og utbedringer

### 5.1 Det som er sterkt (behold)

Konsistent faglig linje (kapasitet før vilje) gjennom alle flater; reparasjon som gjennomgående
motiv; «tom»-modusen som fjerner alle krav ved lav kapasitet er uvanlig godt utformet;
sikkerhetslaget (SafetyBanner + kurs-disclaimer + nødnumre) er på plass der det trengs; språkkort
og situasjonskort er konkrete og brukbare i øyeblikket; meldingsmalene i variantBank er nøytrale og
skamfrie i tråd med planen; ingenting i innholdet ber om barnets navn, diagnose, medisiner eller
skole – innholdsgjennomgangens regel (plan del 3) er i praksis fulgt.

### 5.2 Feil som må rettes

| # | Funn | Sted |
|---|---|---|
| I1 | **Plassholder-bug:** «Det du kan legge fra deg» og «Når det glipper» viser samme hardkodede start-2-tekst på alle 32 moduler (kjent fra lanseringssjekklisten, fortsatt ikke rettet). Enten legg feltene inn per modul i courses.ts, eller omformuler de to tekstene så de er bevisst generiske | CoursesView.tsx (~linje 189 og 214) |
| I2 | Skrivefeil: «hjelp to å holde buksebeinet» → «hjelp til å» | situations.ts (paakledning) |
| I3 | Uklar setning: «Dette ble skikkelig tungt for spede bein i dag» – virker som rest av omskriving | situations.ts (paakledning, sentenceToSay) |
| I4 | Ødelagt setning: «er dette mentale sporet kjempe-skandale» | situations.ts (overgang-skole, underTheHood) |
| I5 | `Annet`-fokus mangler egen prompt-liste og faller til DEFAULT_PROMPT hver dag – gir slitasje for de som valgte det. Lag en liten generisk liste (3–5 prompts) | dailyPrompts.ts |

### 5.3 Anbefalte forbedringer

Sjargongpasset fra lanseringssjekklisten («validere», «eksekutive funksjoner» forklares ved første
bruk) står fortsatt åpent og bør gjøres før pilot. Vurder å myke opp kategoriske hjerne-utsagn i
situasjonskortene («Barnets hjerne er…» → «Barnets hjerne er ofte…») – små ord, men de skiller
pedagogikk fra diagnose og støtter «ikke behandling»-avgrensningen. «Det faglige grunnlaget»-flaten
(testleser-innspill, sjekkliste Fase 5) bør prioriteres: den bygger tillit og er lav risiko når den
holder seg til tradisjoner uten kliniske claims.

---

## 6. Utforming/UX: vurdering og utbedringer

### 6.1 Det som er sterkt (behold)

Rolig, konsistent visuell identitet som matcher budskapet; én kolonne og bunn-navigasjon fungerer
for mobil-i-kaos-situasjonen; onboarding med umiddelbar «smakebit» etter første valg er godt grep;
demo-kortet uten registrering senker terskelen; pause-funksjonen og returlaget er omsorgsfullt
designet; mørk modus uten blink.

### 6.2 Utbedringer

**U1 – Skriftstørrelser (viktigst).** Store deler av grensesnittet bruker 9–11 px (text-xxs,
text-[9px]/[10px]/[11px]) – inkludert samtykketekst, personverninfo og situasjonskortenes
hjelpetekster. Målgruppen er utmattede foreldre på mobil, ofte i stress; dette er også et
WCAG-spørsmål (forskrift om universell utforming gjelder). Hev minstenivået til ~12–13 px for all
meningsbærende tekst; la 9–10 px kun være pynteetiketter.

**U2 – Kontrast.** stone-400/500 på hvit/beige i små størrelser ryker sannsynligvis WCAG AA.
Sjekk med aksefarge-verktøy sammen med U1.

**U3 – Modal-tilgjengelighet.** PrivacyPolicy har rolle og aria; profilmodal og SafetyBanner-dialog
mangler focus-trap, Escape-lukking og aria-modal. Viktig fordi nettopp disse inneholder samtykke og
nødnumre.

**U4 – Redusert bevegelse.** Ingen `prefers-reduced-motion`-håndtering; motion-animasjoner går for
alle. Én CSS-regel / MotionConfig løser det.

**U5 – Emojis i valgknapper.** Onboarding-valgene leses av skjermlesere med emoji først
(«🌅 Morgenstress»). Flytt emoji til dekorativt element med aria-hidden.

**U6 – Deaktivert innsendingsknapp uten forklaring.** På landingssiden er «Send meg dryppene» død
inntil samtykke er krysset av, uten at det sies. Legg til en kort hint-tekst/aria-describedby.

**U7 – WCAG-audit før bred lansering** (Lighthouse + axe-core) – står i begge planer, fortsatt
ikke gjort. U1–U6 kan gjøres først, så blir auditen billigere.

---

## 7. Samlet prioritert handlingsliste

### Før pilot med ekte foreldre (P0)

- [ ] K1 Samtykke-/informasjonssteg i onboarding + samtykkelogg
- [ ] K2 `wantsReminder` default av, ingen forhåndsvalg i steg 5
- [ ] K3 Navn valgfritt i onboarding
- [ ] K4 Slett-funksjon i profil (alt + e-post enkeltvis)
- [ ] K5 «Last ned mine data» (JSON-eksport)
- [ ] K6 Én personvernerklæring, publisert på egen rute, lenket fra appen
- [ ] K7 Lokal-lagring-tekst ved alle fritekstfelt (positiv form, kap. 4.2)
- [ ] I1 Plassholder-bug i modulleseren
- [ ] I2–I4 Skrivefeil/ødelagte setninger i situations.ts
- [ ] U1 Skriftstørrelse-løft for meningsbærende tekst

### Før backend / e-postutsending (P1)

- [ ] V1 Samtykkeregister med tidspunkt og ordlyd
- [ ] V2 Domeneavklaring + nøytral avsenderadresse (jurist/design)
- [ ] V3 Fjern @google/genai, nytt README, rydd .env.example
- [ ] V4 Oppdater datakartlegging (depoet_theme, e-post i localStorage); utpek master-dokument
- [ ] Personvernplanens Fase 2-krav (DPA, EU-region, sletting server-side) – uendret
- [ ] Jurist-spørsmålene i personvernplanen del D

### Kan tas løpende (P2)

- [ ] I5 Egen prompt-liste for «Annet»
- [ ] Sjargongpass + «Det faglige grunnlaget»-flate
- [ ] U2–U6 tilgjengelighetsutbedringer, deretter U7 WCAG-audit
- [ ] Alderssetning («rettet mot voksne over 18») og org.nr. i erklæringen

---

## 8. Sluttvurdering

Ingenting av det kritiske er teknisk krevende – det meste er tekst, defaults og to knapper
(slett/eksporter). Den viktigste innsikten fra gjennomgangen: Depoet trenger ikke velge mellom
GDPR og nytte. Lokal-først-arkitekturen er allerede valget som gir begge deler – nå må
brukertekstene, samtykkeflyten og erklæringen fortelle den samme historien som koden allerede lever.
