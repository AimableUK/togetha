import { FileListContext } from "@/app/FilesListContext";
import React, { useContext, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { Archive, MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
}

const FileList = () => {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    fileList_ && setFileList(fileList_);
  }, [fileList_]);

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2">
          <thead className="sticky top-0 ltr:text-left rtl:text-right">
            <tr className="*:font-medium">
              <th className="px-3 py-2 whitespace-nowrap">File Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Created At</th>
              <th className="px-3 py-2 whitespace-nowrap">Edited At</th>
              <th className="px-3 py-2 whitespace-nowrap">Author</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {fileList && fileList.length > 0 ? (
              fileList.map((file) => (
                <tr
                  key={file._id}
                  className="odd:bg-foreground/5 hover:bg-foreground/15 cursor-pointer"
                  onClick={() => router.push("/workspace/" + file._id)}
                >
                  <td className="px-3 py-2 whitespace-nowrap">
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
                      src={user?.picture ?? "/user.png"}
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
                          <Archive className="group-hover:text-gray-100!" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-foreground/5">
                <td colSpan={5} className="px-3 py-2 text-center">
                  No files Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
