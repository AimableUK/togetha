import { TeamContext } from "@/app/FilesListContext";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useContext } from "react";

const FilesSearch = () => {
  const { searchQuery, setSearchQuery } = useContext(TeamContext);

  return (
    <div className="hidden md:flex gap-2 items-center md:px-2">
      <Search className="h-4 w-4 absolute ml-2" />
      <Input
        placeholder="Search files..."
        className="relative border rounded-md pl-7"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default FilesSearch;
