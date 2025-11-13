"use client";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TeamContext } from "@/app/FilesListContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FILE } from "@/lib/utils";

type SecureFileResult =
  | (FILE & {
      _id: Id<"files">;
      fileName: string;
      teamId: Id<"teams">;
      requiresTeamSwitch?: boolean;
      correctTeamId?: Id<"teams">;
    })
  | null;

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
          name: "Updated Team", // optional: fetch real team name
          collaboratorsData: [], // optional: fetch real collaborators
        } as any);
      toast.success("Switched to the correct team for this file.");
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
