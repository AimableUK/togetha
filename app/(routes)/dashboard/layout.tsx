"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { useIsMobile } from "@/app/hooks/use-mobile";
import Image from "next/image";
import Header from "./_components/includes/Header";
import { TeamContext } from "@/app/FilesListContext";
import { UserSync } from "../UserSync";
import { FILE, TEAM } from "@/lib/utils";

export type USERPLAN = "FREE" | "STARTER" | "PRO";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { user, isLoading }: any = useKindeBrowserClient();
  const router = useRouter();
  const [collapseSidebar_, setCollapseSidebar_] = useState(false);

  const [totalFiles_, setTotalFiles_] = useState<number>();
  const [files_, setFiles_] = useState<FILE[] | null | undefined>(undefined);
  const [activeTeam_, setActiveTeam_] = useState<TEAM | null>(null);
  const [teamList_, setTeamList_] = useState<TEAM[] | null>(null);
  const [userPlan_, setUserPlan_] = useState<USERPLAN>("PRO");

  useEffect(() => {
    isMobile && setCollapseSidebar_(true);
  }, [isMobile]);

  const email = user?.email ?? "";
  const teams = useQuery(api.teams.getTeam, email ? { email } : "skip");
  const files: FILE[] | undefined = useQuery(
    api.files.getFiles,
    activeTeam_ ? { teamId: activeTeam_?._id } : "skip"
  );

  useEffect(() => {
    if (teams?.length) {
      setActiveTeam_(teams[0]);
      setTeamList_(teams);
    } else if (teams && !teams.length && !pathname.includes("teams/create")) {
      router.push("/teams/create");
    }
  }, [teams, pathname, router]);

  useEffect(() => {
    setFiles_(files ?? null);
    setTotalFiles_(files?.length);
  }, [files]);

  if (isLoading || !user || teams === undefined) {
    return (
      <div className="flex flex-col items-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <h3 className="font-bold text-2xl">Togetha</h3>
        </div>
        <div className="loader1"></div>
      </div>
    );
  }

  return (
    <TeamContext.Provider
      value={{
        isMobile,
        teamList_,
        activeTeam_,
        setActiveTeam_,
        collapseSidebar_,
        setCollapseSidebar_,
        totalFiles_,
        files_,
        setTotalFiles_,
        userPlan_,
      }}
    >
      <UserSync />
      <div className="grid grid-cols-4 gap-1 relative">
        {/* Sidebar */}
        <div
          className={`trans h-screen fixed top-0 left-0 shadow-lg z-50 bg-primary
            ${collapseSidebar_ ? "w-0 hidden" : "w-72"}
            ${!isMobile ? "w-72" : ""} 
            ${isMobile && !collapseSidebar_ ? "block" : ""}`}
        >
          <SideNav />
        </div>

        {/* Overlay mobile */}
        {isMobile && !collapseSidebar_ && (
          <div
            className="fixed inset-0 bg-black/60 opacity-70 z-40 "
            onClick={() => setCollapseSidebar_(true)}
          />
        )}

        {/* main content */}
        <div
          className={`trans col-span-4 ${
            isMobile ? "ml-0" : collapseSidebar_ ? "ml-0" : "ml-72"
          }`}
        >
          <Header />
          {children}
        </div>
      </div>
    </TeamContext.Provider>
  );
};

export default DashboardLayout;
