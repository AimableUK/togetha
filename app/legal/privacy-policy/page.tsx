import React from "react";
import PrivacyPolicy from "./PrivacyPolicyClient";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.privacy;

const page = () => {
  return <PrivacyPolicy />;
};

export default page;
