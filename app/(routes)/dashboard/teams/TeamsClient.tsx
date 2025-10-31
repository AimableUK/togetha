"use client";

import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TeamsClient = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-x-4 lg:grid-cols-3 my-5 mx-3">
      <div className="flex flex-col mb-4 lg:mb-0 w-full col-span-2 gap-4">
        <div className="col-span-2 flex flex-col md:flex-row w-full gap-4">
          <div className="p-5 rounded-md bg-secondary flex flex-row justify-between items-center w-full">
            <div>
              <h3 className="font-semibold text-primary/80">Total Teams</h3>
              <h3 className="text-4xl font-bold">27</h3>
            </div>
            <div style={{ width: 70, height: 70 }}>
              <CircularProgressbarWithChildren value={66} strokeWidth={13}>
                <div style={{ fontSize: 20, marginTop: -5 }}>
                  <strong>66%</strong>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div className="p-5 rounded-md bg-secondary flex flex-row justify-between items-center w-full">
            <div>
              <h3 className="font-semibold text-primary/80">Total Files</h3>
              <h3 className="text-4xl font-bold">84</h3>
            </div>
            <div style={{ width: 70, height: 70 }}>
              <CircularProgressbarWithChildren value={66} strokeWidth={13}>
                <div style={{ fontSize: 20, marginTop: -5 }}>
                  <strong>74%</strong>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col md:flex-row w-full gap-4 h-full">
          <div className="p-5 rounded-md bg-secondary flex flex-col w-full">
            <h3 className="font-semibold text-primary/80">Teams Activity</h3>
          </div>
          <div className="p-5 rounded-md bg-secondary flex flex-col w-full">
            <h3 className="font-semibold text-primary/80">Files Activity</h3>
          </div>
        </div>
      </div>

      <div className="w-full col-span-1 p-5 rounded-md bg-secondary flex flex-col">
        <h3 className="font-semibold text-primary/80 mb-3">Recent Activity</h3>
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
          <div className="flex items-center justify-between p-3 rounded-md bg-background/60 hover:bg-background/80 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                👤
              </div>
              <p className="text-sm text-foreground/80 font-semibold">
                Phocus added new file to DBMS GROUP
              </p>
            </div>
            <span className="flex-start text-xs text-foreground/50 whitespace-nowrap">
              1 min ago
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsClient;
