import { useContext, useEffect, useRef } from "react";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { api } from "@/convex/_generated/api";
import { TeamContext } from "../FilesListContext";

export const UserSync = () => {
  const convex = useConvex();
  const { user, isLoading } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const hasCreated = useRef(false);
  const { setUpdates_, setUserDetails_ } = useContext(TeamContext);

  const pendingInvites = useQuery(
    api.teamInvites.getPendingInvites,
    user?.email ? { email: user.email } : "skip"
  );

  useEffect(() => {
    if (!user || hasCreated.current || isLoading) return;

    (async () => {
      try {
        const existing = await convex.query(api.user.getUser, {
          email: user.email!,
        });

        if (!existing) {
          await createUser({
            name: `${user.given_name} ${user.family_name}`,
            email: user.email!,
            image: user.picture!,
          });
        }

        setUserDetails_(existing);
        hasCreated.current = true;
      } catch (error) {
        console.error("Error syncing user:", error);
        hasCreated.current = false;
      }
    })();
  }, [user, convex, createUser, isLoading]);

  useEffect(() => {
    if (pendingInvites?.length) {
      setUpdates_(pendingInvites);
    }
  }, [pendingInvites, setUpdates_]);

  useEffect(() => {
    const handleAccountDeleted = async () => {
      if (user?.email) {
        const userExists = await convex.query(api.user.getUser, {
          email: user.email,
        });

        if (!userExists) {
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
          });
          setTimeout(() => {
            window.location.href = "/api/auth/logout";
          }, 1500);
        }
      }
    };

    const interval = setInterval(handleAccountDeleted, 5000);

    return () => clearInterval(interval);
  }, [user?.email, convex]);

  return null;
};
