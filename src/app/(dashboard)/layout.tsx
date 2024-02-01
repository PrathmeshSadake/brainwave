import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { redirect } from "next/navigation";
import { getSession } from "../supabase-server";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect("/i");
  }

  return (
    <div className='h-full'>
      <div className='h-[60px] md:pl-56 fixed inset-y-0 w-full z-50'>
        <Navbar />
      </div>
      <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50'>
        <Sidebar />
      </div>
      <main className='md:pl-56 pt-[80px] h-full bg-gray-50'>
        <div className='p-4'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
