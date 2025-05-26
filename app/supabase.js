import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cnstdqqdvaqcimespueu.supabase.co";
const supaBaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuc3RkcXFkdmFxY2ltZXNwdWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTQzNzQsImV4cCI6MjA2Mzg3MDM3NH0.QcvOjctDOJNyDbLiiDs7MEyXxhf8i0HoJCGerQdQbEQ";

export const supabase = createClient(supabaseUrl, supaBaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
});