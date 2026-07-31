# SEO-oppfølging: canonical, robots og sitemap

Funnet 31. juli 2026 under opprydding av Git- og deploytilstanden.

> **Dette dokumentet er en anbefaling, ikke en autorisasjon.** Ingen av
> endringene er utført. De krever egen godkjenning og en produksjonsdeploy.

## Funn

### 1. Ingen `<link rel="canonical">`

Produksjonssiden har korrekt Open Graph:

```html
<meta property="og:url" content="https://adhd-depoet.com" />
<meta property="og:image" content="https://adhd-depoet.com/depoet-logo-transparent.png" />
```

Men det finnes **ingen** canonical-tag. Open Graph er et delingssignal, ikke et
indekseringssignal. Google bruker `og:url` som et svakt hint, ikke som canonical.

### 2. SPA-fallback gjør enhver sti til en 200

`dist/_redirects` inneholder:

```
/*    /index.html   200
```

Det er riktig og nødvendig for en klientrutet app, men konsekvensen er at
**alle** stier svarer 200 med identisk HTML:

| Sti | Status |
|---|---|
| `/` | 200 |
| `/personvern` | 200 |
| `/finnes-ikke-xyz` | 200 |

Nettstedet har altså ingen 404 i det hele tatt.

**Dette er grunnen til at canonical betyr noe her.** Uten canonical er hver
oppdiktede URL en selvstendig, indekserbar side med samme innhold som forsiden.
En feilskrevet lenke, en gammel delt adresse eller en crawler som gjetter stier
kan skape duplikater. Med canonical peker de alle tilbake på forsiden.

### 3. `/robots.txt` og `/sitemap.xml` serverer app-HTML

| URL | Status | Content-Type | Faktisk innhold |
|---|---|---|---|
| `/robots.txt` | 200 | `text/html` | app-HTML |
| `/sitemap.xml` | 200 | `text/html` | app-HTML |

Ingen av filene finnes, så catch-all-regelen serverer appen i stedet.

For `robots.txt` er dette lite alvorlig: Google behandler en fil den ikke kan
parse som «tillat alt», som er ønsket tilstand. Men det er uryddig, og det gjør
det umulig å senere begrense en sti uten å legge inn en ekte fil.

For `sitemap.xml` er det verre. Sendes den inn i Search Console, feiler den på
parsing — den er HTML, ikke XML.

## Anbefaling

### Canonical

Legg inn i `index.html`, i `<head>` ved siden av Open Graph-taggene:

```html
<link rel="canonical" href="https://adhd-depoet.com/" />
```

Merk skråstreken til slutt. `og:url` står i dag uten (`https://adhd-depoet.com`).
De to bør harmoniseres, og formen med skråstrek er den som faktisk serveres.

**Begrensning å være klar over.** En statisk canonical i `index.html` gjelder
alle ruter, siden alle serveres fra samme fil. Det er akseptabelt så lenge appen
ikke har innhold som skal indekseres separat per rute. Skal enkeltruter
indekseres hver for seg senere, må canonical settes dynamisk ved rendering —
og da er `scripts/prerender.ts` på arbeidsbranchen det naturlige stedet.

### robots.txt

Legg en ekte fil i `public/robots.txt` slik at Vite kopierer den til `dist/`:

```
User-agent: *
Allow: /

Sitemap: https://adhd-depoet.com/sitemap.xml
```

Ikke vis til sitemap før den faktisk finnes.

### sitemap.xml

Enten legg en ekte `public/sitemap.xml` med de URL-ene som skal indekseres,
eller la være og fjern sitemap-linjen fra robots.txt. En sitemap som svarer med
HTML er verre enn ingen sitemap.

Siden appen i praksis er én indekserbar side i dag, er det fullt forsvarlig å
droppe sitemap og bare ha canonical og robots.txt.

## Rekkefølge ved gjennomføring

1. Legg til canonical i `index.html`.
2. Legg til `public/robots.txt`.
3. Vurder sitemap. Dropp den hvis bare forsiden skal indekseres.
4. Bygg og deploy etter prosedyren i `docs/BUILD_AND_DEPLOY.md`.
5. Kontroller live at canonical er til stede og at `/robots.txt` svarer
   `text/plain`.

Dette hører naturlig sammen med en framtidig migrering til `adhd-depoet.no`,
der canonical uansett må settes på nytt. Se `docs/DOMAIN_MIGRATION_NO.md` på
arbeidsbranchen. Rekkefølgen bør være: rydd canonical og robots på `.com`
først, migrer etterpå.

## Ikke gjort

Ingen canonical er lagt inn i produksjon. Ingen `robots.txt` eller
`sitemap.xml` er opprettet. Ingen deploy er utført. Search Console er ikke rørt.
