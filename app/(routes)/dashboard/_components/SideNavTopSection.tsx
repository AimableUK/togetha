import {
  ChevronDown,
  LayoutGridIcon,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTopSection = ({ user, setActiveTeamInfo }: any) => {
  const [teamList, setTeamList] = useState<TEAM[]>();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const router = useRouter();
  const convex = useConvex();
  const menu = [
    { id: 1, name: "Create Team", path: "teams/create", icon: Users },
    { id: 2, name: "Settings", path: "", icon: Settings },
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
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger className="w-full">
          <div className="flex flex-row items-center gap-x-2 hover:bg-gray-300 dark:hover:bg-gray-800 p-2 rounded-md cursor-pointer">
            <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
            <h2 className="font-semibold text-xl flex gap-2 items-center">
              {activeTeam?.teamName}
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>

        <PopoverContent className="md:ml-5 p-2">
          {/* Team section */}
          <div className="px-2">
            <h2>
              {teamList?.map((team, index) => (
                <h2
                  key={index}
                  className={`${activeTeam?._id == team._id && "bg-accent text-foreground/90"}  p-2 rounded-md hover:bg-accent active:bg-accent/80 hover:text-gray-100 cursor-pointer trans`}
                  onClick={() => setActiveTeam(team)}
                >
                  {team.teamName}
                </h2>
              ))}
            </h2>
          </div>
          <Separator className="mt-3 mb-1" />
          {/* menu section */}
          <div className="flex flex-col gap-y-1">
            {menu.map((item, index) => (
              <h2
                key={index}
                className="flex items-center gap-x-1 p-2 cursor-pointer rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 font-semibold trans"
                onClick={() => onMenuClick(item)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </h2>
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
                src={user?.picture}
                alt="user Image"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h2 className="flex flex-col text-xl font-bold text-foreground/85">
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
