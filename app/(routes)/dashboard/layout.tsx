"use client";

import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import SideNav from "./_components/SideNav";
import { useIsMobile } from "@/app/hooks/use-mobile";
import Header from "./_components/includes/Header";
import { TeamContext } from "@/app/FilesListContext";
import { UserSync } from "../UserSync";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const { collapseSidebar_, setCollapseSidebar_ } = useContext(TeamContext);

  const noLayoutRoutes = ["/dashboard/getstarted", "/dashboard/teams/create"];
  const hideLayout = noLayoutRoutes.some((route) => pathname.startsWith(route));

  return (
    <>
      <UserSync />

      {hideLayout ? (
        <>{children}</>
      ) : (
        <div className="grid grid-cols-4 gap-1 relative">
          {/* Sidebar */}
          <div
            className={`trans h-screen fixed top-0 left-0 shadow-lg z-50 bg-primary
            ${collapseSidebar_ ? "w-0 hidden" : "w-60"}
            ${!isMobile ? "w-60" : ""} 
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
              isMobile ? "ml-0" : collapseSidebar_ ? "ml-0" : "ml-60"
            }`}
          >
            <Header />
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
