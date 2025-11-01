"use client";

import React, { useEffect, useState } from "react";
import { Archive, FilePlus2, Files, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";

type SideNavBottomProps = {
  onFileCreate: (fileInput: string) => void;
  totalFiles?: number;
  errorMsg: string;
};

const SideNavBottomSection = ({
  onFileCreate,
  totalFiles,
  errorMsg,
}: SideNavBottomProps) => {
  const [loadingItem, setLoadingItem] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [fileInput, setFileInput] = useState("");
  const menuList = [
    {
      id: 0,
      name: "Getting Started",
      icon: Flag,
      path: "/dashboard/getstarted",
    },
    { id: 1, name: "Files", icon: Files, path: "/dashboard/files" },
    { id: 2, name: "Archieved", icon: Archive, path: "/dashboard/archieved" },
  ];

  useEffect(() => {
    const activeItem = menuList.find((menu) => pathname === menu.path);
    if (activeItem) setLoadingItem(null);
  }, [pathname]);

  const onBottomMenuClick = (item: any) => {
    if (pathname === item.path) return;
    setLoadingItem(item.id);
    router.push(item.path);
  };

  return (
    <div>
      {menuList.map((menu, index) => (
        <button
          key={index}
          onClick={() => onBottomMenuClick(menu)}
          className={`${pathname === menu.path && "bg-secondary"} w-full flex gap-2 p-2 text-xs  cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans`}
        >
          {typeof menu.icon === "string" ? (
            <img src={menu.icon} alt={menu.name} className="w-5 h-5" />
          ) : (
            <menu.icon className="w-5 h-5" />
          )}
          {menu.name}
          {loadingItem === menu.id && <span className="loader2 w-5!"></span>}
        </button>
      ))}

      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="mt-3 flex w-full justify-start bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans">
            <FilePlus2 strokeWidth={2} />
            New file
          </Button>
        </DialogTrigger>
        {/* {totalFiles! < Constant.MAX_FREE_FILES ? ( */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New</DialogTitle>
            <DialogDescription>
              Create a new file in the space provided below
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 gap-2">
            <Label htmlFor="fileName" className="sr-only">
              Link
            </Label>
            <Input
              id="fileName"
              placeholder="Enter File Name"
              className="mt-2"
              onChange={(e) => setFileInput(e.target.value)}
            />
            {errorMsg && (
              <p className="text-red-300 font-semibold text-sm mt-2">
                {errorMsg}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/80 dark:text-foreground/90 cursor-pointer trans"
              disabled={!(fileInput && fileInput.length > 2)}
              onClick={() => onFileCreate(fileInput)}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
        {/* )  */}
      </Dialog>

      {/* <div className="h-3 w-full bg-foreground/20 dark:bg-foreground/50 rounded-full mt-4">
        <div
          className={`h-3 rounded-full transition-all duration-700 ease-in-out`}
          style={{
            width: `${(totalFiles! / 5) * 100}%`,
            backgroundColor: totalFiles! >= 5 ? "#fd0d25" : "#1d64ba",
          }}
        ></div>
      </div> */}

      {/* <div className="text-xs mt-3">
        <h2>
          <strong>{totalFiles}</strong> Out of{" "}
          <strong>{Constant.MAX_FREE_FILES}</strong> files used
        </h2>
        <h2>Upgrade your plan for unlimited access.</h2>
      </div> */}
    </div>
  );
};

export default SideNavBottomSection;
