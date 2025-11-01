import { pageMetadata } from "@/lib/utils";
import ArchievedList from "./ArchievedList";

export const metadata = pageMetadata.archieve;

export default function DashboardPage() {
  return <ArchievedList />;
}
