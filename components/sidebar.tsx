"use client";

import Logo from "@/app/(dashboard)/_components/logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1 space-y-3">
        <Logo />
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
