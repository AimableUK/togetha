import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import Image from "next/image";
import React from "react";

const WorkspaceHeader = () => {
  return (
    <div className="px-3 border-b flex items-center justify-between">
      <div className="flex flex-row w-fit items-center gap-x-2 hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded-md cursor-pointer">
        <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
        <h2 className="font-semibold text-xl flex gap-2 items-center">
          File Name
        </h2>
      </div>
      <Button className="bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans">
        <Link />
        Share
      </Button>
    </div>
  );
};

export default WorkspaceHeader;
