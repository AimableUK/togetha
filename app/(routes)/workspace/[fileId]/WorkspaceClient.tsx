"use client";

import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FILE } from "../../dashboard/_components/FileList";
import Canvas from "../_components/Canvas";

type WorkspaceClientProps = {
  fileId: string;
};

const WorkspaceClient = ({ fileId }: WorkspaceClientProps) => {
  const [saveDocTrigger, setSaveDocTrigger] = useState(0);
  const [saveCanvasTrigger, setSaveCanvasTrigger] = useState(0);

  const handleSaveDoc = () => setSaveDocTrigger((prev) => prev + 1);
  const handleSaveCanvas = () => setSaveCanvasTrigger((prev) => prev + 1);

  //   const { fileId } = React.use(params);
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

  if (!fileData) return <div>Loading file...</div>;

  return (
    <div>
      <WorkspaceHeader
        onSaveDoc={handleSaveDoc}
        onSaveCanvas={handleSaveCanvas}
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
