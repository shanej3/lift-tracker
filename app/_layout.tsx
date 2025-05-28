import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { supabase } from "./supabase";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initAuth() {
      try {
        let { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (!session) {
          const { data, error: signInError } = await supabase.auth.signInAnonymously();
          if (signInError) throw signInError;

          ({ data: { session }, error } = await supabase.auth.getSession());
          if (error) throw error;
        }

        if (!session) {
          throw new Error("Failed to get session after sign-in");
        }

        console.log("User signed in with ID:", session.user.id);
      } catch (err: unknown) {
        let errorMessage = "Unknown error";

        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }

        console.error("Auth initialization error:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  if (loading) return <Text>Loading auth...</Text>;

  if (error) return <Text>Error initializing auth: {error}</Text>;

  return <Stack />;
}
