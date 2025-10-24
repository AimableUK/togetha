"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/FilesListContext";
import { useIsMobile } from "@/app/hooks/use-mobile";
import Image from "next/image";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const convex = useConvex();
  const { user, isLoading }: any = useKindeBrowserClient();
  const router = useRouter();
  const [fileList_, setFileList_] = useState();
  const [collapseSidebar_, setCollapseSidebar_] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isLoading && user?.email) {
      checkTeam();
    }
  }, [user, isLoading]);

  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      if (!window.location.pathname.includes("teams/create")) {
        router.push("/teams/create");
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <h3 className="font-bold text-2xl">Togetha</h3>
        </div>
        <div className="loader1"></div>
      </div>
    );

  return (
    <FileListContext.Provider
      value={{
        isMobile,
        fileList_,
        setFileList_,
        collapseSidebar_,
        setCollapseSidebar_,
      }}
    >
      <div className="grid grid-cols-4 gap-1 relative">
        {/* Sidebar */}
        <div
          className={`trans h-screen fixed top-0 left-0 shadow-lg z-50
            ${collapseSidebar_ ? "w-0" : "w-72"}
            ${!isMobile ? "w-72" : ""} 
            ${isMobile && !collapseSidebar_ ? "block" : ""}`}
        >
          <SideNav />
        </div>

        {/* Overlay mobile */}
        {isMobile && !collapseSidebar_ && (
          <div
            className="fixed inset-0 bg-black/60 opacity-70 z-40"
            onClick={() => setCollapseSidebar_(true)}
          />
        )}

        {/* main content */}
        <div
          className={`trans col-span-4 ${
            isMobile ? "ml-0" : collapseSidebar_ ? "ml-0" : "ml-72"
          }`}
        >
          {children}
        </div>
      </div>
    </FileListContext.Provider>
  );
};

export default DashboardLayout;
