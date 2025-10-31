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
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/app/hooks/use-mobile";
import { TeamContext } from "@/app/FilesListContext";
import Link from "next/link";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user, setActiveTeamInfo }: any) => {
  const [loadingItem, setLoadingItem] = useState<number | string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const {
    collapseSidebar_,
    setCollapseSidebar_,
    teamList_,
    activeTeam_,
    setActiveTeam_,
  } = useContext(TeamContext);
  const isMobile = useIsMobile();

  const menu = [
    { id: 1, name: "Create Team", path: "/teams/create", icon: Users },
    { id: 2, name: "Settings", path: "/settings", icon: Settings },
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

  const onMenuClick = (item: any) => {
    setLoadingItem(item?.id);
    router.push(item.path);

    setTimeout(() => {
      pathname !== "/dashboard" && setLoadingItem(null);
    }, 2000);
  };

  const onTeamsClick = () => {
    if (pathname !== "/dashboard/overview") {
      setLoadingItem("allteams");
      router.push("/dashboard/overview");
    } else {
      setLoadingItem(null);
    }

    setTimeout(() => {
      pathname !== "/dashboard/overview" && setLoadingItem(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger className="w-full relative">
          <div className="flex flex-row items-center gap-x-2 hover:bg-gray-300 dark:hover:bg-gray-800 p-1 md:w-full w-fit rounded-md cursor-pointer">
            <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
            <h2 className="font-semibold justify-between text-xl flex flex-1 items-center">
              <span>{activeTeam_?.teamName}</span>
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <ListCollapse
          className={`${isMobile ? "absolute" : "hidden"} trans cursor-pointer active:scale-75 justify-end right-6 top-9`}
          onClick={() => setCollapseSidebar_(!collapseSidebar_)}
        />

        <PopoverContent className="md:ml-5 p-2 max-h-[410px] w-64">
          {/* Team section */}
          <div className="px-2 overflow-y-auto max-h-40">
            {teamList_?.map((team: TEAM) => (
              <h2
                key={team._id}
                className={`${activeTeam_?._id == team._id && "bg-accent text-foreground/90"}  p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100 cursor-pointer trans`}
                onClick={() => setActiveTeam_(team)}
              >
                {team?.teamName! ?? "Team Name"}
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
      {/* all files button */}
      {/* <Button
        onClick={onTeamsClick}
        variant="outline"
        className="justify-start gap-2 cursor-pointer hover:text-gray-100 dark:hover:text-foreground mt-5"
      >
        {loadingItem === "allteams" && <span className="loader2 w-5!"></span>}
        <LayoutGridIcon /> All Teams
      </Button> */}
    </div>
  );
};

export default SideNavTopSection;
