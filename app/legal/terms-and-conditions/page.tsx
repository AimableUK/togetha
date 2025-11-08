import React from "react";
import TermsConditions from "./TermsAndConditionsClient";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.terms;

const page = () => {
  return <TermsConditions />;
};

export default page;
