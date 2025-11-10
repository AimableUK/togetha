import {
  ChevronDown,
  Ellipsis,
  EyeOff,
  FilePenLine,
  LayoutGridIcon,
  ListCollapse,
  LogOut,
  Settings,
  SunMoon,
  Trash2,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { TeamContext } from "@/app/FilesListContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import DeleteDialog from "./DeleteDialog";
import { validateName } from "@/app/Schema/schema";
import { TEAM } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/ModeToggle";

export interface DeleteData {
  id: string;
  type: "file" | "team";
}

const SideNavTopSection = ({ user, setActiveTeamInfo }: any) => {
  const [loadingItem, setLoadingItem] = useState<number | string | null>(null);
  const [renameTeam, setRenameTeam] = useState<string | null>();
  const [newTeamName, setNewTeamName] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const renameTeamName = useMutation(api.teams.renameTeam);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState<DeleteData>();

  const {
    collapseSidebar_,
    setCollapseSidebar_,
    teamList_,
    activeTeam_,
    setActiveTeam_,
  } = useContext(TeamContext);
  const isMobile = useIsMobile();
  const logoutRedirectUrl =
    process.env.NEXT_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL!;

  useEffect(() => {
    if (activeTeam_?._id) {
      localStorage.setItem("activeTeamId", activeTeam_._id);
    }
  }, [activeTeam_]);

  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/dashboard/teams/create",
      icon: Users,
    },
    { id: 2, name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  useEffect(() => {
    activeTeam_ && setActiveTeamInfo(activeTeam_);
  }, [activeTeam_]);

  if (activeTeam_ === undefined)
    return (
      <div className="flex flex-col items-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <h3 className="font-bold text-2xl">Togetha</h3>
        </div>
        <div className="loader1"></div>
      </div>
    );

  const currentRole: "Owner" | "Restricted" =
    activeTeam_?.createdBy === user?.email ? "Owner" : "Restricted";

  const onMenuClick = (item: any) => {
    setLoadingItem(item?.id);
    router.push(item.path);

    setTimeout(() => {
      pathname !== "/dashboard" && setLoadingItem(null);
    }, 2000);
  };

  const onTeamsClick = () => {
    if (pathname !== "/dashboard") {
      setLoadingItem("overview");
      router.push("/dashboard");
    } else {
      setLoadingItem(null);
    }

    setTimeout(() => {
      pathname !== "/dashboard/overview" && setLoadingItem(null);
    }, 2000);
  };

  const handleRename = (teamId: string) => {
    if (currentRole === "Restricted") {
      toast.error("This Action is performed by Team Owner");
      return;
    }
    setRenameTeam(teamId);
  };

  const handleRenameTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentRole === "Restricted") {
      toast.error("This Action is performed by Team Owner");
      return;
    }

    const error = validateName(newTeamName);
    if (error) {
      toast.error(error);
    } else {
      toast.promise(
        (async () => {
          await renameTeamName({
            _id: renameTeam as Id<"teams">,
            teamName: newTeamName,
            userEmail: user?.email,
          });
          setRenameTeam(null);
        })(),
        {
          loading: "Renaming Team...",
          success: () => ({
            message: "Team Renamed!",
            description: "Team renamed successfully!",
          }),
          error: (error) => ({
            message: "Error",
            description:
              error?.response?.data?.detail ||
              "Failed to rename Team, To rename a Team you must be its Owner",
          }),
        }
      );
    }
  };

  const handleOpenDialog = (id: string, type: "file" | "team") => {
    if (currentRole === "Restricted") {
      toast.error("This Action is performed by Team Owner");
      return;
    }
    setOpenDialog(true);
    setDeleteData({ id, type });
  };

  return (
    <>
      <div className="flex flex-col">
        <Popover>
          <PopoverTrigger className="w-full relative">
            <div className="flex items-center max-w-[88%] md:max-w-full gap-x-2 hover:bg-gray-300 dark:hover:bg-gray-800 p-1 md:w-full rounded-md cursor-pointer">
              <Image
                src="/logo.png"
                alt="Togetha logo"
                width={35}
                height={35}
              />

              {/* Text + Chevron container */}
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="truncate w-fit">
                  {activeTeam_?.teamName || "Select a Team"}
                </span>
                <ChevronDown className="ml-2 shrink-0" />
              </div>
            </div>
          </PopoverTrigger>

          <ListCollapse
            className={`${isMobile ? "absolute" : "hidden"} hover:text-accent trans cursor-pointer active:scale-75 right-3 top-5`}
            onClick={() => setCollapseSidebar_(!collapseSidebar_)}
          />

          <PopoverContent className="md:ml-5 p-2 max-h-[410px] w-64">
            {/* Team section */}
            <div className="px-2 overflow-y-auto max-h-40">
              {teamList_?.map((team: TEAM) => (
                <div
                  key={team._id}
                  className={` ${activeTeam_?._id == team._id && "bg-accent text-foreground/90"} text-gray-100 p-2 hover:bg-accent/90 dark:hover:bg-accent/60 active:bg-accent/80 dark:active:bg-accent/40 hover:text-gray-100 rounded-md flex flex-row justify-between`}
                >
                  <div className="flex items-center gap-2 w-[250px] overflow-hidden">
                    {renameTeam === team._id ? (
                      <form
                        autoComplete="off"
                        className="flex items-center gap-2 w-full"
                        onSubmit={(e) => handleRenameTeam(e)}
                      >
                        <Input
                          placeholder="Rename file"
                          className="border rounded-md px-2 py-1 text-sm w-full min-w-0"
                          value={newTeamName}
                          onChange={(e) => setNewTeamName(e.target.value)}
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
                          onClick={() => setRenameTeam(null)}
                        >
                          <X className="h-5 w-5 hover:text-red-500" />
                        </button>
                      </form>
                    ) : (
                      <span
                        className="block truncate cursor-pointer max-w-[95%] whitespace-nowrap"
                        onClick={() => setActiveTeam_(team)}
                      >
                        {team?.teamName! ?? "Team Name"}
                      </span>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      {!renameTeam && <Ellipsis className="cursor-pointer" />}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          handleRename(team._id);
                          setNewTeamName(team.teamName);
                        }}
                        className="group p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                      >
                        <FilePenLine className="group-hover:text-gray-100!" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenDialog(team._id, "team")}
                        className="group p-2 rounded-md hover:bg-red-800! dark:hover:bg-red-900! active:bg-accent/80 hover:text-gray-100! cursor-pointer trans"
                      >
                        <Trash2 className="group-hover:text-gray-100!" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
            <Separator className="mt-3 mb-1" />
            {/* menu section */}
            <div className="flex flex-col gap-y-1">
              {menu.map((item, index) => (
                <button
                  onClick={() => onMenuClick(item)}
                  disabled={loadingItem !== null}
                  key={index}
                  className="disabled:opacity-65 flex items-center gap-x-1 p-2 cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {loadingItem === item.id && (
                    <span className="loader2 w-5!"></span>
                  )}
                </button>
              ))}
              <div className="flex flex-row justify-between items-center px-2 py-1 cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans">
                <button className="disabled:opacity-65 flex items-center gap-x-1 cursor-pointer">
                  <SunMoon />
                  Change Theme
                </button>
                <ModeToggle />
              </div>

              <LogoutLink postLogoutRedirectURL={logoutRedirectUrl}>
                <h2 className="flex items-center gap-x-1 p-2 cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans">
                  <LogOut className="h-5 w-5" />
                  Logout
                </h2>
              </LogoutLink>
            </div>
            <Separator className="mt-3 mb-1" />
            {/* use info section */}
            {user && (
              <div className="mt-2 flex items-center gap-1">
                <Image
                  src={user?.picture ?? "/user.webp"}
                  alt="user Image"
                  width={40}
                  height={40}
                  className="rounded-full "
                />
                <div className="flex flex-col overflow-hidden">
                  <h2 className="font-bold text-foreground/85 text-sm truncate">
                    {user?.given_name} {user?.family_name}
                  </h2>
                  <h2 className="text-[14px] text-foreground/75 truncate max-w-[180px]">
                    {user?.email}
                  </h2>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
        {/* dashboard Overview button */}
        <Button
          onClick={onTeamsClick}
          variant="outline"
          className="justify-start gap-2 cursor-pointer hover:text-gray-100 dark:hover:text-foreground mt-5"
        >
          <LayoutGridIcon /> Overview
          {loadingItem === "overview" && <span className="loader2 w-5!"></span>}
        </Button>
      </div>
      {openDialog && deleteData && (
        <DeleteDialog
          id={deleteData?.id!}
          type={deleteData?.type!}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      )}
    </>
  );
};

export default SideNavTopSection;
