"use client";

import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect, useRef } from "react";
import FileList from "./_components/FileList";
import Image from "next/image";

const DashboardClient = () => {
  const convex = useConvex();
  const { user, isLoading } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);

  const hasCreated = useRef(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!user || hasCreated.current) return;

      try {
        const result = await convex.query(api.user.getUser, {
          email: user.email!,
        });

        if (!result || result.length === 0) {
          await createUser({
            name: user.given_name! + " " + user.family_name,
            email: user.email!,
            image: user.picture!,
          });
        }

        hasCreated.current = true;
      } catch (err) {
        console.error("Error checking user:", err);
      }
    };

    checkUser();
  }, [user, convex, createUser]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="flex gap-1 items-center">
          <Image src="/logo.png" alt="togetha logo" width={40} height={40} />
          <div>
            <h3 className="font-bold text-xl md:text-2xl">Togetha</h3>
            <h4 className="font-semibold text-xs">Loading Content</h4>
          </div>
        </div>
        <div className="loader1"></div>
      </div>
    );

  return <FileList />;
};

export default DashboardClient;
