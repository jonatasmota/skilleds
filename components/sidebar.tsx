"use client";

import SidebarRoutes from "./sidebar-routes";
import SnapNotes from "./logo";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full shadow-md dark:shadow-dark">
      <div className="px-3 py-2 space-y-5">
        <Link href="/">
          <SnapNotes />
        </Link>
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
