import React, { useState } from "react";
import { Archive, FilePlus2, Flag, Github } from "lucide-react";
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

type SideNavBottomProps = {
  onFileCreate: (fileInput: string) => void;
  totalFiles?: number;
};

const SideNavBottomSection = ({
  onFileCreate,
  totalFiles,
}: SideNavBottomProps) => {
  const [fileInput, setFileInput] = useState("");
  const menuList = [
    { id: 0, name: "Getting Started", icon: Flag, path: "" },
    { id: 1, name: "Github", icon: Github, path: "" },
    { id: 2, name: "Archive", icon: Archive, path: "" },
  ];

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex gap-2 p-2 text-xs  cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans"
        >
          {typeof menu.icon === "string" ? (
            <img src={menu.icon} alt={menu.name} className="w-5 h-5" />
          ) : (
            <menu.icon className="w-5 h-5" />
          )}
          {menu.name}
        </h2>
      ))}

      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="mt-3 flex w-full justify-start bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/80 dark:text-foreground/90 cursor-pointer trans">
            <FilePlus2 strokeWidth={2} />
            New file
          </Button>
        </DialogTrigger>
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
      </Dialog>

      <div className="h-3 w-full bg-foreground/20 dark:bg-foreground/50 rounded-full mt-4">
        <div
          className={`h-3 rounded-full transition-all duration-700 ease-in-out`}
          style={{
            width: `${(totalFiles! / 5) * 100}%`,
            backgroundColor: totalFiles! >= 5 ? "#fd0d25" : "#1d64ba",
          }}
        ></div>
      </div>

      <div className="text-xs mt-3">
        <h2>
          <strong>{totalFiles}</strong> Out of <strong>5</strong> files used
        </h2>
        <h2>Upgrade your plan for unlimited access.</h2>
      </div>
    </div>
  );
};

export default SideNavBottomSection;
