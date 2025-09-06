import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://pjdcaohwdvezyhqysnzl.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqZGNhb2h3ZHZlenlocXlzbnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNzkyOTcsImV4cCI6MjA3Mjc1NTI5N30.QqzNgBQm_vbBWEjnGnGMBtNKCKnzCMm7d9B2PLg0FP0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
