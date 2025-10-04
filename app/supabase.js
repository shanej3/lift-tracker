import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import uuid from 'react-native-uuid';


// this URL and key are fine to share publicly, since I setup row level security (RLS)
const supabaseUrl = "https://ukblgteyznwsximxcepw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrYmxndGV5em53c3hpbXhjZXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDU2MjgsImV4cCI6MjA3NTE4MTYyOH0.gt9wnQZVCCn0iFHWpu3DqCXvqgYlFXNnxSCCLCYpkeI";



export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export function generateUUID() {
    return uuid.v4();
}

export async function signInAnonymously() {
  const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error('Sign-in error', error);
      return null
    }
    return data.user;
  }

export async function getCurrentUserID() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching current user ID:', error);
    return null;
  }
  return user?.id ?? null;
}
