import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/FilesListContext";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();

  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [totalFiles, setTotalFiles] = useState<number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = async (fileName: string) => {
    const promise = createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email!,
      archive: false,
      document: "",
      whiteboard: "",
    });

    await promise;
    getFiles();

    toast.promise(promise, {
      loading: "Processing...",
      success: () => ({
        message: "File Created",
        description: `${fileName} created successfully!`,
      }),
      error: (error) => ({
        message: "Error",
        description:
          error?.response?.data?.detail || "Failed to process your request.",
      }),
    });
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    setTotalFiles(result?.length);
    setFileList_(result);
  };

  return (
    <div className="flex flex-col bg-sidebar border h-screen fixed w-72 border-r p-6">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          onFileCreate={onFileCreate}
          totalFiles={totalFiles}
        />
      </div>
    </div>
  );
};

export default SideNav;
