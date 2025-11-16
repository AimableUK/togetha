"use client";

import React, { useContext, useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { Id } from "@/convex/_generated/dataModel";
import Canvas from "../_components/Canvas";
import Image from "next/image";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { TeamContext } from "@/app/FilesListContext";
import { TEAM } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSecureFile } from "./useSecureFile";

type WorkspaceClientProps = {
  fileId: Id<"files">;
};

const WorkspaceClient = ({ fileId }: WorkspaceClientProps) => {
  const [workspaceViewMode, setWorkspaceViewMode] = useState<string>("both");
  const isMobile = useIsMobile();
  const router = useRouter();
  const [savingWorkspace, setSavingWorkspace] = useState<boolean>(false);
  const { user, activeTeam_ } = useContext(TeamContext);

  useEffect(() => {
    isMobile && convertWorkspaceviewMode();
  }, [isMobile]);

  useEffect(() => {
    if (!user?.email) {
      toast.error("You must be signed in to view this workspace.");
      router.push("/signin");
      return;
    }

    if (!activeTeam_) return;

    const isCollaborator = activeTeam_.collaboratorsData?.some(
      (c: TEAM) => c.collaboratorEmail === user.email
    );

    if (!isCollaborator) {
      toast.error("You're not a collaborator here.");
      localStorage.removeItem("activeTeamId");
      router.push("/dashboard");
    }
  }, [user, activeTeam_, router]);

  const fileData = useSecureFile(fileId);

  useEffect(() => {
    if (fileData?.fileName) {
      document.title = `${fileData.fileName} Workspace - Togetha`;
    }
  }, [fileData]);

  const convertWorkspaceviewMode = () => {
    if (workspaceViewMode === "both") {
      setWorkspaceViewMode("editor");
    } else {
      setWorkspaceViewMode("both");
    }
  };

  const handleWorkspaceViewMode = (viewMode: string) => {
    if (viewMode === "editor") {
      setWorkspaceViewMode("editor");
    } else if (viewMode === "canvas") {
      setWorkspaceViewMode("canvas");
    } else {
      setWorkspaceViewMode("both");
    }
  };

  if (!fileId || !fileData)
    return (
      <div className="flex flex-col items-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <div>
            <h3 className="font-bold text-xl md:text-2xl">Togetha</h3>
            <h4 className="font-semibold text-xs">Loading Workspace</h4>
          </div>
        </div>
        <div className="loader1"></div>
      </div>
    );

  return (
    <div className="h-screen flex flex-col">
      <WorkspaceHeader
        fileData={fileData}
        workspaceViewMode={workspaceViewMode}
        handleWorkspaceViewMode={handleWorkspaceViewMode}
        savingWorkspace={savingWorkspace}
      />
      {/*   workspace layout */}
      <div
        className={`flex-1 grid ${
          workspaceViewMode === "both"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1"
        } pt-[53.5px] h-full overflow-hidden`}
      >
        {/* Doc */}
        {(workspaceViewMode === "both" || workspaceViewMode === "editor") && (
          <div className="h-full overflow-y-auto">
            <Editor
              fileData={fileData}
              fileId={fileId}
              setSavingWorkspace={setSavingWorkspace}
            />
          </div>
        )}
        {/* board/canvas */}
        {(workspaceViewMode === "both" || workspaceViewMode === "canvas") && (
          <div className="h-3/4 ">
            <Canvas
              fileData={fileData}
              fileId={fileId}
              setSavingWorkspace={setSavingWorkspace}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceClient;
