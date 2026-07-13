# Personvernerklæring – ADHD Depoet

> KILDE TIL SANNHET for personverntekst. Den brukervendte modalen
> (src/components/PrivacyPolicy.tsx) er et sammendrag av dette dokumentet og skal
> holdes i synk med det. Strukturen skiller «i dag» fra «ved utvidelse», slik at
> erklæringen aldri beskriver funksjoner som ikke finnes.
> Jurist bør gjennomgå før bred lansering.

**Sist oppdatert:** juli 2026
**Gjelder:** adhd-depoet.com (tidlig forhåndsvisning)
**Målgruppe:** Tjenesten er rettet mot voksne over 18 år i foreldrerollen.

---

## 1. Hvem er ansvarlig for behandlingen?

**Behandlingsansvarlig:**
HOLTEBERG KONTINUUM
Org.nr. 837 924 782
Bårågerveien 21
4641 SØGNE

**Kontaktperson for personvern:**
Andreas Holteberg
E-post: andreas@kontinuum.work
Nettsted: adhd-depoet.com

Dette gjelder ansvar for behandling av personopplysninger i tjenesten. Depoet er ikke en
helsetjeneste og innebærer ikke medisinsk, psykologisk eller terapeutisk behandleransvar.


Depoet er et digitalt øvingsrom for foreldre som støtter barn og unge med ADHD og
reguleringsutfordringer, laget som et supplement til boken *Førersetet*.

---

## 2. Slik er det i dag: alt lagres lokalt hos deg

I den nåværende forhåndsvisningen har Depoet **ingen backend**. Alt du gjør lagres kun i
nettleseren på din egen enhet (localStorage), og **ingenting sendes til oss eller noen andre**.
Vi mottar ingen data, har ingen innsyn, og kan ikke lese det du skriver.

Dette lagres lokalt i nettleseren din:

| Hva | Eksempel | localStorage-nøkkel |
|---|---|---|
| Valgfritt kallenavn og oppstartssvar | «Skjerm er tyngst», «Jeg er sliten» | `depoet_user` |
| Daglige innsjekk og oppfølging | kapasitetsnivå per dag | `depoet_user` |
| E-postadresse og samtykker (hvis oppgitt) | adresse + tidspunkt for samtykke | `depoet_user` |
| Refleksjoner du skriver | fritekst fra «I dag» | `depoet_reflections` |
| Søndagsnotater | fritekst og valg fra Søndagsverkstedet | `depoet_sunday_reports` |
| Lagrede kort og kursfremgang | kort-ID-er, fullførte moduler | `depoet_user` |
| Rotasjonslogg for dagskort | hvilke kort som er vist | `depoet_seen_prompts` |
| Besøksflagg og temavalg | har besøkt appen, lys/mørk modus | `depoet_visited_app`, `depoet_theme` |

Nettstedet bruker **ingen** sporingscookies, ingen analyseverktøy, ingen annonseteknologi og
ingen tredjepartsskript. Den lokale lagringen er teknisk nødvendig for at appen skal virke
(ekomloven § 3-15), og skjer først etter at du har fått informasjon og aktivt godtatt det i
oppstarten. Samtykket lagres med tidspunkt og tekstversjon – også det kun lokalt.

### Dine verktøy i appen (Profil → Dine data)

- **Last ned mine data:** alt over samlet i én JSON-fil (dataportabilitet, art. 20)
- **Fjern e-posten:** sletter lagret e-postadresse og trekker samtykket, enkeltvis
- **Slett alt jeg har lagret her:** fjerner samtlige depoet-nøkler fra nettleseren (art. 17)

Du kan også slette alt ved å tømme nettleserens nettstedsdata.

---

## 3. E-postadressen du eventuelt oppgir

Påmelding til «dryppene» på landingssiden lagrer adressen og samtykket ditt **lokalt på din
enhet**. Utsending er ikke i gang ennå: ingen e-post sendes, og adressen har ikke forlatt
enheten din.

Når utsending settes i drift, gjelder dette:

| Formål | Rettslig grunnlag |
|---|---|
| Gratis-drypp og daglig støtte på e-post | Samtykke (GDPR art. 6 nr. 1 a; markedsføringsloven § 15) |

Samtykket er aktivt (aldri forhåndsavkrysset), dokumenteres med tidspunkt og tekstversjon, og
kan trekkes tilbake når som helst – blant annet via avmeldingslenke i hver eneste e-post.
E-postadressen fjernes umiddelbart ved avmelding.

---

## 4. Dette endres når tjenesten utvides

Innlogging, skylagring og e-postutsending er planlagt. Før noe av dette aktiveres:

- Du varsles tydelig, og **nytt samtykke innhentes** – eksisterende lokale data flyttes aldri
  til sky uten at du aktivt velger det.
- Databehandlere (hosting, database, e-postutsending) velges i EU/EØS der det er mulig, og
  bindes av databehandleravtale (art. 28). Oversikten i denne erklæringen oppdateres med
  navn og lokasjon før lansering.
- **Fritekst (refleksjoner og søndagsnotater) forblir lokalt som standard også etter
  utvidelsen.** Eventuell sky-lagring av fritekst vil være et separat, uttrykkelig og
  frivillig tilvalg, og vurderes først etter egen personvernkonsekvensvurdering (DPIA).

Planlagte behandlinger og grunnlag (ikke aktive i dag):

| Formål | Rettslig grunnlag |
|---|---|
| Opprette og administrere brukerkonto | Avtale (art. 6 nr. 1 b) |
| Synkronisere kursfremgang og lagrede kort | Avtale (art. 6 nr. 1 b) |
| Daglig e-post/SMS-støtte | Samtykke (art. 6 nr. 1 a + mfl. § 15) |
| Feilsøking og sikkerhet | Berettiget interesse (art. 6 nr. 1 f) |

---

## 5. Hva vi aldri ber om

Depoet ber ikke om – og har ingen felt for – barnets navn, diagnose, medisiner, skole,
hjelpeapparat eller journalopplysninger. Innholdet er foreldrestøtte og kunnskap, ikke
behandling eller helsehjelp. Skriver du fritekst, anbefaler vi å bruke fornavn eller «barnet»
i stedet for fullt navn.

---

## 6. Dine rettigheter

Etter personvernforordningen (GDPR) har du rett til innsyn, retting, sletting («retten til å
bli glemt»), dataportabilitet, og til å trekke tilbake samtykker uten at det påvirker
lovligheten av tidligere behandling. I dag utøver du alt dette selv, direkte i appen
(Profil → Dine data), siden vi ikke har noen kopi av dataene dine.

Spørsmål eller ønsker utover det: send en e-post til andreas@kontinuum.work – vi svarer
innen 30 dager. Du kan også klage til Datatilsynet (datatilsynet.no).

---

## 7. Sikkerhet

Nettstedet leveres over kryptert forbindelse (HTTPS). Siden alle data ligger lokalt hos deg,
er den viktigste sikringen din egen enhet: bruk skjermlås, og del ikke nettleserprofilen med
andre du ikke vil skal se notatene dine.

---

## 8. Endringer i personvernerklæringen

Vesentlige endringer varsles med tydelig melding på nettstedet (og på e-post når utsending
finnes) minst 14 dager før endringen trer i kraft. Denne erklæringen versjoneres i prosjektets
dokumentarkiv.

---

## 9. Kontakt

**HOLTEBERG KONTINUUM**
Org.nr. 837 924 782
Kontaktperson: Andreas Holteberg
E-post: andreas@kontinuum.work
Nettsted: adhd-depoet.com

