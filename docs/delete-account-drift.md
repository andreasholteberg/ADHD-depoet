# Driftskontrakt for `delete-account`

Edge Function `delete-account` bruker den nye Supabase Secret Key-modellen og henter
nøkkelen med det eksakte navnet `edge_delete_account` fra JSON-ordboken i
`SUPABASE_SECRET_KEYS`. Funksjonen skal ikke lese `SUPABASE_SERVICE_ROLE_KEY`.

`DELETE_JOB_SECRET` er separat kallautorisasjon og må fortsatt valideres før
database- eller Auth Admin-klienten opprettes. Funksjonen kjører med
`verify_jwt = false`, fordi nye `sb_secret_`-nøkler ikke er JWT-baserte; dette erstatter
ikke funksjonens egen autorisasjonskontroll.

Den beskyttede dry-run-modusen bruker `x-depot-job-mode: dry-run`. Den skal bare lese
saniterte tilstandsmarkører for database og Auth Admin, kontrollere før/etter-tilstand
og aldri kalle slettemutatoren.

Nøkkelverdier skal ikke kopieres til repository, lokale miljøfiler, logger eller
klientbygg. Legacy-nøkler skal ikke deaktiveres før deploy, dry-run og loggkontroll er
godkjent i en separat sikkerhetsrunde.
