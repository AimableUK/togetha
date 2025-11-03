"use client";

import { validateName } from "@/app/Schema/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

export default function StepTeamSetup() {
  const [teamName, setTeamName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();

  const createNewTeam = () => {
    const error = validateName(teamName);
    if (error) {
      setErrorMsg(error);
      return;
    }

    const promise = createTeam({
      teamName: teamName,
      createdBy: user?.email,
    });

    toast.promise(promise, {
      loading: "Creating Team...",
      success: () => ({
        message: "Team Created",
        description: `${teamName} created! Click Next to Continue.`,
      }),
      error: (error) => ({
        message: "Error",
        description:
          error?.response?.data?.detail ||
          "Failed to Create team, Please Try again later.",
      }),
    });
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full text-center space-y-4">
      <h2 className="text-lg font-semibold">Create Your Team</h2>
      <p className="text-sm text-muted-foreground">
        Give your team a name to get started with collaboration.
      </p>

      <div className="mt-3 md:mt-7 w-4/5 md:w-2/5">
        <label htmlFor="" className="text-gray-700 dark:text-gray-100!">
          Team Name
        </label>
        <Input
          placeholder="Team Name"
          className="mt-3"
          onChange={(e) => setTeamName(e.target.value)}
        />
        {errorMsg && (
          <p className="text-red-300 font-semibold text-sm mt-2">{errorMsg}</p>
        )}
      </div>
      <Button
        disabled={!(teamName && teamName?.length > 1)}
        className="bg-accent dark:text-gray-100 hover:bg-[#0742a2] cursor-pointer"
        onClick={() => createNewTeam()}
      >
        Create Team
      </Button>
    </div>
  );
}
