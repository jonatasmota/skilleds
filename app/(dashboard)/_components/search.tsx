import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  onSearchChange: (value: string) => void;
}

const SearchInput = ({ onSearchChange }: SearchInputProps) => {
  const [value, setValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = e.target.value;
    setValue(updatedValue);
    onSearchChange(updatedValue);
  };

  return (
    <div className="relative mx-auto md:mx-0 md:w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={handleSearchChange}
        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
