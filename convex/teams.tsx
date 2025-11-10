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
    const allTeams = await ctx.db.query("teams").collect();

    const userTeams = allTeams.filter(
      (team) =>
        team.createdBy === args.email ||
        (team.collaborators || []).some(
          (c: any) => c.email.toLowerCase() === args.email.toLowerCase()
        )
    );

    const enrichedTeams = await Promise.all(
      userTeams.map(async (team) => {
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

export const addCollaborator = mutation({
  args: {
    teamId: v.id("teams"),
    email: v.string(),
    role: v.union(v.literal("Editor"), v.literal("Viewer")),
    invitedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("Team not found");

    if (team.createdBy.toLowerCase() !== args.invitedBy.toLowerCase()) {
      throw new Error("Only the team owner can invite collaborators");
    }

    const alreadyCollaborator = team.collaborators?.some(
      (c: any) => c.email.toLowerCase() === args.email.toLowerCase()
    );
    if (alreadyCollaborator) {
      throw new Error("This collaborator is already part of the team.");
    }

    const alreadyInvited = await ctx.db
      .query("teamInvites")
      .filter((q) =>
        q.and(
          q.eq(q.field("teamId"), args.teamId),
          q.eq(q.field("email"), args.email)
        )
      )
      .first();

    if (alreadyInvited) {
      throw new Error("This collaborator is already invited and pending.");
    }

    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

    await ctx.db.insert("teamInvites", {
      teamId: args.teamId,
      email: args.email,
      invitedBy: args.invitedBy,
      role: args.role,
      status: "pending",
      invitedAt: Date.now(),
      expiresAt,
    });

    return { success: true, email: args.email, status: "pending" };
  },
});

export const addCollaborators = mutation({
  args: {
    teamId: v.id("teams"),
    collaborators: v.array(
      v.object({
        email: v.string(),
        role: v.union(v.literal("Editor"), v.literal("Viewer")),
      })
    ),
    invitedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("Team not found");

    if (team.createdBy.toLowerCase() !== args.invitedBy.toLowerCase()) {
      throw new Error("Only the team owner can invite collaborators");
    }

    const results: { email: string; status: string }[] = [];

    for (const collab of args.collaborators) {
      const emailLower = collab.email.toLowerCase();

      const alreadyCollaborator = team.collaborators?.some(
        (c: any) => c.email.toLowerCase() === emailLower
      );
      if (alreadyCollaborator) {
        results.push({ email: collab.email, status: "Already collaborator" });
        continue;
      }

      // Skip if already pending
      const alreadyInvited = await ctx.db
        .query("teamInvites")
        .filter((q) =>
          q.and(
            q.eq(q.field("teamId"), args.teamId),
            q.eq(q.field("email"), collab.email)
          )
        )
        .first();
      if (alreadyInvited) {
        results.push({ email: collab.email, status: "Already invited" });
        continue;
      }

      const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

      await ctx.db.insert("teamInvites", {
        teamId: args.teamId,
        email: collab.email,
        invitedBy: args.invitedBy,
        role: collab.role,
        status: "pending",
        invitedAt: Date.now(),
        expiresAt,
      });

      results.push({ email: collab.email, status: "pending" });
    }

    return { success: true, results };
  },
});

export const updateCollaboratorRole = mutation({
  args: {
    teamId: v.id("teams"),
    email: v.string(),
    role: v.union(v.literal("Editor"), v.literal("Viewer")),
    requesterEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("Team not found");

    if (team.createdBy.toLowerCase() !== args.requesterEmail.toLowerCase()) {
      throw new Error("Only the team owner can update roles");
    }

    const collaborators = team.collaborators || [];
    const index = collaborators.findIndex(
      (c: any) => c.email.toLowerCase() === args.email.toLowerCase()
    );

    if (index === -1) throw new Error("Collaborator not found in team");

    collaborators[index].role = args.role;

    await ctx.db.patch(args.teamId, { collaborators });

    return { success: true, email: args.email, role: args.role };
  },
});

export const removeCollaborator = mutation({
  args: {
    teamId: v.id("teams"),
    email: v.string(),
    requesterEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("Team not found");

    // Only the team creator can remove collaborators
    if (team.createdBy.toLowerCase() !== args.requesterEmail.toLowerCase()) {
      throw new Error("Only the team owner can remove collaborators");
    }

    const updatedCollaborators = (team.collaborators || []).filter(
      (c: any) => c.email.toLowerCase() !== args.email.toLowerCase()
    );

    await ctx.db.patch(args.teamId, {
      collaborators: updatedCollaborators,
    });

    // Remove any pending invites for that collaborator
    const allInvites = await ctx.db.query("teamInvites").collect();
    for (const invite of allInvites) {
      if (
        invite.teamId === args.teamId &&
        invite.email.toLowerCase() === args.email.toLowerCase()
      ) {
        await ctx.db.delete(invite._id);
      }
    }

    return { success: true, email: args.email };
  },
});

export const renameTeam = mutation({
  args: {
    _id: v.id("teams"),
    teamName: v.string(),
    userEmail: v.string(),
  },

  handler: async (ctx, args) => {
    const team = await ctx.db.get(args._id);
    if (!team) throw new Error("Team not found");

    if (team.createdBy !== args.userEmail) {
      throw new Error("Only the team owner can rename this team");
    }

    const result = await ctx.db.patch(args._id, { teamName: args.teamName });
    return result;
  },
});

export const deleteTeam = mutation({
  args: {
    _id: v.id("teams"),
    userEmail: v.string(),
  },

  handler: async (ctx, args) => {
    const team = await ctx.db.get(args._id);
    if (!team) {
      throw new Error("Team not found");
    }

    if (team.createdBy !== args.userEmail) {
      throw new Error("Unauthorized: Only the team owner can delete this team");
    }

    const result = await ctx.db.delete(args._id);

    const invites = await ctx.db
      .query("teamInvites")
      .filter((q) => q.eq(q.field("teamId"), args._id))
      .collect();

    for (const invite of invites) {
      await ctx.db.delete(invite._id);
    }

    return result;
  },
});
