import React from "react";
import TeamsClient from "./TeamsClient";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.allTeams;

const page = () => {
  return <TeamsClient />;
};

export default page;
