import { useContext, useEffect, useRef } from "react";
import { useConvex, useMutation } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { api } from "@/convex/_generated/api";
import { TeamContext } from "../FilesListContext";

export const UserSync = () => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const hasCreated = useRef(false);

  const { setUpdates_, setUserDetails_ } = useContext(TeamContext);

  useEffect(() => {
    if (!user || hasCreated.current) return;

    (async () => {
      // 1. user already exists?
      const existing = await convex.query(api.user.getUser, {
        email: user.email!,
      });

      // 2. Create if missing
      if (!existing) {
        await createUser({
          name: `${user.given_name} ${user.family_name}`,
          email: user.email!,
          image: user.picture!,
        });
      }
      setUserDetails_(existing);

      // 3. Check for pending team invites
      const pendingInvites = await convex.query(
        api.teamInvites.getPendingInvites,
        {
          email: user.email!,
        }
      );

      if (pendingInvites?.length) {
        setUpdates_(pendingInvites);
      }

      hasCreated.current = true;
    })();
  }, [user, convex, createUser]);

  return null;
};
