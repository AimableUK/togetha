import React, { useContext, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Archive, FilePenLine, MoreHorizontalIcon, Trash2 } from "lucide-react";
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
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { TeamContext } from "@/app/FilesListContext";
import DeleteDialog from "./DeleteDialog";

export interface FILE {
  archieve: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

export interface DeleteData {
  id: string;
  type: "file" | "team";
}

const FileList = () => {
  const { user, isLoading }: any = useKindeBrowserClient();
  const [loadingItem, setLoadingItem] = useState<string | null>();

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>();

  const convex = useConvex();
  const router = useRouter();
  const pathname = usePathname();

  const addToArchieve = useMutation(api.files.addArchieve);
  const { fileList_, setFileList_, activeTeam_ } = useContext(TeamContext);

  useEffect(() => {
    fileList_ && setFileList_(fileList_);
  }, [fileList_]);

  useEffect(() => {
    setLoadingItem(null);
  }, [pathname]);

  const handleAddArchieve = async (fileId: string) => {
    toast.promise(
      (async () => {
        await addToArchieve({
          _id: fileId as Id<"files">,
          archieve: true,
        });
        getFiles();
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

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam_?._id!,
    });
    setFileList_(result);
  };

  const handleViewFile = (fileId: string) => {
    setLoadingItem(fileId);
    router.push("/workspace/" + fileId);
  };

  const handleOpenDialog = (id: string, type: "file" | "team") => {
    setOpenDialog(true);
    setDeleteData({ id, type });
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
                <td className="flex py-3">
                  <span className="loader1"></span>
                </td>
              </tr>
            ) : fileList_ && fileList_.length > 0 ? (
              (() => {
                const activeFiles = fileList_.filter(
                  (file: { archieve: boolean }) => file.archieve === false
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
                      onClick={() => handleViewFile(file._id)}
                      className="flex gap-1 px-3 py-2 whitespace-nowrap cursor-pointer"
                    >
                      {loadingItem === file._id && (
                        <div className="loader2 w-6!"></div>
                      )}
                      {file.fileName}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {formatDistanceToNow(new Date(file._creationTime), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {formatDistanceToNow(new Date(file._creationTime), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <Image
                        src={user?.picture ?? "/user.webp"}
                        alt="User Image"
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
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="group p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100! cursor-pointer trans">
                            <FilePenLine className="group-hover:text-gray-100!" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAddArchieve(file._id)}
                            className="group p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                          >
                            <Archive className="group-hover:text-gray-100!" />
                            Archieve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleOpenDialog(file._id, "file")}
                            className="group p-2 rounded-md hover:bg-red-800! dark:hover:bg-red-900! active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                          >
                            <Trash2 className="group-hover:text-gray-100!" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
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
