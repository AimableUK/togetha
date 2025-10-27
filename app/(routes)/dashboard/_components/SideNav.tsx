import React, { useContext, useEffect } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { TeamContext } from "@/app/FilesListContext";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const convex = useConvex();
  const {
    setFileList_,
    collapseSidebar_,
    activeTeam_,
    setActiveTeam_,
    totalFiles_,
    setTotalFiles_,
  } = useContext(TeamContext);

  useEffect(() => {
    activeTeam_ && getFiles();
  }, [activeTeam_]);

  const onFileCreate = async (fileName: string) => {
    const promise = createFile({
      fileName: fileName,
      teamId: activeTeam_?._id!,
      createdBy: user?.email!,
      archieve: false,
      document: "",
      whiteboard: "",
    });

    await promise;
    getFiles();

    toast.promise(promise, {
      loading: "Creating...",
      success: () => ({
        message: "File Created",
        description: `${fileName} created successfully!`,
      }),
      error: (error) => ({
        message: "Error",
        description:
          error?.response?.data?.detail ||
          "Failed to Create file, Please Try again later.",
      }),
    });
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam_?._id!,
    });
    setTotalFiles_(result?.length);
    setFileList_(result);
  };

  return (
    <div
      className={`${collapseSidebar_ && "-translate-x-72"} trans flex flex-col bg-sidebar border h-screen fixed w-72 border-r p-6`}
    >
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam_(activeTeam)}
        />
      </div>

      <div>
        <SideNavBottomSection
          onFileCreate={onFileCreate}
          totalFiles={totalFiles_}
        />
      </div>
    </div>
  );
};

export default SideNav;
