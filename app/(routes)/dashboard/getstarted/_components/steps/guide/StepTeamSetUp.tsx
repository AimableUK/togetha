"use client";

import { BookUser, Users } from "lucide-react";

export default function StepTeamSetup() {
  const points = [
    "On the sidebar of your dashboard.",
    "Click your current team name to view team options.",
    "Select 'Create Team', You'll be redirected to the team creation page.'",
    "Enter a team name - you can edit it anytime later, Click 'Create Team'",
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <BookUser className="w-10 h-10 text-indigo-500" />
      <h2 className="text-lg font-semibold">Step 1: Team Setup</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Set up your workspace to bring your teammates together.
      </p>
      <ul className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2 mt-4">
        {points.map((text, i) => (
          <li key={i} className="flex items-start gap-2">
            <Users className="w-4 h-4 text-indigo-400 mt-0.5" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
