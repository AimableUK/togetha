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
import { useIsMobile } from "@/app/hooks/use-mobile";

const WorkspaceHeader = ({
  fileData,
  workspaceViewMode,
  handleWorkspaceViewMode,
}: {
  fileData: FILE;
  workspaceViewMode: string;
  handleWorkspaceViewMode: (viewMode: string) => void;
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <div className="px-3 border-b flex items-center justify-between p-2 fixed w-full z-50 bg-background">
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
      <div className="flex border rounded-[3px]">
        <button
          onClick={() => handleWorkspaceViewMode("editor")}
          className={`${workspaceViewMode === "editor" && "bg-secondary"} border-r py-1 px-3 hover:bg-secondary rounded-l-[3px] cursor-pointer`}
        >
          Document
        </button>
        {!isMobile && (
          <button
            onClick={() => handleWorkspaceViewMode("both")}
            className={`${workspaceViewMode === "both" && "bg-secondary"} border-r py-1 px-3 md:px-8 hover:bg-secondary cursor-pointer`}
          >
            Both
          </button>
        )}
        <button
          onClick={() => handleWorkspaceViewMode("canvas")}
          className={`${workspaceViewMode === "canvas" && "bg-secondary"} hover:bg-secondary rounded-l cursor-pointer px-3 rounded-r-[3px]`}
        >
          Canvas
        </button>
      </div>
      <div className="flex gap-1 items-center">
        <Button className="bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans">
          <Link />
          {!isMobile && "Share"}
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
