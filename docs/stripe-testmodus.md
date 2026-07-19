# Stripe-testmodus – første betalte pakke

Status: lokal implementasjon, ikke eksternt konfigurert eller deployet. Live betaling er urørt.

## Fast tilbudskontrakt

- Produktkode: `depoet-first-bundle-v1`
- Kurs: `Regulering før retning` og `Førersetet: Øvingsprogrammet`
- Omfang: 13 moduler
- Pris: 990 NOK som én engangsbetaling
- Depoet: tre måneder inkludert, ingen automatisk fornyelse
- Fremtidige videoer til de kjøpte modulene inkluderes uten ny betaling
- Parkurset og Forankret inngår ikke

`server/payments/firstPaidOffer.ts` er den ene kodekontrakten for beløp, kurs og metadata.

## Lokal arkitektur

1. `POST /api/checkout` krever en gyldig Supabase-sesjon, kontrollerer eksisterende
   entitlements og oppretter en hosted Stripe Checkout Session.
2. Endepunktet godtar bare en serverhemmelighet med `sk_test_`-format. En live-nøkkel avvises.
3. Checkout bruker `mode=payment` og den ene forhåndsopprettede testprisen fra
   `STRIPE_TEST_PRICE_ID`. Den sender aldri inline `price_data` eller recurring-felter.
4. `POST /api/stripe-webhook` leser rå request-body, verifiserer `Stripe-Signature` med fem
   minutters toleranse og godtar bare testhendelser med den eksakte tilbudskontrakten.
5. Webhooken kaller den lokale, fremoverrettede RPC-en `fulfill_stripe_test_checkout` med en
   individuelt navngitt Supabase secret key. RPC-en er service-role-avgrenset og idempotent på
   Checkout Session-ID.
6. Fulfillment gir de to course-entitlementene og tre måneders Depoet-tilgang. Det finnes ingen
   abonnementskontrakt eller automatisk fornyelse.

## Servervariabler – ikke konfigurer før ny ekstern godkjenning

- `STRIPE_TEST_SECRET_KEY` – Stripe test secret, bare server
- `STRIPE_TEST_WEBHOOK_SECRET` – test-endepunktets `whsec_`-secret, bare server
- `STRIPE_TEST_PRICE_ID` – ID-en til den ene forhåndsopprettede 990 NOK-testprisen, bare server
  (ikke hemmelig, men aldri klientstyrt)
- `SUPABASE_STRIPE_SECRET_KEY` – ny, individuelt navngitt Supabase secret key, bare server
- `SUPABASE_URL` og `SUPABASE_PUBLISHABLE_KEY` – offentlig prosjektinformasjon
- `APP_URL` – eksakt apex eller godkjent Pages-preview

Ingen av de tre hemmelighetene skal være `VITE_`-variabler, ligge i repositoryet eller vises i
logger. Ingen nøkkel er opprettet i denne runden.

## Før første eksterne test

1. Gjennomgå og godkjenn den eksakte SQL-filen
   `supabase/migrations/20260719000100_stripe_test_entitlements.sql`.
2. Opprett en navngitt Supabase secret key for webhook-fulfillment og lagre verdien kun som en
   kryptert Cloudflare Pages-hemmelighet.
3. Opprett Stripe webhook i **testmodus** for `checkout.session.completed` og
   `checkout.session.async_payment_succeeded`.
4. Legg Stripe-testhemmelighetene inn i Preview-miljøet først.
5. Kjør Checkout med Stripe-testkort, kontroller én webhook, idempotent replay, begge
   course-entitlements og eksakt tre måneders Depoet-tilgang.
6. Kontroller at manglende/feil signatur, live-event, feil beløp, feil valuta og feil produktkode
   ikke kan gi tilgang.
7. Aktiver ingen kjøpsknapp i produksjon før hele testen og juridisk/MVA-vurdering er godkjent.

## Ekstern testport

1. Logg inn i Stripe sandbox/testmodus og opprett produktet
   `Regulering før retning + Førersetet: Øvingsprogrammet` under Kontinuum/ADHD Depoet.
2. Opprett én engangspris på 990 NOK med metadata
   `product_code=depoet-first-bundle-v1`. Ikke opprett livepris eller abonnement.
3. Legg testprisens `price_`-ID i preview som `STRIPE_TEST_PRICE_ID`.
4. Bruk bare serverhemmeligheter for Stripe og Supabase, og deploy bare til isolert preview.
5. Test vellykket og avbrutt Checkout, duplikat-webhook, ugyldig signatur og ukjent produkt.
   Ukjent produkt skal ignoreres uten fulfillment; kjent produkt med feil beløp eller valuta
   skal avvises.

Tekniske kilder: [Stripe Checkout](https://docs.stripe.com/api/checkout/sessions/create) og
[Stripe webhooks](https://docs.stripe.com/webhooks).
