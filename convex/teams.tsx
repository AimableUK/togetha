import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTeam = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // Create the team
    const team = await ctx.db.insert("teams", {
      teamName: args.teamName,
      createdBy: args.createdBy,
      collaborators: [{ email: args.createdBy, role: "Editor" }],
    });

    // Send invites if any
    if (args.collaborators?.length) {
      for (const collaborator of args.collaborators) {
        await ctx.db.insert("teamInvites", {
          teamId: team,
          email: collaborator.email,
          invitedBy: args.createdBy,
          status: "pending",
          invitedAt: Date.now(),
          role: collaborator.role,
        });
      }
    }

    return team;
  },
});

export const getTeam = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const teams = await ctx.db
      .query("teams")
      .filter((q) =>
        q.or(
          q.eq(q.field("createdBy"), args.email),
          q.eq(q.field("collaborators.email"), args.email)
        )
      )
      .collect();

    // Add collaborator info
    const enrichedTeams = await Promise.all(
      teams.map(async (team) => {
        const collaborators = team.collaborators || [];

        const collaboratorsData = await Promise.all(
          collaborators.map(async (collab: { email: string; role: string }) => {
            const user = await ctx.db
              .query("user")
              .filter((q) => q.eq(q.field("email"), collab.email))
              .first();

            return {
              collaboratorEmail: collab.email,
              collaboratorRole: collab.role,
              collaboratorName: user?.name || "Unknown User",
              collaboratorImage: user?.image || "/user.webp",
            };
          })
        );

        return { ...team, collaboratorsData };
      })
    );

    return enrichedTeams;
  },
});

export const respondToInvite = mutation({
  args: {
    inviteId: v.id("teamInvites"),
    response: v.union(v.literal("accepted"), v.literal("declined")),
  },
  handler: async (ctx, args) => {
    const invite = await ctx.db.get(args.inviteId);
    if (!invite) throw new Error("Invite not found");

    // Update invite status
    await ctx.db.patch(args.inviteId, {
      status: args.response,
      acceptedAt: args.response === "accepted" ? Date.now() : undefined,
    });

    // If accepted, add collaborator object (email + role)
    if (args.response === "accepted") {
      const team = await ctx.db.get(invite.teamId);
      if (team) {
        const exists = team.collaborators?.some(
          (c: { email: string }) => c.email === invite.email
        );

        if (!exists) {
          await ctx.db.patch(invite.teamId, {
            collaborators: [
              ...(team.collaborators || []),
              { email: invite.email, role: invite.role || "Viewer" },
            ],
          });
        }
      }
    }

    return args.response;
  },
});

export const renameTeam = mutation({
  args: {
    _id: v.id("teams"),
    teamName: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { teamName: args.teamName });
    return result;
  },
});

export const deleteTeam = mutation({
  args: {
    _id: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.delete(args._id);
    return result;
  },
});
