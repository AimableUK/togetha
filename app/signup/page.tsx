import React from "react";
import SignUpPage from "./SignUpPage";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.signUp;

const page = () => {
  return <SignUpPage />;
};

export default page;
