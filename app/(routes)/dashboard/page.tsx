"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect, useRef } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";

const Dashboard = () => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
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

  return (
    <div className="p-4">
      <Header />
      <FileList />
    </div>
  );
};

export default Dashboard;
