import React, { useContext } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { DeleteData } from "../files/FileList";
import { TeamContext } from "@/app/FilesListContext";
import { TEAM } from "@/lib/utils";

interface DialogProps extends DeleteData {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteDialog = ({ id, type, open, setOpen }: DialogProps) => {
  const fileMutation = useMutation(api.files.deleteFile);
  const teamMutation = useMutation(api.teams.deleteTeam);
  const { user, activeTeam_ } = useContext(TeamContext);

  const currentRole: "Owner" | "Viewer" | "Editor" =
    activeTeam_?.createdBy === user?.email
      ? "Owner"
      : activeTeam_?.collaboratorsData?.find(
          (c: TEAM) => c.collaboratorEmail === user?.email
        )?.collaboratorRole || "Viewer";

  const handleDelete = async () => {
    if (type === "file") {
      if (currentRole === "Viewer") {
        toast.error("Request Edit Access to perform this action");
        return;
      }
      toast.promise(
        fileMutation({ _id: id as Id<"files">, userEmail: user?.email }),
        {
          loading: `Deleting file...`,
          success: () => ({
            message: "File Deleted",
            description: "File deleted successfully!",
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
              message: "Failed to Delete File",
              description: cleanMessage,
            };
          },
        }
      );
    } else {
      toast.promise(
        teamMutation({ _id: id as Id<"teams">, userEmail: user?.email }),
        {
          loading: `Deleting team...`,
          success: () => ({
            message: "Team Deleted",
            description: "Team deleted successfully!",
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
              message: "Failed to Delete Team",
              description: cleanMessage,
            };
          },
        }
      );
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {type}</DialogTitle>
          <DialogDescription className="sr-only">
            Are you sure you want to delete this {type}? This action is not
            reversed
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 gap-2">
          <h3>
            Are you sure you want to delete this {type}? This action is not
            reversed.
          </h3>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            className="flex hover:bg-red-800 dark:hover:bg-red-800 active:bg-red-950 dark:active:bg-red-950 dark:text-foreground/90 cursor-pointer trans"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
