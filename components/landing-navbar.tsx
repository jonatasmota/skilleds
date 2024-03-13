"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Logo from "@/public/logo.svg";
import Image from "next/image";

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="SnapNotes" className="h-6 w-6" />
        </Link>
        <span className="ml-2 font-bold text-lg">snapnotes</span>
      </div>

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
