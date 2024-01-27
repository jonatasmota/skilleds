import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />

      <div className="flex w-full justify-end items-center gap-x-2">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
