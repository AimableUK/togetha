"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { CircleArrowLeft, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { validateName } from "@/app/Schema/schema";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const CreateTeamClient = () => {
  const [teamName, setTeamName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");

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
        description: `${teamName} Team created successfully!`,
      }),
      error: (error) => ({
        message: "Error",
        description:
          error?.response?.data?.detail ||
          "Failed to Create team, Please Try again later.",
      }),
    });
    setErrorMsg("");

    promise.then(() => {
      router.push("/dashboard");
    });
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 md:p-16">
      <div className="flex flex-row items-center gap-x-2 mb-3">
        <Tooltip>
          <TooltipTrigger>
            <CircleArrowLeft
              size={32}
              className="hover:text-accent cursor-pointer active:scale-90 trans"
              absoluteStrokeWidth
              onClick={handleGoBack}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Return to Files</p>
          </TooltipContent>
        </Tooltip>
        <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
        <h1 className="font-semibold text-xl">Togetha</h1>
      </div>

      <div className="flex flex-col items-center gap-y-5">
        <h2 className="font-bold text-4xl">
          What do you want to name your team?
        </h2>
        <h3 className="text-gray-700 dark:text-gray-100!">
          You&apos;ll be able to raname this later.
        </h3>
        <div className="mt-3 md:mt-7 w-4/5 md:w-2/5 flex flex-col space-y-3">
          {/* Add team name */}
          <div>
            <label
              htmlFor="teamName"
              className="text-gray-700 dark:text-gray-100!"
            >
              Team Name
            </label>
            <Input
              id="teamName"
              placeholder="Team Name"
              className="mt-1"
              onChange={(e) => setTeamName(e.target.value)}
            />
            {errorMsg && (
              <p className="text-red-300 font-semibold text-sm mt-2">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Add Collaborators */}
          <div className="flex-1 gap-2">
            <h2>Invite Collaborators (Optional)</h2>
            <Label htmlFor="fileName" className="sr-only">
              Enter Email
            </Label>
            <div className="flex relative">
              <Input
                id="fileName"
                placeholder="Invite via Email address"
                className="mt-2 relative h-11 py-2 "
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button className="absolute right-1 top-3 bottom-1 rounded-md bg-accent text-white hover:bg-accent/80 active:bg-accent/60 cursor-pointer">
                <UserPlus /> Add
              </Button>
            </div>

            {errorMsg && (
              <p className="text-red-300 font-semibold text-sm mt-2">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Currently added */}
          <div className="flex flex-col border rounded-l-md py-2 px-3 max-h-28 overflow-y-auto">
            <h2>Currently Added</h2>
            <Separator />
            <div className="flex flex-col space-y-1">
              <h3 className="text-[14px] text-foreground/75 truncate max-w-[180px]">
                bugingo@gmail.com
              </h3>
              <h3 className="text-[14px] text-foreground/75 truncate max-w-[180px]">
                bugingo@gmail.com
              </h3>
              <h3 className="text-[14px] text-foreground/75 truncate max-w-[180px]">
                bugingo@gmail.com
              </h3>
               <h3 className="text-[14px] text-foreground/75 truncate max-w-[180px]">
                bugingo@gmail.com
              </h3>
            </div>
          </div>
        </div>

        <Button
          disabled={!(teamName && teamName?.length > 1)}
          className="bg-accent dark:text-gray-100 hover:bg-[#0742a2] cursor-pointer"
          onClick={() => createNewTeam()}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeamClient;
