# Backend-plan: Synkronisering av depotet

> Status: PLAN – ikke implementert. Frontend skal ikke skrive «synkronisert» eller
> «trygt lagret i skyen» noe sted før dette faktisk kjører.
> Sist oppdatert: juni 2026.

## Hvorfor sync er viktig (og hvorfor den haster mer enn e-post)

Alt brukeren bygger – språkkort, notater, søndagslandinger, ukesmål – ligger i dag kun i
localStorage i én nettleser. Det betyr at depotet forsvinner ved nettleserbytte, tømming av
nettleserdata, ny telefon, eller privat/inkognito-modus. Dette er et stille churn-øyeblikk vi
aldri får vite om. Etter at «Mitt depot» ble synlig, eier brukeren noe hun vil ta vare på –
det er nå sync gir mening og oppleves som en tjeneste, ikke et krav.

## Hva som BØR synkes

| Data | Kilde i dag | Begrunnelse |
|------|-------------|-------------|
| Lagrede språkkort (`savedCards`) | `depoet_user` | Kjernen i depotet |
| Ukesmål og fokus | `depoet_user` | Styrer hele appopplevelsen |
| Søndagslandinger | `depoet_sunday_reports` | Brukerens historikk og speilingsgrunnlag |
| Egne refleksjoner | `depoet_reflections` | Mest verdifulle og mest private – se kryptering under |
| Onboarding-svar og innstillinger (`optIns`, `pauseUntil`) | `depoet_user` | Slipper å svare på nytt |
| Fullførte moduler | `depoet_user` | Kursfremdrift |

## Hva som IKKE bør synkes

- `depoet_seen_prompts` (rotasjonshistorikk) – ren komfortdata, kan trygt starte på nytt per enhet.
- `depoet_visited_app` og annen flyt-tilstand – enhetslokalt.
- Dagens innsjekk (`lastCheckIn`) – kan synkes senere, men er døgnflyktig; ikke i v1.
- Ingen avledede data, ingen aggregater, ingen "aktivitetshistorikk" utover det brukeren selv har skrevet.

## Samtykke og innlogging

- Sync er **opt-in og fortsatt valgfritt**: anonym lokal bruk forblir en fullverdig førsteklasses
  modus, ikke en degradert venteversjon.
- Innlogging via e-postlenke (passordfri «magic link» – den simulerte flyten i dev-modus er
  allerede designet for dette og blir malen). Ingen passord å glemme, ingen tredjeparts-login i v1.
- Samtykketekst i klartekst ved aktivering: hva som lagres, hvor (EU/EØS), og at alt kan slettes
  med ett valg. Lagres tidsstemplet.
- Frakobling skal alltid være mulig: data forblir lokalt, serverkopien slettes (ekte sletting, ikke
  bare deaktivering).

## Migrering av lokal forhåndsvisning

Dette er det viktigste tekniske punktet, fordi tidlige brukere allerede HAR et depot lokalt:

1. Ved første innlogging leses hele det lokale depotet og lastes opp som utgangspunkt («ditt depot
   er nå tatt vare på») – lokal data er alltid sannheten ved første migrering.
2. Hvis kontoen allerede har data fra en annen enhet: flett uten tap – `savedCards` som
   mengde-union, refleksjoner og søndagslandinger sammenslått på id/dato. Ved tvil: behold begge.
   Aldri "velg hvilken versjon du vil beholde"-skjemaer til denne målgruppen.
3. localStorage beholdes som lokal cache etter migrering (offline-først). Sync er bakgrunnsjobb
   med «sist vunnet per felt», ikke en blokkerende operasjon.
4. Migreringen må være idempotent – avbrutt opplasting (mobil, dårlig nett) skal kunne kjøres
   på nytt uten duplikater.

## Hvordan unngå tap av depot ved nettleserbytte

- Kort sikt (før backend finnes): vurder en enkel, ærlig eksport/import («Last ned depotet ditt
  som fil») – null backend, gir brukeren eierskap og en livbåt. Kan bygges når som helst.
- Etter sync: depotet følger kontoen. Ny nettleser → logg inn med e-postlenke → depotet er der.
- E-postlenke-innlogging betyr at e-posten i praksis er nøkkelen: dokumentér det ærlig
  («den som har tilgang til e-posten din, kan logge inn»).

## Hva som kreves før vi kan love «trygg lagring»

Løftet «Dataene dine lagres trygt» krever ALT dette, ikke bare en database:

1. Lagring og behandling i EU/EØS med databehandleravtaler for hele kjeden.
2. Kryptering i transit (TLS) og at rest; refleksjoner (fritekst om barn og familie) bør vurderes
   for applikasjonsnivå-kryptering, siden de kan inneholde svært personlige opplysninger.
3. Personvernerklæring + slett-alt-funksjon som faktisk virker (GDPR art. 17), inkl. backup-rutiner
   som respekterer sletting.
4. Tilgangskontroll: kun brukeren selv kan lese sine data; ingen admin-grensesnitt som viser
   refleksjoner i klartekst.
5. Backup og gjenoppretting testet – «trygt» betyr også trygt mot tap, ikke bare mot innsyn.
6. Sikkerhetsgjennomgang av token-flyt (utløp, engangsbruk, binding til enhet der mulig).

Inntil alle seks er på plass: behold dagens ærlige tekst («data lagres lokalt i nettleseren din»).

## Foreslått rekkefølge når det bygges

1. Eksport/import-livbåten (kan gjøres uavhengig, før backend).
2. Backend med magic link + opplasting av lokalt depot (migrering punkt 1).
3. Fletting fra flere enheter (punkt 2) og bakgrunnssync.
4. Først DA: oppdater frontend-tekstene – «Synkronisert»-tilstanden i profilen finnes allerede
   som dev-gatet UI og kan kobles på ekte data.

## Eksplisitt IKKE i scope

- Ingen deling av depot mellom brukere (partner-deling er en egen, senere diskusjon med eget
  samtykkedesign – språkkortdeling via Del-knappen dekker behovet nå).
- Ingen analyse av synkede data. Serveren lagrer og henter; den leser aldri innholdet for andre formål.
- Ingen innlogging som KRAV for å bruke appen.
