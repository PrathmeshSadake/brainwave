"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, User2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const UserAccountNav = ({ user }: { user: User }) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='overflow-visible'>
        <Button className='rounded-full h-8 w-8 aspect-square bg-slate-400'>
          <Avatar className='relative w-8 h-8'>
            {user?.imageUrl ? (
              <div className='relative aspect-square h-full w-full'>
                <Image
                  fill
                  src={user.imageUrl}
                  alt='profile picture'
                  referrerPolicy='no-referrer'
                />
              </div>
            ) : (
              <AvatarFallback>
                {/* <span className='sr-only'>{`${user?.fullName}`}</span> */}
                <User2 className='h-4 w-4 text-zinc-900' />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-white my-4' align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            {/* {user?.fullName && (
              <p className='font-medium text-sm text-black'>{user?.fullName}</p>
            )} */}
            {user?.email && (
              <p className='w-[200px] truncate text-xs text-zinc-700'>
                {user?.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href='/'>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href='/profile'>My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          <p onClick={handleLogout}>Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
