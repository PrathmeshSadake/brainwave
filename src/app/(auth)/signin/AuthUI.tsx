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
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AuthUI() {
  const { supabase } = useSupabase();

  return (
    <Card className='w-full m-auto py-4'>
      <CardHeader>
        <CardTitle>Sign in to Quizmify</CardTitle>
        <CardDescription>
          Securely sign in to your account to access personalized features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          redirectTo={`${getURL()}/auth/callback`}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                fontFamily: poppins.style.fontFamily,
              },
              label: {
                fontFamily: poppins.style.fontFamily,
              },
              input: {
                fontFamily: poppins.style.fontFamily,
              },
              anchor: {
                fontFamily: poppins.style.fontFamily,
              },
            },
            variables: {
              default: {
                colors: {
                  brand: "black",
                  brandAccent: "black",
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
