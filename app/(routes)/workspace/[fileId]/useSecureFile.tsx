"use client";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TeamContext } from "@/app/FilesListContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { SecureFileResult } from "@/lib/utils";

export const useSecureFile = (fileId: Id<"files">) => {
  const { user, setActiveTeam_ } = useContext(TeamContext);
  const router = useRouter();
  const [fileData, setFileData] = useState<SecureFileResult>(null);

  const activeTeamId = localStorage.getItem("activeTeamId");
  const queryArgs =
    user?.email && activeTeamId
      ? {
          _id: fileId,
          teamId: activeTeamId as Id<"teams">,
          userEmail: user.email,
        }
      : "skip";

  const queryResult = useQuery(api.files.getFileById, queryArgs);

  useEffect(() => {
    if (!queryResult || !user?.email) return;

    if ("requiresTeamSwitch" in queryResult && queryResult.requiresTeamSwitch) {
      localStorage.setItem("activeTeamId", queryResult.correctTeamId as string);
      setActiveTeam_ &&
        setActiveTeam_({
          _id: queryResult.correctTeamId,
          name: "Updated Team",
          collaboratorsData: [],
        } as any);
      toast.success("You must switch the team to view this file");
      router.refresh();
      return; // stop here
    }

    // Check if queryResult has an error
    if ("error" in queryResult && queryResult.error) {
      toast.error(queryResult.error);
      if (queryResult.error.includes("Access denied")) {
        localStorage.removeItem("activeTeamId");
        router.push("/dashboard");
      } else if (queryResult.error.includes("Team associated")) {
        router.push("/dashboard/getstarted");
      } else if (queryResult.error.includes("File not found")) {
        router.push("/dashboard");
      }
      return;
    }

    // Handle valid file data
    if ("data" in queryResult && queryResult.data) {
      setFileData(queryResult.data);
      document.title = `${queryResult.data.fileName} Workspace - Togetha`;
    }
  }, [queryResult, user, router, setActiveTeam_]);

  return fileData;
};
