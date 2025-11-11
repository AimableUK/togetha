import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const FilesSearch = () => {
  return (
    <div className="hidden md:flex gap-2 items-center md:px-2">
      <Search className="h-4 w-4 absolute ml-2" />
      <Input
        placeholder="Search files..."
        className="relative border rounded-md pl-7"
      />
    </div>
  );
};

export default FilesSearch;
