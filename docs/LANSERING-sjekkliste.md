# ADHD Depoet – lanseringssjekkliste

Status per 14. juni 2026. Kursuniverset er innholdskomplett (9 kurs, 32 moduler).
Det som gjenstår er synk/bygg, infrastruktur og publisering – pluss noen finpussinger fra testlesertilbakemelding.

**[Meg]** = i koden av Claude · **[Deg]** = ditt/eksternt (konto, deploy, opptak, jus, rekruttering)
**(tilbakemelding)** = utløst av testlesernes innspill (mor + samboer)

**Raskeste vei til synlige kurs:** Fase 0 → 1 → 4 · **Fullt medlemsprodukt:** + Fase 2 + 3 · **Validering:** Fase 1.5 (pilot)

---

## ✅ Allerede ferdig

- [x] 9 kurs / 32 moduler, forankret i boken
- [x] Hovedprogrammet komplett (hoved-1 … hoved-8, kap 1→9 + epilog)
- [x] Bunny-klar datastruktur (manus-først, video som senere lag)
- [x] Leseversjon-visning (`embedUrl: null` → tekst, ingen tom videoboks)
- [x] Akuttkort-koblinger + Depot-eksport på relevante moduler
- [x] Sikkerhetsnumre i sensitive moduler (113 / 116 117 / 116 111 / 116 123)
- [x] Refleksjonsspørsmål hevet til 5 på alle moduler (mal 4–6 oppfylt)
- [x] Tre skrivefeil rettet (berring→berøring, is→er, niveau→nivå)
- [x] Disclaimer/avgrensning på kurslandingen (113 + «ikke behandling»)
- [x] Landingsside rebrandet til ADHD Depoet
- [x] Datalag typesjekket rent (strict `tsc`, 0 feil)

---

## ⚠ Arbeidsflyt: kilde til sannhet

Endringene redigeres i **OneDrive-mappa** (ikke git-tracket). Deploy/Codex bygger fra **GitHub** (`origin/main`).
De to må synkes hver runde, ellers tester/deployer Codex en gammel versjon.
*Lengre sikt:* bestem ÉN felles arbeidsmappe (git-klon utenfor OneDrive) for å fjerne mellomleddet.

## Fase 0 – Synk kilde til GitHub + verifiser bygg

- [ ] **[Deg/Codex]** Synk OneDrive-kilden inn i GitHub-klonet og push (egen Codex-prompt finnes) — *blokker oppdaget: alle edits lå kun i OneDrive*
- [x] **[Codex]** `npm run lint` (tsc --noEmit) → PASS
- [x] **[Codex]** `npm run build` (vite build) → PASS (kun ufarlig chunk-størrelse-varsel)
- [ ] **[Codex]** `npx tsx scripts/smoke-courses.ts` → PASS *etter* synk (laveste refleksjonsantall = 4)
- [ ] **[Deg]** `npm run dev` + klikk gjennom alle 9 kurs (vignett + leseversjon)

## Fase 1 – Vis kursene live (leseversjoner)

- [x] **[Meg]** Disclaimer/avgrensning på kurslandingen
- [ ] **[Meg]** (tilbakemelding) Synliggjøre akuttlaget (Nå-hva / situasjonskort) — *verifiser først hvor synlig det er i dag, styrk ved behov*
- [ ] **[Meg]** (tilbakemelding) Lett lavterskel-språkpass — rydd kun åpenbar sjargong (forklar «validere», «eksekutive funksjoner» ved første bruk); behold de bevisst innlærte begrepene (toleransevindu, samregulering)
- [ ] **[Meg]** Rydd hardkodet plassholder-tekst i modul-leseren («Det du kan legge fra deg» og «Når det glipper» viser start-2-tekst på alle moduler)
- [ ] **[Meg]** Bekreft hovedprogrammet som tydelig ryggrad (badge/rekkefølge)
- [ ] **[Meg]** Vurder enkel framdriftsindikator på de 8 hovedmodulene
- [ ] **[Deg]** Statisk deploy (Cloudflare Pages / Vercel) – kursene kan leses uten backend

## Fase 1.5 – Pilot *(tilbakemelding – testlesernes sterkeste råd)*

- [ ] **[Meg]** Skissere enkelt pilotopplegg (mål, oppgaver, spørsmål, samtykke/personvern)
- [ ] **[Deg]** Rekruttere variert gruppe – inkluder *mindre ressurssterke* foreldre, ikke bare nære/sterke lesere
- [ ] **[Deg/Meg]** Kjør pilot på den live leseversjonen; se særlig på språk, akuttbruk og opplevd nytte
- [ ] **[Meg]** Oppsummere funn → konkret liste til dyp språkrunde + evt. justeringer
- [ ] **[Meg]** (tilbakemelding) Dyp lavterskel-språkrunde basert på pilotfunn (ikke gjett – bruk data)

*Forutsetter at Fase 1 er på plass (særlig akuttlaget). Temaet er sårbart → samtykke + personvern før ekte foreldre slipper inn.*

## Fase 2 – Backend (Supabase)

- [ ] **[Deg]** Opprett Supabase-prosjekt
- [ ] **[Meg/Codex]** Tabeller: bruker, onboarding, framgang (`completedModules`), lagrede kort, opt-ins, søndagsverksted
- [ ] **[Meg/Codex]** Koble innlogging (magic link / e-post)
- [ ] **[Meg]** Bytt lokal state → Supabase-lagring for profil og framgang
- [ ] **[Deg]** Legg Supabase URL/anon-key som miljøvariabler i deploy (ingen hemmeligheter i frontend-repoet)

## Fase 3 – Utgående kontakt (daglig motor, søndagspuff, returlag)

- [ ] **[Deg]** Velg leverandør for e-post (+ evt. SMS) fra sending-stack-anbefalingen
- [ ] **[Meg/Codex]** Koble variantbanken til faktisk planlagt utsending
- [ ] **[Meg]** Koble opt-in/av-flatene i Profil til reell sending
- [ ] **[Deg]** Verifiser at avmelding fungerer (lovkrav)

## Fase 4 – Domene + publisering

- [ ] **[Deg]** Koble `adhd-depoet.com` via Cloudflare til deploy
- [ ] **[Deg]** Aktiver HTTPS/SSL
- [ ] **[Deg]** Test på både mobil og desktop

## Fase 5 – Personvern og jus (før ekte brukere)

- [ ] **[Deg/Meg]** Personvernerklæring (GDPR) – ekstra viktig: e-post, barnedata, sensitive temaer
- [ ] **[Deg]** Databehandleravtaler med Supabase og e-postleverandør
- [ ] **[Meg]** Tydelig, aktivt samtykke ved e-postfangst på landingssiden
- [ ] **[Deg/Meg]** Kort vilkår / ansvarsfraskrivelse
- [ ] **[Meg]** (tilbakemelding) Liten «Det faglige grunnlaget»-flate (tradisjonene arbeidet hviler på: Barkley, Siegel, Schore, Fonagy, Maté, Perry, Bronfenbrenner) — *kort, plain, ingen overclaiming om klinisk validering*

## Fase 6 – Videolaget (senere – ikke nødvendig for lansering)

- [ ] **[Deg]** Spill inn moduler etter manus
- [ ] **[Deg]** Last opp til Bunny Stream, hent library-id + video-id
- [ ] **[Meg/Deg]** Fyll inn `bunnyLibraryId`, `bunnyVideoId`, `embedUrl` per modul → bytter automatisk fra leseversjon til video (ingen arkitekturendring)

---

## Kritisk vei (korteste til «ekte test»)

1. **Fase 0** – synk OneDrive → GitHub, så verifiser (synk er nå første blokker)
2. **Fase 1** – disclaimer ✓ + synliggjør akuttlag + lett språkpass + statisk deploy
3. **Fase 4** – domene
4. **Fase 5 minimum** – personvern + samtykke (siden du samler e-post)
5. **Fase 1.5** – pilot for å validere språk og akuttbruk før skalering

Backend (2), sending (3) og video (6) kan komme etter at kursene er synlige.

---

## Testlesertilbakemelding – kort sammendrag

To lesere (mor + samboer, sosionom-/barnevernsnær bakgrunn) ga en positiv, troverdig
førsteinntrykksvurdering: tillit, grafikk og klarhet er sterke. Sterkeste handlingbare signal:
(1) pass på sjargong for mindre ressurssterke foreldre, (2) vær tydelig på målgruppe og kjør
en pilot med varierte brukere, (3) sjekk hvordan appen virker i en akutt situasjon, (4) gjør den
faglige forankringen synlig. Innarbeidet over som **(tilbakemelding)**-merkede punkter.
