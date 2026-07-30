import { type Session, type SupabaseClient } from '@supabase/supabase-js';
import { appConfig } from './config';
import type { Database } from './database.generated';

/**
 * Supabase-klienten lastes dynamisk.
 *
 * Biblioteket er rundt 210 kB. Statisk importert ble det liggende i
 * hovedbundelen og måtte lastes ferdig før noe som helst kunne vises —
 * også for besøkende som bare leser landingssiden og aldri logger inn.
 * Nå hentes det først når noe faktisk trenger en konto.
 *
 * `import` av typer over er ren typeinformasjon og forsvinner ved bygg.
 * Det er bare `createClient` som drar med seg kode, og den er flyttet
 * inn i den dynamiske importen under.
 */
let clientPromise: Promise<SupabaseClient<Database> | null> | null = null;

/**
 * Hent klienten. Returnerer null når bygget kjører uten backend.
 *
 * Kallet er asynkront fordi biblioteket hentes over nettet første gang.
 * Etterfølgende kall løser seg fra samme promise uten ny nedlasting.
 */
export function getSupabaseClient(): Promise<SupabaseClient<Database> | null> {
  if (!appConfig.backendEnabled) return Promise.resolve(null);

  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js')
      .then(({ createClient }) =>
        createClient<Database>(appConfig.supabaseUrl, appConfig.supabasePublishableKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
          },
        }),
      )
      .catch((error) => {
        // Nullstill slik at et nytt forsøk er mulig hvis nettet svikter
        // midt i innlasting. Uten dette ville én feilet import låst
        // kontofunksjonene ute for resten av økten.
        clientPromise = null;
        console.error('Kunne ikke laste Supabase-klienten:', error);
        return null;
      });
  }

  return clientPromise;
}

export async function getCurrentSession(): Promise<Session | null> {
  const supabase = await getSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}
