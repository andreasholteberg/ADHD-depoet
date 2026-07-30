/**
 * Skriver et statisk hero-skall inn i dist/index.html etter `vite build`.
 *
 * Problemet dette løser: appen er klientrendret, så HTML-en som serveren
 * leverer er tom. Besøkende ser en blank flate til 800+ kB JavaScript er
 * lastet og kjørt, og delingsforhåndsvisninger og søkemotorer får ingenting.
 *
 * Løsningen er bevisst enkel: vi rendrer ikke React på serveren, vi legger
 * inn selve hero-seksjonen som ferdig HTML. Stilarket er render-blokkerende
 * og lastes uansett før første maling, så skallet ser identisk ut med det
 * React senere tegner — det kommer bare mange hundre millisekunder før.
 *
 * Skallet fjernes av main.tsx i det React har montert.
 *
 * Kjøres av `npm run build`.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO } from '../src/lib/heroCopy.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const INDEX = resolve(ROOT, 'dist/index.html');
const MARKER = '<div id="root"></div>';

/** Minimal escaping — teksten er vår egen, men skallet skal ikke kunne brekke. */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Skallet bruker de samme Tailwind-klassene som LandingPage, slik at
 * Tailwind allerede har generert dem og skallet arver riktig utseende
 * i både lys og mørk modus.
 */
function shell(): string {
  return `<div id="prerender" aria-hidden="false">
  <div class="kontinuum-paper min-h-screen bg-stone-50 text-stone-900 font-sans">
    <div class="h-1.5 bg-pine-600"></div>
    <nav class="max-w-3xl mx-auto px-6 py-5 flex justify-between items-center border-b border-stone-200/70">
      <a href="#top" class="flex items-center no-underline">
        <img src="/depoet-logo-transparent.png" alt="ADHD Depoet" class="h-12 w-auto -my-2 dark:hidden" width="180" height="48">
        <img src="/depoet-logo-transparent-dark-mode.png" alt="ADHD Depoet" class="hidden h-12 w-auto -my-2 dark:block" width="180" height="48">
      </a>
    </nav>
    <header id="top" class="kontinuum-hero py-20 text-center max-w-3xl mx-auto px-6">
      <div class="space-y-6">
        <div class="text-xs tracking-[4px] uppercase text-pine-600 dark:text-pine-700 font-bold">${esc(HERO.eyebrow)}</div>
        <h1 class="text-4xl md:text-5xl font-serif font-semibold text-stone-950 leading-tight tracking-tight">${esc(HERO.title)}</h1>
        <p class="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-serif">${esc(HERO.lede)}</p>
        <p class="text-sm md:text-base text-stone-500 max-w-xl mx-auto italic font-serif">${esc(HERO.subtle)}</p>
        <div class="pt-6 flex flex-col md:flex-row justify-center items-center gap-3">
          <a href="${esc(HERO.primaryHref)}" class="w-full md:w-auto text-center bg-pine-600 text-white font-semibold px-8 py-4 rounded-xl shadow-xxs">${esc(HERO.primaryCta)}</a>
        </div>
      </div>
    </header>
  </div>
</div>
`;
}

function main(): void {
  if (!existsSync(INDEX)) {
    console.error(`prerender: fant ikke ${INDEX}. Kjør \`vite build\` først.`);
    process.exit(1);
  }

  const html = readFileSync(INDEX, 'utf8');

  if (!html.includes(MARKER)) {
    console.error(`prerender: fant ikke «${MARKER}» i dist/index.html. Er malen endret?`);
    process.exit(1);
  }
  if (html.includes('id="prerender"')) {
    console.error('prerender: skallet ligger allerede der. Bygg på nytt fra rent dist/.');
    process.exit(1);
  }

  const out = html.replace(MARKER, `${shell()}${MARKER}`);
  writeFileSync(INDEX, out, 'utf8');

  const kb = (Buffer.byteLength(out, 'utf8') / 1024).toFixed(1);
  console.log(`prerender: hero-skall lagt inn i dist/index.html (${kb} kB)`);
  console.log(`prerender: «${HERO.title}» er nå i HTML-en før JavaScript kjører.`);
}

main();
