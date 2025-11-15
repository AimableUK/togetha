"use client";

import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  CircleArrowLeft,
  CloudCheck,
  CloudUpload,
  Link,
  RectangleEllipsis,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/app/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FILE } from "@/lib/utils";
import TeamInvite from "../../dashboard/_components/TeamInvite";
import { useExportFile } from "@/app/hooks/useExportFile";
import { Id } from "@/convex/_generated/dataModel";
import { TeamContext } from "@/app/FilesListContext";

const WorkspaceHeader = ({
  fileId,
  fileData,
  workspaceViewMode,
  handleWorkspaceViewMode,
  savingWorkspace,
}: {
  fileId: Id<"files">;
  fileData: FILE;
  workspaceViewMode: string;
  handleWorkspaceViewMode: (viewMode: string) => void;
  savingWorkspace: boolean | undefined;
}) => {
  const { download } = useExportFile();
  const { user } = useContext(TeamContext);
  const router = useRouter();
  const isMobile = useIsMobile();
  const [headerCollapse, setHeaderCollapse] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  return (
    <>
      <div className="px-3 border-b flex items-center justify-between p-2 fixed w-full z-50 bg-background">
        <div className="flex flex-row w-fit items-center gap-x-2 rounded-md">
          <Tooltip>
            <TooltipTrigger>
              <CircleArrowLeft
                size={28}
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
          <h2 className="font-semibold text-xl flex gap-2 items-center whitespace-nowrap truncate max-w-3/4">
            {fileData?.fileName}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <RectangleEllipsis
                size={30}
                className="hidden mt-2 cursor-pointer rounded-full hover:bg-accent/30 active:bg-accent/50 p-1 trans"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="hidden">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() => download(fileId, "docx", user?.email)}
              >
                .docx
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => download(fileId, "pdf", user?.email)}
              >
                .pdf
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => download(fileId, "txt", user?.email)}
              >
                .txt
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => download(fileId, "md", user?.email)}
              >
                .md
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => download(fileId, "html", user?.email)}
              >
                .html
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden md:flex border rounded-[3px]">
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
        <div className="hidden md:flex gap-1 items-center">
          <Tooltip>
            <TooltipTrigger>
              {savingWorkspace ? (
                <CloudUpload
                  className="text-orange-400 mr-2"
                  strokeWidth={2.4}
                />
              ) : (
                <CloudCheck className="text-green-400 mr-2" strokeWidth={2.4} />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{savingWorkspace ? "Saving" : "Saved"}</p>
            </TooltipContent>
          </Tooltip>

          <Button
            onClick={() => setOpenInviteDialog(true)}
            className="bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans"
          >
            <Link />
            Share
          </Button>
          <ModeToggle />
        </div>
        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={() => setHeaderCollapse(!headerCollapse)}
                className="z-50 block rounded-sm hover:bg-accent/40 active:scale-90 trans p-1 cursor-pointer md:hidden"
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex flex-col gap-y-1">
                <Button
                  onClick={() => handleWorkspaceViewMode("editor")}
                  className={`${workspaceViewMode === "editor" && "bg-accent/30"} text-primary bg-secondary hover:bg-accent/20 active:bg-accent/30 cursor-pointer trans`}
                >
                  Document
                </Button>
                <Button
                  onClick={() => handleWorkspaceViewMode("canvas")}
                  className={`${workspaceViewMode === "canvas" && "bg-accent/30"} text-primary bg-secondary hover:bg-accent/20 active:bg-accent/30 cursor-pointer trans`}
                >
                  Canvas
                </Button>
                <Button
                  onClick={() => setOpenInviteDialog(true)}
                  className="text-primary bg-secondary hover:bg-accent/20 cursor-pointer trans"
                >
                  <Link />
                  Share
                </Button>
                <div className="flex gap-1 justify-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="bg-secondary hover:bg-accent/20 trans border">
                        {savingWorkspace ? (
                          <CloudUpload
                            className="text-orange-400"
                            strokeWidth={2.4}
                          />
                        ) : (
                          <CloudCheck
                            className="text-green-400"
                            strokeWidth={2.4}
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{savingWorkspace ? "Saving" : "Saved"}</p>
                    </TooltipContent>
                  </Tooltip>
                  <ModeToggle />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TeamInvite
        openInviteDialog={openInviteDialog}
        setOpenInviteDialog={setOpenInviteDialog}
      />
    </>
  );
};

export default WorkspaceHeader;
