/**
 * Foto — redaksjonelt bilde fra den felles bildebanken.
 *
 * Prosjektet hadde ingen bildekomponent fra foer; bare raa <img> til logoene.
 * Denne samler det som ellers ville blitt gjentatt paa hvert bruksted:
 * WebP med JPEG-reserve, eksplisitte dimensjoner mot layoutforskyvning,
 * riktig lastestrategi og felles ramme.
 *
 * Bildene i banken er allerede fargebehandlet. Komponenten legger derfor
 * ingen filter, toning eller opacity oppaa dem.
 *
 * Alt-tekst: beskriv det som faktisk er synlig. Aldri en diagnose, og aldri
 * en tolkning av hvorfor en person gjoer noe. «Et barn sitter i en hengekoye
 * og leser» — ikke «et barn med ADHD».
 */
import type { CSSProperties } from 'react';

type Props = {
  /** Filnavn uten mappe, f.eks. "kapasitet-for-retning-16x9.webp" */
  src: string;
  /** JPEG-reserve, bare der banken faktisk har en. */
  fallback?: string;
  alt: string;
  width: number;
  height: number;
  /** true kun for bildet over folden. Alt annet lazy-lastes. */
  prioritet?: boolean;
  /** Settes naar standard sentrering kutter motivet feil. */
  objectPosition?: string;
  className?: string;
  /** Vises under bildet naar den faktisk tilfoerer noe. */
  bildetekst?: string;
};

export default function Foto({
  src,
  fallback,
  alt,
  width,
  height,
  prioritet = false,
  objectPosition,
  className = '',
  bildetekst,
}: Props) {
  const stil: CSSProperties = objectPosition ? { objectPosition } : {};

  const bilde = (
    <img
      src={`/foto/${fallback ?? src}`}
      alt={alt}
      width={width}
      height={height}
      loading={prioritet ? 'eager' : 'lazy'}
      decoding="async"
      {...(prioritet ? { fetchPriority: 'high' as const } : {})}
      style={stil}
      className={`block h-auto w-full rounded-2xl border border-stone-200 bg-stone-100 ${className}`}
    />
  );

  return (
    <figure className="my-0">
      {fallback ? (
        <picture>
          <source srcSet={`/foto/${src}`} type="image/webp" />
          {bilde}
        </picture>
      ) : (
        bilde
      )}
      {bildetekst && (
        <figcaption className="mt-2 text-sm leading-relaxed text-stone-600">
          {bildetekst}
        </figcaption>
      )}
    </figure>
  );
}
