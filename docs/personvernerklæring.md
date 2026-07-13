# Personvernerklæring – ADHD Depoet

> KILDE TIL SANNHET for personverntekst. Den brukervendte modalen i
> `src/components/PrivacyPolicy.tsx` er et sammendrag av dette dokumentet.
> Jurist/personvernrådgiver bør gjennomgå teksten før bred lansering.

**Sist oppdatert:** juli 2026  
**Gjelder:** adhd-depoet.com  
**Målgruppe:** voksne over 18 år i foreldrerollen

## 1. Hvem er ansvarlig?

**Behandlingsansvarlig:** HOLTEBERG KONTINUUM, org.nr. 837 924 782  
**Adresse:** Bårågerveien 21, 4641 SØGNE  
**Kontaktperson for personvern:** Andreas Holteberg, andreas@kontinuum.work  
**Nettsted:** adhd-depoet.com

Dette gjelder ansvar for behandling av personopplysninger i tjenesten. Depoet er ikke en
helsetjeneste og innebærer ikke medisinsk, psykologisk eller terapeutisk behandleransvar.

## 2. Live-status per lansering v1

Standardbygget uten miljønøkler er fortsatt **lokal-først**:

- ingen aktiv Supabase-backend
- ingen aktiv Resend/e-postutsending
- ingen innlogging, skylagring eller synk
- ingen analyseverktøy, cookies for sporing, åpningssporing eller klikksporing
- data lagres i nettleseren på brukerens enhet

Repoet inneholder nå kodeklar støtte for Supabase og Resend, men dette blir først aktivt når
relevante miljøvariabler og server-secrets settes. Det skal ikke aktiveres før databehandleravtaler,
DPA-vurderinger, secrets og rutiner er klare.

## 3. Hva lagres lokalt?

Dette lagres lokalt i nettleseren:

| Hva | Eksempel | localStorage-nøkkel |
|---|---|---|
| Kallenavn og oppstartssvar | tyngste situasjon, ønsket startflate | `depoet_user` |
| Daglige innsjekk og kursstatus | kapasitet, fullførte moduler | `depoet_user` |
| E-postadresse og lokale samtykker | adresse + tidspunkt | `depoet_user` |
| Refleksjoner | fritekst fra “I dag” | `depoet_reflections` |
| Søndagsnotater | fritekst og valg | `depoet_sunday_reports` |
| Lagrede kort | språkbank/favoritter | `depoet_user` |
| Rotasjon/visningsflagg | viste dagskort, besøkt app | `depoet_seen_prompts`, `depoet_visited_app` |
| Temavalg | lys/mørk/system | `depoet_theme` |

Brukeren kan laste ned lokal JSON-eksport og slette lokale data fra Profil.

## 4. Når Supabase aktiveres

Supabase aktiveres bare når både `VITE_SUPABASE_URL` og `VITE_SUPABASE_ANON_KEY` finnes i
frontend-miljøet, og servermiljøet er satt opp. Da vises ekte magic-link-login og sync-UI.

Synk krever separat aktivt samtykke. Følgende kan synkes:

- profil/kallenavn
- lagrede kort
- ukesmål/fokus
- fullførte kursmoduler
- onboarding/opt-ins/pause

Fritekst synkes **ikke** som standard. Refleksjoner og søndagsnotater synkes bare hvis brukeren
gir et eget aktivt samtykke til fritekst-sync.

Dette synkes ikke i v1:

- `depoet_seen_prompts`
- `depoet_visited_app`
- `depoet_theme`
- `lastCheckIn`

Supabase-tabellene er lagt opp med RLS: innlogget bruker kan bare lese/skrive egne rader.
E-postrelaterte tabeller håndteres server-side med service role via Edge Functions.

## 5. Når Resend/e-post aktiveres

E-post aktiveres bare når `VITE_EMAIL_ENABLED=true` og Supabase-backend er konfigurert. Resend
brukes kun server-side via secrets. Ingen Resend-nøkler skal finnes i frontend.

Planlagt flyt:

- request opt-in fra landingsside
- double opt-in via bekreftelseslenke
- unsubscribe med signert token uten innlogging
- preferanser/pause
- daglig dispatch ca. 07:00 Europe/Oslo når cron er satt opp

Det brukes ikke åpningssporing, klikksporing eller analytics.

## 6. Artikkel 9 og sensitivitet

Depoet er laget for voksne foreldre, men temaet ADHD, regulering, skam og familieliv kan gjøre
fritekst sensitiv i praksis. Appen ber ikke om barnets navn, diagnose, medisiner, skole,
journalopplysninger eller behandlerinformasjon. Brukeren bør ikke legge inn sensitiv informasjon.

Fritekst-sync er derfor av som standard og krever separat samtykke. Før bred live-aktivering bør
det gjøres en egen vurdering av om behandlingen kan innebære særlige kategorier av personopplysninger
etter GDPR art. 9, særlig dersom brukere skriver helseopplysninger i fritekstfelt.

## 7. Rettslig grunnlag

| Formål | Grunnlag |
|---|---|
| Lokal teknisk lagring som får appen til å fungere | Nødvendig teknisk lagring + informert aktivt valg |
| Konto og synk etter innlogging | Avtale (GDPR art. 6 nr. 1 b) og aktivt sync-samtykke i UI |
| Fritekst-sync | Uttrykkelig separat samtykke |
| Gratis e-postdrypp/daglige nudger | Samtykke (GDPR art. 6 nr. 1 a og markedsføringsloven § 15) |
| Sikkerhet og feilsøking | Berettiget interesse (art. 6 nr. 1 f), uten innholdsinnsyn der det ikke er nødvendig |

## 8. Rettigheter

Brukeren kan:

- laste ned lokal JSON-eksport
- få med serverdata i eksport når backend er aktiv og brukeren er innlogget
- slette lokale data
- slette serverdata når backend er aktiv og brukeren er innlogget
- trekke e-postsamtykke via unsubscribe-lenke når e-post er aktiv
- kontakte Andreas Holteberg på andreas@kontinuum.work for innsyn, retting, sletting eller spørsmål

Svarfrist for personvernforespørsler er normalt 30 dager. Brukeren kan klage til Datatilsynet.

## 9. Databehandlere

Planlagt, men ikke live i standardbygget:

- Supabase: autentisering, database, Edge Functions
- Resend: e-postutsending
- Cloudflare Pages: hosting av frontend

Endelige databehandleravtaler, lokasjon/overføringsgrunnlag og produksjonsoppsett må avklares før
live aktivering.

## 10. Endringer

Vesentlige endringer i personvernerklæringen skal varsles tydelig i tjenesten, og på e-post hvis
e-postflyten er aktiv. Dokumentet versjoneres i prosjektets `docs/`-mappe.
