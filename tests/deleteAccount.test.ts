import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DRY_RUN_HEADER,
  DRY_RUN_VALUE,
  EDGE_SECRET_NAME,
  SecretKeyConfigurationError,
  createDeleteAccountHandler,
  createSecretKeyFetch,
  parseNamedSecretKey,
  type DeleteAccountOperations,
} from '../supabase/functions/delete-account/handler';

const TEST_SECRET_KEY = ['sb', 'secret', 'test-only-value'].join('_');
const TEST_JOB_SECRET = 'test-job-secret';

function readJson(response: Response): Promise<Record<string, unknown>> {
  return response.json() as Promise<Record<string, unknown>>;
}

test('bruker det eksakte Supabase-navnet for delete-account-secret', () => {
  assert.equal(EDGE_SECRET_NAME, 'edge_delete_account');
});

function runtime(overrides: {
  env?: Record<string, string | undefined>;
  operations?: Partial<DeleteAccountOperations>;
  onCreateOperations?: () => void;
} = {}) {
  const env = {
    DELETE_JOB_SECRET: TEST_JOB_SECRET,
    SUPABASE_URL: 'https://example.supabase.co',
    SUPABASE_SECRET_KEYS: JSON.stringify({ [EDGE_SECRET_NAME]: TEST_SECRET_KEY }),
    ...overrides.env,
  };
  const operations: DeleteAccountOperations = {
    readDatabaseState: async () => 2,
    readAuthAdminState: async () => 3,
    executeDueDeletions: async () => ({ inspected: 0, deleted: 0, failed: 0 }),
    ...overrides.operations,
  };

  return {
    getEnv: (name: string) => env[name as keyof typeof env],
    createOperations: () => {
      overrides.onCreateOperations?.();
      return operations;
    },
  };
}

test('parser eksakt navngitt secret key fra SUPABASE_SECRET_KEYS', () => {
  const raw = JSON.stringify({
    default: ['sb', 'secret', 'other'].join('_'),
    [EDGE_SECRET_NAME]: TEST_SECRET_KEY,
  });
  assert.equal(parseNamedSecretKey(raw), TEST_SECRET_KEY);
});

test('parser avviser manglende navngitt key', () => {
  assert.throws(
    () => parseNamedSecretKey(JSON.stringify({ default: ['sb', 'secret', 'other'].join('_') })),
    (error) =>
      error instanceof SecretKeyConfigurationError && error.code === 'named_secret_key_missing',
  );
});

test('parser avviser ugyldig JSON og ugyldig key-format', () => {
  assert.throws(
    () => parseNamedSecretKey('{not-json'),
    (error) =>
      error instanceof SecretKeyConfigurationError &&
      error.code === 'secret_key_dictionary_invalid_json',
  );
  assert.throws(
    () => parseNamedSecretKey(JSON.stringify({ [EDGE_SECRET_NAME]: 'legacy-or-invalid' })),
    (error) =>
      error instanceof SecretKeyConfigurationError && error.code === 'named_secret_key_invalid',
  );
});

test('manglende eller feil DELETE_JOB_SECRET avvises før admin-klienten opprettes', async () => {
  let createCalls = 0;
  const missingHandler = createDeleteAccountHandler(
    runtime({ env: { DELETE_JOB_SECRET: undefined }, onCreateOperations: () => createCalls++ }),
  );
  const wrongHandler = createDeleteAccountHandler(
    runtime({ onCreateOperations: () => createCalls++ }),
  );

  const missing = await missingHandler(new Request('https://example.test', { method: 'POST' }));
  const wrong = await wrongHandler(
    new Request('https://example.test', {
      method: 'POST',
      headers: { 'x-depot-job-secret': 'wrong' },
    }),
  );

  assert.equal(missing.status, 401);
  assert.equal(wrong.status, 401);
  assert.equal(createCalls, 0);
});

test('dry-run verifiserer lesetilgang to ganger uten å kalle slettemutatoren', async () => {
  let databaseReads = 0;
  let authReads = 0;
  let mutationCalls = 0;
  const handler = createDeleteAccountHandler(
    runtime({
      operations: {
        readDatabaseState: async () => {
          databaseReads += 1;
          return 2;
        },
        readAuthAdminState: async () => {
          authReads += 1;
          return 3;
        },
        executeDueDeletions: async () => {
          mutationCalls += 1;
          return { inspected: 0, deleted: 0, failed: 0 };
        },
      },
    }),
  );

  const response = await handler(
    new Request('https://example.test', {
      method: 'POST',
      headers: {
        'x-depot-job-secret': TEST_JOB_SECRET,
        [DRY_RUN_HEADER]: DRY_RUN_VALUE,
      },
    }),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await readJson(response), {
    mode: DRY_RUN_VALUE,
    database_access_verified: true,
    auth_admin_access_verified: true,
    state_unchanged: true,
  });
  assert.equal(databaseReads, 2);
  assert.equal(authReads, 2);
  assert.equal(mutationCalls, 0);
});

test('dry-run stopper dersom sanitert før-/ettertilstand avviker', async () => {
  let databaseReads = 0;
  const handler = createDeleteAccountHandler(
    runtime({
      operations: {
        readDatabaseState: async () => ++databaseReads,
      },
    }),
  );

  const response = await handler(
    new Request('https://example.test', {
      method: 'POST',
      headers: {
        'x-depot-job-secret': TEST_JOB_SECRET,
        [DRY_RUN_HEADER]: DRY_RUN_VALUE,
      },
    }),
  );

  assert.equal(response.status, 409);
  assert.equal((await readJson(response)).state_unchanged, false);
});

test('secret-key fetch bruker apikey og fjerner bare matching Bearer-secret', async () => {
  let capturedHeaders = new Headers();
  const baseFetch: typeof fetch = async (_input, init) => {
    capturedHeaders = new Headers(init?.headers);
    return new Response(null, { status: 204 });
  };
  const secretFetch = createSecretKeyFetch(TEST_SECRET_KEY, baseFetch);

  await secretFetch('https://example.supabase.co/rest/v1/test', {
    headers: { Authorization: `Bearer ${TEST_SECRET_KEY}` },
  });

  assert.equal(capturedHeaders.get('authorization'), null);
  assert.equal(capturedHeaders.get('apikey'), TEST_SECRET_KEY);
});
