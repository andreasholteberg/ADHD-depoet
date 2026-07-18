import assert from 'node:assert/strict';
import test from 'node:test';
import {
  StructuredSyncQueue,
  accountCapabilities,
  buildLocalImportPreview,
  cancelAccountDeletion,
  requestAccountDeletion,
  SERVER_EXPORT_TABLE_NAMES,
  type QueueStorage,
} from '../src/lib/syncService';
import { PUBLIC_COURSES } from '../src/data/publicCourses';
import {
  catalogForEntitlements,
  coursesForEntitlements,
} from '../server/content/courses.v1';
import type { User } from '../src/types';
import type { Database, Json } from '../src/lib/database.generated';
import type { SupabaseClient } from '@supabase/supabase-js';

class MemoryStorage implements QueueStorage {
  private values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

function user(overrides: Partial<User> = {}): User {
  return {
    id: 'local-parent',
    name: 'Forelder',
    onboardingAnswers: null,
    selectedWeeklyGoal: null,
    currentFocus: null,
    savedCards: [],
    completedModules: [],
    lastActiveAt: '2026-07-18T10:00:00.000Z',
    wantsDailyReminder: false,
    isAnonymous: true,
    syncConsent: null,
    freeTextSyncConsent: null,
    ...overrides,
  };
}

test('tom ny konto gir en tom, eksplisitt importforhåndsvisning', async () => {
  const preview = await buildLocalImportPreview(
    { user: user(), sundayReports: [] },
    { batchId: '00000000-0000-4000-8000-000000000001' },
  );
  assert.equal(Object.values(preview.structured).reduce((sum, value) => sum + value, 0), 0);
  assert.deepEqual(preview.localOnlyFreeText, { reflections: 0, sundayReports: 0 });
});

test('lokal bruker uten konto får strukturert data skilt fra fritekst', async () => {
  const preview = await buildLocalImportPreview(
    {
      user: user({
        savedCards: ['kort-1'],
        completedModules: ['gratis-1'],
      }),
      sundayReports: [
        {
          id: 'rapport-1',
          date: '2026-07-18T10:00:00.000Z',
          stateCheckIn: 'sliten',
          whatWasLighter: 'litt',
          whereWasTooMuch: ['morgen'],
          learning: 'fritekst skal bli lokalt',
          nextGoal: 'ett lite steg',
          whatToPutDown: 'perfeksjon',
          supportNeeded: 'ro',
        },
      ],
    },
    { reflectionCount: 2, batchId: '00000000-0000-4000-8000-000000000002' },
  );
  assert.equal(preview.structured.savedLanguageCards, 1);
  assert.equal(preview.structured.courseProgress, 1);
  assert.deepEqual(preview.localOnlyFreeText, { reflections: 2, sundayReports: 1 });
  assert.doesNotMatch(JSON.stringify(preview.payload), /fritekst skal bli lokalt/);
});

test('førstegangsimport har stabil fingerprint og eksplisitt batch-id', async () => {
  const snapshot = {
    user: user(),
    sundayReports: [],
    practiceData: {
      practices: [{ id: 'p1', status: 'retired' }],
      cycles: [],
      observations: [],
      sundayDecisions: [],
    },
  };
  const first = await buildLocalImportPreview(snapshot, {
    batchId: '00000000-0000-4000-8000-000000000003',
  });
  const second = await buildLocalImportPreview(snapshot, {
    batchId: '00000000-0000-4000-8000-000000000003',
  });
  assert.equal(first.sourceFingerprint, second.sourceFingerprint);
  assert.equal(first.batchId, second.batchId);
  assert.equal(first.structured.practices, 1);
});

test('vedvarende kø gjør retry uten duplikat', async () => {
  const storage = new MemoryStorage();
  const queue = new StructuredSyncQueue(storage);
  const operation = {
    id: 'card:user:kort-1',
    kind: 'saved_language_card_upsert' as const,
    payload: {
      user_id: '00000000-0000-4000-8000-000000000010',
      card_id: 'kort-1',
      content_version: 1,
    },
  };
  queue.enqueue(operation);
  queue.enqueue(operation);
  assert.equal(queue.list().length, 1);

  const failed = await queue.run(async () => {
    throw new Error('offline');
  }, 1_000);
  assert.equal(failed.pending, 1);
  assert.equal(queue.list()[0].attempts, 1);

  const recovered = await queue.run(async () => undefined, 10_000);
  assert.deepEqual(recovered, { completed: 1, pending: 0 });
  assert.equal(queue.list().length, 0);
});

test('to klientinstanser mot samme lokale kø beholder én operasjon', () => {
  const storage = new MemoryStorage();
  const firstClient = new StructuredSyncQueue(storage);
  const secondClient = new StructuredSyncQueue(storage);
  const operation = {
    id: 'progress:user:gratis-inngang:gratis-1',
    kind: 'course_progress_upsert' as const,
    payload: {
      user_id: '00000000-0000-4000-8000-000000000010',
      course_id: 'gratis-inngang',
      module_id: 'gratis-1',
    },
  };
  firstClient.enqueue(operation);
  secondClient.enqueue(operation);
  assert.equal(firstClient.list().length, 1);
  assert.equal(secondClient.list().length, 1);
});

test('aktiv, grace, read-only og låst konto har eksplisitte evner', () => {
  assert.deepEqual(accountCapabilities('active'), {
    canSyncStructured: true,
    canWritePractice: true,
    canImportPractice: true,
    canCancelDeletion: false,
    isReadOnly: false,
    keepLocalData: true,
  });
  assert.equal(accountCapabilities('grace').canWritePractice, true);
  assert.equal(accountCapabilities('grace').canImportPractice, false);
  assert.equal(accountCapabilities('read_only').isReadOnly, true);
  assert.equal(accountCapabilities('locked').canSyncStructured, false);
  assert.equal(accountCapabilities('locked').canCancelDeletion, true);
  assert.equal(accountCapabilities('locked').keepLocalData, true);
});

test('servereksporten dekker alle tretten live-tabeller', () => {
  assert.equal(SERVER_EXPORT_TABLE_NAMES.length, 13);
  assert.deepEqual(new Set(SERVER_EXPORT_TABLE_NAMES).size, 13);
  assert.ok(SERVER_EXPORT_TABLE_NAMES.includes('account_deletion_requests'));
  assert.ok(SERVER_EXPORT_TABLE_NAMES.includes('device_imports'));
});

test('sletteforespørsel bruker live RPC og returnerer låst tilstand', async () => {
  const calls: string[] = [];
  const client = {
    rpc: async (name: string) => {
      calls.push(name);
      return {
        data: {
          state: 'locked',
          deletionExecuteAfter: '2026-07-25T10:00:00.000Z',
        } as Json,
        error: null,
      };
    },
  } as unknown as Pick<SupabaseClient<Database>, 'rpc'>;

  const result = await requestAccountDeletion(client);
  assert.deepEqual(calls, ['request_account_deletion']);
  assert.equal(result.ok, true);
  assert.equal(result.state?.state, 'locked');
  assert.match(result.message, /syv dager/);
});

test('kansellering bruker live RPC og leser ny kontotilstand', async () => {
  const calls: string[] = [];
  const client = {
    rpc: async (name: string) => {
      calls.push(name);
      if (name === 'cancel_account_deletion') return { data: null, error: null };
      return { data: { state: 'active' } as Json, error: null };
    },
  } as unknown as Pick<SupabaseClient<Database>, 'rpc'>;

  const result = await cancelAccountDeletion(client);
  assert.deepEqual(calls, ['cancel_account_deletion', 'get_account_state']);
  assert.equal(result.ok, true);
  assert.equal(result.state?.state, 'active');
});

test('gratisinnhold er alltid tilgjengelig uten entitlement', () => {
  const courses = coursesForEntitlements(new Set());
  assert.deepEqual(courses.map((course) => course.id), ['gratis-inngang']);
  assert.equal(PUBLIC_COURSES[0].modules.length, 3);
  assert.equal(catalogForEntitlements(new Set()).find((course) => course.id === 'gratis-inngang')?.unlocked, true);
});

test('betalt innhold avvises uten entitlement og åpnes med begge pilot-entitlements', () => {
  const none = coursesForEntitlements(new Set());
  assert.equal(none.some((course) => course.id === 'startkurs'), false);

  const entitled = coursesForEntitlements(new Set(['startkurs', 'førersetet-hoved']));
  assert.deepEqual(
    entitled.map((course) => course.id),
    ['gratis-inngang', 'startkurs', 'førersetet-hoved'],
  );
  assert.equal(entitled.find((course) => course.id === 'startkurs')?.modules.length, 5);
  assert.equal(entitled.find((course) => course.id === 'førersetet-hoved')?.modules.length, 8);
});

test('minikurs er ikke del av første betalte bundle', () => {
  const courses = coursesForEntitlements(
    new Set(['startkurs', 'førersetet-hoved', 'minikurs-staa-forskjellig']),
  );
  assert.equal(courses.some((course) => course.id === 'minikurs-staa-forskjellig'), false);
  const catalogItem = catalogForEntitlements(new Set()).find(
    (course) => course.id === 'minikurs-staa-forskjellig',
  );
  assert.equal(catalogItem?.unlocked, false);
  assert.match(catalogItem?.description ?? '', /Depoet-minikurs/);
});
