import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="z-50 bg-background fixed bottom-0 flex justify-between items-center w-full p-6">
      <div className="w-full justify-between md:justify-end flex items-center gap-x-2">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms and Conditions
        </Button>
      </div>
    </div>
  );
};
