import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { action } from "./_generated/server";

export const getUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("user", args);
  },
});

export const deleteUserAccount = mutation({
  args: {
    userEmail: v.string(),
    kindeUserId: v.string(),
  },

  handler: async (ctx, args) => {
    try {
      const createdTeams = await ctx.db
        .query("teams")
        .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
        .collect();

      for (const team of createdTeams) {
        const files = await ctx.db
          .query("files")
          .filter((q) => q.eq(q.field("teamId"), team._id))
          .collect();

        for (const file of files) {
          await ctx.db.delete(file._id);
        }
      }

      for (const team of createdTeams) {
        const invites = await ctx.db
          .query("teamInvites")
          .filter((q) => q.eq(q.field("teamId"), team._id))
          .collect();

        for (const invite of invites) {
          await ctx.db.delete(invite._id);
        }
      }

      for (const team of createdTeams) {
        await ctx.db.delete(team._id);
      }

      const incomingInvites = await ctx.db
        .query("teamInvites")
        .filter((q) => q.eq(q.field("email"), args.userEmail))
        .collect();

      for (const invite of incomingInvites) {
        await ctx.db.delete(invite._id);
      }

      const allTeams = await ctx.db.query("teams").collect();

      for (const team of allTeams) {
        if (team.collaborators && team.collaborators.length > 0) {
          const updatedCollaborators = team.collaborators.filter(
            (c) => c.email !== args.userEmail
          );

          if (updatedCollaborators.length !== team.collaborators.length) {
            await ctx.db.patch(team._id, {
              collaborators: updatedCollaborators,
            });
          }
        }
      }

      const user = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("email"), args.userEmail))
        .first();

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      await ctx.db.delete(user._id);

      await ctx.scheduler.runAfter(0, api.user.deleteUserFromKinde, {
        kindeUserId: args.kindeUserId,
      });

      return {
        success: true,
        message: "Account deleted successfully",
        description: `Your account and ${createdTeams.length} team(s) have been permanently deleted.`,
        deletedTeamsCount: createdTeams.length,
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "USER_NOT_FOUND") {
          throw new Error("ACCOUNT_NOT_FOUND");
        }
      }
      throw error;
    }
  },
});

export const deleteUserFromKinde = action({
  args: {
    kindeUserId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const kindeApiUrl = process.env.KINDE_ISSUER_URL;
      const kindeClientId = process.env.KINDE_MANAGEMENT_CLIENT_ID;
      const kindeClientSecret = process.env.KINDE_MANAGEMENT_CLIENT_SECRET;

      if (!kindeApiUrl || !kindeClientId || !kindeClientSecret) {
        throw new Error("Kinde credentials not configured");
      }

      const tokenResponse = await fetch(`${kindeApiUrl}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: kindeClientId,
          client_secret: kindeClientSecret,
          audience: `${kindeApiUrl}/api`,
        }).toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error("AUTH_FAILED");
      }

      const tokenData = await tokenResponse.json();

      const deleteResponse = await fetch(
        `${kindeApiUrl}/api/v1/user?id=${args.kindeUserId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            Accept: "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("DELETE_FAILED");
      }

      return { success: true };
    } catch (error) {
      console.error("Kinde deletion error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});
