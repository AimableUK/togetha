import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph } from "docx";
import {
  editorJsToHTML,
  editorJsToMarkdown,
  editorJsToText,
} from "@/app/hooks/exportUtils";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.id("teams"),
    createdBy: v.string(),
    archieve: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
    editedAt: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("Team not found");

    const isOwner = team.createdBy === args.createdBy;
    const isEditor = (team.collaborators || []).some(
      (c: any) =>
        c.email.toLowerCase() === args.createdBy.toLowerCase() &&
        c.role === "Editor"
    );

    if (!isOwner && !isEditor) {
      throw new Error(
        "Permission denied. Only Editors or the Owner can create files."
      );
    }

    const result = await ctx.db.insert("files", args);
    return result;
  },
});

export const getFiles = query({
  args: { teamId: v.string() },

  handler: async (ctx, args) => {
    const files = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();

    const creatorEmails = [...new Set(files.map((f) => f.createdBy))];
    const users: any[] = [];

    for (const email of creatorEmails) {
      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
      if (user) users.push(user);
    }

    const userMap = Object.fromEntries(users.map((u) => [u.email, u]));

    return files.map((file) => ({
      ...file,
      author: userMap[file.createdBy] || null,
    }));
  },
});

export const getFileById = query({
  args: {
    _id: v.id("files"),
    teamId: v.id("teams"),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    if (!file) {
      return { error: "File not found or may have been deleted." };
    }

    const fileTeam = await ctx.db.get(file.teamId);
    if (!fileTeam) {
      return { error: "Team associated with this file not found." };
    }

    const isCollaborator = fileTeam.collaborators?.some(
      (c) => c.email === args.userEmail
    );

    if (!isCollaborator) {
      return {
        error: "Access denied, you're not a collaborator of this team.",
      };
    }

    // If file belongs to a different team, let the client switch
    if (file.teamId !== args.teamId) {
      return {
        ...file,
        requiresTeamSwitch: true,
        correctTeamId: file.teamId,
      };
    }

    return { data: file };
  },
});

export const addArchieve = mutation({
  args: {
    _id: v.id("files"),
    archieve: v.boolean(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    if (!file) throw new Error("File not found");

    const team = await ctx.db.get(file.teamId);
    if (!team) throw new Error("Team not found");

    const role =
      team.createdBy === args.userEmail
        ? "Owner"
        : team.collaborators?.find((c) => c.email === args.userEmail)?.role ||
          "Viewer";

    if (role === "Viewer") {
      throw new Error("Request Edit Access to perform this action");
    }

    await ctx.db.patch(args._id, { archieve: args.archieve });
    return { success: true };
  },
});

export const undoArchieve = mutation({
  args: {
    _id: v.id("files"),
    archieve: v.boolean(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    if (!file) throw new Error("File not found");

    const team = await ctx.db.get(file.teamId);
    if (!team) throw new Error("Team not found");

    const role =
      team.createdBy === args.userEmail
        ? "Owner"
        : team.collaborators?.find((c) => c.email === args.userEmail)?.role ||
          "Viewer";

    if (role === "Viewer") {
      throw new Error("Request Edit Access to perform this action");
    }

    const result = await ctx.db.patch(args._id, { archieve: args.archieve });
    return result;
  },
});

export const deleteFile = mutation({
  args: {
    _id: v.id("files"),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    if (!file) throw new Error("File not found");

    const team = await ctx.db.get(file.teamId);
    if (!team) throw new Error("Team not found");

    const role =
      team.createdBy === args.userEmail
        ? "Owner"
        : team.collaborators?.find((c) => c.email === args.userEmail)?.role ||
          "Viewer";

    if (role === "Viewer") {
      throw new Error("Request Edit Access to perform this action");
    }

    const result = await ctx.db.delete(args._id);
    return result;
  },
});

export const renameFile = mutation({
  args: {
    _id: v.id("files"),
    fileName: v.string(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    if (!file) throw new Error("File not found");

    const team = await ctx.db.get(file.teamId);
    if (!team) throw new Error("Team not found");

    const role =
      team.createdBy === args.userEmail
        ? "Owner"
        : team.collaborators?.find((c) => c.email === args.userEmail)?.role ||
          "Viewer";

    if (role === "Viewer") {
      throw new Error("Request Edit Access to perform this action");
    }

    const result = await ctx.db.patch(args._id, { fileName: args.fileName });
    return result;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
    editedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      document: args.document,
      editedAt: args.editedAt,
    });
    return result;
  },
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
    editedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      whiteboard: args.whiteboard,
      editedAt: args.editedAt,
    });
    return result;
  },
});

export const exportFile = mutation({
  args: {
    _id: v.id("files"),
    userEmail: v.string(),
    format: v.string(), // "md" | "html" | "pdf" | "txt" | "docx"
  },

  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    if (!file) throw new Error("File not found");

    const team = await ctx.db.get(file.teamId);
    if (!team) throw new Error("Team not found");

    const role =
      team.createdBy === args.userEmail
        ? "Owner"
        : team.collaborators?.find((c) => c.email === args.userEmail)?.role ||
          "Viewer";

    if (role === "Viewer") {
      throw new Error("Request Edit Access to perform this action");
    }

    // EXPORT LOGIC

    const data: any = file.document;

    let filename = "";
    let mime = "";
    let content: any = null;

    switch (args.format) {
      case "txt":
        content = editorJsToText(data);
        mime = "text/plain";
        filename = file.fileName + ".txt";
        break;

      case "md":
        content = editorJsToMarkdown(data);
        mime = "text/markdown";
        filename = file.fileName + ".md";
        break;

      case "html":
        content = editorJsToHTML(data);
        mime = "text/html";
        filename = file.fileName + ".html";
        break;

      case "pdf": {
        const doc = new PDFDocument();
        const chunks: Uint8Array[] = [];

        doc.on("data", (c: Uint8Array) => chunks.push(c));
        doc.text(editorJsToText(data));
        doc.end();

        const buffer: Buffer = await new Promise((resolve) =>
          doc.on("end", () => resolve(Buffer.concat(chunks)))
        );

        content = buffer.toString("base64");
        mime = "application/pdf";
        filename = file.fileName + ".pdf";
        break;
      }

      case "docx": {
        const doc = new Document({
          sections: [
            {
              children: [new Paragraph(editorJsToText(data))],
            },
          ],
        });

        const buffer = await Packer.toBuffer(doc);

        content = buffer.toString("base64");
        mime =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        filename = file.fileName + ".docx";
        break;
      }

      default:
        throw new Error("Invalid export format");
    }

    return {
      success: true,
      filename,
      mime,
      content,
    };
  },
});
