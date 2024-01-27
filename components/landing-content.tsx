"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
  {
    title: "Add Courses",
    description: "Add your courses and keep track of your notes.",
    icon: "📚",
  },
  {
    title: "Organize your Booklist",
    description: "Keep track of the books you need to read.",
    icon: "📖",
  },
  {
    title: "Keep track of your ideas",
    description: "Keep track of your ideas.",
    icon: "💡",
  },
  {
    title: "Keep track of your ideas",
    description: "Keep track of your ideas.",
    icon: "💡",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl font-extrabold mb-10">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{feature.icon}</p>
                  <p className="text-sm">{feature.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {feature.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
