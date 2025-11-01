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
  const { teamList_, files_, userPlan_ } = useContext(TeamContext);

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

  return (
    <div className="grid grid-cols-1 lg:gap-x-4 lg:grid-cols-3 my-5 mx-3">
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

        <div className="col-span-2 flex flex-col md:flex-row w-full gap-4 h-full">
          <div className="p-5 rounded-md bg-secondary flex flex-col flex-1 md:w-1/2 gap-3">
            <h3 className="font-semibold text-primary/80">Teams</h3>
            <div className="max-h-60 w-full relative">
              <BarChart
                type="Teams"
                chartData={groupedData.map(({ day, teams }) => ({
                  day,
                  value: teams,
                }))}
              />
            </div>
          </div>
          <div className="p-5 rounded-md bg-secondary flex flex-col flex-1 md:w-1/2 gap-3">
            <h3 className="font-semibold text-primary/80">Files</h3>
            <div className="min-h-40 max-h-60 w-full relative">
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

      <div className="w-full col-span-1 p-5 rounded-md bg-secondary flex flex-col">
        <h3 className="font-semibold text-primary/80 mb-3">
          Recent Activity (Static Data)
        </h3>
        {/* cards */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-3 rounded-md bg-background/60 hover:bg-background/80 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                👤
              </div>
              <p className="text-sm text-foreground/80 font-semibold">
                Alice joined Marketing Team
              </p>
            </div>
            <span className="text-xs text-foreground/50 whitespace-nowrap">
              5 mins ago
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-md bg-background/60 hover:bg-background/80 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                👤
              </div>
              <p className="text-sm text-foreground/80 font-semibold">
                Design Team uploaded 3 new files
              </p>
            </div>
            <span className="text-xs text-foreground/50 whitespace-nowrap">
              1 hour ago
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-md bg-background/60 hover:bg-background/80 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                👤
              </div>
              <p className="text-sm text-foreground/80 font-semibold">
                You were promoted to Editor in DevOps Team
              </p>
            </div>
            <span className="text-xs text-foreground/50 whitespace-nowrap">
              2 hours ago
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-md bg-background/60 hover:bg-background/80 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                👤
              </div>
              <p className="text-sm text-foreground/80 font-semibold">
                Finance Team created a new report
              </p>
            </div>
            <span className="text-xs text-foreground/50 whitespace-nowrap">
              2 days ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewClient;
