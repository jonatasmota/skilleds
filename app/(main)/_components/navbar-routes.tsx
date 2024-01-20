"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const NavbarRoutes = () => {
  return (
    <>
      <div className="gap-x-2 ml-auto hidden md:block">
        <Link href="/books">
          <Button size="lg" variant="ghost" className="text-md">
            Books
          </Button>
        </Link>

        <Link href="/courses">
          <Button size="lg" variant="ghost" className="text-md">
            Courses
          </Button>
        </Link>

        <Link href="/ideas">
          <Button size="lg" variant="ghost" className="text-md">
            Ideas
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NavbarRoutes;
