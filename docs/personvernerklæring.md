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
**Kontaktperson for personvern:** Andreas Holteberg, andreas@kontinuum.no  
**Nettsted:** adhd-depoet.com

Dette gjelder ansvar for behandling av personopplysninger i tjenesten. Depoet er ikke en
helsetjeneste og innebærer ikke medisinsk, psykologisk eller terapeutisk behandleransvar.

## 2. Live-status per lansering v1

Produksjonen er **lokal-først med valgfri konto**:

- passordfri innlogging via Supabase Auth og Resend er tilgjengelig
- strukturert praksis kan synkroniseres etter aktivt samtykke
- fritekst er lokal som standard og krever et eget aktivt samtykke før eventuell synk
- eksport og kontoslettingsforespørsel er tilgjengelig i Profil
- daglige e-postdrypp og SMS-påminnelser er ikke aktivert
- ingen analyseverktøy, cookies for sporing, åpningssporing eller klikksporing
- legacy JWT-nøkler er deaktivert; klienten bruker en prosjektavgrenset publishable key
- data lagres i nettleseren på brukerens enhet

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

## 4. Konto og Supabase

Supabase aktiveres bare når både den prosjektlåste `VITE_SUPABASE_URL` og en moderne
`VITE_SUPABASE_PUBLISHABLE_KEY` finnes i frontend-miljøet, og servermiljøet er satt opp. Legacy
`anon`-JWT aksepteres ikke. Da vises ekte passordfri innlogging og sync-UI.

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
Privilegerte serveroperasjoner bruker individuelt navngitte secret keys i Edge Functions. Slike
nøkler er ikke tilgjengelige i frontend eller klientbygget.

## 5. Resend, Auth-e-post og planlagte påminnelser

Resend brukes server-side til Supabase Auth-e-post med engangskode og sikker lenke. Ingen
Resend-nøkler finnes i frontend. `VITE_EMAIL_ENABLED` gjelder den separate påminnelsesflyten,
ikke passordfri innlogging.

Planlagt påminnelsesflyt:

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
- kontakte Andreas Holteberg på andreas@kontinuum.no for innsyn, retting, sletting eller spørsmål

Svarfrist for personvernforespørsler er normalt 30 dager. Brukeren kan klage til Datatilsynet.

## 9. Databehandlere

Produksjonen bruker:

- Supabase: autentisering, database, RLS og Edge Functions
- Resend: Auth-e-post fra det verifiserte sending-underdomenet
- Cloudflare Pages: hosting av frontend

## 10. Endringer

Vesentlige endringer i personvernerklæringen skal varsles tydelig i tjenesten, og på e-post hvis
e-postflyten er aktiv. Dokumentet versjoneres i prosjektets `docs/`-mappe.
