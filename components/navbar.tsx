import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />

      <div className="flex w-full justify-end">
        <div className="flex items-center gap-x-2 dark:bg-gray-900  rounded-md px-1.5 py-1.5 shadow-md">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
