export const EDGE_SECRET_NAME = 'edge_delete_account';
export const DRY_RUN_HEADER = 'x-depot-job-mode';
export const DRY_RUN_VALUE = 'dry-run';

const SECRET_KEY_PATTERN = /^sb_secret_[A-Za-z0-9._-]+$/;
const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
} as const;

export type StateMarker = string | number;

export interface DeleteAccountResult {
  inspected: number;
  deleted: number;
  failed: number;
}

export interface DeleteAccountOperations {
  readDatabaseState(): Promise<StateMarker>;
  readAuthAdminState(): Promise<StateMarker>;
  executeDueDeletions(): Promise<DeleteAccountResult>;
}

export interface DeleteAccountRuntime {
  getEnv(name: string): string | undefined;
  createOperations(supabaseUrl: string, secretKey: string): DeleteAccountOperations;
}

export class SecretKeyConfigurationError extends Error {
  constructor(readonly code: string) {
    super(code);
    this.name = 'SecretKeyConfigurationError';
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });
}

export function parseNamedSecretKey(
  rawDictionary: string | undefined,
  keyName = EDGE_SECRET_NAME,
): string {
  if (!rawDictionary?.trim()) {
    throw new SecretKeyConfigurationError('secret_key_dictionary_missing');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawDictionary);
  } catch {
    throw new SecretKeyConfigurationError('secret_key_dictionary_invalid_json');
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new SecretKeyConfigurationError('secret_key_dictionary_invalid_shape');
  }

  const candidate = (parsed as Record<string, unknown>)[keyName];
  if (typeof candidate !== 'string' || !candidate.trim()) {
    throw new SecretKeyConfigurationError('named_secret_key_missing');
  }

  const secretKey = candidate.trim();
  if (!SECRET_KEY_PATTERN.test(secretKey)) {
    throw new SecretKeyConfigurationError('named_secret_key_invalid');
  }

  return secretKey;
}

export function constantTimeEqual(left: string, right: string): boolean {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference |= a[index] ^ b[index];
  return difference === 0;
}

export function createSecretKeyFetch(
  secretKey: string,
  baseFetch: typeof fetch = fetch,
): typeof fetch {
  return async (input, init) => {
    const headers = new Headers(init?.headers);
    if (headers.get('authorization') === `Bearer ${secretKey}`) {
      headers.delete('authorization');
    }
    if (!headers.has('apikey')) headers.set('apikey', secretKey);
    return baseFetch(input, { ...init, headers });
  };
}

async function runDryRun(operations: DeleteAccountOperations): Promise<Response> {
  let databaseBefore: StateMarker;
  let authBefore: StateMarker;
  let databaseAfter: StateMarker;
  let authAfter: StateMarker;

  try {
    databaseBefore = await operations.readDatabaseState();
  } catch {
    return json(
      {
        error: 'dry_run_database_access_failed',
        database_access_verified: false,
        auth_admin_access_verified: false,
        state_unchanged: false,
      },
      500,
    );
  }

  try {
    authBefore = await operations.readAuthAdminState();
  } catch {
    return json(
      {
        error: 'dry_run_auth_admin_access_failed',
        database_access_verified: true,
        auth_admin_access_verified: false,
        state_unchanged: false,
      },
      500,
    );
  }

  try {
    databaseAfter = await operations.readDatabaseState();
  } catch {
    return json(
      {
        error: 'dry_run_database_after_check_failed',
        database_access_verified: false,
        auth_admin_access_verified: true,
        state_unchanged: false,
      },
      500,
    );
  }

  try {
    authAfter = await operations.readAuthAdminState();
  } catch {
    return json(
      {
        error: 'dry_run_auth_admin_after_check_failed',
        database_access_verified: true,
        auth_admin_access_verified: false,
        state_unchanged: false,
      },
      500,
    );
  }

  const stateUnchanged =
    Object.is(databaseBefore, databaseAfter) && Object.is(authBefore, authAfter);

  return json(
    {
      mode: DRY_RUN_VALUE,
      database_access_verified: true,
      auth_admin_access_verified: true,
      state_unchanged: stateUnchanged,
    },
    stateUnchanged ? 200 : 409,
  );
}

export function createDeleteAccountHandler(runtime: DeleteAccountRuntime) {
  return async (request: Request): Promise<Response> => {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const expectedSecret = runtime.getEnv('DELETE_JOB_SECRET');
    const suppliedSecret = request.headers.get('x-depot-job-secret') ?? '';
    if (!expectedSecret || !constantTimeEqual(suppliedSecret, expectedSecret)) {
      return new Response('Unauthorized', { status: 401 });
    }

    const supabaseUrl = runtime.getEnv('SUPABASE_URL')?.trim();
    let secretKey: string;
    try {
      secretKey = parseNamedSecretKey(runtime.getEnv('SUPABASE_SECRET_KEYS'));
    } catch {
      return json({ error: 'server_configuration_missing' }, 500);
    }

    if (!supabaseUrl) {
      return json({ error: 'server_configuration_missing' }, 500);
    }

    const operations = runtime.createOperations(supabaseUrl, secretKey);
    if (request.headers.get(DRY_RUN_HEADER) === DRY_RUN_VALUE) {
      return runDryRun(operations);
    }

    try {
      return json(await operations.executeDueDeletions());
    } catch {
      return json({ error: 'due_requests_unavailable' }, 500);
    }
  };
}
