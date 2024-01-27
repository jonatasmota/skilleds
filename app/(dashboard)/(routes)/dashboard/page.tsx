"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Book, Lightbulb, NotebookTabs } from "lucide-react";

const tools = [
  {
    label: "Books",
    icon: Book,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/books",
  },
  {
    label: "Courses",
    icon: NotebookTabs,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/courses",
  },
  {
    label: "Ideas",
    icon: Lightbulb,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/ideas",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          You can start by adding a new book, course, or idea.
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          This is your dashboard. You can add new books, courses, and ideas
          here.
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 flex border items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>

            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}
