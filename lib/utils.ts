import { Id } from "@/convex/_generated/dataModel";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface FILE {
  archieve: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: string;
  _creationTime: number;
  editedAt?: number;
  author?: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  } | null;
}

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
  collaborators?: {
    email: string,
    role: string
  }[];
  _creationTime?: number;
  collaboratorEmail?: string;
  collaboratorName?: string;
  collaboratorImage?: string;
  collaboratorRole?: string;
  status?: "pending" | "accepted" | "declined";
}

export interface TEAMINVITES {
  _id: string;
  teamId: string;
  email: string;
  invitedBy: string;
  status: "pending" | "accepted" | "declined";
  invitedAt: number;
  acceptedAt?: number;
  role: "Editor" | "Viewer";

  // Added from enrichment
  inviterName: string;
  inviterImage: string;
  teamName: string;
}

export type SecureFileResult =
  | (FILE & {
    _id: Id<"files">;
    fileName: string;
    teamId: Id<"teams">;
    requiresTeamSwitch?: boolean;
    correctTeamId?: Id<"teams">;
    document: string;
  })
  | null;


export type EditorJsBlock =
  | {
    type: "header" | "Header";
    data: {
      text: string;
      level: 1 | 2 | 3 | 4 | 5 | 6;
    };
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
    };
  }
  | {
    type: "paragraph" | "Paragraph";
    data: {
      text: string;
    };
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
    };
  }
  | {
    type: "list" | "List";
    data: {
      style: "unordered" | "ordered" | "checklist";
      meta?: Record<string, any>;
      items: {
        content: string;
        meta?: {
          checked?: boolean;
        };
        items?: any[];
      }[];
    };
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
    };
  }
  | {
    type: "code" | "Code";
    data: {
      code: string;
    };
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
    };
  }
  | {
    type: "quote" | "Quote";
    data: {
      text: string;
      caption?: string;
      alignment?: string;
    };
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
    };
  }
  | {
    type: "delimiter" | "Delimiter";
    data: Record<string, unknown>;
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
    };
  }
  | {
    type: "image" | "Image";
    data: {
      file: {
        url: string;
        width?: number;
        height?: number;
        imageId?: string;
      };
      caption?: string;
      withBorder?: boolean;
      withBackground?: boolean;
      stretched?: boolean;
    };
    width?: number;
    height?: number;
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
      CropperTune?: {
        croppedImage?: string;
      };
    };
  }
  | {
    type: "video" | "Video";
    data: {
      url?: string;
      caption?: string;
      withBorder?: boolean;
      withBackground?: boolean;
      stretched?: boolean;
    };
    tunes?: {
      alignmentTune?: {
        alignment?: 'left' | 'center' | 'right' | 'justify';
      };
    };
  };

export interface EditorJsData {
  time?: number;
  version?: string;
  blocks: EditorJsBlock[];
}


export const pageMetadata = {
  landing: {
    title: "Togetha - Think, Create & Collaborate",
    description:
      "Togetha is a modern playground for teams and individuals to brainstorm, design, and build ideas together in real time.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/",
      title: "Togetha - Think, Create & Collaborate",
      description:
        "Togetha is a modern playground for teams and individuals to brainstorm, design, and build ideas together in real time.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Togetha - Think, Create & Collaborate",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Togetha - Think, Create & Collaborate",
      description:
        "Togetha is a modern playground for teams and individuals to brainstorm, design, and build ideas together in real time.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  teamCreate: {
    title: "Create a Team - Togetha",
    description:
      "Form a team on Togetha to start collaborating, designing, and organizing projects in one shared creative space.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/team/create",
      title: "Create a Team - Togetha",
      description:
        "Form a team on Togetha to start collaborating, designing, and organizing projects in one shared creative space.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Create a Team - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Create a Team - Togetha",
      description:
        "Form a team on Togetha to start collaborating, designing, and organizing projects in one shared creative space.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  workspace: {
    title: "Workspace - Togetha",
    description:
      "Collaborate in real time with your team. Create boards, sketch ideas, and bring projects to life in the Togetha workspace.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/workspace",
      title: "Workspace - Togetha",
      description:
        "Collaborate in real time with your team. Create boards, sketch ideas, and bring projects to life in the Togetha workspace.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Workspace - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Workspace - Togetha",
      description:
        "Collaborate in real time with your team. Create boards, sketch ideas, and bring projects to life in the Togetha workspace.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  files: {
    title: "Files - Manage Your Projects | Togetha",
    description:
      "Track progress, manage teams, and access all your boards from the Togetha dashboard.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/dashboard",
      title: "Dashboard - Manage Your Projects | Togetha",
      description:
        "Track progress, manage teams, and access all your boards from the Togetha dashboard.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Dashboard - Manage Your Projects | Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dashboard - Manage Your Projects | Togetha",
      description:
        "Track progress, manage teams, and access all your boards from the Togetha dashboard.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  archieve: {
    title: "Archieved Files | Togetha",
    description:
      "Find and restore your archieved files anytime with Togetha's organized archieve system.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/archive",
      title: "archieve - Saved Projects | Togetha",
      description:
        "Find and restore your archieved projects and boards anytime with Togetha's organized archieve system.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "archieve - Saved Projects | Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "archieve - Saved Projects | Togetha",
      description:
        "Find and restore your archieved projects and boards anytime with Togetha's organized archieve system.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  getStarted: {
    title: "Get Started | Togetha",
    description:
      "Start collaborating instantly with Togetha. Create your first workspace, invite teammates, and organize your ideas seamlessly in one place.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/dashboard/get-started",
      title: "Get Started | Togetha",
      description:
        "Start collaborating instantly with Togetha. Create your first workspace, invite teammates, and organize your ideas seamlessly in one place.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Get Started | Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Get Started | Togetha",
      description:
        "Start collaborating instantly with Togetha. Create your first workspace, invite teammates, and organize your ideas seamlessly in one place.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  dashboardOverview: {
    title: "Dashboard Overview - Togetha",
    description:
      "Get a snapshot of your Togetha workspace — track total teams, shared files, and recent activity all in one unified dashboard.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/dashboard/overview",
      title: "Dashboard Overview - Togetha",
      description:
        "Monitor your teams, files, and collaboration metrics in real time. The Togetha Dashboard keeps your creative workspace organized and insightful.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Dashboard Overview - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dashboard Overview - Togetha",
      description:
        "Stay on top of your projects with insights into teams, files, and activities — all visualized in the Togetha Dashboard.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  signIn: {
    title: "Sign In - Togetha",
    description: "Sign in to Togetha and start collaborating instantly with your team.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/signin",
      title: "Sign In - Togetha",
      description: "Sign in to Togetha and start collaborating instantly with your team.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Sign In - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign In - Togetha",
      description: "Sign in to Togetha and start collaborating instantly with your team.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  signUp: {
    title: "Sign Up - Togetha",
    description: "Create your Togetha account to collaborate, brainstorm, and build ideas with your team.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/signup",
      title: "Sign Up - Togetha",
      description: "Create your Togetha account to collaborate, brainstorm, and build ideas with your team.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Sign Up - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign Up - Togetha",
      description: "Create your Togetha account to collaborate, brainstorm, and build ideas with your team.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  updates: {
    title: "Updates - Togetha",
    description: "Check your latest team invitations, notifications, and updates in Togetha.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/updates",
      title: "Updates & Invitations - Togetha",
      description: "Check your latest team invitations, notifications, and updates in Togetha.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Updates & Invitations - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Updates & Invitations - Togetha",
      description: "Check your latest team invitations, notifications, and updates in Togetha.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  terms: {
    title: "Terms and Conditions - Togetha",
    description:
      "Read Togetha's Terms and Conditions to understand the rules, responsibilities, and acceptable use of our platform.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/legal/terms-and-conditions",
      title: "Terms and Conditions - Togetha",
      description:
        "Read Togetha's Terms and Conditions to understand the rules, responsibilities, and acceptable use of our platform.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Terms and Conditions - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms and Conditions - Togetha",
      description:
        "Read Togetha's Terms and Conditions to understand the rules, responsibilities, and acceptable use of our platform.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  privacy: {
    title: "Privacy Policy - Togetha",
    description:
      "Learn how Togetha collects, uses, and protects your data to ensure a safe and transparent collaboration experience.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/legal/privacy-policy",
      title: "Privacy Policy - Togetha",
      description:
        "Learn how Togetha collects, uses, and protects your data to ensure a safe and transparent collaboration experience.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Privacy Policy - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy - Togetha",
      description:
        "Learn how Togetha collects, uses, and protects your data to ensure a safe and transparent collaboration experience.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  communityGuidelines: {
    title: "Community Guidelines - Togetha",
    description:
      "Explore Togetha's Community Guidelines to foster a respectful, creative, and inclusive environment for all users.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/legal/community-guidelines",
      title: "Community Guidelines - Togetha",
      description:
        "Explore Togetha's Community Guidelines to foster a respectful, creative, and inclusive environment for all users.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Community Guidelines - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Community Guidelines - Togetha",
      description:
        "Explore Togetha's Community Guidelines to foster a respectful, creative, and inclusive environment for all users.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  contact: {
    title: "Contact Us - Togetha",
    description:
      "Get in touch with the Togetha team for support, feedback, or partnership inquiries.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/support/contact",
      title: "Contact Us - Togetha",
      description:
        "Get in touch with the Togetha team for support, feedback, or partnership inquiries.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Contact Us - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us - Togetha",
      description:
        "Get in touch with the Togetha team for support, feedback, or partnership inquiries.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  helpCenter: {
    title: "Help Center - Togetha",
    description:
      "Find answers to your questions, explore guides, and learn how to make the most of Togetha's features.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/support/help-center",
      title: "Help Center - Togetha",
      description:
        "Find answers to your questions, explore guides, and learn how to make the most of Togetha's features.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Help Center - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Help Center - Togetha",
      description:
        "Find answers to your questions, explore guides, and learn how to make the most of Togetha's features.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
  },

  onboarding: {
    title: "Onboarding - Togetha",
    description:
      "Get started with Togetha! Learn how to set up your workspace, invite collaborators, and explore the tools that help your team think, create, and collaborate.",
    openGraph: {
      type: "website",
      url: "https://www.togetha-app.vercel.app/dashboard/entry_point",
      title: "Onboarding - Togetha",
      description:
        "Get started with Togetha! Learn how to set up your workspace, invite collaborators, and explore the tools that help your team think, create, and collaborate.",
      images: [
        {
          url: "https://www.togetha-app.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "Onboarding - Togetha",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Onboarding - Togetha",
      description:
        "Get started with Togetha! Learn how to set up your workspace, invite collaborators, and explore the tools that help your team think, create, and collaborate.",
      images: ["https://www.togetha-app.vercel.app/twitter-banner.png"],
    },
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


