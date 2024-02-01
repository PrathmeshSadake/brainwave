import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AccountForm from "./account-form";
import { Separator } from "@/components/ui/separator";

export default async function Account() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Account</h3>
        <p className='text-sm text-muted-foreground'>
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm user={user} />
    </div>
  );
}
