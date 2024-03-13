"use client";

import SidebarRoutes from "./sidebar-routes";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full shadow-md dark:shadow-dark">
      <div className="px-3 py-2 space-y-5">
        <div className="flex items-center">
          <Link href="/">
            <Image src={Logo} alt="SnapNotes" className="h-6 w-6" />
          </Link>
          <span className="ml-2 font-bold text-lg">snapnotes</span>
        </div>

        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
