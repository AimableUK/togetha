"use client";

import React, { useEffect, useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FILE } from "../../dashboard/_components/FileList";

const Workspace = ({ params }: { params: Promise<{ fileId: string }> }) => {
  const [triggerSave, setTriggerSave] = useState(false);
  const { fileId } = React.use(params);
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
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/*   workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Doc */}
        <div className="h-screen">
          <Editor
            onSaveTrigger={triggerSave}
            fileData={fileData}
            fileId={fileId}
          />
        </div>

        {/* board/canvas */}
        <div className="bg-blue-500 h-screen"></div>
      </div>
    </div>
  );
};

export default Workspace;
