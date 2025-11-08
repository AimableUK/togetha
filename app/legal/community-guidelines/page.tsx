import React from "react";
import CommunityGuidelines from "./CommunityGuidelinesClient";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.communityGuidelines;

const page = () => {
  return <CommunityGuidelines />;
};

export default page;
