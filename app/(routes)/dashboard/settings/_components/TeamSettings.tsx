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

const TeamSettings = () => {
  const { teamList_, activeTeam_, user } = useContext(TeamContext);
  const router = useRouter();
  const [loadingItem, setLoadingItem] = useState<number | string | null>(null);
  const [openedMenu, setOpenedMenu] = useState<number | string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>();
  const [renameTeam, setRenameTeam] = useState<string | null>();
  const [newTeamName, setNewTeamName] = useState("");

  const renameTeamName = useMutation(api.teams.renameTeam);

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

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Teams & Workspaces</h1>
            <p className="opacity-60 text-sm">
              Create and manage your teams and collaborative spaces
            </p>
          </div>
          <button
            onClick={handleCreateTeam}
            disabled={loadingItem !== null}
            className="px-4 py-2 border rounded-lg font-medium hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
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
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <Users size={40} className="mx-auto opacity-30 mb-4" />
              <h3 className="font-semibold mb-2">No teams yet</h3>
              <p className="opacity-60 text-sm mb-4">
                Create your first team to start collaborating
              </p>
              <button className="px-6 py-2 border rounded-lg font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-2">
                <Plus size={18} />
                Create Team
              </button>
            </div>
          ) : (
            teamList_?.map((team: TEAM) => (
              <div
                key={team._id}
                className={` ${openedMenu === team._id && "border-primary"} border rounded-lg p-6 hover:opacity-95 transition-opacity`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg border-2 opacity-30 flex items-center justify-center text-lg">
                        <Users />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 w-[250px] overflow-hidden">
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
                        <p className="text-xs opacity-60">Role: You</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-60 hover:opacity-100">
                    <button
                      onClick={() => setOpenedMenu(team._id)}
                      className="p-2 hover:opacity-80 transition-opacity"
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

                {openedMenu === team._id && (
                  <div className="flex gap-3 flex-wrap border-t pt-3">
                    <button className="cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
                      <Users size={16} />
                      Manage Members
                    </button>
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
                  </div>
                )}
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
