import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = (url: string, key: string) => {
  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};

export type SupabaseClient = ReturnType<typeof createSupabaseClient>;
