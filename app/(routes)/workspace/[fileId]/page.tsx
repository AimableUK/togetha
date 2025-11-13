import { pageMetadata } from "@/lib/utils";
import WorkspaceClient from "./WorkspaceClient";
import React from "react";
import { Id } from "@/convex/_generated/dataModel";

export const metadata = pageMetadata.workspace;

export default function Workspace({
  params,
}: {
  params: Promise<{ fileId: Id<"files"> }>;
}) {
  const { fileId } = React.use(params);
  return <WorkspaceClient fileId={fileId} />;
}
