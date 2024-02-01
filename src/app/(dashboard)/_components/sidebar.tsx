import Link from "next/link";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className='h-full overflow-y-auto border-r flex flex-col bg-white'>
      <div className='h-[60px] p-2'>
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
