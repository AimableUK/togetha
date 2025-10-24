import { pageMetadata } from "@/lib/utils";
import DashboardClient from "./DashboardClient";

export const metadata = pageMetadata.dashboard;

export default function DashboardPage() {
  return <DashboardClient />;
}
