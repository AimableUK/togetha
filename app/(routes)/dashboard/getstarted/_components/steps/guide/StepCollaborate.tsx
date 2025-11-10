"use client";

import { Brain, Rocket } from "lucide-react";

export default function StepCollaborate() {
  const points = [
    "Open a file with your team in real-time.",
    "Start collaborating and discussing instantly.",
    "Track progress and assign tasks to members.",
    "Keep building togetha - your work auto-saves as you go.",
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <Rocket className="w-10 h-10 text-indigo-500" />
      <h2 className="text-lg font-semibold">Step 4: Start Collaborating</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        You're all set! Work togetha and bring your ideas to life.
      </p>
      <ul className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2 mt-4">
        {points.map((text, i) => (
          <li key={i} className="flex items-start gap-2">
            <Brain className="w-4 h-4 text-indigo-400 mt-0.5" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
