"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { CircleArrowLeft, UserPlus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateEmail, validateName } from "@/app/Schema/schema";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TeamContext } from "@/app/FilesListContext";

const CreateTeamClient = () => {
  const [teamName, setTeamName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const createTeam = useMutation(api.teams.createTeam);
  const { user, setActiveTeam_, setTeamList_ } = useContext(TeamContext);
  const router = useRouter();

  const [emailInput, setEmailInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<"Editor" | "Viewer">();
  const [invitedEmails, setInvitedEmails] = useState<
    { email: string; role: string }[]
  >([]);

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
        collaborators: invitedEmails.map((c) => ({
          email: c.email,
          role: c.role as "Editor" | "Viewer",
        })),
      });

      setActiveTeam_(newTeam);
      localStorage.setItem("activeTeamId", newTeam._id);
      setTeamList_((prev: any) => (prev ? [...prev, newTeam] : [newTeam]));

      setInvitedEmails([]);
      setTeamName("");
      setErrorMsg("");

      toast.success(`${teamName} Team created successfully!`);

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail ||
          "Failed to create team, please try again later."
      );
      console.error("Create Team Error:", err);
    }
  };

  const handleAddInvite = () => {
    const trimmed = emailInput.trim().toLowerCase();
    const error = validateEmail(trimmed);
    if (error) {
      setErrorMsg(error);
      return;
    }

    if (!selectedRole) {
      setErrorMsg("Please select a role before adding Email");
      return;
    }

    if (emailInput === user.email) {
      setErrorMsg("You can't invite yourself");
      return;
    }

    const current = invitedEmails || [];

    if (current.some((i) => i.email === trimmed)) {
      setErrorMsg("This email is already invited");
      return;
    }

    setInvitedEmails([...current, { email: trimmed, role: selectedRole }]);
    setEmailInput("");
    setErrorMsg("");
  };

  const handleRemoveInvite = (emailToRemove: string) => {
    setInvitedEmails((prev) =>
      prev.filter((invite) => invite.email !== emailToRemove)
    );
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-3 md:p-16">
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
            <p>Return to Dashboard</p>
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
              <p className="text-red-500 dark:text-red-300 font-semibold text-sm text-center">
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
            <div className="flex gap-1 flex-col lg:flex-row lg:items-center w-full">
              <div className="flex relative w-full">
                <Input
                  id="inviteEmail"
                  value={emailInput}
                  placeholder="Invite via Email address"
                  className="mt-2 h-11 py-2 pr-12 md:pr-24"
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddInvite()}
                />
                <Button
                  onClick={handleAddInvite}
                  disabled={!!validateEmail(emailInput)}
                  className="cursor-pointer disabled:cursor-none absolute right-1 top-3 bottom-1 rounded-md bg-accent text-white hover:bg-accent/80 active:bg-accent/60"
                >
                  <UserPlus className="h-4 w-4 md:mr-1" /> Add
                </Button>
              </div>
              <Select
                onValueChange={(value) =>
                  setSelectedRole(value as "Editor" | "Viewer")
                }
              >
                <SelectTrigger className="w-fit h-11 py-2 mt-2">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Currently added */}
          {invitedEmails.length > 0 && (
            <div className="flex flex-col border rounded-md py-2 px-3 max-h-32 overflow-y-auto">
              <h2 className="text-sm font-semibold mb-1">Currently Added</h2>
              <Separator className="mb-2" />
              <div className="flex flex-col space-y-1">
                {invitedEmails.map((invite) => (
                  <div
                    key={invite.email}
                    className="flex justify-between items-center text-[14px] text-foreground/75 truncate"
                  >
                    <span className="truncate max-w-fit">{invite.email}</span>
                    <div className="flex flex-row items-center">
                      <span className="truncate max-w-fit bg-secondary p-1 px-2 rounded-md">
                        {invite.role}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveInvite(invite.email)}
                        className="cursor-pointer"
                      >
                        <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
                      </Button>
                    </div>
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
