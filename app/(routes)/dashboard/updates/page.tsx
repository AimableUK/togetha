import React from "react";
import { pageMetadata } from "@/lib/utils";
import UpdatesClient from "./UpdatesClient";

export const metadata = pageMetadata.updates;

const page = () => {
  return <UpdatesClient />;
};

export default page;
