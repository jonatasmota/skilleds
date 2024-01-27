"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Book, LayoutDashboard, Lightbulb, NotebookText } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      <Link
        href="/dashboard"
        className={cn(
          "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
          pathname === "/dashboard" ? "text-white bg-white/10" : "text-zinc-400"
        )}
      >
        <div className="flex items-center flex-1">
          <LayoutDashboard className="h-5 w-5 mr-3 text-red-500" />
          Dashboard
        </div>
      </Link>

      <Link
        href="/books"
        className={cn(
          "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
          pathname === "/books" ? "text-white bg-white/10" : "text-zinc-400"
        )}
      >
        <div className="flex items-center flex-1">
          <Book className="h-5 w-5 mr-3 text-violet-500" />
          Books
        </div>
      </Link>

      <Link
        href="/courses"
        className={cn(
          "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
          pathname === "/courses" ? "text-white bg-white/10" : "text-zinc-400"
        )}
      >
        <div className="flex items-center flex-1">
          <NotebookText className="h-5 w-5 mr-3 text-blue-500" />
          Courses
        </div>
      </Link>

      <Link
        href="/ideas"
        className={cn(
          "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
          pathname === "/ideas" ? "text-white bg-white/10" : "text-zinc-400"
        )}
      >
        <div className="flex items-center flex-1">
          <Lightbulb className="h-5 w-5 mr-3 text-yellow-500" />
          Ideas
        </div>
      </Link>
    </div>
  );
};

export default SidebarRoutes;
