import React from "react";
import SignInPage from "./SignInPage";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.signIn;

const page = () => {
  return <SignInPage />;
};

export default page;
