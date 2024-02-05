"use client";

import Logo from "@/app/(dashboard)/_components/logo";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import SnapNote from "./logo";

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/">
        <SnapNote />
      </Link>

      <div className="flex items-center gap-x-2">
        <Link
          href={isSignedIn ? "/dashboard" : "/sign-up"}
          className="hidden md:block"
        >
          <Button className="rounded-full">Get Started</Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default LandingNavbar;
