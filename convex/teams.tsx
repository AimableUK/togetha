import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createTeam = mutation({
  args: {
    teamName: v.string(),
    createdBy: v.string(),
    collaborators: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const team = await ctx.db.insert("teams", {
      teamName: args.teamName,
      createdBy: args.createdBy,
      collaborators: [args.createdBy],
    });

    // Create pending invites for each collaborator email
    if (args.collaborators?.length) {
      for (const email of args.collaborators) {
        await ctx.db.insert("teamInvites", {
          teamId: team,
          email,
          invitedBy: args.createdBy,
          status: "pending",
          invitedAt: Date.now(),
        });
      }
    }

    return team;
  },
});

export const getTeam = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // 1. teams created by this user
    const teams = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();

    // 2. add collaborator details
    const enrichedTeams = await Promise.all(
      teams.map(async (team) => {
        const collaboratorsEmails = team.collaborators || [];

        // Fetch user details for each collaborator
        const collaboratorsData = await Promise.all(
          collaboratorsEmails.map(async (email: string) => {
            const user = await ctx.db
              .query("user")
              .filter((q) => q.eq(q.field("email"), email))
              .first();

            return {
              collaboratorEmail: email,
              collaboratorName: user?.name || "Unknown User",
              collaboratorImage: user?.image || "/user.webp",
            };
          })
        );

        return {
          ...team,
          collaboratorsData,
        };
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

    // If accepted, add to team's collaborator list
    if (args.response === "accepted") {
      const team = await ctx.db.get(invite.teamId);
      if (team) {
        await ctx.db.patch(invite.teamId, {
          collaborators: [
            ...new Set([...(team.collaborators || []), invite.email]),
          ],
        });
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
