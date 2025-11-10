import React from "react";
import EntryPoint from "./EntryPointClient";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.onboarding;

const page = () => {
  return <EntryPoint />;
};

export default page;
