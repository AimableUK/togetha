"use client";

import { TeamContext } from "@/app/FilesListContext";
import { validateName } from "@/app/Schema/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Users } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

interface TeamSetUpProps {
  handleContinue: () => void;
}

export default function StepTeamSetup({ handleContinue }: TeamSetUpProps) {
  const [teamName, setTeamName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const createTeam = useMutation(api.teams.createTeam);
  const { user, setActiveTeam_, setTeamList_ } = useContext(TeamContext);

  const createNewTeam = async () => {
    const error = validateName(teamName);
    if (error) {
      setErrorMsg(error);
      return;
    }

    try {
      const newTeam: any = await createTeam({
        teamName,
        createdBy: user?.email,
      });
      setTeamName("");

      setActiveTeam_(newTeam);
      localStorage.setItem("activeTeamId", newTeam._id);
      setTeamList_((prev: any) => (prev ? [...prev, newTeam] : [newTeam]));

      setTeamName("");
      setErrorMsg("");

      toast.success(`${teamName} Team created successfully!`);
      handleContinue();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail ||
          "Failed to create team, please try again later."
      );
      console.error("Create Team Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full text-center space-y-4">
      <h2 className="text-lg font-semibold">Create Your Team</h2>
      <p className="text-sm text-muted-foreground">
        What's the name of your company or team that is recognizable? This can be even used individually
      </p>

      <div className="mt-3 md:mt-7 w-4/5 md:w-2/5">
        <label htmlFor="" className="text-gray-700 dark:text-gray-100!">
          Team Name
        </label>
        <Input
          placeholder="Team Name"
          className="mt-3"
          onChange={(e) => setTeamName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createNewTeam()}
        />
        {errorMsg && (
          <p className="text-red-500 dark:text-red-300 font-semibold text-sm mt-2">
            {errorMsg}
          </p>
        )}
      </div>
      <Button
        disabled={!(teamName && teamName?.length > 1)}
        className="bg-accent dark:text-gray-100 hover:bg-[#0742a2] cursor-pointer"
        onClick={() => createNewTeam()}
      >
        <Users />
        Create Team
      </Button>
    </div>
  );
}
