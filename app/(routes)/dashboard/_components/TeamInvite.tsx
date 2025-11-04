import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronDown, Link2, LockKeyhole } from "lucide-react";

type TeamInviteProps = {
  openInviteDialog: boolean;
  setOpenInviteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamInvite = ({
  openInviteDialog,
  setOpenInviteDialog,
}: TeamInviteProps) => {
  const [emailInput, setEmailInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { user } = useKindeBrowserClient();

  return (
    <Dialog open={openInviteDialog} onOpenChange={setOpenInviteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite People to Amata Team</DialogTitle>
          <DialogDescription className="sr-only">
            Invite people to Amata Team
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 gap-2">
          <Label htmlFor="fileName" className="sr-only">
            Enter Email
          </Label>
          <div className="flex relative">
            <Input
              id="fileName"
              placeholder="Invite via Email address"
              className="mt-2 relative h-11 py-2 "
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Button className="absolute right-1 top-3 bottom-1 rounded-md bg-accent text-white hover:bg-accent/80 cursor-pointer">
              Invite
            </Button>
          </div>

          {errorMsg && (
            <p className="text-red-300 font-semibold text-sm mt-2">
              {errorMsg}
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-1 mb-3">
          <h2 className="font-semibold">People with access</h2>
          {user && (
            <div className="flex flex-row items-center whitespace-nowrap justify-between">
              <div className="mt-2 flex items-center gap-1">
                <Image
                  src={user?.picture ?? "/user.webp"}
                  alt="user Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col overflow-hidden">
                  <h2 className="font-bold text-foreground/85 text-sm truncate">
                    {user?.given_name} {user?.family_name} (You)
                  </h2>
                  <h2 className="text-[14px] text-foreground/75 truncate max-w-[180px]">
                    {user?.email}
                  </h2>
                </div>
              </div>
              <h3 className="text-foreground/75">Owner</h3>
            </div>
          )}
          <div className="flex flex-row items-center whitespace-nowrap justify-between">
            <div className="mt-2 flex items-center gap-1">
              <Image
                src="/user.webp"
                alt="user Image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col overflow-hidden">
                <h2 className="font-bold text-foreground/85 text-sm truncate">
                  Bugingo Davide
                </h2>
                <h2 className="text-[14px] text-foreground/75 truncate max-w-[180px]">
                  bugingo@gmail.com
                </h2>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-start whitespace-nowrap items-center w-fit cursor-pointer hover:bg-secondary rounded-md p-1 px-2">
                Editor
                <ChevronDown className="w-4" strokeWidth={3} />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Access Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Viewer
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Editor
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Commenter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col ">
            <h2 className="font-semibold">General access</h2>
            <div className="mt-2 flex items-center gap-1">
              <LockKeyhole className="min-h-5" />
              <div className="flex flex-row flex-1 justify-between items-center">
                <div className="flex flex-col overflow-hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-start whitespace-nowrap items-center w-fit cursor-pointer hover:bg-secondary rounded-md p-1 px-2">
                      Restricted
                      <ChevronDown className="w-4" strokeWidth={3} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuLabel>Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        Restricted
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Any one with the link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <h2 className="pl-2 text-[14px] text-foreground/75 truncate">
                    Only people with access can open with the link
                  </h2>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center w-fit cursor-pointer hover:bg-secondary rounded-md p-1 px-2">
                    Viewer
                    <ChevronDown className="w-4 " strokeWidth={3} />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      Viewer
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Editor
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Commenter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            type="button"
            variant="secondary"
            className="px-3 py-1 rounded-full border cursor-pointer"
          >
            <Link2 /> Copy Link
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="px-5 text-white py-1 rounded-full bg-accent hover:bg-accent/80 cursor-pointer"
            >
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamInvite;
