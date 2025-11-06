"use client";

import { TeamContext } from "@/app/FilesListContext";
import { aOrAn } from "@/app/hooks/useReader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { TEAMINVITES } from "@/lib/utils";
import { useConvex, useMutation } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useContext } from "react";
import { toast } from "sonner";

const NotificationsClient = () => {
  const convex = useConvex();
  const { updates_, setUpdates_, user } = useContext(TeamContext);
  const inviteResponse = useMutation(api.teams.respondToInvite);

  if (updates_ === undefined) {
    return (
      <div className="flex flex-col items-center gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <div>
            <h3 className="font-bold text-xl md:text-2xl">Togetha</h3>
            <h4 className="font-semibold text-xs">Loading Notifications</h4>
          </div>
        </div>
        <div className="loader1"></div>
      </div>
    );
  }

  const handleTeamInvite = (
    inviteId: string,
    status: "accepted" | "declined"
  ) => {
    toast.promise(
      (async () => {
        await inviteResponse({
          inviteId: inviteId as Id<"teamInvites">,
          response: status,
        });

        // Refetch pending invites for this user
        const refreshedInvites = await convex.query(
          api.teamInvites.getPendingInvites,
          {
            email: user.email!,
          }
        );
        setUpdates_(refreshedInvites);
      })(),
      {
        loading: `${status === "accepted" ? "Accepting " : "Declining "} Invite...`,
        success: () => ({
          message: `Invite ${status === "accepted" ? "Accepted" : "Declined"}`,
          description: `Invite ${status === "accepted" ? "Accepted " : "Declined "} successfully!`,
        }),
        error: (error: any) => ({
          message: "Error",
          description:
            error?.response?.data?.detail ||
            `Failed to ${status === "accepted" ? "accept " : "decline "} Invite`,
        }),
      }
    );
  };

  return (
    <div className="p-4">
      {/* header */}
      <div className="flex flex-row whitespace-nowrap justify-between my-1">
        <h3 className="font-bold">Notifications</h3>
        <div className="flex gap-x-2">
          <button className="p-1 px-3 bg-secondary rounded-md cursor-pointer">
            All
          </button>
          <button className="p-1 px-3 rounded-md cursor-pointer">Unread</button>
        </div>
      </div>
      <Separator />
      {/* Content */}
      <div className="flex flex-col space-y-1 my-2">
        {/* 1 */}
        {updates_?.length ? (
          updates_.map((update: TEAMINVITES) => (
            <div
              key={update._id}
              className="flex flex-row gap-3 bg-secondary hover:bg-secondary/60 rounded-md p-2 w-full pr-5"
            >
              <div>
                <Image
                  src={update.inviterImage}
                  alt={update.inviterName}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="w-full flex flex-col">
                <div className="flex justify-between whitespace-nowrap items-center">
                  <h2 className="font-bold">Team Invite</h2>
                  <h2>
                    {formatDistanceToNow(new Date(update.invitedAt), {
                      addSuffix: true,
                    })}
                  </h2>
                </div>
                <p className="text-primary/90">
                  {update.inviterName} invited you to join&nbsp;
                  <strong>{update.teamName}</strong> as {aOrAn(update.role)}
                  &nbsp;
                  <strong>{update.role}</strong>
                </p>
                <div className="flex flex-row gap-x-1 mt-1">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => handleTeamInvite(update._id, "accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => handleTeamInvite(update._id, "declined")}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-row gap-3 bg-secondary hover:bg-secondary/60 rounded-md p-2 w-full">
            No notifications available
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsClient;
