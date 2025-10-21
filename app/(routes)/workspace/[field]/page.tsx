import React from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";

const Workspace = () => {
  return (
    <div>
      <WorkspaceHeader />

      {/*   workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Doc */}
        <div className="h-screen">
          <Editor />
        </div>

        {/* board/canvas */}
        <div className="bg-blue-500 h-screen"></div>
      </div>
    </div>
  );
};

export default Workspace;
