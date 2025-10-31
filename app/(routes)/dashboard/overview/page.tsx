import React from "react";
import { pageMetadata } from "@/lib/utils";
import OverviewClient from "./OverviewClient";

export const metadata = pageMetadata.dashboardOverview;

const page = () => {
  return <OverviewClient />;
};

export default page;
