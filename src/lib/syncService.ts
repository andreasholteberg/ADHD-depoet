import type { Session } from '@supabase/supabase-js';
import { SundayWorkshop, User } from '../types';
import { loadReflections } from './reflections';
import { getSupabaseClient } from './supabaseClient';

export type SyncStatus = 'local' | 'idle' | 'syncing' | 'synced' | 'error';

export interface ServerExportPayload {
  profile: unknown;
  savedCards: unknown[];
  progress: unknown[];
  optIns: unknown;
  reflections: unknown[];
  sundayReports: unknown[];
}

export interface LocalDepotSnapshot {
  user: User;
  sundayReports: SundayWorkshop[];
}

function nowIso(): string {
  return new Date().toISOString();
}

export function canSyncFreeText(user: User | null): boolean {
  return Boolean(user?.freeTextSyncConsent?.acceptedAt);
}

export async function requestMagicLink(email: string): Promise<{ ok: boolean; message: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, message: 'Innlogging er ikke konfigurert ennå.' };
  }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: 'Sjekk e-posten din for innloggingslenken.' };
}

export async function signOut(): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function syncLocalDepotToSupabase(
  session: Session,
  snapshot: LocalDepotSnapshot,
): Promise<{ ok: boolean; message: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, message: 'Backend er ikke konfigurert.' };

  const { user, sundayReports } = snapshot;
  const userId = session.user.id;
  const freeTextAllowed = canSyncFreeText(user);

  try {
    const profilePayload = {
      user_id: userId,
      display_name: user.name,
      email: user.email ?? session.user.email ?? null,
      current_focus: user.currentFocus,
      selected_weekly_goal: user.selectedWeeklyGoal,
      onboarding_answers: user.onboardingAnswers,
      sync_consent: user.syncConsent,
      free_text_sync_consent: user.freeTextSyncConsent,
      updated_at: nowIso(),
    };

    const { error: profileError } = await supabase.from('profiles').upsert(profilePayload, {
      onConflict: 'user_id',
    });
    if (profileError) throw profileError;

    if (user.savedCards.length > 0) {
      const savedCards = user.savedCards.map((cardId) => ({
        user_id: userId,
        card_id: cardId,
        updated_at: nowIso(),
      }));
      const { error } = await supabase.from('saved_cards').upsert(savedCards, {
        onConflict: 'user_id,card_id',
      });
      if (error) throw error;
    }

    if (user.completedModules.length > 0) {
      const progress = user.completedModules.map((moduleId) => ({
        user_id: userId,
        module_id: moduleId,
        completed_at: nowIso(),
      }));
      const { error } = await supabase.from('progress').upsert(progress, {
        onConflict: 'user_id,module_id',
      });
      if (error) throw error;
    }

    const { error: optInsError } = await supabase.from('opt_ins').upsert(
      {
        user_id: userId,
        opt_ins: user.optIns ?? null,
        pause_until: user.pauseUntil ?? null,
        email_consent: user.emailConsent ?? null,
        updated_at: nowIso(),
      },
      { onConflict: 'user_id' },
    );
    if (optInsError) throw optInsError;

    if (freeTextAllowed) {
      const reflections = loadReflections().map((entry) => ({
        user_id: userId,
        local_id: entry.id,
        date: entry.date,
        check_in: entry.checkIn,
        reflection: entry.reflection,
        updated_at: nowIso(),
      }));
      if (reflections.length > 0) {
        const { error } = await supabase.from('reflections').upsert(reflections, {
          onConflict: 'user_id,local_id',
        });
        if (error) throw error;
      }

      const reports = sundayReports.map((report) => ({
        user_id: userId,
        local_id: report.id,
        report_date: report.date,
        payload: report,
        updated_at: nowIso(),
      }));
      if (reports.length > 0) {
        const { error } = await supabase.from('sunday_reports').upsert(reports, {
          onConflict: 'user_id,local_id',
        });
        if (error) throw error;
      }
    }

    return {
      ok: true,
      message: freeTextAllowed
        ? 'Depotet er synket, inkludert fritekst du har samtykket til.'
        : 'Depotet er synket. Fritekst ble beholdt lokalt.',
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ukjent sync-feil.';
    return { ok: false, message };
  }
}

export async function exportServerData(session: Session): Promise<ServerExportPayload | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const userId = session.user.id;
  const [profile, savedCards, progress, optIns, reflections, sundayReports] = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('saved_cards').select('*').eq('user_id', userId),
    supabase.from('progress').select('*').eq('user_id', userId),
    supabase.from('opt_ins').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('reflections').select('*').eq('user_id', userId),
    supabase.from('sunday_reports').select('*').eq('user_id', userId),
  ]);

  return {
    profile: profile.data ?? null,
    savedCards: savedCards.data ?? [],
    progress: progress.data ?? [],
    optIns: optIns.data ?? null,
    reflections: reflections.data ?? [],
    sundayReports: sundayReports.data ?? [],
  };
}

export async function deleteServerData(session: Session): Promise<{ ok: boolean; message: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, message: 'Backend er ikke konfigurert.' };
  const { error } = await supabase.rpc('delete_current_user_data');
  if (error) return { ok: false, message: error.message };
  return { ok: true, message: 'Serverdata er slettet.' };
}
