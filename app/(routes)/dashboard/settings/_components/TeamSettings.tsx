import { TeamContext } from "@/app/FilesListContext";
import { TEAM } from "@/lib/utils";
import { format } from "date-fns";
import {
  FilePenLine,
  MoreVertical,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { DeleteData } from "../../_components/SideNavTopSection";
import DeleteDialog from "../../_components/DeleteDialog";
import { toast } from "sonner";
import { validateName } from "@/app/Schema/schema";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const TeamSettings = () => {
  const { teamList_, user } = useContext(TeamContext);
  const router = useRouter();
  const [loadingItem, setLoadingItem] = useState<number | string | null>(null);
  const [openedMenu, setOpenedMenu] = useState<number | string | null>(null);
  const [teamMembers, setTeamMembers] = useState<number | string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>();
  const [renameTeam, setRenameTeam] = useState<string | null>();
  const [newTeamName, setNewTeamName] = useState("");

  const renameTeamName = useMutation(api.teams.renameTeam);
  const updateCollabRole = useMutation(api.teams.updateCollaboratorRole);
  const removeCollab = useMutation(api.teams.removeCollaborator);

  const handleCreateTeam = () => {
    setLoadingItem("createteam");
    router.push("/dashboard/teams/create");

    setTimeout(() => {
      if (window.location.pathname !== "/dashboard") {
        setLoadingItem(null);
      }
    }, 2000);
  };

  const handleRename = (teamId: string) => {
    setRenameTeam(teamId);
  };

  const handleRenameTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateName(newTeamName);
    if (error) {
      toast.error(error);
    } else {
      toast.promise(
        (async () => {
          await renameTeamName({
            _id: renameTeam as Id<"teams">,
            teamName: newTeamName,
            userEmail: user?.email,
          });
          setRenameTeam(null);
        })(),
        {
          loading: "Renaming Team...",
          success: () => ({
            message: "Team Renamed!",
            description: "Team renamed successfully!",
          }),
          error: (error) => ({
            message: "Error",
            description:
              error?.response?.data?.detail ||
              "Failed to rename Team, To rename a Team you must be its Owner",
          }),
        }
      );
    }
  };

  const handleOpenDialog = (id: string, type: "file" | "team") => {
    setOpenDialog(true);
    setDeleteData({ id, type });
  };

  const handleOpenMenu = (teamId: string) => {
    setOpenedMenu(openedMenu === teamId ? null : teamId);
  };

  const handleViewMembers = (teamId: string) => {
    setTeamMembers(teamMembers === teamId ? null : teamId);
  };

  const handleChangeRole = async (
    team: TEAM,
    email: string,
    newRole: "Editor" | "Viewer"
  ) => {
    if (team.createdBy !== user?.email) {
      toast.error("Only the team owner can update roles");
      return;
    }

    const promise = updateCollabRole({
      teamId: team._id as Id<"teams">,
      email,
      role: newRole,
      requesterEmail: user?.email,
    });

    toast.promise(promise, {
      loading: `Updating role for ${email}...`,
      success: (res) => ({
        message: "Role Updated",
        description: `${res.email} is set to ${res.role} Role`,
      }),
      error: (err) => {
        let cleanMessage = err?.message;

        if (cleanMessage?.includes("missing the required field")) {
          const fieldMatch = cleanMessage.match(
            /missing the required field `(\w+)`/
          );
          const field = fieldMatch?.[1] || "field";
          cleanMessage = `Missing required field: ${field}`;
        } else {
          cleanMessage =
            cleanMessage
              ?.split("Uncaught Error: ")?.[1]
              ?.split("at handler")?.[0]
              ?.trim() ||
            cleanMessage?.replace(/\[.*?\]/g, "").trim() ||
            "Something went wrong, please try again.";
        }

        return {
          message: "Failed to Update Role",
          description: cleanMessage,
        };
      },
    });
  };

  const handleRemoveCollaborator = async (team: TEAM, email: string) => {
    if (team.createdBy !== user?.email) {
      toast.error("Only the team owner can remove a collaborator");
      return;
    }
    const promise = removeCollab({
      teamId: team._id as Id<"teams">,
      email,
      requesterEmail: user?.email,
    });

    toast.promise(promise, {
      loading: `Removing ${email}...`,
      success: (res) => ({
        message: "Collaborator Removed",
        description: `${res.email} has been removed from the team`,
      }),
      error: (err) => {
        let cleanMessage =
          err?.message
            ?.split("Uncaught Error: ")[1]
            ?.split("at handler")[0]
            ?.trim() ||
          err?.message?.replace(/\[.*?\]/g, "").trim() ||
          "Something went wrong, please try again.";

        return {
          message: "Failed to Remove Collaborator",
          description: cleanMessage,
        };
      },
    });
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <div>
            <h1 className="text-xl md:text-3xl font-bold mb-1">
              Teams & Workspaces
            </h1>
            <p className="opacity-60 text-sm">
              Create and manage your teams and collaborative spaces
            </p>
          </div>
          <button
            onClick={handleCreateTeam}
            disabled={loadingItem !== null}
            className="w-fit px-4 py-2 border rounded-lg font-medium hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
          >
            {loadingItem === "createteam" && (
              <span className="loader2 w-5!"></span>
            )}
            <Plus size={18} />
            Create Team
          </button>
        </div>

        <div className="space-y-4">
          {teamList_ && teamList_?.length === null ? (
            <div className="border-2 border-dashed rounded-lg p-12 flex flex-col text-center items-center">
              <Users size={40} className="mx-auto opacity-30 mb-4" />
              <h3 className="font-semibold mb-2">No teams yet</h3>
              <p className="opacity-60 text-sm mb-4">
                Create your first team to start collaborating
              </p>
              <button
                onClick={handleCreateTeam}
                disabled={loadingItem !== null}
                className="flex self-center px-4 py-2 border rounded-lg font-medium hover:opacity-80 transition-opacity whitespace-nowrap items-center gap-2 cursor-pointer"
              >
                {loadingItem === "createteam" && (
                  <span className="loader2 w-5!"></span>
                )}
                <Plus size={18} />
                Create Team
              </button>
            </div>
          ) : (
            teamList_?.map((team: any) => (
              <div
                key={team._id}
                className={` ${openedMenu === team._id && "border-primary"} border rounded-lg p-3 md:p-6 hover:opacity-95 transition-opacity`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg border-2 opacity-30 flex items-center justify-center text-lg">
                        <Users />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 overflow-hidden">
                          {renameTeam === team._id ? (
                            <form
                              autoComplete="off"
                              className="flex items-center gap-2 w-full"
                              onSubmit={(e) => handleRenameTeam(e)}
                            >
                              <Input
                                placeholder="Rename file"
                                className="border rounded-md px-2 py-1 text-sm w-full min-w-0"
                                value={newTeamName}
                                onChange={(e) => setNewTeamName(e.target.value)}
                              />
                              <button
                                type="submit"
                                className="cursor-pointer shrink-0"
                              >
                                <FilePenLine className="h-5 w-5 hover:text-accent" />
                              </button>
                              <button
                                type="button"
                                className="cursor-pointer shrink-0"
                                onClick={() => setRenameTeam(null)}
                              >
                                <X className="h-5 w-5 hover:text-red-500" />
                              </button>
                            </form>
                          ) : (
                            <h3 className="font-semibold text-lg">
                              {team.teamName}
                            </h3>
                          )}
                        </div>
                        <p className="text-xs opacity-60">
                          Role:{" "}
                          {team?.createdBy === user?.email
                            ? "Owner"
                            : "Collaborator"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-60 hover:opacity-100">
                    <button
                      onClick={() => handleOpenMenu(team._id)}
                      className="cursor-pointer hover:bg-secondary trans rounded-full p-2 hover:opacity-80 transition-opacity"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-3 border-t mb-2">
                  <div>
                    <p className="text-xs opacity-60 mb-1">Members</p>
                    <p className="font-semibold text-lg">
                      {team.collaborators?.length || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-60 mb-1">Created</p>
                    <p className="font-semibold text-sm">
                      {format(
                        new Date(team?._creationTime ?? 0),
                        "MMM d, yyyy"
                      )}
                    </p>
                  </div>
                </div>

                {/* actions */}
                {openedMenu === team._id && (
                  <div className="menu-enter flex gap-3 flex-wrap border-t py-2 mb-3 overflow-hidden">
                    <button
                      onClick={() => handleViewMembers(team._id)}
                      className="cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                    >
                      <Users size={16} />
                      {teamMembers === team._id
                        ? "Hide Members"
                        : "View Members"}
                    </button>
                    {team?.createdBy === user?.email && (
                      <>
                        <button
                          onClick={() => {
                            handleRename(team._id);
                            setNewTeamName(team.teamName);
                          }}
                          className="cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                        >
                          <FilePenLine size={16} />
                          Rename
                        </button>
                        <button
                          onClick={() => handleOpenDialog(team._id, "team")}
                          className="cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* members */}
                <>
                  {teamMembers === team._id &&
                  openedMenu === team._id &&
                  team?.collaboratorsData.length > 0
                    ? team.collaboratorsData.map((c: TEAM) => (
                        <div
                          key={c.collaboratorEmail}
                          className="flex items-center justify-between w-full gap-2 mb-3 menu-enter overflow-hidden"
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
                          <div className="flex justify-end w-[140px] shrink-0">
                            <div className="flex justify-end w-[140px] shrink-0">
                              {c.collaboratorEmail === team.createdBy ? (
                                <h2 className="text-5 text-foreground/75 truncate">
                                  Owner
                                </h2>
                              ) : team.createdBy === user?.email ? (
                                <Select
                                  value={c.collaboratorRole}
                                  onValueChange={(value) => {
                                    if (value === "remove") {
                                      handleRemoveCollaborator(
                                        team,
                                        c.collaboratorEmail!
                                      );
                                    } else {
                                      handleChangeRole(
                                        team,
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
                                      <SelectItem value="Viewer">
                                        Viewer
                                      </SelectItem>
                                      <SelectItem value="Editor">
                                        Editor
                                      </SelectItem>
                                      <SelectItem value="remove">
                                        Remove Collaborator
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <h2 className="text-5 text-foreground/75 truncate">
                                  {c.collaboratorRole}
                                </h2>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </>
              </div>
            ))
          )}
        </div>
      </div>
      {openDialog && deleteData && (
        <DeleteDialog
          id={deleteData?.id!}
          type={deleteData?.type!}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      )}
    </>
  );
};

export default TeamSettings;
