import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client.
 *
 * Used from Server Components, Route Handlers, and Server Actions.
 * Reads the public anon key; row-level security on the Supabase side
 * decides what is actually allowed.
 */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // called from a Server Component — safe to ignore
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // ignore
        }
      },
    },
  });
}

/**
 * Service-role client. Use only inside trusted server contexts
 * (route handlers, cron jobs) where bypassing RLS is intentional.
 */
export function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !service) return null;

  return createServerClient(url, service, {
    cookies: {
      get: () => undefined,
      set: () => {},
      remove: () => {},
    },
  });
}
