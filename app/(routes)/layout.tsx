// app/(routes)/layout.tsx

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ClientAppLayout from "./ClientAppLayout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const { isAuthenticated } = getKindeServerSession();
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      redirect("/signin");
    }

    return <ClientAppLayout>{children}</ClientAppLayout>;
  } catch (error) {
    console.error("Auth layout error:", error);
    redirect("/signin");
  }
}
