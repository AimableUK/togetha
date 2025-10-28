"use client";

import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";
import Image from "next/image";
import { useIsMobile } from "@/app/hooks/use-mobile";

type WorkspaceClientProps = {
  fileId: string;
};

const WorkspaceClient = ({ fileId }: WorkspaceClientProps) => {
  const [workspaceViewMode, setWorkspaceViewMode] = useState<string>("both");
  const [fileData, setFileData] = useState<FILE | any>();

  const convex = useConvex();
  const isMobile = useIsMobile();

  useEffect(() => {
    isMobile && convertWorkspaceviewMode();
  }, [isMobile]);

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

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: fileId as Id<"files">,
    });
    setFileData(result);
  };

  useEffect(() => {
    if (fileId) getFileData();
  }, []);

  useEffect(() => {
    if (fileData?.fileName) {
      document.title = `${fileData.fileName} Workspace - Togetha`;
    }
  }, [fileData]);

  if (!fileData)
    return (
      <div className="flex flex-col items-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <div>
            <h3 className="font-bold text-2xl">Togetha</h3>
            <h4 className="font-semibold">Loading Workspace</h4>
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
      />
      {/*   workspace layout */}
      <div
        className={`flex-1 grid ${
          workspaceViewMode === "both"
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1"
        } pt-14 h-full overflow-hidden`}
      >
        {/* Doc */}
        {(workspaceViewMode === "both" || workspaceViewMode === "editor") && (
          <div className="h-full overflow-y-auto">
            <Editor fileData={fileData} fileId={fileId} />
          </div>
        )}
        {/* board/canvas */}
        {(workspaceViewMode === "both" || workspaceViewMode === "canvas") && (
          <div className="h-3/4 border-l">
            <Canvas fileData={fileData} fileId={fileId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceClient;
