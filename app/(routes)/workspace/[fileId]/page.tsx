import { pageMetadata } from "@/lib/utils";
import WorkspaceClient from "./WorkspaceClient";
import React from "react";

export const metadata = pageMetadata.workspace;

export default function Workspace({
  params,
}: {
  params: Promise<{ fileId: string }>;
}) {
  const { fileId } = React.use(params);
  return <WorkspaceClient fileId={fileId} />;
}
