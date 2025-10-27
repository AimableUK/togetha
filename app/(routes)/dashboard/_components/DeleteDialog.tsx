import React, { useContext, useEffect } from "react";
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
import { DeleteData } from "./FileList";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useConvex, useMutation } from "convex/react";
import { TeamContext } from "@/app/FilesListContext";

interface DialogProps extends DeleteData {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteDialog = ({ id, type, open, setOpen }: DialogProps) => {
  const convex = useConvex();
  const deleteData = useMutation(api.files.deleteFile);
  const { fileList_, setFileList_, activeTeam_, setTotalFiles_ } =
    useContext(TeamContext);

  useEffect(() => {
    fileList_ && setFileList_(fileList_);
  }, [fileList_]);

  const handleDelete = async () => {
    toast.promise(
      (async () => {
        await deleteData({
          _id: id as Id<"files">,
        });
        getFiles();
      })(),
      {
        loading: `Deleting ${type}...`,
        success: () => ({
          message: `${type} Deleted`,
          description: `${type} deleted successfully!`,
        }),
        error: (error) => ({
          message: "Error",
          description:
            error?.response?.data?.detail ||
            `Failed to Delete ${type}, Please try again later.`,
        }),
      }
    );
    setOpen(false);
  };

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam_?._id!,
    });
    setTotalFiles_(result?.length);
    setFileList_(result);
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
