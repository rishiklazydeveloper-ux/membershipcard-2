import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gehaufomlusythrmjzxe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaGF1Zm9tbHVzeXRocm1qenhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MDUzNTMsImV4cCI6MjEwMjk4MTM1M30.Epi-WAWl0oNzceFlAsH3X_FOaCFN9n_OLwjrIsADocg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
