# GDPR og juridisk compliance-analyse – Depoet

> Skrevet juni 2026. Analysen dekker appen i nåværende tilstand OG
> alle planlagte funksjoner som om de er fullført (konto, e-post, synk, måling).
> Dette er en teknisk/strukturell vurdering, ikke juridisk rådgivning.
> Kontakt en advokat med GDPR-spesialisering for endelig godkjenning.

---

## Del 1 – Rettslig rammeverk som gjelder

| Regelverk | Gjelder fordi |
|---|---|
| GDPR (EU 2016/679) / Personvernforordningen | Behandler personopplysninger om brukere |
| Personopplysningsloven (2018) | Norsk gjennomføring av GDPR |
| ePrivacy-direktivet / ekomloven § 2-7b | Bruk av localStorage og cookies |
| Markedsføringsloven §§ 15–16 | E-postmarkedsføring / daglig nudge |
| Forbrukerkjøpsloven / avtaleloven | Dersom tjenesten faktureres |
| Forskrift om universell utforming av IKT | WCAG 2.1 AA-krav for norske nettsteder |
| Helsepersonelloven / pasientrettighetsloven | Gjelder ikke direkte – men grenseland vurderes nedenfor |

---

## Del 2 – Hva appen faktisk behandler (teknisk kartlegging)

### 2.1 localStorage-nøkler i dag

| Nøkkel | Innhold | Sensitivitetsgrad |
|---|---|---|
| `depoet_user` | Navn, onboarding-svar (heaviestNow, parentState, desiredHelp, wantsReminder), lagrede kort, fullførte moduler, ukemål, daglig innsjekkstatus | **Sensitiv** (se 3.1) |
| `depoet_sunday_reports` | Søndagsverksted-rapporter: temaer, refleksjoner, ukemål over tid | **Sensitiv** |
| `depoet_reflections` | Forelderens egne refleksjonssvar på spørsmål i appen | **Sensitiv** |
| `depoet_seen_prompts` | Hvilke daglige prompts som er sett (rotasjonslogg) | Lav |
| `depoet_visited_app` | Boolean – om brukeren har besøkt appen | Lav |

### 2.2 Onboarding samler inn

- **Navn** (valgfritt, fritekst)
- **Hva som er tyngst nå** (valg: Morgen / Skjerm / Legging / Overganger / Skole / Søsken / Min egen reaksjon / Ungdom / Annet)
- **Forelderens tilstand** («Jeg har litt overskudd» / «Jeg er sliten» / «Jeg er nesten helt tom og overbelastet»)
- **Ønsket hjelp** (5 kategorier)
- **Ønsker påminnelse** (boolean, forhåndsvalgt: `true`)
- **Startside-preferanse**

### 2.3 Planlagte funksjoner (som om de er aktive)

- E-postadresse (for konto og daglig nudge)
- Synkroniserte brukerdata på server
- Innloggingssesjon
- Samtykkebasert bruksmåling

---

## Del 3 – Funn og risikovurderinger

### 3.1 🔴 KRITISK: Særlige kategorier av personopplysninger (GDPR art. 9)

**Problemet:** Appen samler inn informasjon om forelderens psykiske tilstand
(`parentState`: «Jeg er nesten helt tom og overbelastet») og om barnets
reguleringsvansker (implicit via `heaviestNow`). GDPR art. 9 definerer
helseopplysninger og opplysninger om psykisk helse som særlige kategorier
med strengere krav.

**Vurdering:** Dette er et grensetilfelle. Opplysningene er selvrapporterte
og kontekstuelt relatert til foreldrerollen, ikke til en medisinsk journal.
Datatilsynet vil likevel kunne argumentere for at informasjon om forelderens
overbelastning og barnets ADHD-relaterte utfordringer er helserelatert.

**Konsekvens:** Rettslig grunnlag for behandling av særlige kategorier krever
enten *eksplisitt samtykke* (art. 9 nr. 2 bokstav a) eller at det er
«åpenbart offentliggjort» av den registrerte – noe det ikke er her.

**Tiltak:**
- Legg til et eksplisitt samtykketrinn i onboarding som navngir at appen
  lagrer opplysninger om forelderens emosjonelle tilstand lokalt.
- Vurder å formulere `parentState`-valgene mer nøytralt (f.eks. «Jeg har
  mye å gjøre» i stedet for «Jeg er nesten helt tom og overbelastet»).
- Alternativt: behandle alt som «potensielt sensitiv» og anvend GDPR art. 9
  fra starten av, noe som gir sterkest vern og tydeligst hjemmel.

---

### 3.2 🔴 KRITISK: Ingen samtykke-innhenting ved onboarding

**Problemet:** Appen begynner å lagre data i localStorage fra det øyeblikket
brukeren starter onboarding – uten at de først har akseptert noe.
Det finnes ingen lenke til personvernerklæringen i onboarding-flyten,
og ingen bekreftelsesklikk på at brukeren er kjent med hva som lagres.

**Krav:** ekomloven § 2-7b (implementering av ePrivacy) krever at brukeren
informeres og gir samtykke *før* data lagres, med mindre lagringen er
teknisk nødvendig. Refleksjoner og Sunday-rapporter er ikke teknisk
nødvendige for appens kjernefunksjon.

**Tiltak:**
- Legg til en enkel avkrysningsboks i steg 1 av onboarding:
  «Jeg har lest [personvernerklæringen] og godtar at mine svar lagres
  lokalt i nettleseren.» med lenke til /personvern.
- Alternativt: vis en informasjonsboks (ikke krev klikk) med lenke for
  rene teknisk-nødvendige data, og krev aktivt samtykke for refleksjoner
  og rapporter.

---

### 3.3 🔴 KRITISK: Forhåndsvalgt samtykke til e-post (wantsReminder: true)

**Problemet:** I onboarding er `wantsReminder` satt til `true` som default.
Markedsføringsloven § 15 og GDPR art. 7 nr. 2 forbyr pre-tikkede
samtykkebokser for markedskommunikasjon. Den daglige nudgen er kommunikasjon
initiert av tjenesten – og selv om den er pedagogisk i natur, er det
tvilsomt at forhåndsvalgt «ja» holder.

**Tiltak:**
- Endre default til `false` for `wantsReminder`.
- Krev aktivt valg i onboarding step 4 (daglig nudge-steget).
- Lagre tidspunkt for samtykke og hva som ble vist brukeren («samtykkelabel»).

---

### 3.4 🟡 MIDDELS: Ingen synlig lenke til personvernerklæring

**Problemet:** Verken landingssiden, onboarding-flyten eller appen inneholder
i dag en lenke til personvernerklæringen. Det er et GDPR art. 13-krav at
informasjon om behandlingen gis «på tidspunktet for innsamling».

**Tiltak:**
- Legg til «Personvern»-lenke i footer på landingssiden og i appens
  innstillinger-/om-panel.
- Legg til lenke i steg 1 av onboarding (se 3.2 over).

---

### 3.5 🟡 MIDDELS: Dataportabilitet mangler (GDPR art. 20)

**Problemet:** Brukere har rett til å få sine data utlevert i et maskinlesbart
format. I dag finnes kun «Nullstill alt» som sletter alt uten å gi brukeren
mulighet til å ta det med seg.

**Tiltak:**
- Implementer «Last ned mine data»-funksjon som eksporterer
  `depoet_user`, `depoet_sunday_reports` og `depoet_reflections` som én
  JSON- eller CSV-fil. Dette er allerede teknisk enkelt siden alt er i localStorage.

---

### 3.6 🟡 MIDDELS: Databehandleravtale med Cloudflare

**Problemet:** Cloudflare er databehandler (de prosesserer IP-adresser og
forespørsler). Cloudflare er et US-selskap. EU–US Data Privacy Framework (DPF)
dekker overføringen, men det krever at du aktivt har inngått Cloudflares DPA
og at dette er dokumentert.

**Tiltak:**
- Cloudflares standard DPA er inkludert i deres bruksvilkår for Pro/Team og
  over. På Free-plan: sjekk om Cloudflares Data Processing Addendum er
  tilgjengelig og akseptert i dashboardet (Privacy → Data Processing).
- Verifiser at Cloudflare er DPF-sertifisert (de er per 2024–2026).
- Notat i docs om at DPA er akseptert og dato for dette.

---

### 3.7 🟡 MIDDELS: E-posttjenesten mangler DPA og klarert lokasjon

**Problemet:** E-posttjenesten (TBD) er en kritisk databehandler – den vil
motta e-postadresser og sende kommunikasjon på vegne av behandlingsansvarlig.
Inntil leverandør er valgt og DPA er signert, kan ikke e-postfunksjonen
aktiveres i samsvar med GDPR.

**Tiltak:**
- Velg en leverandør som tilbyr GDPR-kompatibel DPA og enten er EU-basert
  eller DPF-sertifisert. Anbefalte valg: **Resend** (USA, DPF-sertifisert,
  standard DPA tilgjengelig) eller **Postmark** (USA, DPF).
- Signer DPA før e-postfunksjonen lanseres.

---

### 3.8 🟡 MIDDELS: Refleksjoner lagres uten brukerens eksplisitte bevissthet

**Problemet:** Refleksjonssvar (fritekst som foreldre skriver som svar på
refleksjonsspørsmål) lagres i `depoet_reflections` i localStorage.
Disse er potensielt svært sensitive (personlige tanker om eget barn,
egne reaksjoner, skam). Brukere er ikke eksplisitt informert om at disse
tekstene lagres.

**Tiltak:**
- Legg til en synlig tekstlinje ved refleksjonsinput:
  «Svaret ditt lagres lokalt i nettleseren og forlater ikke enheten din.»
- Når/hvis synkronisering aktiveres: vis tydelig at refleksjoner nå også
  synkroniseres til server, og krev separat samtykke for dette.

---

### 3.9 🟢 LAVT: Helsepersonelloven / behandlingsansvaret

**Vurdering:** Depoet er ikke en helsetjeneste og er heller ikke
diagnoserelatert på en måte som utløser helsepersonelloven eller
pasientrettighetsloven. Appen posisjonerer seg eksplisitt som
«foreldrestøtte og kunnskap – ikke behandling, terapi eller akutthjelp»,
og dette står i koden (CoursesView.tsx). SafetyBanner-komponenten
gir videre anvisning til hjelpelinjer ved akutt behov.

**Status:** Tilstrekkelig disclaimet. Viktig at denne teksten beholdes
og ikke svekkes i fremtidige innholdsrunder.

---

### 3.10 🟢 LAVT: Barn og aldersgrenser

**Vurdering:** Appen henvender seg til foreldre, ikke til barn.
Det samles ikke inn data om barnet direkte. Det finnes ingen aldersgrense-gate,
men siden tjenesten forutsetter foreldrerollen er risikoen for at mindreårige
bruker den som primærbruker lav.

**Tiltak (anbefalt men ikke kritisk):** Legg til en setning i personvern-
erklæringen: «Tjenesten er rettet mot voksne over 18 år i foreldrerollen.»

---

### 3.11 🟢 LAVT: Universell utforming (WCAG 2.1 AA)

**Status:** Appen bruker semantisk HTML og aria-labels i en del komponenter.
Fullstendig WCAG 2.1 AA-audit er ikke gjort.

**Tiltak:** Gjennomfør en WCAG-audit før bred lansering. Dette er et krav
etter forskrift om universell utforming av IKT-løsninger for nettsteder
rettet mot allmennheten i Norge.

---

## Del 4 – Status på personvernerklæringen (docs/personvernerklæring.md)

| Element | Status |
|---|---|
| Behandlingsansvarlig | ✅ Korrekt (Irmelin Irene Hannisdal Holteberg) |
| Ingen org.nr. | ⚠️ Akseptabelt nå, bør oppdateres ved registrering |
| Formål og rettslig grunnlag (art. 13) | ✅ Dekket |
| Særlige kategorier nevnt | ❌ Mangler – se 3.1 |
| Lagringstid | ✅ Dekket |
| Tredjeparter / databehandlere | ⚠️ E-posttjeneste er TBD – må fylles inn |
| Brukerrettigheter (art. 15–22) | ✅ Dekket |
| Klagerett til Datatilsynet | ✅ Dekket |
| localStorage forklart | ✅ Dekket |
| Ingen sporingscookies | ✅ Korrekt og bekreftet av kodeanalyse |
| Lenke fra appen | ❌ Mangler – ikke publisert og ikke lenket til |
| Samtykkelager (når og hva brukeren godtok) | ❌ Ikke implementert |

---

## Del 5 – Prioritert tiltaksliste

### Må gjøres før bredere lansering

1. **Legg til samtykke-steg i onboarding** med lenke til personvernerklæring.
   Brukeren skal aktivt krysse av før data lagres.
2. **Endre `wantsReminder` default til `false`** – krev aktivt valg.
3. **Publiser personvernerklæringen** på /personvern og lenk til den fra
   landingssiden og appen.
4. **Legg til synlig «data lagres lokalt»-tekst** ved refleksjonsinput.
5. **Vurder art. 9-posisjonen** med juridisk rådgiver: om appen behandler
   helserelaterte opplysninger og hvilke konsekvenser det har.

### Bør gjøres før e-post aktiveres

6. **Velg e-posttjeneste og inngå DPA** før nudge-funksjonen lanseres.
7. **Verifiser og dokumenter Cloudflare DPA** i prosjektets docs.

### Bør gjøres før synkronisering aktiveres

8. **Implementer dataportabilitet** («Last ned mine data»).
9. **Varsle eksisterende brukere** ved overgang fra localStorage-only til
   server-synkronisering – dette er en vesentlig endring av behandlingen
   og krever nytt samtykke.
10. **Lag slette-funksjon** som lar brukere slette serverlagrede data
    direkte fra appen (ikke bare via e-post til behandlingsansvarlig).

### Anbefalt på sikt

11. **WCAG 2.1 AA-audit** – bruk Lighthouse eller axe-core.
12. **Registrer enkeltpersonforetak** og legg til org.nr. i
    personvernerklæringen.
13. **Legg til alderssetning** i personvernerklæringen.

---

## Del 6 – Sammendrag

Depoet er i utgangspunktet bygget med personvern i tankene: ingen
tredjeparts-sporere, ingen analytics, ingen reklamecookies, data lagres
lokalt. Det gir et sterkt utgangspunkt.

De viktigste gapene er strukturelle, ikke tekniske: appen mangler synlig
samtykke-innhenting, har et forhåndsvalgt e-postsamtykke som er i strid
med GDPR, og personvernerklæringen er ikke publisert eller lenket til.
I tillegg bør særlig-kategori-problematikken avklares med en juridisk
rådgiver før synkronisering og e-post aktiveres.

Ingen av de kritiske punktene er teknisk kompliserte å fikse – de er
primært design- og flytvurderinger.
