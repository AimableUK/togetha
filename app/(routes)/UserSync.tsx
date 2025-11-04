import { useEffect, useRef } from "react";
import { useConvex, useMutation } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import { api } from "@/convex/_generated/api";

export const UserSync = () => {
  const convex = useConvex();
  const { user } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const hasCreated = useRef(false);

  useEffect(() => {
    if (!user || hasCreated.current) return;

    (async () => {
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
      hasCreated.current = true;
    })();
  }, [user, convex, createUser]);

  return null;
};
