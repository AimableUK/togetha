import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// done
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
    const result = await ctx.db.insert("files", args);
    return result;
  },
});
// done
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
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});
// done
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
// done
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
// done
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
// done
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
