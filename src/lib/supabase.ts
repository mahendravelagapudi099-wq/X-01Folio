import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ujbecwnuzrpijvjffcun.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYmVjd251enJwaWp2amZmY3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NTU1MTUsImV4cCI6MjEwMTIzMTUxNX0.eWdBZxkN3kPgoewusxkWEbGm-wjO0p-yAx0Fi6r_tmQ';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
