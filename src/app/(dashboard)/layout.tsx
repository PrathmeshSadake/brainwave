import React from "react";
import Navbar from "./_components/navbar";

import { getSession } from "../supabase-server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect("/i");
  }

  return (
    <div className="h-full max-w-7xl mx-auto px-8">
      <Navbar />
      <Toaster />
      <main className="py-32 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
