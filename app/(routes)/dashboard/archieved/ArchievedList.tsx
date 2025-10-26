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

const ArchievedList = () => {
  const { fileList_ } = useContext(TeamContext);
  const [fileList, setFileList] = useState<FILE[]>();
  const { user, isLoading }: any = useKindeBrowserClient();
  const [loadingItem, setLoadingItem] = useState<string | null>();
  const router = useRouter();
  const pathname = usePathname();

  const removeFromArchieve = useMutation(api.files.undoArchieve);
  const convex = useConvex();
  const { setFileList_, activeTeam_ } = useContext(TeamContext);

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  useEffect(() => {
    setLoadingItem(null);
  }, [pathname]);

  const handleRemoveArchieve = async (fileId: string) => {
    toast.promise(
      (async () => {
        await removeFromArchieve({
          _id: fileId as Id<"files">,
          archieve: false,
        });
        getFiles();
      })(),
      {
        loading: "Restoring Archieve...",
        success: () => ({
          message: "File Restored!",
          description: "File unarchieved successfully!",
        }),
        error: (error) => ({
          message: "Error",
          description:
            error?.response?.data?.detail || "Failed to process your request.",
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
            ) : fileList && fileList.length > 0 ? (
              fileList
                .filter((file) => file.archieve === true)
                .map((file) => (
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
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="group p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100! cursor-pointer trans">
                            <FilePenLine className="group-hover:text-gray-100!" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRemoveArchieve(file._id)}
                            className="group p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                          >
                            <Archive className="group-hover:text-gray-100!" />
                            Undo Archieve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="group p-2 rounded-md hover:bg-red-800! dark:hover:bg-red-900! active:bg-accent/80 hover:text-gray-100! cursor-pointer trans">
                            <Trash2 className="group-hover:text-gray-100!" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="bg-foreground/5">
                <td colSpan={5} className="px-3 py-2 text-center">
                  No Archieved files.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchievedList;
