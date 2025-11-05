import { TeamContext } from "@/app/FilesListContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  ListCollapse,
  Search,
  SendHorizontal,
  TextAlignJustify,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";
import TeamInvite from "../TeamInvite";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TEAM } from "@/lib/utils";

const Header = () => {
  const {
    user,
    collapseSidebar_,
    setCollapseSidebar_,
    isMobile,
    updates_,
    activeTeam_,
  } = useContext(TeamContext);
  const pathname = usePathname();
  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full items-center gap-2 mt-3 px-3">
        <div
          onClick={() => setCollapseSidebar_(!collapseSidebar_)}
          className="flex gap-3 items-center"
        >
          {collapseSidebar_ ? (
            <TextAlignJustify className="trans cursor-pointer active:scale-75 hover:text-accent" />
          ) : (
            <ListCollapse className="trans cursor-pointer active:scale-75 hover:text-accent" />
          )}
          {pathname === "/dashboard" ? (
            <h2 className="hidden md:block font-semibold text-2xl">Overview</h2>
          ) : pathname === "/dashboard/files" ? (
            <h2 className="hidden md:block font-semibold text-2xl">Files</h2>
          ) : pathname === "/dashboard/archieved" ? (
            <h2 className="hidden md:block font-semibold text-2xl">
              Archieved
            </h2>
          ) : (
            <h2 className="hidden md:block font-semibold text-2xl">
              Get Started
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          {(pathname === "/dashboard/files" ||
            pathname === "/dashboard/archieved") && (
            <div className="flex gap-2 items-center px-2">
              <Search className="h-4 w-4 absolute ml-2 " />
              <Input
                placeholder="Search files..."
                className="relative border rounded-md pl-7"
              />
            </div>
          )}

          <div className="flex flex-row gap-x-3 items-center">
            <Link href="/dashboard/notifications" className="relative">
              <Bell className="cursor-pointer relative" />
              {updates_ && (
                <Badge
                  className="-top-3 -right-2 h-5 min-w-5 bg-secondary rounded-full px-1 font-mono tabular-nums absolute"
                  variant="outline"
                >
                  {updates_.length ?? 0}
                </Badge>
              )}
            </Link>

            <div className="flex items-end relative">
              {/* Owner */}
              <div className="z-20">
                <Image
                  src={user?.picture ?? "/user.webp"}
                  alt="Owner"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-inherit shadow-sm"
                />
              </div>

              {activeTeam_?.collaboratorsData.length > 1 &&
                activeTeam_.collaboratorsData
                  ?.filter((c: TEAM) => c.collaboratorEmail !== user?.email)
                  .slice(0, 2)
                  .map(({ c, idx }: TEAM) => (
                    <div
                      key={c.collaboratorEmail}
                      className={`-ml-4 z-${10 - idx}`}
                    >
                      <Image
                        src={c.collaboratorImage ?? "/user.webp"}
                        alt={c.collaboratorName ?? "Unknown User"}
                        width={36}
                        height={36}
                        className="rounded-full border-2 border-inherit shadow-sm"
                      />
                    </div>
                  ))}
            </div>
          </div>
          {isMobile ? (
            <SendHorizontal
              onClick={() => setOpenInviteDialog(true)}
              className="hover:text-accent active:scale-90 cursor-pointer"
            />
          ) : (
            <Button
              onClick={() => setOpenInviteDialog(true)}
              className="bg-accent hover:bg-accent/80 dark:hover:bg-accent/60 active:bg-accent/65 dark:text-foreground/90 cursor-pointer trans"
            >
              <SendHorizontal />
              {!isMobile && "Invite"}
            </Button>
          )}
        </div>
      </div>
      <TeamInvite
        openInviteDialog={openInviteDialog}
        setOpenInviteDialog={setOpenInviteDialog}
      />
    </>
  );
};

export default Header;
