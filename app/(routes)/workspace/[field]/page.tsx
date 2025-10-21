import React from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";

const Workspace = () => {
  return (
    <div>
      <WorkspaceHeader />

      {/*   workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Doc */}
        <div className="bg-red-500 h-screen">Document</div>

        {/* board/canvas */}
        <div className="bg-blue-500 h-screen">Canvas</div>
      </div>
    </div>
  );
};

export default Workspace;
