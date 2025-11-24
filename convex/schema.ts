import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    teams: defineTable({
        teamName: v.string(),
        createdBy: v.string(),
        collaborators: v.optional(
            v.array(
                v.object({
                    email: v.string(),
                    role: v.union(v.literal("Editor"), v.literal("Viewer")),
                })
            )
        ),
    }),

    files: defineTable({
        fileName: v.string(),
        teamId: v.id("teams"),
        createdBy: v.string(),
        archieve: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
        editedAt: v.optional(v.number()),
    })
        .index("by_teamId", ["teamId"]),

    teamInvites: defineTable({
        teamId: v.id("teams"),
        email: v.string(),
        invitedBy: v.string(),
        role: v.union(v.literal("Editor"), v.literal("Viewer")),
        status: v.string(), // "pending" | "accepted" | "declined"
        invitedAt: v.number(),
        acceptedAt: v.optional(v.number()),
        expiresAt: v.optional(v.number()),
    }),

    user: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
    }),
});
