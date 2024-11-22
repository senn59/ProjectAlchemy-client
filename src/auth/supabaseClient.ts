import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zdnggqjkhsxotyfwhxvn.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbmdncWpraHN4b3R5ZndoeHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyOTA3MjAsImV4cCI6MjA0Nzg2NjcyMH0.1EbKVU_ORGFwvrOjz-B43wymndoVHcN5iuH7NqF69Z4";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
