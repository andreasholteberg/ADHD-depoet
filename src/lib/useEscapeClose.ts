import { useEffect } from 'react';

/**
 * Lukker en modal med Escape-tasten (WCAG 2.1.2 / god dialogskikk).
 * Bruk i alle overlegg: useEscapeClose(onClose).
 */
export function useEscapeClose(onClose: () => void, active: boolean = true): void {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, active]);
}
