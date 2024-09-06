"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="font-bold py-16 text-center space-y-3">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
        <h1>The Personal Note Organizer</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
          <TypewriterComponent
            options={{
              strings: [
                "Add courses",
                "Organize your booklist",
                "Keep track of your ideas",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      <div className="text-sm md:text-xl font-light text-zinc-400">
        Keep track of your books, courses, ideas, and more.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Start Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
