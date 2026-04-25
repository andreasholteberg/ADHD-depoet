# GUARDRAILS – DEPOTET

Dette dokumentet er bindende for all koding, design og tekstproduksjon.

Hvis en foreslått løsning bryter med disse reglene, skal den ikke implementeres.

## 1. Ikke bygg en vanlig kursplattform

Depotet skal ikke ligne på et stort kursbibliotek.

Forbudt:

- mange kurskort på forsiden som hovedopplevelse
- “velg din læringsreise”
- store modullister som primærflate
- dashboard med mange valg
- progresjonsstress
- gamification som skaper skyld
- full kursportal i Phase 1

Tillatt:

- én daglig handling
- sekundær verktøykasse
- tydelig bro til fordypning for de som orker
- problemstyrte temakurs som leder mot Depotet

## 2. Ikke gi brukeren mange valg

Brukeren er ofte utslitt.

Derfor skal standardopplevelsen være:

- én hoved-CTA
- én anbefalt handling
- én tydelig neste handling

Maks to CTA-er i hero.

Unngå:

- tre eller flere likeverdige valg
- store menystrukturer
- mange produktnivåer i samme seksjon
- valgfrihet som høres bra ut, men øker belastning

## 3. Ikke overforklar

Tekst skal være kort, konkret og operativ.

Unngå:

- lange akademiske forklaringer
- fagbegreper i hero
- teoretiske avsnitt før handling
- “ADHD-foredrag” på forsiden
- store tekstblokker
- generell psykoedukasjon før CTA

Forklaring kan komme senere.

Handling kommer først.

## 4. Ikke gjør AI synlig som gimmick

Ikke skriv:

- “AI-drevet foreldreplattform”
- “Få råd fra vår AI”
- “La kunstig intelligens veilede deg”
- “Smart AI-hjelper”
- “AI coach”

AI skal omtales indirekte som:

- systemet
- dagens handling
- personlig tilpasset retning
- én tydelig retning

AI er infrastruktur, ikke merkevare.

## 5. Ikke gi medisinske eller terapeutiske løfter

Forbudt:

- “behandler ADHD”
- “fikser barnet”
- “terapi”
- “diagnostisering”
- “erstatter behandling”
- “garantert effekt”
- “reduserer symptomer”
- “klinisk dokumentert effekt” uten dokumentasjon
- “helbreder”
- “løser ADHD”

Bruk heller:

- støtte
- struktur
- regulering
- hverdagsgrep
- veiledning
- kontinuitet
- hjelp til å håndtere krevende situasjoner

## 6. Ikke legg skyld på forelderen

Språket skal aldri antyde at forelderen bare må skjerpe seg.

Unngå:

- “bli en bedre forelder”
- “ta kontroll over barnet”
- “slutt å gjøre feil”
- “du må bare være rolig”
- “foreldre som ikke setter grenser”
- “lær å håndtere barnet ditt”

Bruk heller:

- “når du er sliten”
- “når det smeller”
- “du trenger noe å gjøre”
- “start med én handling”
- “når du ikke har mer å gå på”
- “når kvelden holder på å velte”

## 7. Ikke gjør “Det smeller nå” kommersiell først

Akuttfunksjonen skal først hjelpe.

Salg kommer etter at brukeren har fått en regulerende handling.

Rekkefølge:

1. hjelp
2. pust
3. avstand
4. stabilisering
5. tilbud

Forbudt på første skjerm:

- pris
- produktpitch
- e-postfangst
- kursforklaring
- video
- lang tekst
- “kjøp nå”

## 8. Ikke bygg for mye i første fase

Phase 1 skal ikke inneholde:

- full auth
- full database
- AI-integrasjon
- RAG
- chat
- ekte Stripe-abonnement
- booking
- adminpanel
- CMS
- brukerprofiler
- e-postautomasjon
- betalingsbekreftelse
- kursavspiller
- videoplattform
- progresjonssystem
- API-ruter for fremtidige funksjoner
- ORM-oppsett
- migrasjoner
- mock-backend
- analytics-oppsett som ikke trengs for statiske sider

Phase 1 skal validere:

- språk
- struktur
- brukerflyt
- landingsside
- akuttfunksjon
- enkel kjøpsretning
- visuell identitet
- om konseptet kommuniserer klart

## 9. Ikke introduser nye konsepter uten grunn

Bruk eksisterende begreper:

- Det smeller nå
- Nødbremsen
- Depotet
- I DAG
- Søndagsverkstedet
- Verktøykassa
- Øvelseskjøring
- Autovern
- Trafikkdirigenten
- Det relasjonelle kompasset
- Sjåførens eget maskineri
- Arven

Ikke finn opp nye merkevarenavn uten eksplisitt beskjed.

## 10. Kodemessige guardrails

Codex skal:

- gjøre små, avgrensede endringer
- følge eksisterende filstruktur
- ikke omskrive hele prosjektet uten beskjed
- ikke installere store biblioteker uten begrunnelse
- ikke lage mock-backend hvis Phase 1 ikke trenger det
- ikke legge inn hemmelige nøkler
- ikke hardkode fremtidige API-er
- ikke blande Phase 2-logikk inn i Phase 1
- ikke bygge “midlertidige” komplekse systemer

## 11. Designguardrails

Designet skal være:

- rolig
- varmt
- tydelig
- luftig
- mobilvennlig
- raskt
- menneskelig

Unngå:

- harde neonfarger
- stressende animasjoner
- for mange kort
- dashboard-følelse
- teknologisk SaaS-estetikk
- overdreven “startup”-språkføring
- blå/lilla standard-AI-estetikk
- store gradienter
- glassmorphism
- aggressive skygger

## 12. Språkguardrails

Stemmen skal være:

- varm
- nøktern
- konkret
- trygg
- handlingsorientert

Ikke bruk:

- hype
- store løfter
- AI-klisjeer
- terapeutisk svada
- “revolusjonerende”
- “banebrytende”
- “transformer livet ditt”
- “ta livet ditt tilbake”
- “endelig løsningen”
- “magisk”
- “smart AI”

Bruk korte setninger.

Skriv for en utslitt forelder.

## 13. Juridiske og etiske guardrails

Depotet skal ikke fremstå som helsehjelp.

Veiledning skal beskrives som operativ og pedagogisk støtte, ikke terapi.

Ikke bruk språk som kan tolkes som:

- behandling
- diagnostisering
- medisinsk rådgivning
- krisehelsetjeneste
- erstatning for profesjonell hjelp

Ved alvorlig fare, vold, akutt psykisk helsekrise eller bekymring for liv og helse skal kommunikasjonen henvise til relevante akutte tjenester.

## 14. Akuttside-guardrails

`/det-smeller-na` skal aldri bli en innholdsside.

Den skal ikke ha:

- blogginnhold
- forklaringer
- produktkort
- kursliste
- video
- bilder
- animasjoner
- chatbot
- skjema
- loginwall
- betalingsmur
- analytics scripts
- tredjeparts embeds
- eksterne fonter
- cookie-banner som blokkerer første handling

Den skal være tilgjengelig umiddelbart.

## 15. Stoppsignal

Hvis en løsning gjør systemet mer imponerende, men mindre brukbart for en stresset forelder, skal den ikke bygges.

Hvis en løsning gjør koden mer avansert, men Phase 1 mindre ferdig, skal den ikke bygges.

Hvis en løsning gjør nettsiden mer komplett, men mer kompleks, skal den ikke bygges.
