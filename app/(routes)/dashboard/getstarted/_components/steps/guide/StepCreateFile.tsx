"use client";

import { File, FilePlus } from "lucide-react";

export default function StepCreateFile() {
  const points = [
    "On the sidebar at the bottom of your dashboard.",
    "Click 'New File' to start a new project file.",
    "Enter a name for your file - you can rename it later if needed.",
    "Click 'Create' to finalize. Your new file will appear in your team.",
  ];

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      <FilePlus className="w-10 h-10 text-indigo-500" />
      <h2 className="text-lg font-semibold">Step 2: Create File</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Files are where your ideas start taking shape.
      </p>
      <ul className="text-left text-sm text-gray-600 dark:text-gray-300 space-y-2 mt-4">
        {points.map((text, i) => (
          <li key={i} className="flex items-start gap-2">
            <File className="w-4 h-4 text-indigo-400 mt-0.5" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
