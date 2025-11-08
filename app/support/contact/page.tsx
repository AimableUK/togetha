import React from "react";
import ContactSupport from "./ContactSupportClient";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata.contact;

const page = () => {
  return <ContactSupport />;
};

export default page;
