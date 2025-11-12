import { TeamContext } from "@/app/FilesListContext";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ListCollapse,
  Search,
  SendHorizontal,
  TextAlignJustify,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import TeamInvite from "../TeamInvite";
import { Badge } from "@/components/ui/badge";
import { TEAM } from "@/lib/utils";
import FilesSearch from "./FilesSearch";

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
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUpdates = async () => {
    setLoading(true);
    router.push("/dashboard/updates");
    setTimeout(() => setLoading(false), 1000);
  };

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
          ) : pathname === "/dashboard/updates" ? (
            <h2 className="hidden md:block font-semibold text-2xl">Updates</h2>
          ) : pathname === "/dashboard/settings" ? (
            <h2 className="hidden md:block font-semibold text-2xl">Settings</h2>
          ) : (
            <h2 className="hidden md:block font-semibold text-2xl">
              Get Started
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2">
          {(pathname === "/dashboard/files" ||
            pathname === "/dashboard/archieved") && <FilesSearch />}
          {(pathname === "/dashboard/files" ||
            pathname === "/dashboard/archieved") && (
            <Search className="h-7 w-7 flex md:hidden" />
          )}

          <div className="flex flex-row gap-x-3 items-center">
            <div className="flex gap-2">
              {loading && <span className="loader2 w-6!"></span>}
              <div onClick={handleUpdates} className="relative">
                <Bell className="cursor-pointer relative" />
                {updates_ && (
                  <Badge
                    className="-top-3 -right-2 h-5 min-w-5 bg-secondary rounded-full px-1 font-mono tabular-nums absolute"
                    variant="outline"
                  >
                    {updates_.length ?? 0}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-end relative">
              {/* Owner */}
              <div className="z-20">
                <Image
                  src={user?.picture ?? "/user.webp"}
                  alt="Owner"
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-background shadow-sm"
                />
              </div>

              {activeTeam_?.collaboratorsData.length > 0 &&
                activeTeam_.collaboratorsData
                  ?.filter((c: TEAM) => c.collaboratorEmail !== user?.email)
                  .slice(0, 2)
                  .map((c: TEAM, idx: number) => (
                    <div
                      key={c.collaboratorEmail}
                      className={`-ml-4 z-${10 - idx}`}
                    >
                      <Image
                        src={c.collaboratorImage ?? "/user.webp"}
                        alt={c.collaboratorName ?? "Unknown User"}
                        width={36}
                        height={36}
                        className="rounded-full border-2 border-background shadow-sm"
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
