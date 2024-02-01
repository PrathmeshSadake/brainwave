import { getSession } from "@/app/supabase-server";
import AuthUI from "./AuthUI";

import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className='flex flex-col h-screen justify-between max-w-md p-3 m-auto w-full'>
      <AuthUI />
    </div>
  );
}
