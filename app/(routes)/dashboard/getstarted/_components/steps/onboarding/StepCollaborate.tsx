"use client";

import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import Link from "next/link";

export default function StepCollaborate() {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center space-y-4">
      <ListTodo className="w-10 h-10 text-indigo-500" />
      <h2 className="text-lg font-semibold">
        Start Collaborating
      </h2>
      <p className="text-sm text-muted-foreground">
        Everything's ready - start working together in real-time!
      </p>
      <Link href="/dashboard">
        <Button variant="default" className="cursor-pointer">Open Workspace</Button>
      </Link>
    </div>
  );
}
