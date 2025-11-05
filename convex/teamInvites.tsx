import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPendingInvites = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const invites = await ctx.db
      .query("teamInvites")
      .filter((q) =>
        q.and(
          q.eq(q.field("email"), args.email),
          q.eq(q.field("status"), "pending")
        )
      )
      .collect();

    // inviter & team info
    const enriched = await Promise.all(
      invites.map(async (invite) => {
        const inviter = await ctx.db
          .query("user")
          .filter((q) => q.eq(q.field("email"), invite.invitedBy))
          .first();

        const team = await ctx.db.get(invite.teamId);

        return {
          ...invite,
          inviterName: inviter?.name || "Unknown User",
          inviterImage: inviter?.image || "/user.webp",
          teamName: team?.teamName || "Unknown Team",
        };
      })
    );

    return enriched;
  },
});
