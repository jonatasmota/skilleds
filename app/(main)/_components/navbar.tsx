"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import Logo from "./logo";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex justify-between items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex justify-between items-center">
        <NavbarRoutes />
        <MobileSidebar />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
