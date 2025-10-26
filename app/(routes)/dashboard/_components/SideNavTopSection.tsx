import {
  ChevronDown,
  LayoutGridIcon,
  ListCollapse,
  LogOut,
  Settings,
  Users,
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
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileListContext } from "@/app/FilesListContext";
import { useIsMobile } from "@/app/hooks/use-mobile";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user, setActiveTeamInfo }: any) => {
  const [loadingItem, setLoadingItem] = useState<number | null>(null);

  const [teamList, setTeamList] = useState<TEAM[]>();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const router = useRouter();
  const convex = useConvex();
  const { collapseSidebar_, setCollapseSidebar_ } = useContext(FileListContext);
  const isMobile = useIsMobile();

  const menu = [
    { id: 1, name: "Create Team", path: "teams/create", icon: Users },
    { id: 2, name: "Settings", path: "/settings", icon: Settings },
  ];

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  const onMenuClick = (item: any) => {
    setLoadingItem(item?.id);
    router.push(item.path);

    setTimeout(() => {
      window.location.pathname !== "/dashboard" && setLoadingItem(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger className="w-full relative">
          <div className="flex flex-row items-center gap-x-2 hover:bg-gray-300 dark:hover:bg-gray-800 p-1 md:w-full w-fit rounded-md cursor-pointer">
            <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
            <h2 className="font-semibold justify-between text-xl flex flex-1 items-center">
              <span>{activeTeam?.teamName}</span>
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <ListCollapse
          className={`${isMobile ? "absolute" : "hidden"} trans cursor-pointer active:scale-75 justify-end right-6 top-9`}
          onClick={() => setCollapseSidebar_(!collapseSidebar_)}
        />

        <PopoverContent className="md:ml-5 p-2">
          {/* Team section */}
          <div className="px-2">
            {teamList?.map((team, index) => (
              <h2
                key={index}
                className={`${activeTeam?._id == team._id && "bg-accent text-foreground/90"}  p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100 cursor-pointer trans`}
                onClick={() => setActiveTeam(team)}
              >
                {team.teamName ?? "Team Name"}
              </h2>
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
            <LogoutLink>
              <h2 className="flex items-center gap-x-1 p-2 cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans">
                <LogOut className="h-5 w-5" />
                Logout
              </h2>
            </LogoutLink>
          </div>
          <Separator className="mt-3 mb-1" />
          {/* use info section */}
          {user && (
            <div className="mt-2 flex gap-2">
              <Image
                src={user?.picture ?? "/user.png"}
                alt="user Image"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h2 className="flex flex-col font-bold text-foreground/85">
                  {user?.given_name} {user?.family_name}
                </h2>
                <h2 className="flex flex-col text-[15px] text-foreground/75">
                  {user?.email}
                </h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {/* all files button */}
      <Button
        variant="outline"
        className="justify-start gap-2 cursor-pointer hover:text-gray-100 dark:hover:text-foreground mt-5"
      >
        <LayoutGridIcon /> All Files
      </Button>
    </div>
  );
};

export default SideNavTopSection;
