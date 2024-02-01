import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";
import { getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";

const Navbar = async () => {
  return (
    <div className='p-2 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
