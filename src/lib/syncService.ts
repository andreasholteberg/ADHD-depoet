import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { SundayWorkshop, User } from '../types';
import type { Database, Json, Tables } from './database.generated';
import { verifyEmailOtpWith, type EmailOtpVerificationResult } from './authCode';
import { getAuthCallbackUrl } from './authRedirect';
import { getSupabaseClient } from './supabaseClient';

export type SyncStatus =
  | 'local'
  | 'idle'
  | 'queued'
  | 'syncing'
  | 'synced'
  | 'error'
  | 'locked';

export type DepotAccessState =
  | 'guest'
  | 'unclaimed'
  | 'eligible_to_activate'
  | 'active'
  | 'grace'
  | 'read_only'
  | 'locked';

export interface AccountState {
  state: DepotAccessState;
  activatedAt: string | null;
  activeUntil: string | null;
  graceUntil: string | null;
  deletionExecuteAfter: string | null;
}

export interface LocalPracticeData {
  practices: Json[];
  cycles: Json[];
  observations: Json[];
  sundayDecisions: Json[];
  activeConflictChoice?: 'keep_cloud' | 'use_device';
}

export interface LocalDepotSnapshot {
  user: User;
  sundayReports: SundayWorkshop[];
  practiceData?: LocalPracticeData;
}

export interface LocalImportPreview {
  batchId: string;
  sourceFingerprint: string;
  structured: {
    savedLanguageCards: number;
    courseProgress: number;
    practices: number;
    cycles: number;
    observations: number;
    sundayDecisions: number;
  };
  localOnlyFreeText: {
    reflections: number;
    sundayReports: number;
  };
  requiresActivePracticeChoice: boolean;
  payload: Json;
}

export interface ServerExportPayload {
  exportedAt: string;
  accountState: AccountState;
  tables: {
    profile: Tables<'profiles'> | null;
    accountDeletionRequests: Tables<'account_deletion_requests'>[];
    courseEntitlements: Tables<'course_entitlements'>[];
    depotEntitlements: Tables<'depot_entitlements'>[];
    courseProgress: Tables<'course_progress'>[];
    savedLanguageCards: Tables<'saved_language_cards'>[];
    practices: Tables<'practices'>[];
    practiceCycles: Tables<'practice_cycles'>[];
    observations: Tables<'observations'>[];
    observationNotes: Tables<'observation_notes'>[];
    sundayDecisions: Tables<'sunday_decisions'>[];
    sundayNotes: Tables<'sunday_notes'>[];
    deviceImports: Tables<'device_imports'>[];
  };
}

export type StructuredQueueOperation =
  | {
      id: string;
      kind: 'course_progress_upsert';
      payload: Database['public']['Tables']['course_progress']['Insert'];
    }
  | {
      id: string;
      kind: 'saved_language_card_upsert';
      payload: Database['public']['Tables']['saved_language_cards']['Insert'];
    }
  | {
      id: string;
      kind: 'local_practice_import';
      payload: { batchId: string; data: Json };
    };

export type QueuedOperation = StructuredQueueOperation & {
  attempts: number;
  nextAttemptAt: number;
  lastError: string | null;
};

export interface QueueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const QUEUE_KEY = 'depoet_structured_sync_queue_v1';
export const SERVER_EXPORT_TABLE_NAMES = [
  'profiles',
  'account_deletion_requests',
  'course_entitlements',
  'depot_entitlements',
  'course_progress',
  'saved_language_cards',
  'practices',
  'practice_cycles',
  'observations',
  'observation_notes',
  'sunday_decisions',
  'sunday_notes',
  'device_imports',
] as const;
const COURSE_BY_MODULE_PREFIX: Record<string, string> = {
  gratis: 'gratis-inngang',
  start: 'startkurs',
  hoved: 'førersetet-hoved',
  skjerm: 'skjerm-uten-krig',
  smeller: 'minikurs-naar-det-smeller',
  legging: 'minikurs-legging-morgen-overganger',
  forskjellig: 'minikurs-staa-forskjellig',
  skole: 'minikurs-skolesamarbeid',
  redd: 'minikurs-redd-miste-barnet',
};

function messageOf(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error && 'message' in error) return String(error.message);
  return 'Ukjent synkroniseringsfeil.';
}

function isJsonObject(value: Json): value is { [key: string]: Json | undefined } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseAccountState(value: Json | null): AccountState {
  const data = value && isJsonObject(value) ? value : {};
  const state = typeof data.state === 'string' ? data.state : 'read_only';
  const allowed: DepotAccessState[] = [
    'guest',
    'unclaimed',
    'eligible_to_activate',
    'active',
    'grace',
    'read_only',
    'locked',
  ];
  return {
    state: allowed.includes(state as DepotAccessState) ? (state as DepotAccessState) : 'read_only',
    activatedAt: typeof data.activatedAt === 'string' ? data.activatedAt : null,
    activeUntil: typeof data.activeUntil === 'string' ? data.activeUntil : null,
    graceUntil: typeof data.graceUntil === 'string' ? data.graceUntil : null,
    deletionExecuteAfter:
      typeof data.deletionExecuteAfter === 'string' ? data.deletionExecuteAfter : null,
  };
}

function courseIdForModule(moduleId: string): string {
  return COURSE_BY_MODULE_PREFIX[moduleId.split('-')[0]] ?? 'ukjent-kurs';
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return (
      '{' +
      Object.keys(record)
        .sort()
        .map((key) => JSON.stringify(key) + ':' + stableStringify(record[key]))
        .join(',') +
      '}'
    );
  }
  return JSON.stringify(value);
}

async function fingerprint(value: unknown): Promise<string> {
  const input = new TextEncoder().encode(stableStringify(value));
  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', input);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  let hash = 2166136261;
  for (const byte of input) {
    hash ^= byte;
    hash = Math.imul(hash, 16777619);
  }
  return 'fnv1a-' + (hash >>> 0).toString(16).padStart(8, '0');
}

function createBatchId(): string {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return '00000000-0000-4000-8000-' + Date.now().toString(16).padStart(12, '0').slice(-12);
}

export function accountCapabilities(state: DepotAccessState): {
  canSyncStructured: boolean;
  canWritePractice: boolean;
  canImportPractice: boolean;
  canCancelDeletion: boolean;
  isReadOnly: boolean;
  keepLocalData: true;
} {
  return {
    canSyncStructured: !['guest', 'unclaimed', 'locked'].includes(state),
    canWritePractice: state === 'active' || state === 'grace',
    canImportPractice: state === 'active' || state === 'eligible_to_activate',
    canCancelDeletion: state === 'locked',
    isReadOnly: state === 'read_only' || state === 'locked',
    keepLocalData: true,
  };
}

export class StructuredSyncQueue {
  constructor(
    private readonly storage: QueueStorage,
    private readonly key = QUEUE_KEY,
  ) {}

  list(): QueuedOperation[] {
    try {
      const parsed = JSON.parse(this.storage.getItem(this.key) ?? '[]');
      return Array.isArray(parsed) ? (parsed as QueuedOperation[]) : [];
    } catch {
      return [];
    }
  }

  enqueue(operation: StructuredQueueOperation): void {
    const existing = this.list();
    if (existing.some((item) => item.id === operation.id)) return;
    this.save([...existing, { ...operation, attempts: 0, nextAttemptAt: 0, lastError: null }]);
  }

  async run(
    execute: (operation: StructuredQueueOperation) => Promise<void>,
    now = Date.now(),
  ): Promise<{ completed: number; pending: number }> {
    const remaining: QueuedOperation[] = [];
    let completed = 0;
    for (const item of this.list()) {
      if (item.nextAttemptAt > now) {
        remaining.push(item);
        continue;
      }
      try {
        await execute(item);
        completed += 1;
      } catch (error) {
        const attempts = item.attempts + 1;
        remaining.push({
          ...item,
          attempts,
          nextAttemptAt: now + Math.min(60_000, 1_000 * 2 ** Math.min(attempts, 6)),
          lastError: messageOf(error),
        });
      }
    }
    this.save(remaining);
    return { completed, pending: remaining.length };
  }

  private save(queue: QueuedOperation[]): void {
    this.storage.setItem(this.key, JSON.stringify(queue));
  }
}

export function requestMagicLink(email: string): Promise<{ ok: boolean; message: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Promise.resolve({ ok: false, message: 'Innlogging er ikke konfigurert ennå.' });
  }
  return supabase.auth
    .signInWithOtp({ email, options: { emailRedirectTo: getAuthCallbackUrl() } })
    .then(({ error }) =>
      error
        ? { ok: false, message: error.message }
        : { ok: true, message: 'Sjekk e-posten din for engangskoden eller den sikre lenken.' },
    );
}

export async function verifyEmailOtp(
  email: string,
  code: string,
): Promise<EmailOtpVerificationResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { ok: false, message: 'Innlogging er ikke konfigurert ennå.', session: null };
  }
  return verifyEmailOtpWith((params) => supabase.auth.verifyOtp(params), email, code);
}

export async function signOut(): Promise<void> {
  await getSupabaseClient()?.auth.signOut();
}

type AccountRpcClient = Pick<SupabaseClient<Database>, 'rpc'>;

export async function getAccountState(
  supabase: AccountRpcClient | null = getSupabaseClient(),
): Promise<AccountState> {
  if (!supabase) return parseAccountState({ state: 'guest' });
  const { data, error } = await supabase.rpc('get_account_state');
  if (error) throw error;
  return parseAccountState(data);
}

export async function buildLocalImportPreview(
  snapshot: LocalDepotSnapshot,
  options: {
    cloudHasActivePractice?: boolean;
    reflectionCount?: number;
    batchId?: string;
  } = {},
): Promise<LocalImportPreview> {
  const practiceData = snapshot.practiceData ?? {
    practices: [],
    cycles: [],
    observations: [],
    sundayDecisions: [],
  };
  const structuredSource = {
    schemaVersion: 1,
    practices: practiceData.practices,
    cycles: practiceData.cycles,
    observations: practiceData.observations,
    sundayDecisions: practiceData.sundayDecisions,
    activeConflictChoice: practiceData.activeConflictChoice,
  };
  const sourceFingerprint = await fingerprint(structuredSource);
  const hasLocalActive = practiceData.practices.some(
    (item) => isJsonObject(item) && item.status === 'active',
  );
  return {
    batchId: options.batchId ?? createBatchId(),
    sourceFingerprint,
    structured: {
      savedLanguageCards: snapshot.user.savedCards.length,
      courseProgress: snapshot.user.completedModules.length,
      practices: practiceData.practices.length,
      cycles: practiceData.cycles.length,
      observations: practiceData.observations.length,
      sundayDecisions: practiceData.sundayDecisions.length,
    },
    localOnlyFreeText: {
      reflections: options.reflectionCount ?? 0,
      sundayReports: snapshot.sundayReports.length,
    },
    requiresActivePracticeChoice: Boolean(options.cloudHasActivePractice && hasLocalActive),
    payload: { ...structuredSource, sourceFingerprint },
  };
}

async function executeQueueOperation(operation: StructuredQueueOperation): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Backend er ikke konfigurert.');
  if (operation.kind === 'course_progress_upsert') {
    const { error } = await supabase
      .from('course_progress')
      .upsert(operation.payload, { onConflict: 'user_id,course_id,module_id' });
    if (error) throw error;
    return;
  }
  if (operation.kind === 'saved_language_card_upsert') {
    const { error } = await supabase
      .from('saved_language_cards')
      .upsert(operation.payload, { onConflict: 'user_id,card_id' });
    if (error) throw error;
    return;
  }
  const { error } = await supabase.rpc('import_local_practice_batch', {
    p_batch_id: operation.payload.batchId,
    p_payload: operation.payload.data,
  });
  if (error) throw error;
}

export async function syncLocalDepotToSupabase(
  session: Session,
  snapshot: LocalDepotSnapshot,
  storage: QueueStorage = window.localStorage,
): Promise<{ ok: boolean; message: string; pending: number }> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, message: 'Backend er ikke konfigurert.', pending: 0 };
  try {
    const { error: profileError } = await supabase.rpc('ensure_profile');
    if (profileError) throw profileError;
    const state = await getAccountState();
    if (state.state === 'locked') {
      return {
        ok: false,
        message: 'Kontoen er låst mens sletteforespørselen behandles.',
        pending: 0,
      };
    }
    const userId = session.user.id;
    if (snapshot.user.name.trim()) {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: snapshot.user.name.trim() })
        .eq('user_id', userId);
      if (error) throw error;
    }
    const queue = new StructuredSyncQueue(storage);
    for (const moduleId of snapshot.user.completedModules) {
      const courseId = courseIdForModule(moduleId);
      queue.enqueue({
        id: 'progress:' + userId + ':' + courseId + ':' + moduleId,
        kind: 'course_progress_upsert',
        payload: { user_id: userId, course_id: courseId, module_id: moduleId },
      });
    }
    for (const cardId of snapshot.user.savedCards) {
      queue.enqueue({
        id: 'card:' + userId + ':' + cardId,
        kind: 'saved_language_card_upsert',
        payload: { user_id: userId, card_id: cardId, content_version: 1 },
      });
    }
    const result = await queue.run(executeQueueOperation);
    return result.pending > 0
      ? {
          ok: false,
          pending: result.pending,
          message:
            'Noe strukturert data venter trygt i kø og prøves igjen. Fritekst ble værende lokalt.',
        }
      : {
          ok: true,
          pending: 0,
          message: 'Strukturert data er synkronisert. Fritekst ble værende lokalt.',
        };
  } catch (error) {
    return { ok: false, message: messageOf(error), pending: 0 };
  }
}

export async function importLocalDeviceData(
  preview: LocalImportPreview,
  approved: boolean,
  storage: QueueStorage = window.localStorage,
): Promise<{ ok: boolean; message: string }> {
  if (!approved) return { ok: false, message: 'Importen ble ikke godkjent.' };
  if (preview.requiresActivePracticeChoice) {
    return {
      ok: false,
      message: 'Velg hvilken aktive øvelse som skal beholdes før importen kan fortsette.',
    };
  }
  const totalRows =
    preview.structured.practices +
    preview.structured.cycles +
    preview.structured.observations +
    preview.structured.sundayDecisions;
  if (totalRows === 0) {
    return { ok: true, message: 'Ingen lokal øvingshistorikk trengte import.' };
  }
  const state = await getAccountState();
  if (!['active', 'eligible_to_activate'].includes(state.state)) {
    return {
      ok: false,
      message: 'Lokal øvingshistorikk kan importeres når pilot- eller Depoet-tilgang er aktiv.',
    };
  }
  const queue = new StructuredSyncQueue(storage);
  queue.enqueue({
    id: 'import:' + preview.batchId,
    kind: 'local_practice_import',
    payload: { batchId: preview.batchId, data: preview.payload },
  });
  const result = await queue.run(executeQueueOperation);
  return result.pending > 0
    ? {
        ok: false,
        message: 'Importen ligger trygt i kø og fortsetter når nettverket er tilbake.',
      }
    : {
        ok: true,
        message: 'Lokal strukturert øvingshistorikk er importert. Fritekst ble ikke sendt.',
      };
}

function throwFirstError(results: Array<{ error: unknown }>): void {
  const failed = results.find((result) => result.error);
  if (failed) throw failed.error;
}

export async function exportServerData(session: Session): Promise<ServerExportPayload | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const userId = session.user.id;
  const results = await Promise.all([
    supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('account_deletion_requests').select('*').eq('user_id', userId),
    supabase.from('course_entitlements').select('*').eq('user_id', userId),
    supabase.from('depot_entitlements').select('*').eq('user_id', userId),
    supabase.from('course_progress').select('*').eq('user_id', userId),
    supabase.from('saved_language_cards').select('*').eq('user_id', userId),
    supabase.from('practices').select('*').eq('user_id', userId),
    supabase.from('practice_cycles').select('*').eq('user_id', userId),
    supabase.from('observations').select('*').eq('user_id', userId),
    supabase.from('observation_notes').select('*').eq('user_id', userId),
    supabase.from('sunday_decisions').select('*').eq('user_id', userId),
    supabase.from('sunday_notes').select('*').eq('user_id', userId),
    supabase.from('device_imports').select('*').eq('user_id', userId),
  ]);
  throwFirstError(results);
  return {
    exportedAt: new Date().toISOString(),
    accountState: await getAccountState(),
    tables: {
      profile: (results[0].data as Tables<'profiles'> | null) ?? null,
      accountDeletionRequests: (results[1].data as Tables<'account_deletion_requests'>[]) ?? [],
      courseEntitlements: (results[2].data as Tables<'course_entitlements'>[]) ?? [],
      depotEntitlements: (results[3].data as Tables<'depot_entitlements'>[]) ?? [],
      courseProgress: (results[4].data as Tables<'course_progress'>[]) ?? [],
      savedLanguageCards: (results[5].data as Tables<'saved_language_cards'>[]) ?? [],
      practices: (results[6].data as Tables<'practices'>[]) ?? [],
      practiceCycles: (results[7].data as Tables<'practice_cycles'>[]) ?? [],
      observations: (results[8].data as Tables<'observations'>[]) ?? [],
      observationNotes: (results[9].data as Tables<'observation_notes'>[]) ?? [],
      sundayDecisions: (results[10].data as Tables<'sunday_decisions'>[]) ?? [],
      sundayNotes: (results[11].data as Tables<'sunday_notes'>[]) ?? [],
      deviceImports: (results[12].data as Tables<'device_imports'>[]) ?? [],
    },
  };
}

export async function requestAccountDeletion(
  supabase: AccountRpcClient | null = getSupabaseClient(),
): Promise<{
  ok: boolean;
  message: string;
  state: AccountState | null;
}> {
  if (!supabase) return { ok: false, message: 'Backend er ikke konfigurert.', state: null };
  const { data, error } = await supabase.rpc('request_account_deletion');
  if (error) return { ok: false, message: error.message, state: null };
  return {
    ok: true,
    message:
      'Sletteforespørselen er registrert. Kontoen er låst i syv dager og kan kanselleres før fristen.',
    state: parseAccountState(data),
  };
}

export async function cancelAccountDeletion(
  supabase: AccountRpcClient | null = getSupabaseClient(),
): Promise<{
  ok: boolean;
  message: string;
  state: AccountState | null;
}> {
  if (!supabase) return { ok: false, message: 'Backend er ikke konfigurert.', state: null };
  const { error } = await supabase.rpc('cancel_account_deletion');
  if (error) return { ok: false, message: error.message, state: null };
  return { ok: true, message: 'Sletteforespørselen er kansellert.', state: await getAccountState(supabase) };
}
