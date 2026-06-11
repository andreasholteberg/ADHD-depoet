import { ParentEnergyLevel, User } from '../types';

/**
 * Normaliserer historiske/visningsavhengige tilstandstekster til ett internt nivå.
 * Tåler både 'Jeg er nesten tom' og 'Jeg er nesten helt tom' o.l.
 */
export function normalizeParentState(value: string | null | undefined): ParentEnergyLevel | null {
  if (!value) return null;
  const v = value.toLowerCase();
  if (v.includes('tom')) return 'tom';
  if (v.includes('sliten')) return 'sliten';
  if (v.includes('rom') || v.includes('overskudd')) return 'rom';
  return null;
}

/** ISO-dato (YYYY-MM-DD) for i dag, brukt som nøkkel for dagens innsjekk. */
export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Gjeldende kapasitetsnivå for brukeren:
 * dagens innsjekk vinner; ellers faller vi tilbake til onboarding-svaret.
 */
export function getParentEnergy(user: User | null): ParentEnergyLevel | null {
  if (!user) return null;
  if (user.lastCheckIn && user.lastCheckIn.date === todayIsoDate()) {
    return user.lastCheckIn.state;
  }
  return normalizeParentState(user.onboardingAnswers?.parentState);
}

export const PARENT_ENERGY_LABELS: Record<ParentEnergyLevel, string> = {
  rom: 'Jeg har litt rom',
  sliten: 'Jeg er sliten',
  tom: 'Jeg er nesten tom',
};
