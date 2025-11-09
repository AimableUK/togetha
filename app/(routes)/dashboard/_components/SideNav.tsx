"use client";

import React, { useContext, useState } from "react";
import SideNavTopSection from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { TeamContext } from "@/app/FilesListContext";
import { validateName } from "@/app/Schema/schema";
import { TEAM } from "@/lib/utils";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [errorMsg, setErrorMsg] = useState("");
  const { collapseSidebar_, activeTeam_, setActiveTeam_, totalFiles_ } =
    useContext(TeamContext);

  const files = useQuery(
    api.files.getFiles,
    activeTeam_ ? { teamId: activeTeam_._id } : "skip"
  );

  if (files === undefined)
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-9998">
        <div className="loader2"></div>
      </div>
    );

  const onFileCreate = async (fileName: string) => {
    const error = validateName(fileName);
    if (error) {
      setErrorMsg(error);
      return;
    }

    const promise = createFile({
      fileName: fileName,
      teamId: activeTeam_?._id,
      createdBy: user?.email!,
      archieve: false,
      document: "",
      whiteboard: "",
      editedAt: Date.now(),
    });

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
    setErrorMsg("");
  };

  return (
    <div
      className={`${collapseSidebar_ && "-translate-x-60"} trans flex flex-col bg-sidebar border h-full fixed w-60 border-r py-2 px-3`}
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
          errorMsg={errorMsg}
        />
      </div>
    </div>
  );
};

export default SideNav;
