"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { CircleArrowLeft, UserPlus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { validateEmail, validateName } from "@/app/Schema/schema";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const CreateTeamClient = () => {
  const [teamName, setTeamName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const createNewTeam = () => {
    const error = validateName(teamName);
    if (error) {
      setErrorMsg(error);
      return;
    }

    console.log("team Name: ", teamName);
    console.log("invitedEmails: ", invitedEmails);
    setInvitedEmails([]);
    setTeamName("");

    const promise = createTeam({
      teamName: teamName,
      createdBy: user?.email,
      collaborators: invitedEmails,
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

  const handleAddInvite = () => {
    const trimmed = emailInput.trim().toLowerCase();
    const error = validateEmail(trimmed);
    if (error) {
      setErrorMsg(error);
      return;
    }

    if (emailInput === user.email) {
      setErrorMsg("You can't Invite your self");
      return;
    }

    const current = Array.isArray(invitedEmails)
      ? invitedEmails
      : // fallback: try to coerce
        typeof invitedEmails === "string"
        ? [invitedEmails]
        : Array.isArray(Object.values(invitedEmails || {}))
          ? Object.values(invitedEmails as any).map(String)
          : [];

    // Prevent duplicates
    if (current.includes(trimmed)) {
      setErrorMsg("This email is already invited");
      return;
    }

    // Push the new email & update state
    const next = [...current, trimmed];
    setInvitedEmails(next);
    setEmailInput("");
    setErrorMsg("");
  };

  const handleRemoveInvite = (emailToRemove: string) => {
    setInvitedEmails((prev) => prev.filter((email) => email !== emailToRemove));
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
        <div className="mt-3 md:mt-7 w-full md:w-2/5 flex flex-col space-y-3">
          {errorMsg && (
            <div className="rounded-md py-2 px-3 bg-secondary flex items-center border border-red-400">
              <p className="text-red-300 font-semibold text-sm text-center">
                {errorMsg}
              </p>
            </div>
          )}
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
          </div>

          {/* Add Collaborators */}
          <div className="flex-1 gap-2">
            <h2>Invite Collaborators (Optional)</h2>
            <Label htmlFor="fileName" className="sr-only">
              Enter Email
            </Label>
            <div className="flex relative">
              <Input
                id="inviteEmail"
                value={emailInput}
                placeholder="Invite via Email address"
                className="mt-2 h-11 py-2"
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button
                onClick={handleAddInvite}
                disabled={!!validateEmail(emailInput)}
                className="cursor-pointer disabled:cursor-none absolute right-1 top-3 bottom-1 rounded-md bg-accent text-white hover:bg-accent/80 active:bg-accent/60"
              >
                <UserPlus className="h-4 w-4 md:mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Currently added */}
          {invitedEmails.length > 0 && (
            <div className="flex flex-col border rounded-md py-2 px-3 max-h-32 overflow-y-auto">
              <h2 className="text-sm font-semibold mb-1">Currently Added</h2>
              <Separator className="mb-2" />
              <div className="flex flex-col space-y-1">
                {invitedEmails.map((email) => (
                  <div
                    key={email}
                    className="flex justify-between items-center text-[14px] text-foreground/75 truncate"
                  >
                    <span className="truncate max-w-[180px]">{email}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInvite(email)}
                      className="cursor-pointer"
                    >
                      <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
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
    </div>
  );
};

export default CreateTeamClient;
