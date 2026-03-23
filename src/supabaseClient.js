import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ttyhccwbmeelllgdphpn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0eWhjY3dibWVlbGxsZ2RwaHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1Nzg3NzEsImV4cCI6MjA4OTE1NDc3MX0.KhFsdEzIPCeUHv8Juwey5CMUpW5m6i-yV1LlHc07s68";

export const supabase = createClient(supabaseUrl, supabaseKey);