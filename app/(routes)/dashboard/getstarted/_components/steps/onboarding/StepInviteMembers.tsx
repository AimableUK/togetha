"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StepInviteMembers() {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center space-y-4">
      <h2 className="text-lg font-semibold">Invite Members (Not Yet Available)</h2>
      <p className="text-sm text-muted-foreground">
        Add teammates by entering their email addresses.
      </p>

      <div className="flex gap-2 max-w-xs">
        <Input placeholder="Enter email..." />
        <Button>Invite</Button>
      </div>
    </div>
  );
}
