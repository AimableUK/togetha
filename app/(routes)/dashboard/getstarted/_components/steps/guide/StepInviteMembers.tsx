"use client";

import { UserPlus, Share2 } from "lucide-react";

export default function StepInviteMembers() {
  const points = [
    "On the top Navigation of your dashboard",
    "Click 'Invite' and enter their emails.",
    "Assign roles (Editor, Viewer).",
    "Send invites and wait for them to accept.",
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <UserPlus className="w-10 h-10 text-indigo-500" />
      <h2 className="text-lg font-semibold">
        Step 3: Invite Members
      </h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Bring teammates on board to start collaborating together.
      </p>
      <ul className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2 mt-4">
        {points.map((text, i) => (
          <li key={i} className="flex items-start gap-2">
            <Share2 className="w-4 h-4 text-indigo-400 mt-0.5" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
