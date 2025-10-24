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

type WorkspaceClientProps = {
  fileId: string;
};

const WorkspaceClient = ({ fileId }: WorkspaceClientProps) => {
  const [saveDocTrigger, setSaveDocTrigger] = useState(0);
  const [saveCanvasTrigger, setSaveCanvasTrigger] = useState(0);

  const handleSaveDoc = () => setSaveDocTrigger((prev) => prev + 1);
  const handleSaveCanvas = () => setSaveCanvasTrigger((prev) => prev + 1);

  const [fileData, setFileData] = useState<FILE | any>();

  const convex = useConvex();

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
      document.title = `${fileData.fileName} Workspace`;
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
    <div>
      <WorkspaceHeader
        onSaveDoc={handleSaveDoc}
        onSaveCanvas={handleSaveCanvas}
        fileData={fileData}
      />

      {/*   workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Doc */}
        <div className="h-screen">
          <Editor
            onSaveTrigger={saveDocTrigger}
            fileData={fileData}
            fileId={fileId}
          />
        </div>

        {/* board/canvas */}
        <div className="h-screen border-l">
          <Canvas
            onSaveTrigger={saveCanvasTrigger}
            fileData={fileData}
            fileId={fileId}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceClient;
