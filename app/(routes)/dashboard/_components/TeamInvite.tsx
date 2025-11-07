import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { ChevronDown, Link2, LockKeyhole, SendHorizontal } from "lucide-react";
import { TeamContext } from "@/app/FilesListContext";
import { TEAM } from "@/lib/utils";
import { validateEmail } from "@/app/Schema/schema";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ExternalToast, toast } from "sonner";

type TeamInviteProps = {
  openInviteDialog: boolean;
  setOpenInviteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamInvite = ({
  openInviteDialog,
  setOpenInviteDialog,
}: TeamInviteProps) => {
  const { user, activeTeam_, setActiveTeam_ } = useContext(TeamContext);
  const [emailInput, setEmailInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedRole, setSelectedRole] = useState<"Editor" | "Viewer">(
    "Viewer"
  );

  const addCollab = useMutation(api.teams.addCollaborator);
  const updateCollabRole = useMutation(api.teams.updateCollaboratorRole);
  const removeCollab = useMutation(api.teams.removeCollaborator);

  const createInvite = async () => {
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

    try {
      const promise = addCollab({
        teamId: activeTeam_._id,
        email: trimmed,
        role: selectedRole,
        invitedBy: user.email,
      });

      toast.promise(promise, {
        loading: "Inviting collaborator...",
        success: {
          message: "Collaborator Invited",
          description: `${trimmed} invited as ${selectedRole}`,
        },
        error: (err) => {
          let cleanMessage =
            err?.message
              ?.split("Uncaught Error: ")[1]
              ?.split("at handler")[0]
              ?.trim() ||
            err?.message?.replace(/\[.*?\]/g, "").trim() ||
            "Something went wrong, please try again.";

          return {
            message: "Failed to Invite Collaborator",
            description: cleanMessage,
          };
        },
      });

      await promise;
      setEmailInput("");
      setErrorMsg("");
    } catch (err: any | ExternalToast) {
      console.error("collaborator Addition Error:");
      setErrorMsg("");
    }
  };

  const handleChangeRole = async (
    email: string,
    newRole: "Editor" | "Viewer"
  ) => {
    const promise = updateCollabRole({
      teamId: activeTeam_._id,
      email,
      role: newRole,
    });

    toast.promise(promise, {
      loading: `Updating role for ${email}...`,
      success: (res) => ({
        message: "Role Updated",
        description: `${res.email} is set to ${res.role} Role`,
      }),
      error: (err) => ({
        message: "Failed to update role",
        description:
          err?.message?.replace(/\[.*?\]/g, "").trim() ||
          "Something went wrong, please try again.",
      }),
    });

    await promise;

    setActiveTeam_((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated.collaborators = updated.collaborators.map((c: any) =>
        c.email === email ? { ...c, role: newRole } : c
      );
      return updated;
    });
  };

  const handleRemoveCollaborator = async (email: string) => {
    const promise = removeCollab({
      teamId: activeTeam_._id,
      email,
    });

    toast.promise(promise, {
      loading: `Removing ${email}...`,
      success: (res) => ({
        message: "Collaborator Removed",
        description: `${res.email} has been removed from the team`,
      }),
      error: (err) => ({
        message: "Failed to remove collaborator",
        description:
          err?.message?.replace(/\[.*?\]/g, "").trim() ||
          "Something went wrong, please try again.",
      }),
    });

    await promise;

    setActiveTeam_((prev: any) => {
      if (!prev) return prev;
      const updated = { ...prev };
      updated.collaborators = updated.collaborators.filter(
        (c: any) => c.email !== email
      );
      return updated;
    });
  };

  return (
    <>
      <Dialog open={openInviteDialog} onOpenChange={setOpenInviteDialog}>
        <DialogContent className="flex flex-col overflow-hidden px-4">
          <DialogHeader>
            <DialogTitle>Invite People to {activeTeam_?.teamName}</DialogTitle>
            <DialogDescription className="sr-only">
              {activeTeam_?.teamName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 gap-2">
            {/* Invite Input */}
            <div className="flex-1 gap-2">
              <Label htmlFor="inviteEmail" className="sr-only">
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
                    onKeyDown={(e) => e.key === "Enter" && createInvite()}
                  />
                  <Button
                    onClick={createInvite}
                    disabled={!!validateEmail(emailInput)}
                    className="cursor-pointer disabled:cursor-none absolute right-1 top-3 bottom-1 rounded-md bg-accent text-white hover:bg-accent/80 active:bg-accent/60"
                  >
                    <SendHorizontal className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:flex">Invite</span>
                  </Button>
                </div>
                <Select
                  value={selectedRole}
                  onValueChange={(value) =>
                    setSelectedRole(value as "Editor" | "Viewer")
                  }
                >
                  <SelectTrigger className=" h-11 py-2 mt-2 w-[100px]">
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

            {errorMsg && (
              <p className="text-red-500 dark:text-red-300 font-semibold text-sm mt-2">
                {errorMsg}
              </p>
            )}
          </div>
          <div className="flex flex-col max-h-30 sm:max-h-48 overflow-y-auto">
            <h2 className="font-semibold text-sm">People with access</h2>
            {user && (
              <div className="flex flex-row mb-2 md:mb-2 items-center whitespace-nowrap justify-between">
                <div className="mt-2 flex items-center gap-1">
                  <Image
                    src={user?.picture ?? "/user.webp"}
                    alt="user Image"
                    width={40}
                    height={40}
                    className="rounded-full w-8 md:w-10"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <h2 className="font-bold text-foreground/85 text-xs md:text-sm truncate">
                      {user?.given_name} {user?.family_name} (You)
                    </h2>
                    <h2 className="text-[12.5px] md:text-[14px] text-foreground/75 truncate max-w-[180px]">
                      {user?.email}
                    </h2>
                  </div>
                </div>
                <h3 className="text-foreground/75">Owner</h3>
              </div>
            )}
            <div className="flex flex-col space-y-1 md:space-y-2">
              {activeTeam_?.collaboratorsData.length > 1 &&
                activeTeam_.collaboratorsData
                  ?.filter((c: TEAM) => c.collaboratorEmail !== user?.email)
                  .map((c: TEAM) => (
                    <div
                      key={c.collaboratorEmail}
                      className="flex items-center justify-between w-full gap-2"
                    >
                      {/* Collaborator Info */}
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Image
                          src={c.collaboratorImage ?? "/user.webp"}
                          alt={c.collaboratorName ?? "Team Collaborator"}
                          width={40}
                          height={40}
                          className="rounded-full w-8 md:w-10 shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          <h2 className="font-bold text-foreground/85 text-xs md:text-sm truncate">
                            {c.collaboratorName}
                          </h2>
                          <h2 className="text-[12.5px] md:text-[14px] text-foreground/75 truncate">
                            {c.collaboratorEmail}
                          </h2>
                        </div>
                      </div>

                      {/* Role select for confirmed collaborators */}
                      {c.status !== "pending" ? (
                        <div className="flex justify-end w-[140px] shrink-0">
                          <div className="flex justify-end w-[140px] shrink-0">
                            <Select
                              value={c.collaboratorRole}
                              onValueChange={(value) => {
                                if (value === "remove") {
                                  handleRemoveCollaborator(
                                    c.collaboratorEmail!
                                  );
                                } else {
                                  handleChangeRole(
                                    c.collaboratorEmail!,
                                    value as "Editor" | "Viewer"
                                  );
                                }
                              }}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Role / Actions</SelectLabel>
                                  <SelectItem value="Viewer">Viewer</SelectItem>
                                  <SelectItem value="Editor">Editor</SelectItem>
                                  <SelectItem value="remove">
                                    Remove Collaborator
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ) : (
                        // Pending collaborators
                        <div className="flex items-center justify-end w-[140px] gap-2 shrink-0">
                          <span className="text-yellow-600 text-sm">
                            Pending
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            // onClick={() => handleUndoInvite(c.collaboratorEmail)}
                          >
                            Undo
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold">General access</h2>
            <div className="md:mt-2 flex items-center gap-1 w-fit">
              <LockKeyhole className="min-h-5 hidden md:block" />
              <div className="flex flex-col md:flex-row flex-1 justify-between md:items-center">
                <div className="flex flex-col">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-start whitespace-nowrap items-center w-fit cursor-pointer hover:bg-secondary rounded-md p-1 px-2">
                      Restricted
                      <ChevronDown className="w-4" strokeWidth={3} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuLabel>Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        Restricted
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Any one with the link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <h2 className="pl-2 text-[14px] text-foreground/75 ">
                    Only people with access can open with the link
                  </h2>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center w-fit cursor-pointer hover:bg-secondary rounded-md p-1 px-2">
                    Viewer
                    <ChevronDown className="w-4 " strokeWidth={3} />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Viewer
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Editor
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-end sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              className="px-3 py-1 rounded-full border cursor-pointer w-fit"
            >
              <Link2 /> Copy Link
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="px-5 text-white py-1 rounded-full bg-accent hover:bg-accent/80 cursor-pointer w-fit"
              >
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamInvite;
