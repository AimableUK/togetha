"use client";

import React, { useEffect, useState } from "react";
import { TeamContext } from "@/app/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { FILE, TEAM, TEAMINVITES } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "../hooks/use-mobile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { toast } from "sonner";

export type USERPLAN = "FREE" | "STARTER" | "PRO";

export default function ClientAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  const { user, isLoading, error }: any = useKindeBrowserClient();
  const [teamList_, setTeamList_] = useState<TEAM[] | null>(null);
  const [activeTeam_, setActiveTeam_] = useState<TEAM | null>(null);
  const [collapseSidebar_, setCollapseSidebar_] = useState(false);
  const [totalFiles_, setTotalFiles_] = useState<number>();
  const [files_, setFiles_] = useState<FILE[] | null | undefined>(undefined);
  const [userPlan_, setUserPlan_] = useState<USERPLAN>("PRO");
  const [updates_, setUpdates_] = useState<TEAMINVITES[]>([]);
  const [userDetails_, setUserDetails_] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    isMobile && setCollapseSidebar_(true);
  }, [isMobile]);

  const email = user?.email ?? "";
  const teams = useQuery(api.teams.getTeam, email ? { email } : "skip");
  const files: FILE[] | undefined = useQuery(
    api.files.getFiles,
    activeTeam_ ? { teamId: activeTeam_?._id } : "skip"
  );

  // Handle auth errors
  useEffect(() => {
    if (error) {
      console.error("Kinde auth error:", error);
      toast.error("Authentication Error", {
        description: "Please sign in again.",
      });
      router.push("/signin");
    }
  }, [error, router]);

  // Handle loading timeout (stuck loading state)
  useEffect(() => {
    if (isLoading || !user) {
      const timeout = setTimeout(() => {
        setLoadingTimeout(true);
        console.warn("Auth loading timeout - redirecting to signin");
        toast.error("Session Timeout", {
          description: "Your session expired. Please sign in again.",
        });
        router.push("/signin");
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (teams === undefined) return;
    if (teams.length) {
      const savedTeamId = localStorage.getItem("activeTeamId");
      let teamToSet = teams[0];

      if (savedTeamId) {
        const found = teams.find((t) => t._id === savedTeamId);
        if (found) {
          teamToSet = found;
        } else {
          localStorage.setItem("activeTeamId", teamToSet._id);
        }
      } else {
        localStorage.setItem("activeTeamId", teamToSet._id);
      }

      setActiveTeam_(teamToSet);
      setTeamList_(teams);
    } else {
      localStorage.removeItem("activeTeamId");
      setActiveTeam_(null);
      setTeamList_(null);

      if (!pathname.includes("teams/create")) {
        router.push("/dashboard/getstarted?mode=onboarding");
      }
    }
  }, [teams, pathname, router]);

  useEffect(() => {
    setFiles_(files ?? null);
    setTotalFiles_(files?.length);
  }, [files]);

  if (isLoading || !user || teams === undefined || loadingTimeout) {
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
        user,
        isLoading,
        teamList_,
        setTeamList_,
        activeTeam_,
        setActiveTeam_,
        collapseSidebar_,
        setCollapseSidebar_,
        totalFiles_,
        files_,
        setFiles_,
        setTotalFiles_,
        userPlan_,
        setUserPlan_,
        updates_,
        setUpdates_,
        userDetails_,
        setUserDetails_,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}
