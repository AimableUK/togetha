import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pageMetadata = {
  landing: {
    title: "Togetha - Think, Create & Collaborate",
    description:
      "Togetha is a modern playground for teams and individuals to brainstorm, design, and build ideas together in real time.",
  },
  teamCreate: {
    title: "Create a Team - Togetha",
    description:
      "Form a team on Togetha to start collaborating, designing, and organizing projects in one shared creative space.",
  },
  workspace: {
    title: "Workspace - Togetha",
    description:
      "Collaborate in real time with your team. Create boards, sketch ideas, and bring projects to life in the Togetha workspace.",
  },
  dashboard: {
    title: "Dashboard - Manage Your Projects | Togetha",
    description:
      "Track progress, manage teams, and access all your boards from the Togetha dashboard.",
  },
  archive: {
    title: "Archive - Saved Projects | Togetha",
    description:
      "Find and restore your archived projects and boards anytime with Togetha's organized archive system.",
  },
};
