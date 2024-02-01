"use client";

import { useSupabase } from "@/app/supabase-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getURL } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthUI() {
  const { supabase } = useSupabase();
  return (
    <Card className='w-full m-auto py-4'>
      <CardHeader>
        <CardTitle>Sign in to Brainwave</CardTitle>
        <CardDescription>
          Securely sign in to your account to access personalized features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          redirectTo={`${getURL()}/auth/callback`}
          // magicLink={true}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#3D72ED",
                  brandAccent: "#3D72ED",
                },
              },
            },
          }}
          // theme='dark'
        />
      </CardContent>
    </Card>
  );
}
