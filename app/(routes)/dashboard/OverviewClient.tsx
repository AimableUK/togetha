"use client";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BarChart from "./_components/BarChart";
import { useContext, useMemo } from "react";
import { TeamContext } from "@/app/FilesListContext";
import {
  FREE_PLAN_LIMITS,
  PRO_PLAN_LIMITS,
  STARTER_PLAN_LIMITS,
} from "@/app/_constant/Constant";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MotivationBanner from "./_components/MotivationBanner";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { TEAM } from "@/lib/utils";

type CreationItem = {
  _creationTime: number;
  [key: string]: any;
};

type GroupedDataItem = {
  day: string;
  teams: number;
  files: number;
};

const OverviewClient = () => {
  const { activeTeam_, teamList_, files_, userPlan_, user } =
    useContext(TeamContext);

  const userPlanLimits = useMemo(() => {
    switch (userPlan_) {
      case "PRO":
        return PRO_PLAN_LIMITS;
      case "STARTER":
        return STARTER_PLAN_LIMITS;
      default:
        return FREE_PLAN_LIMITS;
    }
  }, [userPlan_]);

  const teamUsagePercent = isFinite(userPlanLimits.teams)
    ? Math.min(((teamList_?.length ?? 0) / userPlanLimits.teams) * 100, 100)
    : 100;

  const fileUsagePercent = isFinite(userPlanLimits.files)
    ? Math.min(((files_?.length ?? 0) / userPlanLimits.files) * 100, 100)
    : 100;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const groupedData = daysOfWeek.map((day) => ({
    day,
    teams: 0,
    files: 0,
  }));

  const countByDay = ({
    items,
    key,
    groupedData,
  }: {
    items: CreationItem[];
    key: "teams" | "files";
    groupedData: GroupedDataItem[];
  }) => {
    items?.forEach((item) => {
      const date = new Date(item._creationTime);
      const day = date.toLocaleString("en-US", { weekday: "short" });
      const found = groupedData.find((d) => d.day === day);
      if (found) found[key] += 1;
    });
  };

  countByDay({ items: teamList_, key: "teams", groupedData });
  countByDay({ items: files_, key: "files", groupedData });

  daysOfWeek.forEach((day) => {
    if (!groupedData.find((d) => d.day === day)) {
      groupedData.push({ day, teams: 0, files: 0 });
    }
  });

  groupedData.sort(
    (a, b) => daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day)
  );

  const today = new Date().toDateString();

  const filesTodayCount =
    files_?.filter(
      (file: CreationItem) =>
        new Date(file._creationTime).toDateString() === today
    ).length ?? 0;

  const category: "high" | "medium" | "low" =
    filesTodayCount >= 2 ? "high" : filesTodayCount === 1 ? "medium" : "low";

  return (
    <div className="flex flex-col gap-4 my-5 mx-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-4 h-full">
        <div className="relative col-span-2 bg-secondary rounded-lg px-5 py-3 flex flex-col justify-center trans">
          <div className="rounded-2xl flex whitespace-nowrap px-3 bg-secondary border border-accent w-fit absolute -top-3 right-3 font-semibold">
            Daily Check-In
          </div>
          <h2 className="font-semibold">Welcome Back! {user.family_name}</h2>
          {category && <MotivationBanner category={category} files_={files_} />}
        </div>
        <div className="col-span-1 relative bg-secondary rounded-lg px-5 py-3 mt-4 md:mt-0">
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold">Upgrade to PRO for more resources</h2>
            <Button className="w-fit btn-grad">Upgrade Now</Button>
          </div>
          <Image
            src="/upgrade-pro.png"
            alt="Upgrade to Pro to get More Togetha features"
            width={200}
            height={200}
            className="absolute bottom-0 right-0 w-24 md:w-20 lg:w-24"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:gap-x-4 lg:grid-cols-3 w-full">
        <div className="flex flex-col mb-4 lg:mb-0 w-full col-span-2 gap-4">
          <div className="col-span-2 flex flex-col md:flex-row w-full gap-4">
            <div className="p-5 rounded-md bg-secondary flex flex-row justify-between items-center w-full">
              <div>
                <h3 className="font-semibold text-primary/80">Total Teams</h3>
                <h3 className="text-4xl font-bold">{teamList_?.length ?? 0}</h3>
              </div>

              <div style={{ width: 70, height: 70 }}>
                <CircularProgressbarWithChildren
                  value={teamUsagePercent}
                  strokeWidth={13}
                >
                  <div style={{ fontSize: 18, marginTop: 0 }}>
                    <strong>
                      {isFinite(userPlanLimits.teams)
                        ? `${teamList_?.length ?? 0}/${userPlanLimits.teams}`
                        : `${teamList_?.length ?? 0}`}
                    </strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div className="p-5 rounded-md bg-secondary flex flex-row justify-between items-center w-full">
              <div>
                <h3 className="font-semibold text-primary/80">
                  Active Team Files
                </h3>
                <h3 className="text-4xl font-bold">{files_?.length ?? 0}</h3>
              </div>
              <div style={{ width: 70, height: 70 }}>
                <CircularProgressbarWithChildren
                  value={fileUsagePercent}
                  strokeWidth={13}
                >
                  <div style={{ fontSize: 18, marginTop: 0 }}>
                    <strong>
                      {isFinite(userPlanLimits.files)
                        ? `${files_?.length ?? 0}/${userPlanLimits.files}`
                        : `${files_?.length ?? 0}`}
                    </strong>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
          </div>

          <div className="col-span-2 flex flex-col md:flex-row w-full gap-4">
            <div className="p-5 rounded-md bg-secondary flex flex-col gap-3 flex-1 min-w-0">
              <h3 className="font-semibold text-primary/80">Teams</h3>
              <div className="min-h-40 max-h-60 w-full min-w-0">
                <BarChart
                  type="Teams"
                  chartData={groupedData.map(({ day, teams }) => ({
                    day,
                    value: teams,
                  }))}
                />
              </div>
            </div>
            <div className="p-5 rounded-md bg-secondary flex flex-col gap-3 flex-1 min-w-0">
              <h3 className="font-semibold text-primary/80">Files</h3>
              <div className="min-h-40 max-h-60 w-full min-w-0">
                <BarChart
                  type="Files"
                  chartData={groupedData.map(({ day, files }) => ({
                    day,
                    value: files,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full col-span-1 p-3 rounded-md bg-secondary flex flex-col">
          <h3 className="font-semibold text-primary/80 mb-3">
            Team Collaborators
          </h3>

          {/* cards */}
          <div className="flex flex-col gap-y-1">
            {activeTeam_?.collaboratorsData.length > 1 &&
              activeTeam_.collaboratorsData.map((c: TEAM) => (
                <div
                  key={c.collaboratorEmail}
                  className="flex items-center justify-between w-full gap-2 bg-background/60 hover:bg-background/80 trans rounded-md p-2"
                >
                  {/* Collaborator Info */}
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Image
                      src={c.collaboratorImage ?? "/user.webp"}
                      alt={c.collaboratorName ?? "Team Collaborator"}
                      width={40}
                      height={40}
                      className="rounded-full w-8 md:w-10 shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h2 className="font-bold text-foreground/85 text-xs md:text-sm truncate">
                        {c.collaboratorName}
                      </h2>
                      <h2 className="text-[12.5px] md:text-[14px] text-foreground/75 truncate">
                        {c.collaboratorEmail}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* end updates */}
        </div>
      </div>
    </div>
  );
};

export default OverviewClient;
