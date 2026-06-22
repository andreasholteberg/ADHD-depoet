# GDPR- og personvern­arbeidsplan for Depoet

*Praktisk, kritisk arbeidsplan – ikke en juridisk betenkning. Jeg er ikke jurist. Dette er et arbeidsverktøy for å rydde innhold, funksjoner, dataflyt, dokumentasjon og lanseringsrekkefølge, og for å forberede de spørsmålene som faktisk må til en personvern-/juridisk rådgiver. Punkter merket «KREVER JURIDISK VURDERING», «MÅ AVKLARES» eller «AVHENGER AV LEVERANDØR» skal ikke avgjøres av denne planen alene.*

Status: 14. juni 2026. Bygger på personopplysningsloven/GDPR, ny ekomlov § 3-15 (cookies, i kraft 1.1.2025), markedsføringsloven § 15 (e-post/SMS) og Datatilsynets veiledning om DPIA og barn.

---

## Bærebjelken (les denne først)

Depoet ber ikke om diagnose eller helsejournal. Men målgruppen og fritekstfeltene gjør at **særlige kategorier av personopplysninger etter GDPR artikkel 9 (helseopplysninger) nesten garantert vil flyte inn** – om barnets ADHD, atferd, medisiner, og om forelderens egen psykiske belastning. Det gjelder spesielt fritekstrefleksjoner og søndagsrapporter. I tillegg er **barnet en registrert person uten egen stemme**, og Datatilsynet vektlegger ekstra vern av barns data.

Den ene avgjørelsen som reduserer mest risiko: **hold all fritekst og alt sensitivt lokalt på brukerens enhet i Standard-versjonen.** Hvis data aldri forlater enheten og du som behandlingsansvarlig aldri mottar dem, unngår du i praksis å «behandle» artikkel 9-data i sky – og slipper det tyngste samtykke-, DPIA- og sikkerhetsregimet for å komme i gang. Da kan du trygt lansere det som faktisk er verdifullt nå (kurs, kort, språkbank, strukturerte verktøy), og utsette sky-lagring av fritekst til DPIA og juridisk gjennomgang er på plass.

Resten av planen bygger på dette prinsippet.

---

## 1. Kort juridisk risikovurdering

| Depoet vurdert som | Risiko | Hvorfor |
|---|---|---|
| **Innholdsside** (kurs, kort, språk – kun lesing) | **Lav** | Ingen personopplysninger nødvendig for å lese. Statisk innhold er distribusjon, ikke behandling. |
| **Kursplattform** (progresjon, favoritter, konto) | **Lav–moderat** | Vanlige persondata (konto-ID, progresjon) på avtalegrunnlag. Håndterbart med standard tiltak (EU-region, DPA, sletting). |
| **Foreldrestøtteplattform** (onboarding, «I dag», dagskort) | **Moderat** | Onboarding spør hvordan forelderen har det og hva som er tyngst – grenser mot sensitivt om det lagres/overføres. Hold strukturert og lokalt. |
| **Plattform med fritekst/refleksjoner/søndagsrapporter** | **Høy** | Fritekst vil inneholde helseopplysninger om voksen og barn (art. 9). Sky-lagring utløser uttrykkelig samtykke, DPIA og skjerpet sikkerhet. |
| **Plattform med analyse/AI/nudger** | **Høy / svært høy** | Profilering av sensitiv familieproblematikk, mulig automatiserte vurderinger av en sårbar gruppe, varsler som kan røpe kontekst. Utløser DPIA og potensielt art. 22-problematikk. |

Hovedbudskap: **innholds- og kursdelen er lavrisiko og kan lanseres tidlig. Fritekst-i-sky, analyse og AI er høyrisiko og må vente.**

---

## 2. Funksjonsklassifisering

| Funksjon | Klassifisering | Tiltak / begrunnelse |
|---|---|---|
| Onboarding | **Standard med tiltak** | Kun strukturerte valg (ingen fritekst), lagres lokalt, overføres ikke. «Hvordan har du det» holdes grovkornet. |
| «I dag»-flate | **Trygg i Standard** | Innholdslevering. Med tiltak hvis brukerinput lagres (da lokalt). |
| Dagskort | **Trygg i Standard** | Statisk innhold. |
| Reguleringsstøtte | **Trygg i Standard** | Statisk innhold. |
| Mikrosteg | **Trygg i Standard** | Statisk innhold. |
| Språkforslag | **Trygg i Standard** | Statisk innhold. |
| Refleksjonsspørsmål | **Trygg i Standard** (uten lagring) | Trygt som ren refleksjon. Hvis svar lagres: lokalt + advarselstekst. |
| Kursmoduler | **Trygg i Standard** | Innhold. Progresjon = se konto/synk. |
| Situasjonskort | **Trygg i Standard** | Innhold. Sensitive temaer krever avgrensning/henvisning (sikkerhetsnumre finnes allerede). |
| Språkbank | **Trygg i Standard** | Innhold. |
| Favoritter | **Standard med tiltak** | Lokalt, eller synket som ikke-sensitiv liste på avtalegrunnlag. |
| Mitt depot | **Standard med tiltak** | Avhenger av hva det lagrer. Ikke-sensitivt + lokalt/avtale = ok. Fritekst = se under. |
| Søndagsrapporter | **Bør vente** (i sky) | Lokalt + tiltak i Standard. Sky utløser art. 9 + DPIA. |
| Fritekstrefleksjoner | **Bør vente** (i sky) | Standard: kun lokalt + advarselstekst. Sky krever uttrykkelig samtykke + DPIA. |
| Konto/synk | **Standard med tiltak** | Kun ikke-sensitive, strukturerte data. EU-region, DPA, avtalegrunnlag, sletteknapp. |
| E-postnudger | **Bør vente / med tiltak** | Tjenestemeldinger ok (avtale). Nudger/markedsføring krever § 15-samtykke + nøytral ordlyd. |
| SMS | **Bør vente** | Park i Standard. SMS basert på emosjonell status: **bør ikke bygges**. |
| Analyse | **Bør ikke bygges uten juridisk gjennomgang** | Profilering av sensitiv kontekst. Standard: ingen tredjepartsanalyse. |
| Video | **Standard med tiltak** | Bunny Stream i EU-region, uten sporings-embed. AVHENGER AV LEVERANDØR (DPA). |
| Betaling | **Standard med tiltak** | PCI-DSS-leverandør (f.eks. Stripe), avtalegrunnlag, DPA. Du lagrer ikke kortdata. AVHENGER AV LEVERANDØR. |
| Eksport/import | **Standard med tiltak** | Eksport = dataportabilitet (bra). Import krever sikker validering. |
| AI | **Bør ikke bygges uten juridisk gjennomgang** | Park fra Standard. Krever DPIA, uttrykkelig samtykke, leverandøravtale, ingen modelltrening. |

---

## 3. Innholdsgjennomgang (metode)

Gå gjennom **hvert** kort, kurs, språkforslag, situasjonskort og refleksjonsspørsmål med denne sjekklisten. Før resultatet i et regneark (én rad per element):

1. Ber teksten brukeren skrive inn sensitive opplysninger?
2. Ber teksten om barnets navn, diagnose, skole, medisiner eller hjelpeapparat?
3. Kan teksten forstås som helsehjelp, behandling, diagnose, krisehjelp eller individuell faglig vurdering?
4. Bør teksten skrives om?
5. Bør den være refleksjon **uten lagring**?
6. Bør den lagres **lokalt** i stedet for i sky?
7. Trenger den advarsel/avgrensning?

**Beslutningsregel:** Hvis (1) eller (2) = ja → omformuler så den ikke inviterer sensitiv input, eller gjør feltet lokalt + advarsel. Hvis (3) = ja → omformuler til pedagogisk/avgrensende språk, legg på «ikke behandling»-avgrensning og evt. henvisning.

**Eksempler på dårlig → bedre formulering:**

- Dårlig: «Beskriv barnets siste sammenbrudd og hva diagnosen betyr i den situasjonen.»
  Bedre: «Tenk på en situasjon som ble vanskelig. Hva skjedde rett før? (Du trenger ikke skrive det ned.)»
- Dårlig: «Skriv inn hvilke medisiner barnet bruker, så tilpasser vi rådene.»
  Bedre: *(fjernes helt – Depoet skal ikke samle medisindata).*
- Dårlig: «Vi vurderer ut fra svarene dine hvor alvorlig situasjonen er.»
  Bedre: «Dette er støtte og refleksjon, ikke en vurdering av barnet ditt eller situasjonen.»
- Dårlig (situasjonskort): «Slik håndterer du barnets ADHD-anfall.»
  Bedre: «Når det blir for mye på én gang – en rolig vei gjennom øyeblikket.»

---

## 4. Fritekststrategi

Fritekst er den største enkeltrisikoen. Strategi:

- **Fjern** fritekstfelt som direkte ber om sensitiv input (medisiner, diagnose, skole, hjelpeapparat, dokument).
- **Erstatt med strukturerte valg** der det går (humør-/kapasitetsskala, ferdige stikkord, «hva ble for mye» som avkrysning i stedet for fritekst).
- **Behold lokalt** de fritekstfeltene som har reell egenverdi (personlige refleksjoner, søndagsnotat) – men kun på enheten, aldri i sky i Standard.
- **Krever uttrykkelig samtykke (art. 9)**: enhver sky-lagring av fritekst/søndagsrapport. Ordinært samtykke er **ikke nok** – det må være uttrykkelig, dokumentert, spesifikt og lett å trekke tilbake.
- **Krever DPIA**: før fritekst i sky settes i drift.
- **Bør vente**: all sky-fritekst til DPIA + juridisk gjennomgang + EU-leverandør med DPA er på plass.

**Standardtekst ved fritekstfelt** (vis denne ved hvert fritekstfelt):

> «Skriv gjerne for din egen del. Ikke skriv inn barnets navn, diagnose, medisiner, skole, dokumenter eller andre sensitive opplysninger. Det du skriver her lagres bare lokalt på din egen enhet og sendes ikke til oss.»

(Når/hvis sky-lagring senere aktiveres, må teksten endres til å forklare at innholdet da lagres hos en leverandør, på hvilket grunnlag, og hvordan det slettes – og krever eget, uttrykkelig samtykke.)

---

## 5. Datakartlegging (mal + utfylt for Depoet)

Mal – én rad per datafelt med kolonnene: **datafelt · eksempel · funksjon · formål · behandlingsgrunnlag · sensitivitet · lagringssted · leverandør · slettetid · tilgang · brukerrettigheter · risiko · tiltak.**

Utfylt (kortform; «Må avklares» der det avhenger av valg dere ikke har tatt):

| Datafelt | Sensitivitet | Lagringssted (Standard) | Grunnlag | Slettetid | Risiko / tiltak |
|---|---|---|---|---|---|
| Navn/kallenavn | Lav | Sky (konto) eller lokalt | Avtale | Ved kontosletting | La kallenavn være valgfritt. |
| E-post | Lav–moderat | Sky (konto) | Avtale (konto) / samtykke (nudger) | Ved sletting + lovpålagt oppbevaring for kjøp | Kan røpe interesse for ADHD – ikke bruk i sporing. |
| Konto-ID | Lav | Sky | Avtale | Ved sletting | Pseudonym nøkkel. |
| Samtykker | Lav (men kritisk) | Sky | Rettslig plikt (dokumentasjon) | Så lenge nødvendig som bevis | Eget samtykkeregister med tidsstempel. |
| Onboarding-svar | **Moderat** | **Lokalt** | Samtykke/avtale | Lokalt til sletting | Strukturert, ikke fritekst. Ikke overfør. |
| Daglig innsjekk / kapasitet | **Moderat** | **Lokalt** | Samtykke | Lokalt | Kan avsløre psykisk belastning – hold lokalt. |
| Kursprogresjon | Lav | Sky/lokalt | Avtale | Ved sletting | Ufarlig hvis ikke koblet til sensitivt innhold. |
| Favoritter / lagrede språksetninger | Lav–moderat | Sky/lokalt | Avtale | Ved sletting | Valg av kort kan indikere tema – vurder lokalt. |
| Søndagsrapporter | **Høy (art. 9)** | **Lokalt** (sky: bør vente) | Uttrykkelig samtykke (ved sky) | Kort, brukerstyrt | Sky krever DPIA. Standard = lokalt. |
| Fritekstrefleksjoner | **Høy (art. 9)** | **Lokalt** (sky: bør vente) | Uttrykkelig samtykke (ved sky) | Brukerstyrt | Advarselstekst. Standard = lokalt. |
| E-post/SMS-valg (opt-ins) | Lav | Sky | Samtykke + dokumentasjonsplikt | Til tilbaketrekking + bevisperiode | Granulært, separat per kanal. |
| Betalingsdata | Moderat | **Hos betalingsleverandør** | Avtale + rettslig plikt (regnskap) | Regnskapslovens frister | Du lagrer ikke kortdata. AVHENGER AV LEVERANDØR. |
| Tekniske logger | Lav–moderat | Sky | Berettiget interesse | Kort (f.eks. 30–90 dager) MÅ AVKLARES | Ikke logg fritekstinnhold. IP minimeres. |
| Analyse | Moderat | (ingen i Standard) | Samtykke (hvis i det hele tatt) | – | Standard: av. |
| AI-input/output | **Høy** | (ingen i Standard) | Uttrykkelig samtykke + DPIA | – | Park. |
| Eksport/import-filer | Speiler kildedata | Brukerens enhet | Avtale (portabilitet) | Brukerstyrt | Sikker generering, ingen mellomlagring i sky. |

---

## 6. Behandlingsgrunnlag-matrise

| Behandling | Sannsynlig grunnlag | Kritisk merknad |
|---|---|---|
| Konto | Art. 6(1)(b) avtale | – |
| Kursprogresjon | Art. 6(1)(b) avtale | – |
| Favoritter | Art. 6(1)(b) avtale | Eller samtykke hvis «ekstra»-funksjon. |
| Betaling | Art. 6(1)(b) avtale + 6(1)(c) rettslig plikt (regnskap) | Kortdata hos PCI-leverandør. |
| Tekniske logger | Art. 6(1)(f) berettiget interesse | Krever balansetest + dokumentasjon. Ikke logg sensitivt. |
| E-post (tjeneste) | Art. 6(1)(b) avtale | Transaksjonsmeldinger (innlogging, kvittering). |
| E-post (nudge/marked) | Art. 6(1)(a) samtykke **+ markedsføringsloven § 15** | Aktivt, separat samtykke. Ikke forhåndsavkrysset. |
| SMS | Art. 6(1)(a) samtykke **+ § 15** | Park. Aldri trigget av emosjonell status. |
| Markedsføring/sporing | Samtykke (GDPR) **+ ekomlov § 3-15** (cookies) | Passivt samtykke ikke gyldig fra 1.1.2025. |
| Cookies (ikke-nødvendige) | Samtykke (ekomlov § 3-15 + GDPR) | Kun strengt nødvendige uten samtykke. Anbefaling: ingen tredjeparts → ingen banner. |
| Fritekstrefleksjoner (sky) | **Art. 9(2)(a) uttrykkelig samtykke** + 6(1)(a) | Vanlig samtykke ikke nok. KREVER JURIDISK VURDERING. Standard: hold lokalt så art. 9 ikke utløses hos deg. |
| Søndagsrapporter (sky) | **Art. 9(2)(a) uttrykkelig samtykke** | Som over. |
| AI-analyse | **Art. 9(2)(a) uttrykkelig samtykke** + DPIA + art. 22-vurdering | Park. KREVER JURIDISK VURDERING. |
| Eksport/dataportabilitet | Art. 6(1)(b) + art. 20-rettighet | Bygg som brukerrettighet. |

**Tydelig:** for fritekst, søndagsrapport og AI er **samtykke alene ikke trygt nok** med mindre det er *uttrykkelig* (art. 9), dokumentert, spesifikt og lett å trekke tilbake – og selv da er det skjørt i en sårbar målgruppe. Beste risikoreduksjon er å ikke behandle dataene i sky i det hele tatt i Standard.

---

## 7. DPIA-plan

**Trenger Depoet DPIA?** For Standard (statisk innhold + lokal lagring + enkel konto): sannsynligvis **nei** for selve kjernen, men en enkel forhåndsvurdering bør dokumenteres. For de **planlagte** funksjonene: **ja, DPIA er påkrevd** før drift, fordi de treffer Datatilsynets terskler (særlige kategorier, sårbar gruppe inkl. barn, og ev. profilering/automatiserte vurderinger).

**Utløsere (funksjoner som krever DPIA før lansering):** sky-lagret fritekst, søndagsrapporter i sky, analyse/profilering, AI, nudger basert på emosjonell status, SMS-på-status, dokumentopplasting, barnespesifikke profiler.

**DPIA-en skal dekke / risikoer som skal vurderes:**
- Risiko for **forelder**: avsløring av psykisk belastning, familiekonflikt, skam.
- Risiko for **barn**: helse-/atferdsdata lagret uten barnets stemme; profil over tid.
- Risiko ved **datalekkasje**: særlig sensitivt; omdømme- og skadepotensial høyt.
- Risiko ved **AI**: feil/uforsvarlige råd, profilering, gjenkjennelig output, modelltrening.
- Risiko ved **feilaktige råd**: at pedagogisk innhold oppfattes som helsehjelp.
- Risiko ved **e-post/SMS-varsler**: kontekst røpes i emne/varsel.
- Risiko ved **analyse/profilering**: kartlegging av sensitiv interesse.

**Risikoreduserende tiltak:** lokal lagring som standard, kryptering, dataminimering, nøytrale varsler, ingen tredjepartssporing, EU-region, sletteknapp, uttrykkelig samtykke, ingen modelltrening, klar «ikke behandling»-avgrensning.

**Kriterier for at en funksjon kan lanseres:** DPIA gjennomført og restrisiko vurdert akseptabel; lovlig grunnlag på plass (uttrykkelig samtykke der nødvendig); DPA med EU-leverandør signert; sletting/innsyn/tilbaketrekking fungerer; sikkerhetstiltak verifisert. Hvis restrisiko er høy og ikke kan reduseres → **forhåndsdrøfting med Datatilsynet** (art. 36). KREVER JURIDISK VURDERING.

---

## 8. Personvern som standard (privacy by default, art. 25)

Standardinnstillinger ut av boksen:

- Ingen markedsføring (av)
- Ingen SMS (av/ikke bygget)
- Ingen AI-analyse (av/ikke bygget)
- Ingen sky-lagring av fritekst (kun lokalt)
- Ingen tredjepartssporing (av)
- Ingen deling
- Ingen barnenavn
- Ingen diagnosefelt
- Ingen skole-/medisin-/hjelpeapparatfelt
- Kortest mulig lagringstid
- Mest mulig lokalt
- Mer inngripende funksjoner krever **aktiv** påslåing av brukeren, med egen forklaring og eget samtykke

Dette er ikke bare god praksis – det er et lovkrav (art. 25) og det sterkeste salgspoenget overfor en sårbar målgruppe.

---

## 9. Dokumentasjon som må lages

| Dokument | Formål / innhold | Når ferdig |
|---|---|---|
| Personvernerklæring | Hva samles, hvorfor, grunnlag, lagringstid, rettigheter, kontakt | **Før Fase 1 (live)** |
| Brukervilkår | Avtale, «ikke behandling/krisehjelp»-avgrensning, ansvarsbegrensning | **Før Fase 1** |
| Cookie-erklæring | Hvilke cookies, grunnlag, samtykke (ekomlov § 3-15) | Før evt. cookies/analyse (kan unngås om ingen tredjepart) |
| Datakartlegging | Levende oversikt (del 5) | **Før Fase 1**, oppdateres løpende |
| Behandlingsprotokoll (art. 30) | Oversikt over alle behandlinger | **Før Fase 1** |
| DPIA | For høyrisikofunksjoner (del 7) | Før Fase 4+ |
| Risikovurdering (sikkerhet) | Trusler, sannsynlighet, tiltak | Før Fase 2 (konto/sky) |
| Leverandøroversikt | Alle databehandlere, land, data | **Før Fase 2** |
| Databehandleravtaler (art. 28) | Med hver leverandør | Før hver leverandør tas i bruk |
| Sletterutine | Hvordan og når data slettes, inkl. backup | Før Fase 2 |
| Innsynsrutine | Hvordan art. 15-krav besvares | Før Fase 2 |
| Eksport/dataportabilitet | Rutine + funksjon (art. 20) | Før Fase 2 |
| Avviksrutine | Varsling innen 72 t (art. 33–34) | Før Fase 2 |
| Samtykkeregister | Logg over samtykker m/tidsstempel | Før nudger/sky-fritekst |
| Sikkerhetsnotat | Kryptering, tilgang, MFA, logging | Før Fase 2 |
| Barnedata-vurdering | Egen vurdering av barns data | **Før Fase 1** (kort), utdypes ved fritekst i sky |
| AI-vurdering | Hvis AI – egen vurdering | Kun hvis/ når AI vurderes |
| Markedsføringsvurdering (e-post/SMS) | § 15-samtykke, ordlyd | Før Fase 5 |

---

## 10. Teknisk tiltaksplan

Må bygges inn (grovt prioritert):

- **Sletteknapp** (full kontosletting inkl. avledede data) – før Fase 2
- **Eksportfunksjon** (art. 20) – før Fase 2
- **Samtykkeinnstillinger** (granulært, per formål, lett å trekke tilbake) – før nudger/sky
- **Cookie-valg** – kun hvis ikke-nødvendige cookies brukes
- **Personverndashbord** (se/eksporter/slett/styr samtykker) – Fase 2–3
- **Skille lokal vs. sky-lagring** (tydelig i kode og UI) – **før Fase 1**
- **Kryptering** i transitt (TLS) og i ro – før Fase 2
- **Tilgangsstyring** (minste privilegium) – før Fase 2
- **Admin-MFA** – før Fase 2
- **Logging av admin-tilgang** – før Fase 2
- **Sletting fra backup** (definert rutine/tidsvindu) – før Fase 2
- **Rate limiting** (mot misbruk/uttrekk) – før Fase 2
- **Sikker eksport/import** (validering, ingen kjøring av importert innhold) – før eksport/import lanseres
- **Ingen produksjonsdata i testmiljø** – fra dag én
- **Leverandørkontroll** (DPA, region, sikkerhet) – før hver leverandør
- **EU/EØS-region der mulig** – fra dag én

---

## 11. Leverandør- og tredjelandsgjennomgang

For hver leverandør vurder: datatyper · DPA · land · underleverandører · overføring utenfor EØS · sikkerhet · sletting · risiko.

| Leverandør | Status / anbefaling |
|---|---|
| Hosting/frontend (f.eks. Cloudflare Pages/Vercel) | Velg EU-region der mulig. DPA. AVHENGER AV LEVERANDØR. |
| Database/backend (f.eks. Supabase) | **EU-region obligatorisk.** DPA. Sjekk underleverandører (ofte AWS). MÅ AVKLARES. |
| Auth | Helst samme som backend, EU. DPA. |
| E-post | EU-basert leverandør foretrukket. DPA. Sjekk hvor lister lagres. |
| SMS | Park. Ved bruk: DPA, EU, nøytral avsender. |
| Video (Bunny) | EU-region, uten sporing. DPA. AVHENGER AV LEVERANDØR. |
| Betaling (f.eks. Stripe) | PCI-DSS. DPA. Mulig USA-overføring → overføringsgrunnlag. KREVER JURIDISK VURDERING. |
| Analyse | Ingen i Standard. Hvis senere: EU/selvhostet, aggregert. |
| AI | Park. Ved bruk: DPA som forbyr trening, EU der mulig, KREVER JURIDISK VURDERING. |
| Support/logging/backup | Samme region som hoveddata. DPA. |

**Tredjeland:** Lanser først kun i Norge/EØS med EØS-leverandører – da unngås overføringsproblematikk. Enhver leverandør i USA/utenfor EØS (vanlig for betaling/AI) krever overføringsgrunnlag (SCC/Data Privacy Framework) og egen vurdering. **KREVER JURIDISK VURDERING.**

---

## 12. E-post og SMS

Tre kategorier – behandles ulikt:

| Type | Eksempel | Grunnlag | Regel |
|---|---|---|---|
| **Nødvendige tjenestemeldinger** | Innloggingslenke, kvittering, viktig driftsvarsel | Avtale | Tillatt uten markedssamtykke. Hold rent transaksjonelt. |
| **Støttenudger** | «Dagens støtte fra Depoet er klar» | Samtykke (behandles som markedsføring) | Krever aktivt samtykke + enkel avmelding. |
| **Markedsføring** | Tilbud, oppgradering | Samtykke + markedsføringsloven § 15 | Aktivt, separat, dokumentert samtykke. Ingen forhåndsavkryssing. |

**Samtykke innhentes** ved aktiv avkryssing (separate bokser for e-post og SMS), med tydelig hva man takker ja til, lagret i samtykkeregister, og med enkel/gratis avmelding i hver melding (lovkrav).

**Nøytral ordlyd – kritisk:** varsler skal **aldri** røpe sensitiv kontekst. Ikke «Hjelp til barnets ADHD-sammenbrudd». Bruk «Dagens støtte fra Depoet er klar», «En liten påminnelse fra Depoet». Samme for SMS-avsendernavn og push.

SMS: **park i Standard.** SMS trigget av emosjonell/sensitiv status: **bygg ikke.**

---

## 13. AI og analyse

**Anbefaling: fjern AI fra Standard og utsett.** Hvis AI senere vurderes, streng ramme:

- AI får tilgang til: **kun** det brukeren aktivt limer inn i en forespørsel, etter uttrykkelig samtykke.
- AI får **ikke** tilgang til: lagret fritekst, søndagsrapporter, barnedata, profil, historikk.
- **Ingen modelltrening** på brukerdata (kontraktfestet hos leverandør).
- Databehandleravtale + EU der mulig + uttrykkelig samtykke + DPIA + logging + sletting.
- Nøytralt språk, **ingen diagnose, ingen behandling, ingen krisehjelp, ingen vurdering av barnet, ingen risikoscore.**
- Tydelig at output er generelt og pedagogisk, ikke individuell faglig vurdering.

Analyse: ingen tredjeparts produktanalyse i Standard. Ved behov senere: EU/selvhostet, aggregert, ikke koblet til sensitivt innhold, bak samtykke (ekomlov).

---

## 14. Lanseringsrekkefølge

| Fase | Innhold | Må være ferdig før lansering |
|---|---|---|
| **1 – GDPR-ryddet Standard** | Kurs, kort, språkbank, lokal lagring, enkel konto, disclaimer | Personvernerklæring, vilkår, barnedata-vurdering (kort), datakartlegging, lokal-vs-sky-skille, «ikke behandling»-avgrensning, fritekst kun lokalt |
| **2 – Lukket test** | Pilot på Fase 1 (jf. lanserings-sjekklisten) | Samtykke ved e-postfangst, sletteknapp, sikkerhetsgrunnlag, DPA med backend, EU-region |
| **3 – Betalt Standard** | Abonnement | Betalingsleverandør-DPA, regnskapsoppbevaring, vilkår om kjøp |
| **4 – Utvidede refleksjoner** | Evt. sky-lagring av fritekst/søndagsrapport | **DPIA**, uttrykkelig art. 9-samtykke, kryptering, sletting fra backup, juridisk gjennomgang |
| **5 – E-post/SMS** | Nudger | § 15-samtykke, samtykkeregister, nøytral ordlyd, avmelding |
| **6 – Analyse** | Produktanalyse | DPIA-tillegg, ekomlov-samtykke, EU/aggregert |
| **7 – AI (hvis forsvarlig)** | AI-veileder | Full DPIA, uttrykkelig samtykke, leverandøravtale uten trening, art. 22-vurdering, KREVER JURIDISK VURDERING |

---

## 15. Stoppunkter (lanser ikke før DPIA + juridisk rødflagg-sjekk)

- Skybasert fritekstdagbok
- Søndagsrapporter i sky
- AI
- Analyse/profilering
- SMS basert på emosjonell status
- Opplasting av dokumenter
- Barnespesifikke profiler
- Diagnosefelt
- Deling med skole/PPT/BUP
- Krise-/risikovurdering

Alle disse inviterer eller skaper art. 9-data om barn, eller automatiserte vurderinger av en sårbar gruppe. **Ingen av dem skal i produksjon før DPIA og juridisk gjennomgang.** Flere (diagnosefelt, dokumentopplasting, barneprofiler, krisevurdering, deling med faginstanser) bør **vurderes droppet helt** – de flytter Depoet fra «pedagogisk støtte» mot «helse-/journalsystem», som er et helt annet og mye tyngre regulatorisk regime.

---

## 16. Ferdig-kriterier: «GDPR-klar før lansering» (Fase 1)

- [ ] Alle datafelt er kartlagt (del 5)
- [ ] Alle datafelt har dokumentert behandlingsgrunnlag (del 6)
- [ ] Alle «røde» datafelt er fjernet, gjort lokale, eller dekket av uttrykkelig samtykke
- [ ] Personvernerklæring publisert og dekkende
- [ ] Brukervilkår med «ikke behandling/krisehjelp»-avgrensning publisert
- [ ] Sletteknapp fungerer (full kontosletting)
- [ ] Eksport fungerer (art. 20)
- [ ] Ingen tredjepartspiksler/-sporing aktivert
- [ ] Cookie-situasjon avklart (helst ingen ikke-nødvendige → ingen banner)
- [ ] Databehandleravtaler kontrollert for hver leverandør i bruk
- [ ] DPIA gjennomført for alle høyrisikofunksjoner som er på (Fase 1: ingen)
- [ ] Bruker kan trekke samtykke tilbake enkelt
- [ ] Barnets navn/diagnose/skole/medisiner samles ikke inn
- [ ] Fritekst lagres kun lokalt, med advarselstekst
- [ ] EU/EØS-region bekreftet for all sky-lagring
- [ ] «Ikke behandling»-avgrensning + sikkerhetsnumre synlige i sensitive flater

---

# Avslutning

## A. Prioritert 30-dagers arbeidsplan

**Uke 1 – Kartlegg og frys risiko**
1. Fyll ut datakartleggingen (del 5) for alt som finnes i dag.
2. Verifiser i koden at all fritekst (refleksjoner, søndagsrapport, onboarding) lagres **lokalt** og ikke sendes noe sted. Fjern enhver sky-overføring av fritekst.
3. Bekreft at ingen felt ber om barnets navn/diagnose/skole/medisiner. Fjern/omformuler det som gjør det (del 3).

**Uke 2 – Innhold og avgrensning**
4. Kjør innholdsgjennomgangen (del 3) på kort, kurs, situasjonskort, refleksjonsspørsmål.
5. Legg standard advarselstekst på alle fritekstfelt (del 4).
6. Skriv personvernerklæring, brukervilkår og en kort barnedata-vurdering (utkast).

**Uke 3 – Teknisk minimum + leverandør**
7. Bygg/bekreft sletteknapp og eksport (lokalt nivå holder for Fase 1).
8. Lag leverandøroversikt; bekreft EU-region og innhent DPA for det som faktisk brukes (hosting, backend).
9. Bekreft «ingen tredjepartssporing» og avklar cookie-situasjonen (mål: ingen banner nødvendig).

**Uke 4 – Verifiser og lanser Fase 1**
10. Kjør ferdig-kriteriene (del 16) som sjekkliste.
11. Få personvernerklæring + vilkår + de fire jurist-spørsmålene (under) gjennomgått av en personvern-/juridisk rådgiver.
12. Lanser Fase 1 (GDPR-ryddet Standard) → start lukket pilot.

## B. Kan lanseres trygt først (Fase 1)

- Kurs, kursmoduler, situasjonskort, dagskort, språkbank, språkforslag, mikrosteg, reguleringsstøtte (alt innhold)
- Onboarding med strukturerte valg, lokalt
- Refleksjonsspørsmål og fritekst **lokalt** med advarselstekst
- Favoritter og kursprogresjon (lokalt, eller enkel konto på avtalegrunnlag, EU-region)
- Enkel konto/innlogging for ikke-sensitive data
- Tjeneste-e-post (innlogging/kvittering)
- Video via EU-region uten sporing
- Disclaimer/avgrensning (allerede på plass)

## C. Må vente

- Sky-lagring av fritekstrefleksjoner og søndagsrapporter (Fase 4 + DPIA + uttrykkelig samtykke)
- E-postnudger/markedsføring og all SMS (Fase 5 + § 15-samtykke + nøytral ordlyd)
- SMS basert på emosjonell status (bygg ikke)
- Analyse/profilering (Fase 6 + DPIA + ekomlov-samtykke)
- AI (Fase 7 + full DPIA + juridisk gjennomgang, eller dropp)
- Dokumentopplasting, barneprofiler, diagnosefelt, deling med skole/PPT/BUP, krise-/risikovurdering (stoppunkter – vurder å droppe helt)
- Internasjonal lansering / ikke-EØS-leverandører (overføringsgrunnlag kreves)

## D. Spørsmål til juridisk / GDPR-rådgiver

1. Er «hold fritekst kun lokalt» tilstrekkelig til at vi **ikke** anses som behandlingsansvarlig for art. 9-data i Standard – og endrer det seg ved sky-synk eller backup?
2. Hvilket nøyaktig behandlingsgrunnlag og samtykkeformulering kreves for sky-lagring av søndagsrapporter/fritekst som kan inneholde helseopplysninger om **barn**?
3. Hvor går grensen mellom «pedagogisk støtte» og «helsehjelp/helsetjeneste» for vårt innhold – og hvilke avgrensninger/formuleringer trengs for å holde oss trygt på riktig side?
4. Utløser noen av Fase 1-funksjonene DPIA-plikt etter Datatilsynets liste, eller holder en dokumentert forhåndsvurdering?
5. Hvilke krav stiller barns særlige vern (Datatilsynet) til en tjeneste der voksne registrerer data **om** barn?
6. Er støttenudger («Dagens støtte er klar») å regne som markedsføring etter § 15, eller tjenestemeldinger?
7. Hvilke leverandører/overføringer (betaling, evt. AI) krever overføringsgrunnlag, og hvilket?
8. Bør vi ta forhåndsdrøfting med Datatilsynet (art. 36) før noen av høyrisikofunksjonene?

---

## Internasjonal lansering (kort)

Lanser først kun i Norge/EØS med EØS-leverandører – da slipper du overføringsproblematikk og forholder deg til ett regelsett. Internasjonalt: andre lands tilleggsregler (f.eks. barn/COPPA i USA, UK GDPR, ePrivacy-varianter) og overføring ut av EØS må vurderes separat. **Dette bør ikke lanseres internasjonalt før avklart.**

---

## Kilder (norsk rett, grunnlag per 2025–2026)

- Datatilsynet – nye cookie-regler / ekomlov § 3-15 (samtykke fra 1.1.2025): https://www.datatilsynet.no/aktuelt/aktuelle-nyheter-2024/nye-cookie-regler-fra-1.-januar/
- Datatilsynet – veiledning om samtykke til informasjonskapsler og sporingsteknologier: https://www.datatilsynet.no/personvern-pa-ulike-omrader/internett-og-apper/bruk-av-informasjonskapsler-og-andre-sporingsteknologier/
- Datatilsynet – når må man gjennomføre DPIA: https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/vurdering-av-personvernkonsekvenser/nar-ma-man-gjennomfore-en-vurdering-av-personvernkonsekvenser/
- Datatilsynet – nyhetsbrev, e-postlister og SMS: https://www.datatilsynet.no/personvern-pa-ulike-omrader/kundehandtering-handel-og-medlemskap/nyhetsbrev-epostlister-og-sms/
- Forbrukertilsynet – veiledning om markedsføring via e-post, SMS o.l. (markedsføringsloven § 15): https://www.forbrukertilsynet.no/lov-og-rett/veiledninger-og-retningslinjer/forbrukertilsynets-veiledning-markedsforing-via-e-post-sms-o-l

*Lovtekst: personopplysningsloven/GDPR, ekomloven, markedsføringsloven (lovdata.no). Denne planen erstatter ikke juridisk rådgivning.*
