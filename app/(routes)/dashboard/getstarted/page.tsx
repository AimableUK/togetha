import { pageMetadata } from "@/lib/utils";
import React from "react";
import GetStartedClient from "./GetStartedClient";

export const metadata = pageMetadata.getStarted;
const page = () => {
  return <GetStartedClient />;
};

export default page;
