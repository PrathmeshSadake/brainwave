"use client";

import { Button } from "@/components/ui/button";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const NavbarRoutes = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    } else {
      return router.refresh();
    }
  };
  return (
    <div className='flex gap-x-2 ml-auto'>
      <Button size='sm' onClick={handleLogout}>
        Sign Out
      </Button>
    </div>
  );
};

export default NavbarRoutes;
