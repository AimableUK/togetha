"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SendHorizontal, UserPlus, X } from "lucide-react";
import { validateEmail } from "@/app/Schema/schema";
import { useContext, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { TeamContext } from "@/app/FilesListContext";

export default function StepInviteMembers() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const addCollabs = useMutation(api.teams.addCollaborators);
  const { user, activeTeam_ } = useContext(TeamContext);

  const [emailInput, setEmailInput] = useState("");
  const [selectedRole, setSelectedRole] = useState<"Editor" | "Viewer">();
  const [invitedEmails, setInvitedEmails] = useState<
    { email: string; role: string }[]
  >([]);

  const sendInvites = async () => {
    if (!invitedEmails.length) {
      setErrorMsg("No collaborators to invite");
      return;
    }

    const promise = addCollabs({
      teamId: activeTeam_._id,
      collaborators: invitedEmails.map((c) => ({
        email: c.email,
        role: c.role as "Editor" | "Viewer",
      })),
      invitedBy: user.email,
    });

    try {
      const res = await promise;

      const added = res.results.filter((r) => r.status === "pending").length;
      const alreadyInvited = res.results.filter(
        (r) => r.status === "Already invited"
      );
      const alreadyCollaborator = res.results.filter(
        (r) => r.status === "Already collaborator"
      );

      let description = `${added} collaborator(s) invited successfully.`;
      if (alreadyInvited.length) {
        description += `\n${alreadyInvited.map((r) => r.email).join(", ")} already invited.`;
      }
      if (alreadyCollaborator.length) {
        description += `\n${alreadyCollaborator.map((r) => r.email).join(", ")} already a collaborator.`;
      }

      toast("Invite Results", {
        description,
      });

      setInvitedEmails([]);
      setSuccessMsg("Invite process completed! Click Next to Continue.");
    } catch (err: any) {
      toast.error("Invite Failed", {
        description:
          err?.message
            ?.split("Uncaught Error: ")[1]
            ?.split("at handler")[0]
            ?.trim() || "Something went wrong, please try again.",
      });
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

  return (
    <div className="flex flex-col items-center justify-center w-full text-center space-y-2">
      <h2 className="text-lg font-semibold">Invite Collaborators</h2>
      <p className="hidden md:flex text-sm text-muted-foreground">
        Add teammates by entering their email addresses.
      </p>

      <div className="flex-1 gap-2 w-full flex flex-col items-center">
        <h2>Invite Collaborators (Optional)</h2>
        {errorMsg && (
          <div className="rounded-md py-2 px-3 bg-secondary flex items-center border border-red-400">
            <p className="text-red-300 font-semibold text-sm text-center">
              {errorMsg}
            </p>
          </div>
        )}
        {successMsg && (
          <div className="rounded-md py-2 px-3 bg-secondary flex items-center border border-green-400">
            <p className="text-green-300 font-semibold text-sm text-center">
              {successMsg}
            </p>
          </div>
        )}
        <Label htmlFor="fileName" className="sr-only">
          Enter Email
        </Label>
        <div className="flex justify-center gap-1 flex-col lg:flex-row lg:items-center w-11/12 md:w-1/2">
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
              <UserPlus className="h-4 w-4 md:mr-1" />{" "}
              <span className="hidden md:block">Add</span>
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
        {/* currently invited */}
        {invitedEmails.length > 0 && (
          <div className="flex flex-col border rounded-md py-2 px-3 max-h-40 overflow-y-auto w-11/12 md:w-1/2">
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
        disabled={!(invitedEmails && invitedEmails?.length > 0)}
        className="bg-accent dark:text-gray-100 hover:bg-[#0742a2] cursor-pointer"
        onClick={sendInvites}
      >
        <SendHorizontal className="h-4 w-4 md:mr-1" /> Send Invite
      </Button>
    </div>
  );
}
