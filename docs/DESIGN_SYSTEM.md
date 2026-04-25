# DESIGN_SYSTEM – DEPOTET

Dette dokumentet definerer visuell stil for Depotet.

Codex skal ikke finne opp egne farger, fonter eller visuelle mønstre uten eksplisitt beskjed.

## Designmål

Depotet skal føles:

- rolig
- varmt
- menneskelig
- tydelig
- trygt
- lite teknologisk
- mobilvennlig
- konkret
- lavmælt

Depotet skal ikke føles:

- som en SaaS-startup
- som en klinisk journalside
- som en kursportal
- som en AI-app
- som en coaching-funnel med høyt press
- som en offentlig infoside
- som et dashboard
- som et selvoptimaliseringsverktøy

## Fargepalett

Bruk disse fargene som standard.

```css
--color-background: #FAF7F1;
--color-surface: #FFFFFF;
--color-surface-muted: #F1ECE3;

--color-text: #2C2A27;
--color-text-muted: #6F6860;

--color-primary: #8A4F36;
--color-primary-hover: #74412D;
--color-primary-soft: #E8D4C8;

--color-accent: #B85C38;
--color-accent-soft: #F1D8C9;

--color-border: #DED6CC;

--color-crisis-bg: #171412;
--color-crisis-text: #F8F3EC;
--color-crisis-muted: #C9BFB4;
--color-crisis-button: #F2E6D8;
--color-crisis-button-text: #1E1A17;
```

## Bakgrunner

Vanlige sider:

```css
background: #FAF7F1;
color: #2C2A27;
```

Kort/seksjoner:

```css
background: #FFFFFF;
border: 1px solid #DED6CC;
border-radius: 24px;
```

Rolig sekundærflate:

```css
background: #F1ECE3;
```

Akuttside:

```css
background: #171412;
color: #F8F3EC;
```

## Tailwind-regel

Ikke bruk tilfeldige Tailwind-standardfarger som:

* blue
* indigo
* purple
* emerald
* cyan
* pink

Hvis Tailwind brukes, skal fargene defineres som tokens eller brukes med konkrete hex-verdier fra dette dokumentet.

## Typografi

Bruk systemfonter.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Ikke bruk dekorative fonter i Phase 1.

Ikke bruk serif-font som hovedfont i Phase 1.

Ikke installer fontpakker eller hent fonter fra tredjepart i Phase 1.

## Fontstørrelser

Hero desktop:

```css
font-size: clamp(2.5rem, 6vw, 5rem);
line-height: 0.95;
letter-spacing: -0.04em;
```

Hero mobil:

```css
font-size: clamp(2.4rem, 12vw, 4rem);
line-height: 0.95;
letter-spacing: -0.04em;
```

Sidetittel:

```css
font-size: clamp(2rem, 4vw, 3.5rem);
line-height: 1;
letter-spacing: -0.035em;
```

Seksjonstittel:

```css
font-size: clamp(1.75rem, 3vw, 2.5rem);
line-height: 1.1;
letter-spacing: -0.03em;
```

Brødtekst:

```css
font-size: 1.05rem;
line-height: 1.65;
```

Små forklaringer:

```css
font-size: 0.95rem;
line-height: 1.5;
color: #6F6860;
```

## Layout

Maks bredde:

```css
max-width: 1120px;
margin: 0 auto;
padding-left: 1rem;
padding-right: 1rem;
```

Smal tekstbredde:

```css
max-width: 720px;
```

Seksjonsavstand desktop:

```css
padding-top: 5rem;
padding-bottom: 5rem;
```

Seksjonsavstand mobil:

```css
padding-top: 3rem;
padding-bottom: 3rem;
```

Grid desktop:

```css
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 1rem;
```

Grid mobil:

```css
display: grid;
grid-template-columns: 1fr;
gap: 1rem;
```

## Knapper

Primærknapp:

```css
background: #8A4F36;
color: #FFFFFF;
border-radius: 999px;
padding: 0.9rem 1.25rem;
font-weight: 600;
```

Primærknapp hover:

```css
background: #74412D;
```

Sekundærknapp:

```css
background: transparent;
color: #2C2A27;
border: 1px solid #DED6CC;
border-radius: 999px;
padding: 0.9rem 1.25rem;
font-weight: 600;
```

Kriseknapp:

```css
background: #F2E6D8;
color: #1E1A17;
border-radius: 999px;
padding: 1rem 1.35rem;
font-weight: 700;
```

Header-kriseknapp:

```css
background: #B85C38;
color: #FFFFFF;
border-radius: 999px;
padding: 0.65rem 1rem;
font-weight: 700;
```

## Kort

Kort skal være rolige.

```css
background: #FFFFFF;
border: 1px solid #DED6CC;
border-radius: 24px;
padding: 1.5rem;
box-shadow: none;
```

Ikke bruk sterke skygger.

Hvis skygge brukes, skal den være svært subtil:

```css
box-shadow: 0 8px 24px rgba(44, 42, 39, 0.05);
```

## Header

Header skal være enkel.

Tillatte lenker:

* Logo
* Det smeller nå
* Få hjelp i kveld
* Depotet
* Logg inn

Ingen dropdown i Phase 1.

Ingen hamburger-meny med mange valg.

På mobil kan navigasjonen forenkles, men “Det smeller nå” skal alltid være synlig.

“Få hjelp i kveld” skal peke til `/nodbremsen`.

## Footer

Footer skal være lavmælt.

Kan inneholde:

* kort beskrivelse
* lenker til hovedsider
* kontakt-placeholder
* juridiske placeholders

Ikke bruk footer som sekundær sitemap med mange valg.

## Akuttside

`/det-smeller-na` skal visuelt skille seg fra resten.

Krav:

* mørk bakgrunn
* stor tekst
* svært lite innhold
* ingen kort-grid
* ingen illustrasjoner
* ingen animasjoner
* ingen distraksjoner
* ingen salgsbudskap før reguleringsinstruksjonen

Akuttside bakgrunn:

```css
background: #171412;
color: #F8F3EC;
```

Akuttside hovedtekst:

```css
font-size: clamp(2.4rem, 10vw, 5.5rem);
line-height: 0.95;
letter-spacing: -0.04em;
```

Akuttside brødtekst:

```css
font-size: clamp(1.15rem, 3vw, 1.5rem);
line-height: 1.45;
color: #C9BFB4;
```

## Animasjoner

Phase 1 skal ha ingen eller svært minimale animasjoner.

Tillatt:

```css
transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
```

Ikke bruk:

* parallax
* scroll animations
* store fade-in-sekvenser
* bounce-effekter
* loading-spinnere på statiske sider
* animert hero
* auto-spillende elementer

## Ikoner

Ikoner kan brukes sparsomt.

Ikke bruk mer enn ett ikon per kort.

Ikke bruk ikoner på akuttsiden hvis det skaper støy.

## Bilder

Phase 1 kan bygges uten bilder.

Hvis bilder brukes, skal de være:

* rolige
* menneskelige
* ikke stock-aktige
* ikke glade perfekte familier
* ikke kliniske behandlingsbilder
* ikke dramatiserte krisebilder

Ikke bruk bilder på `/det-smeller-na`.

## Mobil først

Alt skal fungere godt på mobil før desktop.

Minstekrav:

* store trykkflater
* god avstand
* ingen små lenker som hovedhandling
* ingen tett tekst
* ingen horisontal scrolling
* ingen hover-avhengig navigasjon
* CTA synlig uten leting

## Designregel

Hvis designet begynner å ligne en teknologisk SaaS-side, er det feil.

Hvis designet begynner å ligne en kursportal, er det feil.

Hvis designet gir brukeren flere valg enn nødvendig, er det feil.

Unngå også disse mønstrene i Phase 1:

* store “feature grids” som hovedinnhold
* logo-clouds
* KPI-tall eller vekststatistikk
* pris-tabeller på forsiden
* glødende gradient-bakgrunner
* glassmorphism
* app-lignende dashboard-hero
