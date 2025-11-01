import { pageMetadata } from "@/lib/utils";
import OverviewClient from "./OverviewClient";

export const metadata = pageMetadata.dashboardOverview;

export default function DashboardPage() {
  return <OverviewClient />;
}
