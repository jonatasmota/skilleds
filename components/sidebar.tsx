"use client";

import Logo from "@/app/(dashboard)/_components/logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full shadow-md dark:shadow-dark">
      <div className="px-3 py-2 space-y-3">
        <Logo />
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
