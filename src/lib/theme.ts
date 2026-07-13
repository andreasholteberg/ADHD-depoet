/**
 * Tema-styring for ADHD Depoet (Kontinuum mørk modus).
 * «Begge»: systempreferanse som standard, med manuell overstyring som huskes lokalt.
 * En .dark-klasse på <html> styrer token-overstyringene i index.css.
 */

export type ThemePref = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'depoet_theme';

export function getStoredTheme(): ThemePref {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {
    /* localStorage utilgjengelig */
  }
  return 'system';
}

export function systemPrefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

export function effectiveDark(pref: ThemePref = getStoredTheme()): boolean {
  return pref === 'dark' || (pref === 'system' && systemPrefersDark());
}

/** Setter/fjerner .dark-klassen på <html> ut fra valgt (eller lagret) preferanse. */
export function applyTheme(pref: ThemePref = getStoredTheme()): void {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', effectiveDark(pref));
}

/** Lagrer preferansen og anvender den umiddelbart. */
export function setTheme(pref: ThemePref): void {
  try {
    localStorage.setItem(STORAGE_KEY, pref);
  } catch {
    /* ignorer – temaet anvendes uansett for økten */
  }
  applyTheme(pref);
}

/** Reagerer på endring i systemets mørk/lys-innstilling når brukeren står på «system». */
export function initThemeListener(): void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    if (getStoredTheme() === 'system') applyTheme('system');
  };
  if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onChange);
}
