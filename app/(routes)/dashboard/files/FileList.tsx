"use client";

import React, { useContext, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import {
  Archive,
  EyeOff,
  FilePenLine,
  MoreHorizontalIcon,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { TeamContext } from "@/app/FilesListContext";

import { Input } from "@/components/ui/input";
import DeleteDialog from "../_components/DeleteDialog";
import { FILE, TEAM } from "@/lib/utils";
import { validateName } from "@/app/Schema/schema";

export interface DeleteData {
  id: string;
  type: "file" | "team";
}

const FileList = () => {
  const { isLoading }: any = useKindeBrowserClient();
  const [loadingItem, setLoadingItem] = useState<string | null>();

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>();
  const [renameFile, setRenameFIle] = useState<string | null>();
  const [newFileName, setNewFileName] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const addToArchieve = useMutation(api.files.addArchieve);
  const renameFileName = useMutation(api.files.renameFile);
  const { user, files_, activeTeam_ } = useContext(TeamContext);

  useEffect(() => {
    setLoadingItem(null);
  }, [pathname]);

  if (files_ === undefined)
    return (
      <div className="fixed inset-0 flex flex-col gap-5 bg-background items-center justify-center z-9999">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <div>
            <h3 className="font-bold text-2xl">Togetha</h3>
            <h4 className="font-semibold">Loading Files</h4>
          </div>
        </div>
        <div className="loader1"></div>
      </div>
    );

  const currentRole: "Owner" | "Viewer" | "Editor" =
    activeTeam_?.createdBy === user?.email
      ? "Owner"
      : activeTeam_?.collaboratorsData?.find(
          (c: TEAM) => c.collaboratorEmail === user?.email
        )?.collaboratorRole || "Viewer";

  const handleAddArchieve = async (fileId: string) => {
    if (currentRole === "Viewer") {
      toast.error("Request Edit Access to perform this action");
      return;
    }

    toast.promise(
      (async () => {
        await addToArchieve({
          _id: fileId as Id<"files">,
          archieve: true,
          userEmail: user?.email,
        });
      })(),
      {
        loading: "Archieving...",
        success: () => ({
          message: "File Archieved!",
          description: "File archieved successfully!",
        }),
        error: (error) => ({
          message: "Error",
          description:
            error?.response?.data?.detail ||
            "Failed to Archieve your file, Please try again later.",
        }),
      }
    );
  };

  const handleViewFile = (fileId: string) => {
    setLoadingItem(fileId);
    router.push("/workspace/" + fileId);
  };

  const handleOpenDialog = (id: string, type: "file" | "team") => {
    if (currentRole === "Viewer") {
      toast.error("Request Edit Access to perform this action");
      return;
    }
    setOpenDialog(true);
    setDeleteData({ id, type });
  };

  const handleRename = (fileId: string) => {
    if (currentRole === "Viewer") {
      toast.error("Request Edit Access to perform this action");
      return;
    }
    setRenameFIle(fileId);
  };

  const handleRenameFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentRole === "Viewer") {
      toast.error("Request Edit Access to perform this action");
      return;
    }

    const error = validateName(newFileName);
    if (error) {
      toast.error(error);
      return;
    } else {
      toast.promise(
        (async () => {
          await renameFileName({
            _id: renameFile as Id<"files">,
            fileName: newFileName,
            userEmail: user?.email,
          });
          setRenameFIle(null);
        })(),
        {
          loading: "Renaming file...",
          success: () => ({
            message: "File Renamed!",
            description: "File renamed successfully!",
          }),
          error: (error) => ({
            message: "Error",
            description:
              error?.response?.data?.detail ||
              "Failed to rename your file, Please try again later.",
          }),
        }
      );
    }
  };

  return (
    <div className="mt-6 p-1 px-2 md:p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2">
          <thead className="sticky top-0 ltr:text-left rtl:text-right">
            <tr className="*:font-medium">
              <th className="px-3 py-2 whitespace-nowrap">File Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Created At</th>
              <th className="px-3 py-2 whitespace-nowrap">Edited At</th>
              <th className="px-3 py-2 whitespace-nowrap">Author</th>
              <th className="px-3 py-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-3 text-center align-middle">
                  <span className="loader2 inline-block"></span>
                </td>
              </tr>
            ) : files_ && files_.length > 0 ? (
              (() => {
                const activeFiles = files_.filter(
                  (files_: FILE) => files_.archieve === false
                );

                if (activeFiles.length === 0) {
                  return (
                    <tr className="bg-foreground/5">
                      <td colSpan={5} className="px-3 py-2 text-center">
                        No active files (all files are archived)
                      </td>
                    </tr>
                  );
                }

                return activeFiles.map((file: any) => (
                  <tr
                    key={file._id}
                    className="odd:bg-foreground/5 hover:bg-foreground/15"
                  >
                    <td
                      onClick={() => !renameFile && handleViewFile(file._id)}
                      className="px-3 py-2 whitespace-nowrap cursor-pointer align-middle"
                      style={{ width: "1%" }}
                    >
                      <div className="flex items-center gap-2 w-[250px] overflow-hidden">
                        {loadingItem === file._id && (
                          <div className="loader2 w-5!" />
                        )}

                        {renameFile === file._id ? (
                          <form
                            autoComplete="off"
                            className="flex items-center gap-2 w-full"
                            onSubmit={(e) => handleRenameFile(e)}
                          >
                            <Input
                              placeholder="Rename file"
                              className="border rounded-md px-2 py-1 text-sm w-full min-w-0"
                              value={newFileName}
                              onChange={(e) => setNewFileName(e.target.value)}
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
                              onClick={() => setRenameFIle(null)}
                            >
                              <X className="h-5 w-5 hover:text-red-500" />
                            </button>
                          </form>
                        ) : (
                          <span className="truncate w-full">
                            {file.fileName}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      {formatDistanceToNow(new Date(file._creationTime), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {file.editedAt
                        ? formatDistanceToNow(new Date(file.editedAt), {
                            addSuffix: true,
                          })
                        : "-"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Image
                        src={file.author?.image ?? "/user.webp"}
                        alt={file.author?.name || "File Creator Image"}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontalIcon className="rounded-md cursor-pointer" />
                        </DropdownMenuTrigger>
                        {currentRole !== "Viewer" ? (
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                handleRename(file._id);
                                setNewFileName(file.fileName);
                              }}
                              className="group p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                            >
                              <FilePenLine className="group-hover:text-gray-100!" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAddArchieve(file._id)}
                              className="group p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                            >
                              <Archive className="group-hover:text-gray-100!" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleOpenDialog(file._id, "file")}
                              className="group p-2 rounded-md hover:bg-red-800! dark:hover:bg-red-900! active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                            >
                              <Trash2 className="group-hover:text-gray-100!" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        ) : (
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="group p-2 rounded-md hover:text-gray-100! trans">
                              <EyeOff className="group-hover:text-gray-100!" />
                              Read-Only Mode
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        )}
                      </DropdownMenu>
                    </td>
                  </tr>
                ));
              })()
            ) : (
              <tr className="bg-foreground/5">
                <td colSpan={5} className="px-3 py-2 text-center">
                  No files available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openDialog && deleteData && (
        <DeleteDialog
          id={deleteData?.id!}
          type={deleteData?.type!}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      )}
    </div>
  );
};

export default FileList;
