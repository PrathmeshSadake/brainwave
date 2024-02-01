"use client";
import { BarChart, Compass, History, Layout, List } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const SidebarRoutes = () => {
  const routes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: Compass,
      label: "Browse",
      href: "/search",
    },
    {
      icon: History,
      label: "History",
      href: "/history",
    },
    {
      icon: BarChart,
      label: "Statistics",
      href: "/statistics",
    },
  ];

  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
