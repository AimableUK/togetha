"use client";

import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, Link, Save } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { FILE } from "../../dashboard/_components/FileList";

const WorkspaceHeader = ({
  onSaveDoc,
  onSaveCanvas,
  fileData,
}: {
  onSaveDoc: () => void;
  onSaveCanvas: () => void;
  fileData: FILE;
}) => {
  const router = useRouter();

  return (
    <div className="px-3 border-b flex items-center justify-between p-2">
      <div className="flex flex-row w-fit items-center gap-x-2 rounded-md">
        <Tooltip>
          <TooltipTrigger>
            <CircleArrowLeft
              size={32}
              className="hover:text-accent cursor-pointer active:scale-90 trans"
              absoluteStrokeWidth
              onClick={router.back}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Return to Files</p>
          </TooltipContent>
        </Tooltip>
        <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
        <h2 className="font-semibold text-xl flex gap-2 items-center">
          {fileData?.fileName}
        </h2>
      </div>
      <div className="flex gap-1 items-center">
        <Button
          onClick={() => onSaveDoc()}
          className="bg-[#fc7d74] hover:bg-[#fc7d74]/80 dark:hover:bg-[#fc7d74]/60 active:bg-[#fc7d74]/65 dark:text-foreground/90 cursor-pointer trans"
        >
          <Save />
          Save Doc
        </Button>
        <Button
          onClick={() => onSaveCanvas()}
          className="bg-[#fc7d74] hover:bg-[#fc7d74]/80 dark:hover:bg-[#fc7d74]/60 active:bg-[#fc7d74]/65 dark:text-foreground/90 cursor-pointer trans"
        >
          <Save />
          Save Canvas
        </Button>
        <Button className="bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans">
          <Link />
          Share
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
