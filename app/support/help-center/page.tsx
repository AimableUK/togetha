import React from "react";
import HelpCenter from "./HelpCenterClient";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.helpCenter;

const page = () => {
  return <HelpCenter />;
};

export default page;
