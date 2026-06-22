# Depoet – innholdsplan og produksjonsbestillinger

> Levende skrivedokument for Andreas. Sist oppdatert juni 2026.
> Alt her skrives i Depoet-stemmen: varm, nøktern, avskammende, konkret, lavmælt.
> Teknisk: nye prompts legges i `src/data/dailyPrompts.ts`, kort i `languageCards.ts`,
> situasjoner i `situations.ts` – strukturen plukker alt opp automatisk (inkl. rotasjon).

## Skriveregler (gjelder alt innhold)

1. **Refleksjonsspørsmål er alltid åpne.** Aldri spørsmål som forutsetter at øvelsen «virket»
   («Ble det lettere…?», «Klarte du…?», «Merket du hvordan X ble bedre…?»).
   Spør i stedet om observasjon: «Hva la du merke til – i barnet, eller i deg?»
   Den som prøvde og ikke fikk effekten, skal aldri sitte igjen med følelsen av å ha strøket.
2. **Mikrohandlinger er bittesmå og konkrete.** Én handling, ett øyeblikk, gjennomførbar på
   en tom tirsdag. Aldri «øv på å…» uten å si nøyaktig hva og når.
3. **Validering før instruksjon.** Hver prompt åpner med en setning som anerkjenner hvordan
   det faktisk er – ikke med rådet.
4. **Ingen superlativer om brukerens innsats.** «Det er lagret», ikke «Nydelig levert».
5. **Språkkort er talespråk.** Setninger man faktisk kan si høyt i en presset situasjon –
   korte nok til å huske, uten fagord.

## Mal: daglig prompt

```ts
{
  id: 'p-<fokus>-<n>',
  theme: '...',                  // 2–5 ord
  validationText: '...',         // 1–2 setninger anerkjennelse
  microAction: '...',            // én konkret bitteliten handling i dag
  languageCard: { text: '...', category: '<fokus>' },
  reflectionQuestion: '...',     // ÅPENT – se skriveregel 1
}
```

---

## BESTILLING 1: Daglige prompts (høyest prioritet)

Dagens dekning vs. mål (7–10 per fokus gir «ukesfølelse» i rotasjonen):

| Fokus | Har | Mål | Mangler | Temaforslag å skrive fra |
|-------|-----|-----|---------|--------------------------|
| Min egen reaksjon | 1 | 8 | **7** | Tidligste kroppstegn · pusten som brems · «det begynte i meg»-aksept · reparasjon med seg selv · senke krav på tomme dager · beredskap etter jobb · skille barnets storm fra egen · kveldens selvransakelse uten dom |
| Skjerm | 2 | 8 | **6** | Varsle overgang med kropp, ikke rop · interesse før beskjed · avtale laget sammen · når avtalen ryker · skjerm som regulering (ikke fiende) · egen skjermbruk som modell |
| Morgen | 2 | 8 | **6** | Kvelden som morgenens venn (legge frem) · én ting av gangen-beskjeder · stillhet i stedet for mas · når bussen faktisk går · reparasjon i bildøra · senkede morgenkrav på tomme dager |
| Legging | 2 | 8 | **6** | Overgangsvarsel før pysj · skjermslutt før soverommet · kroppstung nærhet uten ord · tankekvern på puta · når leggingen ryker helt · forelderens egen kveldstank |
| Overganger | 1 | 8 | **7** | Forvarsel i god tid · bli ferdig-ritualer · fysisk følge i stedet for rope · overganger ut av huset · inn fra lek · aktivitetsbytte med timer/avtale · når overgangen kollapser |
| Skole | 0 | 7 | **7** | Melding fra læreren uten hjemme-rettssak · leksestart i mikrodoser · skolevegringsmorgen · møte med skolen som lag, ikke forsvar · barnets skoleslitasje etter skoletid · ros for oppmøte, ikke prestasjon · helg uten skoleprat |
| Søsken | 0 | 7 | **7** | Megling uten dommerrolle · den som «alltid får» · verne søsken under storm · en-til-en-tid i minidoser · rettferdig er ikke likt · reparasjon mellom søsken · forelderens favoritt-skam |
| Ungdom | 20 | 20 | 0 | Ferdig – brukes som tone-fasit for de andre |

Sum å skrive: **46 prompts**. Skriv i denne rekkefølgen (mest valgt + tynnest dekning først).

---

## BESTILLING 2: Situasjonskort – yngre barn (akuttlaget)

Mal: `situation` (tittel slik forelderen tenker den) · `firstStep` (senk tempoet) ·
`underTheHood` · `immediateAction` · `sentenceToSay` · `repairAfterward` · `situationTags`.

8 nye kort:

1. **Nedsmelting i butikken / offentlig sted** – skammen med publikum. (tags: butikk, offentlig, blikk)
2. **Måltidet låser seg** – nekter å spise / kun én ting / kaos rundt bordet. (mat, middag)
3. **Tannpuss og hygiene blir kamp** – sensorisk + overgang. (tannpuss, dusj, hår)
4. **Hentingen fra SFO/barnehage smeller** – overgangen ingen ser. (henting, SFO)
5. **Bursdag/selskap tipper over** – overstimulering i sosialt landskap. (bursdag, besøk)
6. **Barnet slår eller kaster** – grense + regulering samtidig. (slå, kaste, sinne)
7. **Ferie/høytid uten struktur** – når «kos» blir kaos. (jul, ferie, fridag)
8. **Klærne er umulige** – sømmer, merkelapper, årstidsbytte. (klær, sanselig)

Vurder også `contactEmergency: true` på «Jeg kjenner at jeg koker» (finnes i dag uten).

---

## BESTILLING 3: Språkbanken

| Kategori | Har | Mål | Retning |
|----------|-----|-----|---------|
| Reparasjon | 3 | 9 | Del i to spor: *til barnet* («Det ble for mye av meg i sted…») og *til meg selv* («Jeg glapp. Det betyr ikke at jeg er glippen.») – reparasjon er Depotets USP |
| Partner/medforelder | 2 | 8 | Setninger til den andre voksne: be om avløsning uten kapitulasjon, debrief etter storm uten skyldfordeling, felles linje foran barnet, takknemlighet i slitne hverdager |
| Søsken | 1 | 6 | Megling, verne den andre, en-til-en |
| Skole | 2 | 6 | Til barnet etter skolemelding · til læreren (epost-vennlige) |
| Nye prompts/situasjoner | – | – | Hvert nytt innslag fra bestilling 1–2 leverer automatisk sitt kort |

---

## BESTILLING 4: Redaksjonelle gjennomganger (ikke nyskriving)

1. **Kursenes refleksjonsspørsmål** (32 moduler i `courses.ts`): kjør skriveregel 1 over alle.
   Daglig-banken er allerede vasket (juni 2026) og kan brukes som fasit for ønsket form.
2. **Variantbanken før Fase E**: utvid daglig e-post fra 4 til 8–10 brødtekst-varianter og
   emnelinjer fra 6 til 10 – en måneds daglig utsending uten déjà vu.
3. **Sesonginnhold** (kan vente, men planlegges): fire små pakker – skolestart, desember/jul,
   17. mai/vår-tilstelninger, sommerferiestart. 3–4 prompts + 1 situasjonskort per pakke.
4. **Tilbakeblikkstekster** til depotet (Depoet+-verdi): nøytrale rammetekster for
   kvartalsvise «dine ord denne sesongen» – samme regler som mestringsspeilingen:
   siter, aldri tolk.

## Hva som IKKE skal skrives

- Ingen diagnostiserende eller behandlingslovende tekster.
- Ingen «eksperter sier»/forskningsreferanser i kortene – stemmen er erfaring og blikk, ikke fotnoter.
- Ingen tekster som sammenligner barn, familier eller fremgang.
- Ingenting som teller, måler eller rangerer brukerens innsats.
