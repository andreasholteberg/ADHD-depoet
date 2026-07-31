# Plan: framtidig migrering fra adhd-depoet.com til adhd-depoet.no

> **Dette dokumentet autoriserer ikke migrering, deploy eller DNS-endringer.
> Migreringen krever en ny, separat produksjonsgodkjenning.**

Skrevet 31. juli 2026. Ingen del av planen er utført.

## Nåværende tilstand

| | |
|---|---|
| Produksjonsdomene | `https://adhd-depoet.com` |
| Canonical | self-canonical på `.com` |
| Open Graph | `og:url` og `og:image` på `.com` |
| Cloudflare Pages-prosjekt | `adhd-depoet-app` (domener: `adhd-depoet-app.pages.dev`, `adhd-depoet.com`) |
| `adhd-depoet.no` | **kjøpt og reservert. Ikke i bruk.** |
| Migreringsdato | ikke bestemt |

`adhd-depoet.no` er i dag ikke bundet til hosting, har ingen redirect, brukes
ikke som canonical, og er ikke lagt inn i Search Console. Den skal forbli slik
til migreringen godkjennes som egen oppgave.

Autentiseringsinfrastrukturen ligger på `auth.kontinuum.work` og berøres ikke
av en domenemigrering. Innloggingsmailene sendes fra
`innlogging@auth.kontinuum.work`, med SPF på `send.auth.kontinuum.work`, DKIM
på `resend._domainkey.auth.kontinuum.work` og DMARC på
`_dmarc.auth.kontinuum.work`. Alt dette skal stå urørt.

## Framtidig preflight

Gjennomgås før noe endres. Punktene er ikke rekkefølgeavhengige, men alle må
være besvart.

**Infrastruktur**

- Cloudflare-sone for `adhd-depoet.no`: finnes den, og peker registrarens
  navnetjenere dit?
- DNS: eksporter hele sonen for både `.com` og `.no` før endring.
- TLS/SSL: er sertifikat utstedt for `adhd-depoet.no` og `www.adhd-depoet.no`?
- Pages- eller Worker-binding: hvilken type skal `.no` bindes med? Kontroller i
  DNS om posten blir av typen `Worker`/`Pages` og dermed en Custom Domain.
- Rollbackpunkt: noter aktiv Pages-deployment-ID, aktiv commit, gamle
  navnetjenere og full DNS-eksport.

**Nettstedet**

- canonical: hvor settes den, og er den self-canonical i dag?
- Open Graph: `og:url` og `og:image` i `index.html` og eventuell prerender.
- sitemap: finnes det et i dag, og hva må endres?
- robots: `Allow`-regler og sitemap-henvisning.
- prerender: `scripts/prerender.ts` skriver statiske sider — kontroller om
  domenet er hardkodet der.

**Eksterne koblinger**

- Search Console: opprett Domain property for `.no` i tillegg til `.com`.
  Behold begge.
- analytics: hvilken property, og må måldomenet endres?
- Stripe: webhook-endepunkter, ToS-URL, branding-URL og eventuelle
  success/cancel-URL-er.
- callback-URL-er og autentiseringsredirects: Supabase Auth godtar bare
  eksplisitt tillatte redirect-URL-er. `.no` må legges inn **før** cutover,
  ellers feiler innlogging. `aa9935d feat(auth): allow exact Pages preview
  callback` viser at listen er streng.
- e-post og supportadresser i personvernerklæring og produkttekst.
- eksterne lenker: pilotdokumentasjon, invitasjoner og allerede utsendte
  e-poster peker på `.com`. De skal fortsette å virke.

## Framtidig måltilstand

- `https://www.adhd-depoet.no` blir norsk canonical.
- Apex `adhd-depoet.no` redirecter til `www.adhd-depoet.no`.
- `.com` redirecter permanent (301) til tilsvarende sti på `.no`.
- Sti og query bevares nøyaktig, uten dobbel URL-encoding.
- Redirecten skjer i **ett ledd**. Apex på `.com` skal ikke hoppe innom
  `www.adhd-depoet.com` først.
- Gamle `.com`-lenker fortsetter å virke. Det finnes utsendte
  pilotinvitasjoner med `.com`-adresser.
- `.com` beholdes i overgangsperioden. Den skal ikke sies opp.
- `.no` får eget sitemap, innsendt i sin egen Search Console-property.
- Canonical flyttes **først ved lansering**, ikke før.

### Change of Address kan vurderes her

Til forskjell fra `kontinuum.work` — som bevisst holdes utenfor Change of
Address fordi den senere skal bli et selvstendig engelsk språkområde — er
`.com` → `.no` ment som en **permanent, hel domeneflytting**. Da er Search
Console Change of Address det riktige verktøyet, og bør vurderes.

Forutsetningen er at hele nettstedet flyttes, at redirecten er 301 og
sti-for-sti, og at begge properties er verifisert på forhånd.

## Rekkefølge ved gjennomføring

1. Verifiser `.no` i Search Console mens den fortsatt er ubrukt (DNS TXT).
2. Legg `.no`-callback-URL-er inn i Supabase Auth.
3. Oppdater Stripe-URL-er.
4. Bind `.no` til Pages-prosjektet. Vent på TLS.
5. Bytt canonical og Open Graph til `.no`. Deploy.
6. Legg opp 301 fra `.com` til `.no`.
7. Send inn `.no`-sitemap.
8. Vurder Change of Address.
9. Kontroller innlogging, betaling og personvernside på `.no`.

Rollback: fjern 301-en, sett canonical tilbake til `.com`, rull Pages tilbake
til registrert deployment-ID. `.com` forblir bundet hele veien, så
rollbackvinduet er kort.

## Avgrensning

Dette dokumentet autoriserer ikke migrering, deploy eller DNS-endringer.
Migreringen krever en ny, separat produksjonsgodkjenning.
