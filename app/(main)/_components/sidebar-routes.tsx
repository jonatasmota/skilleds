"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col gap-x-2 mt-10">
      <Link href="/books">
        <Button size="lg" variant="ghost" className="text-xl">
          Books
        </Button>
      </Link>

      <Link href="/courses">
        <Button size="lg" variant="ghost" className="text-xl">
          Courses
        </Button>
      </Link>

      <Link href="/ideas">
        <Button size="lg" variant="ghost" className="text-xl">
          Ideas
        </Button>
      </Link>
    </div>
  );
};

export default SidebarRoutes;
