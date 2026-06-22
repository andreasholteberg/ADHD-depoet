# Samsvarsvurdering: Depoet mot endelig bok («The final countdown»)

Stegvis gjennomgang av om alt innholdet i Depoet er konsistent med den endelige faglige
grunnlaget, pluss forslag til hvordan etablerte poeng kan utbroderes til nytt innhold.

---

## Metode (stegvis)

1. Trakk ut den endelige boka som ren tekst: **30 120 ord** – Prolog + 9 kapitler + Epilog + Etterord + Litteratur.
2. Sammenlignet (avsnittsdiff) mot versjonen modulene faktisk ble bygget fra (27 266 ord) → **~2 850 nye ord**.
3. Verifiserte at **alle** kjerneformuleringene modulene hviler på fortsatt finnes i den endelige boka (de gjør det – inkludert sikkerhetsnumrene 113 / 116 117 / 116 111 / 116 123).
4. Klassifiserte de 66 nye/utvidede avsnittene som (a) språkpuss, (b) skjerping av et eksisterende poeng, eller (c) genuint nytt etablert poeng.
5. Vurderte hver Depoet-flate (9 hovedmoduler, startkurs, 6 minikurs, situasjonskort, språkbank, landingsside/disclaimer) mot dette.

---

## Del 1 – Samsvar: konklusjon

**Hovedfunn: Depoet er konsistent med den endelige boka. Ingen modul motsier boka eller går utover den, og hele kjernekanonen har overlevd til endelig versjon.** De ~2 850 nye ordene er nesten utelukkende språkpuss og utdypning. Endringene er **additive, ikke korrigerende** – ingenting i Depoet blir feil av den endelige boka. Det kreves altså ingen retting for samsvar.

| Depoet-flate | Forankring | Dom |
|---|---|---|
| hoved-1 Blikket – kapasitet før vilje | Kap 1 | **Fullt samsvar.** «Atferd handler om kapasitet, lenge før vilje» står ordrett i bokas nye baksidetekst. |
| hoved-2 Føreren – beredskapskropp | Kap 2 | **Fullt samsvar.** «Regulering før retning … gjelder også deg» er nå skarpere i boka. |
| hoved-3 Lånte bremser | Kap 3 | **Fullt samsvar.** «Regulering utvikles i relasjoner», «først kontakt, så retning» intakt. |
| hoved-4 Autovern | Kap 4 | **Fullt samsvar.** «Struktur er en form for omsorg» intakt. |
| hoved-5 Krasj og reparasjon (V.A.R.M.) | Kap 5 | **Fullt samsvar.** V.A.R.M. og «bygge broen tilbake» intakt. |
| hoved-6 Motorveien og trafikkdirigenten | Kap 6–7 | **Fullt samsvar.** |
| hoved-7 De mørke veikryssene | Kap 8 | **Fullt samsvar.** «Det er ikke en prognose … et beredskapskapittel» står nå nesten ordrett i boka. Sikkerhetsnumrene matcher. |
| hoved-8 Kjørestilen – det lange løpet | Kap 9 + Epilog | **Fullt samsvar.** «Den emosjonelle melodien», «ny manual», «veien tilbake til hverandre» intakt. |
| Startkurs (5 moduler) | Kap 1–5 | **Samsvar.** |
| Minikurs «Når dere står forskjellig» | Prolog + senere | **Samsvar – nå med eksplisitt ryggdekning:** Prologen sier rett ut at far sto for «harde konsekvenser og struktur», mor «mykere og famlende», og at de «trakk i hver sin retning og forsterket hverandres ytterpunkter». |
| Øvrige minikurs (skjerm, smeller, legging, skole, redd) | Kap 4–8 | **Samsvar.** Redd-minikurset matcher kap 8 + Litteratur-listens hjelpenumre. |
| Situasjonskort | Gjennomgående | **Samsvar.** Sikkerhetsnumre og framing stemmer. |
| Landingsside / disclaimer | Før vi begynner | **Samsvar.** «Ikke behandling»-framingen matcher bokas «erstatter ikke utredning, behandling eller individuell veiledning». |

**Små justeringsmuligheter (ikke feil – boka gjør nå noe eksplisitt som modulen kunne speilet):**
- hoved-2 kan navngi **hyperaktivert vs. hypoaktivert** (fight/freeze) og bruke bokas formulering **«se deg selv utenfra og barnet innenfra»** (mentalisering).
- hoved-1 kan løfte **tidsblindhet** («nå» og «ikke nå») som et navngitt prinsipp, ikke bare nevne det.
- hoved-3/hoved-4 kan ta inn bokas bro-setning: **«strukturen i seg selv er ikke fienden … et ytre arbeidsminne.»**

Ingen av disse er samsvarsbrudd. De er forfininger.

---

## Del 2 – Nytt innhold fra etablerte poeng (prioritert)

Den endelige boka **etablerer** flere poeng som Depoet i dag bare så vidt bruker, eller ikke har. Alt under er forankret i konkrete bokpassasjer – ikke fritt diktet.

### Prioritet 1 – sterkest, rett fra ny kanon

**1. «Har du lite igjen»-lag på hvert situasjonskort og dagskort** *(Epilog – ny kortstokk)*
Den endelige epilogen inneholder en helt ny kortstokk der **hvert** kort avsluttes med en lavkapasitets-fallback: «Har du lite igjen: …». Eksempel (eksplosjon): «hold alle trygge, og bli værende. Resten kan vente.»
→ **Forslag:** legg et nytt felt `lowCapacityStep` på `SituationCard` (og dagskortene), og vis det når brukeren har meldt lav dagsform. Depoet har allerede kapasitets-begrepet i onboarding/dagsform («Jeg har litt rom / sliten / nesten tom») – dette kobler boka og motoren sømløst. **Dette er det enkeltgrepet som treffer kjernen i Depoet best.**

**2. Det lydløse / imploderende krasjet** *(Kap 5 – nytt avsnitt)*
Boka slår nå fast at noen sammenbrudd «imploderer i stedet for å eksplodere»: «Døren lukkes, svarene blir borte … systemet har kortsluttet på nøyaktig samme måte», og at V.A.R.M. gjelder her også.
→ **Forslag:** ny modul eller utvidelse av «Når det smeller» + nytt/utvidet situasjonskort (knytt til `stille-trekker`): V.A.R.M. for det stille sammenbruddet. I dag dekker Depoet mest det høylytte krasjet.

**3. Søsken-reparasjon** *(Kap 5 – nytt avsnitt)*
Helt nytt i boka, og fraværende i Depoet: «et søsken i døråpningen … Også de trenger at en voksen kommer etterpå.» Med ferdig setning: «Det ble høylytt i stad. Det var ikke din jobb å fikse det, og det er ikke din skyld. Jeg er her for deg også.»
→ **Forslag:** nytt situasjonskort + kort modul/refleksjon om søsknet som ser stormen.

### Prioritet 2 – tydelige, etablerte tråder

**4. Forelderens egen ADHD / eget autovern** *(Kap 3 – nytt avsnitt)*
«Hvis du kjenner deg igjen i beskrivelsen av slitte bremser, fortjener systemet ditt sine egne autovern … Mange voksne oppdager sin egen ADHD først gjennom barnets.»
→ **Forslag:** utvid startkurs M4 / lag eget kort: «Når bremsene dine også er slitne» – egne autovern for forelderen, og en varsom åpning om egen utredning.

**5. Den alenestående forelderen** *(Kap 2 og 3)*
«Hvis du står alene med dette … gjelder alt i dette kapittelet like fullt for deg. Du har bare færre pauser mellom rundene.»
→ **Forslag:** et gjennomgående «hvis du står alene»-spor (kort varianttekst i relevante moduler/kort), så aleneforeldre ikke føler at rådene forutsetter to voksne.

**6. Tidsblindhet** *(Kap 1)* – navngitt mikromodul/kort: «nå» og «ikke nå», hvorfor «om et kvarter» ikke gir resonans.

**7. Hyper- vs. hypoaktivert** *(Kap 2)* – inn i hoved-2 + et selvinnsikts-kort: kjenner du igjen «koker over» eller «fryser til»?

### Prioritet 3 – verdifulle tillegg

**8. Medbestemmelse – lag planen sammen med barnet** *(Kap 3)*
«Lage planen sammen med barnet … medbestemmelse … ikke en kontrakt som skal håndheves.» Balanserer autovern mot autonomi (samme spenning som Prologens kontroll-vs-frihet).
→ Kort/refleksjon under autovern-temaet.

**9. Norsk ressursliste + faglig grunnlag** *(Litteratur – nytt)*
Boka lister nå **ADHD Norge (adhdnorge.no)**, **Helsedirektoratets nasjonale faglige retningslinje for ADHD**, fastlege og hjelpetelefonene.
→ **Forslag:** en «Hvor får jeg hjelp»-flate i Depoet, og knytt den til den planlagte «faglig grunnlag»-flata (jf. GDPR-/lanseringsplanen). Styrker både sikkerhetslaget og tilliten.

**10. Det stille barnet løftet** *(Kap 1 og 6)*
«Et rolig barn kan ha like mye motor som et utagerende. Den arbeider bare innover, og det koster like mye.» Depoet har `stille-trekker`-kortet, men poenget kan løftes til en egen liten flate/onboarding-gren.

**11. Leserekkefølge-logikk → onboarding-sti** *(Før vi begynner)*
Boka anbefaler: akutt → kap 2, 3, 5; stille bekymring → kap 1, 6, 9; ungdom → kap 8.
→ **Forslag:** la onboarding-svaret («hva er tyngst nå») rute brukeren til den tilsvarende anbefalte kursstien. Direkte oversettelse av bokas egen navigasjonslogikk.

**Bonus – landingsside/branding:** den endelige boka har ny baksidetekst og forfatterbio («Andreas kjenner grusveien fra innsiden … skrevet nedenfra og innenfra»). Klar copy å gjenbruke på landingssiden og i «faglig grunnlag»-flata.

---

## Oppsummering og anbefaling

- **Samsvar: bekreftet.** Ingen retting kreves – alt nytt i boka er additivt, og kjernekanonen er intakt.
- **Sterkeste enkeltgrep:** «Har du lite igjen»-laget på kortene (speiler bokas nye kortstokk og kobler rett på Depoets dagsform), det lydløse krasjet, og søsken-reparasjon. Alt er ren kanon, lavt diktet.
- **Arbeidsmåte videre:** der boka *skjerper* et eksisterende poeng → forfining i den aktuelle modulen. Der boka *etablerer noe nytt* → nytt kort/modul. Behold grunnlagsnotis-disiplinen (forankre hvert nytt element i kapittel/passasje før innskriving).

*Grunnlag: «The final countdown - ADHD.docx» (endelig versjon, 30 120 ord), sammenlignet mot byggeversjonen modulene ble laget fra. Ingen innholdsendringer er gjort i Depoet i denne gjennomgangen – dette er en vurdering, ikke en redigering.*
