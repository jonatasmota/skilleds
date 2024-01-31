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
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={value}
        onChange={handleSearchChange}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200 text-slate-600"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
