"use client";

import { LibraryBig, Lightbulb, List } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const features = [
  {
    title: "Add Courses",
    description: "Knowledge is power. Increase your power!",
    icon: (
      <div className="w-fit p-2 bg-blue-500/10 rounded-full transition">
        <List size={40} className="text-blue-500" />
      </div>
    ),
  },
  {
    title: "Organize your Booklist",
    description: "Reading is a great habit to have and to keep!",
    icon: (
      <div className="w-fit p-2 bg-red-500/10 rounded-full transition">
        <LibraryBig size={32} className=" text-red-500" />
      </div>
    ),
  },
  {
    title: "Keep track of your ideas",
    description: "Don't let your ideas get lost. Write them down!",
    icon: (
      <div className="w-fit p-2 bg-yellow-500/10 rounded-full transition">
        <Lightbulb size={32} className=" text-yellow-500" />
      </div>
    ),
  },
];

const LandingContent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
      {features.map((feature) => (
        <Card key={feature.title} className="w-[280px] h-[180px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <div className="flex items-center">
                <span className="mb-2">{feature.icon}</span>
                <p className="text-sm ml-2">{feature.title}</p>
              </div>
            </CardTitle>
            <CardContent className="pt-4 px-0">
              {feature.description}
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default LandingContent;
