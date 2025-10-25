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

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FAQ[] = [
  {
    id: 1,
    question: "What is Togetha and how does it work?",
    answer:
      "Togetha is an all-in-one workspace for notes, documents, and collaboration. It lets you write, brainstorm, and organize your projects in a minimal, distraction-free environment - perfect for teams or solo creators who want to stay focused and productive.",
  },
  {
    id: 2,
    question: "Can I use Togetha to collaborate with others in real time?",
    answer:
      "Yes. Togetha allows you to work together in real time with teammates or friends. You can edit, comment, and share ideas instantly - making it easy to stay connected and aligned on any project.",
  },
  {
    id: 3,
    question: "Does Togetha support rich text, images, or code blocks?",
    answer:
      "Absolutely. Togetha supports rich text editing, images, checklists, embeds, and code blocks. Whether you're writing notes, building documentation, or drafting content, you can format everything beautifully in one place.",
  },
  {
    id: 4,
    question: "Is my content secure on Togetha?",
    answer:
      "Yes. Your notes and projects are stored securely in the cloud using end-to-end encryption and private access control. You're always in control of your data - safe, synced, and backed up automatically.",
  },
  {
    id: 5,
    question: "Can I access Togetha offline or on mobile?",
    answer:
      "Togetha works seamlessly across devices - desktop, tablet, and mobile. Offline editing is also supported, so you can write or brainstorm anytime, anywhere, and your content will sync when you're back online.",
  },
];
