import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ClientAppLayout from "./ClientAppLayout";

const ALLOWED_EMAILS =
  process.env.ALLOWED_EMAILS?.split(",").map(e => e.trim()) ?? [];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    const user = await getUser();
    const email = user?.email;

    const authenticated = await isAuthenticated();

    if (!authenticated) {
      redirect("/signin");
    }

    if (!email || !ALLOWED_EMAILS.includes(email)) {
      redirect("/access-restricted");
    }

    return <ClientAppLayout>{children}</ClientAppLayout>;
  } catch (error) {
    console.error("Auth layout error:", error);
    redirect("/access-restricted");
  }
}
