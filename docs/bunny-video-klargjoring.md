# Bunny Stream – struktur og publiseringsport

Status: avspillingsintegrasjon og inventar er klargjort lokalt. Ingen videofiler er lastet opp,
og ingen modul er markert som publisert.

## Avgrensning

- Ett eget Bunny Stream-bibliotek for ADHD Depoet, med europeisk lagring/regionvalg og DPA.
- Samlinger: `depoet-gratis`, `depoet-forste-pakke` og `depoet-minikurs`.
- Parkurset og Forankret skal aldri legges i dette biblioteket.
- Bølge 1 er de 16 modulene i gratisinngangen og første betalte pakke.
- Første tekniske filer er `gratis-1` og `hoved-1`.
- Søk i prosjektområdet fant ingen kildefiler for disse to. Opplasting stopper derfor her.

## Filnavnstandard

- Master: `{videoKey}--vNN--master.mp4`, for eksempel `gratis-1--v01--master.mp4`.
- Teksttranskript: `{videoKey}--vNN--nb-NO.txt`.
- Undertekst: `{videoKey}--vNN--nb-NO.vtt`.
- Thumbnail: `{videoKey}--vNN--thumb-1280x720.jpg`.
- `videoKey` er alltid identisk med modul-ID-en og skal ikke inneholde navn eller persondata.

## Eksportspesifikasjon

- MP4, H.264 High Profile, progressiv 1920×1080, Rec.709.
- Behold kildefilens bildefrekvens; normalt 25 fps. Ikke konverter interlaced materiale.
- Video: mål 10–16 Mbps for master. Lyd: AAC, 48 kHz, 256–320 kbps.
- Talelyd rundt −16 LUFS integrert, uten klipping over −1 dBTP.
- Ingen innebygde undertekster i bildet; lever separat norsk VTT og teksttranskript.
- Eksporter høyest praktisk kvalitet. Bunny lager deretter strømmingsvariantene.

## Opptakssjekkliste

- Manusversjon og `videoKey` er bekreftet før opptak.
- Ingen navn, skole, sted, diagnosehistorikk eller andre opplysninger som identifiserer barn.
- Nøytral bakgrunn uten bilder, dokumenter eller varsler med personopplysninger.
- Kamera i øyehøyde, stabilt bilde, mykt frontlys og tydelig mikrofon.
- Ti sekunder romtone tas opp. Start/slutt har to sekunders klippemargin.
- Tittelen leses ikke som salgsbudskap; videoen skal fungere sammen med full leseversjon.
- Master, VTT, transkript og thumbnail får samme versjonsnummer.

## Metadata og thumbnail

- Bunny title: `{videoKey} – {modultittel}`.
- Collection følger tilgangsnivået i inventaret.
- Beskrivelse: én kort, ikke-identifiserende setning fra modulens `screenText`.
- Thumbnail: 1280×720, høy kontrast, rolig Depoet-uttrykk og maks seks ord. Ingen bilder av barn.
- Tekstalternativ i appen er modulens tittel. Hele videomanuset forblir tilgjengelig som
  leseversjon og transkript.

## Tilgangskontroll og avspilling

1. Bunny Embed View Token Authentication aktiveres for biblioteket.
2. `BUNNY_EMBED_TOKEN_KEY` lagres bare som kryptert Cloudflare Pages-hemmelighet.
3. `/api/video-embed` utsteder en kortlivet, SHA-256-signert embed-URL med ti minutters utløp.
4. Gratisvideo krever ikke kursentitlement, men får likevel kortlivet signert URL.
5. Video i første betalte pakke krever gyldig Supabase-sesjon og RLS-verifisert
   course-entitlement før signering.
6. Minikurs returneres ikke før et senere produkt- og entitlement-vedtak.
7. Token-sikkerhetsnøkkelen sendes aldri til klienten. Appen mottar bare den kortlivede URL-en.
8. `status: 'published'` settes først etter bekreftet Bunny library-ID, video-ID, full encoding,
   thumbnail/transkript og fungerende produksjonsavspilling.

Integrasjonen bruker Bunny sitt dokumenterte embedformat og signeringsmønster:
[embedding](https://docs.bunny.net/stream/embedding),
[token authentication](https://docs.bunny.net/stream/token-authentication) og
[video specification](https://docs.bunny.net/docs/stream-best-practices).

## Neste manuelle videoport

Lever de to masterfilene `gratis-1--v01--master.mp4` og `hoved-1--v01--master.mp4` med
tilhørende transkript/VTT og thumbnails. Deretter kan bibliotek/collections opprettes i Bunny,
de to filene lastes opp i en eksplisitt godkjent teknisk test, og inventaret oppdateres med
faktiske ID-er. Ingen produksjonsopplasting er godkjent ennå.
