# ACCEPTANCE CRITERIA – PHASE 1

Denne filen definerer hva som må være sant før Phase 1 regnes som ferdig.

Codex skal ikke markere fasen som ferdig før alle punktene er oppfylt.

## 1. Sider

Følgende sider skal eksistere og være tilgjengelige:

- `/`
- `/det-smeller-na`
- `/nodbremsen`
- `/depotet`
- `/kurs`
- `/veiledning`
- `/logg-inn`

## 2. Global navigasjon

Header skal finnes på alle ordinære sider.

Header skal inneholde:

- Logo/navn
- Det smeller nå
- Få hjelp i kveld
- Depotet
- Logg inn

“Det smeller nå” skal være tydelig visuelt prioritert.

På mobil skal “Det smeller nå” fortsatt være lett tilgjengelig.

## 3. Forside

Forsiden skal svare på tre spørsmål innen få sekunder:

1. Hva er dette?
2. Hvem er det for?
3. Hva gjør jeg nå?

Hero skal inneholde:

```txt
Når det smeller hjemme – hva gjør du da?
```

og:

```txt
Du trenger ikke bli roligere. Du trenger noe å gjøre.
```

Forsiden skal ha tydelige CTA-er til:

* `/det-smeller-na`
* `/nodbremsen`
* `/depotet`

Forsiden skal ikke åpne med lang teori.

## 4. Akuttfunksjon

Siden `/det-smeller-na` skal:

* ikke ha forstyrrende innhold
* ikke starte med salg
* ikke forklare teori
* ikke gi flere valg
* gi én enkel reguleringsflyt
* være visuelt adskilt fra resten av nettsiden
* fungere godt på mobil

Den skal inneholde denne setningen:

```txt
Dette ble for mye. Vi tar en pause.
```

## 5. Statisk og rask akuttside

Før Phase 1 godkjennes, må dette være sant:

* `/det-smeller-na` er statisk.
* Siden har ingen API-kall.
* Siden har ingen databaseavhengighet.
* Siden har ingen auth-avhengighet.
* Siden har ingen AI-avhengighet.
* Siden har ingen Stripe-avhengighet.
* Siden laster ingen bilder eller videoer.
* Siden har ingen tung klientlogikk.
* Siden viser hovedinstruksjonen uten loading state.
* Siden har ingen analytics-scripts, embeds eller eksterne fontavhengigheter.

## 6. Nødbremsen

Siden `/nodbremsen` skal forklare:

* hva Nødbremsen er
* hvilken situasjon den hjelper i
* hva brukeren får
* hvorfor den peker videre mot Depotet

Den skal ikke love behandling, helbredelse eller garantert effekt.

Den skal ha en kjøps-CTA, men i Phase 1 kan den være placeholder.

## 7. Depotet

Siden `/depotet` skal tydelig formidle:

* at Depotet er kjerneproduktet
* at brukeren får én handling per dag
* at Verktøykassa er sekundær
* at dette ikke er en vanlig kursplattform
* at kontinuitet er viktigere enn innholdsmengde

Siden skal inneholde:

```txt
Depotet gir deg én tydelig retning hver dag.
```

## 8. Kurs

Siden `/kurs` skal presentere temakurs som avgrensede løsninger.

Hvert kurs skal peke videre mot Depotet.

Kurs skal ikke fremstilles som komplett løsning.

Siden skal starte med problem, ikke kursbibliotek.

## 9. Veiledning

Siden `/veiledning` skal presentere veiledning som premium/forsterker.

Den skal inneholde presisering om at dette ikke er terapi.

Den skal ikke inneholde ferdig bookingfunksjon i Phase 1.

## 10. Logg inn

Siden `/logg-inn` skal være placeholder.

Den skal ikke implementere ekte autentisering.

Den skal ikke kreve backend.

## 11. Innholdskilder

Før Phase 1 godkjennes, må dette være sant:

* `docs/CONTENT_SOURCE.md` finnes.
* `docs/COPY_BANK.md` finnes.
* Synlig tekst bygger på disse dokumentene.
* Codex har ikke funnet opp nye produktnavn.
* Codex har ikke funnet opp nye fagmodeller.
* Codex har ikke introdusert generiske foreldretips som bryter med Depotets logikk.
* Codex har ikke skrevet medisinske eller terapeutiske løfter.
* Hvis ny synlig tekst manglet, ble det brukt placeholder og dokumentert i `docs/CHANGELOG.md`.

## 12. Guardrails

Phase 1 skal ikke inneholde:

* database
* AI-integrasjon
* RAG
* chat
* ekte innlogging
* ekte abonnement
* bookingmotor
* CMS
* adminpanel
* brukerprofiler
* e-postautomasjon
* kursavspiller
* API-ruter for fremtidige funksjoner
* ORM-oppsett eller migrasjoner
* mock-backend

## 13. Designsystem

Før Phase 1 godkjennes, må dette være sant:

* `docs/DESIGN_SYSTEM.md` finnes.
* Fargene i designsystemet brukes konsekvent.
* Codex har ikke introdusert tilfeldige Tailwind-standardfarger som `indigo`, `blue`, `purple` eller lignende uten eksplisitt grunn.
* Akuttsiden bruker egen mørk krisepalett.
* Vanlige sider bruker varm, lys bakgrunn.
* Knapper følger definert knappestil.
* Designet fremstår ikke som generisk SaaS-side.
* Designet fremstår ikke som kursportal.

## 14. Kontekststyring

Før Phase 1 godkjennes, må dette være sant:

* `AGENTS.md` finnes i root.
* `AGENTS.md` forklarer hvilke dokumenter Codex skal lese når.
* Codex instrueres ikke til å lese alle dokumenter for hver minste endring.

## 15. Design

Designet skal være:

* mobilvennlig
* rolig
* tydelig
* lesbart
* uten unødvendige animasjoner
* uten komplekse dashboards
* uten sterke skygger
* uten teknologisk AI-estetikk

## 16. Teknisk kvalitet

Før fasen er ferdig skal disse kommandoene kjøres:

```bash
npm run lint
npm run build
```

Begge skal passere.

Hvis en kommando feiler, skal Codex dokumentere:

* hva som feilet
* hvilken fil som var involvert
* hva som ble gjort for å fikse det
* om feilen fortsatt gjenstår

## 17. Changelog

`docs/CHANGELOG.md` skal oppdateres med:

* hvilke filer som ble opprettet
* hvilke filer som ble endret
* hvilke valg Codex tok
* hvilke ting som bevisst ikke ble bygget
* eventuelle kjente begrensninger
* hvilke tester som ble kjørt
* eventuelle dokumentavklaringer som påvirker implementasjon

## 18. Ferdigstillelse

Phase 1 er ikke ferdig før:

* alle sider finnes
* alle acceptance criteria er oppfylt
* lint passerer
* build passerer
* changelog er oppdatert
* ingen Phase 2-funksjoner er bygget ved et uhell
