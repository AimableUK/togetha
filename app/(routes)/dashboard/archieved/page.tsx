import { pageMetadata } from "@/lib/utils";
import ArchievedClient from "./ArchievedClient";

export const metadata = pageMetadata.archieve;

export default function DashboardPage() {
  return <ArchievedClient />;
}
