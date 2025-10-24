"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateTeamClient = () => {
  const [teamName, setTeamName] = useState("");

  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = () => {
    const promise = createTeam({
      teamName: teamName,
      createdBy: user?.email,
    });

    toast.promise(promise, {
      loading: "Processing...",
      success: () => ({
        message: "Team Created",
        description: `${teamName} Team created successfully!`,
      }),
      error: (error) => ({
        message: "Error",
        description:
          error?.response?.data?.detail || "Failed to process your request.",
      }),
    });

    promise.then(() => {
      router.push("/dashboard");
    });
  };

  return (
    <div className="p-6 md:p-16">
      <div className="flex flex-row items-center gap-x-2 mb-3">
        <Image src="/logo.png" alt="Togetha logo" width={35} height={35} />
        <h1 className="font-semibold text-xl">Togetha</h1>
      </div>

      <div className="flex flex-col items-center gap-y-5">
        <h2 className="font-bold text-4xl">
          What do you want to name your team?
        </h2>
        <h3 className="text-gray-700 dark:text-gray-100!">
          You&apos;ll be able to update this later from Settings.
        </h3>
        <div className="mt-3 md:mt-7 w-2/5">
          <label htmlFor="" className="text-gray-700 dark:text-gray-100!">
            Team Name
          </label>
          <Input
            placeholder="Team Name"
            className="mt-3"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <Button
          disabled={!(teamName && teamName?.length > 0)}
          className="bg-accent dark:text-gray-100 hover:bg-[#0742a2] cursor-pointer"
          onClick={() => createNewTeam()}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
};

export default CreateTeamClient;
