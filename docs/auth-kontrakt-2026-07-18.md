# ADHD Depoet – Auth-kontrakt

Dato: 18. juli 2026
Supabase-prosjekt: `uipsaeojwjehrbylfgrx`

## Klientkontrakt

- Produksjonsorigin: `https://adhd-depoet.com`
- Produksjonscallback: `https://adhd-depoet.com/auth/callback`
- Lokal callback: gjeldende lokal utviklingsorigin + `/auth/callback`
- Produksjonskode sender aldri localhost eller `www` som redirect.
- Manuell kodeverifisering bruker e-postadressen koden ble sendt til og
  `verifyOtp({ email, token: code.trim(), type: 'email' })`.
- Kodefeltet tar bare seks numeriske sifre og bruker `inputMode="numeric"` og
  `autoComplete="one-time-code"`.

## Backendkontrakt som skal verifiseres manuelt

- `mailer_otp_length` skal være heltallet `6`.
- `mailer_templates_magic_link_content` skal inneholde den eksakte teksten
  `Bruk denne engangskoden`.
- Malen skal inneholde både `{{ .Token }}` og `{{ .ConfirmationURL }}`.
- Backendverdiene regnes ikke som bekreftet før både PATCH og etterfølgende GET er vellykket,
  og alle fire sanitiserte kontroller er `True`.

## Statisk kontrollert TEMP-skript

- Fil: `%TEMP%\codex-supabase-otp-config-v2.ps1`
- SHA-256: `C95AADDA252B3362D0C42C55D1BE73E2A56BEB4B2FF1978798906F1DB3B07208`
- Lokal parse/preflight: bestått.
- Skriptet inneholder ingen token eller annen hemmelighet.
- Det gjør nøyaktig én PATCH og én GET uten retry, skriver bare sanitiserte kontrollfelt,
  rydder sensitive variabler og utklippstavle og sletter seg selv.

## Stoppunkt

Ingen token er opprettet, lest eller håndtert i denne ferdigstillingsrunden. Ingen Auth-PATCH,
GET, testmail eller innloggingstest er sendt. Videre arbeid starter først etter manuell kjøring,
umiddelbar tilbakekalling av korttidstokenet og mottatt sanitert rapport.
