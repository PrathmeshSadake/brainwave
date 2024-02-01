import Link from "next/link";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className='h-full overflow-y-auto border-r flex flex-col bg-white'>
      <div className='h-[60px] p-2 flex items-end'>
        <Link href={"/"}>
          <div className='font-semibold text-2xl pl-6 text-blue-600'>
            Brainwave
          </div>
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
