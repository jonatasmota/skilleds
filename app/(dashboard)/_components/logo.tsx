import Link from "next/link";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <Link href="/">
      <h1
        className={cn(
          "bg-gradient-to-r from-purple-600 via-blue-500 to-green-300 text-transparent bg-clip-text text-4xl font-extrabold",
          poppins.className
        )}
      >
        skilleds
      </h1>
    </Link>
  );
};

export default Logo;
