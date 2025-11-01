import { pageMetadata } from "@/lib/utils";
import FileList from "./FileList";

export const metadata = pageMetadata.files;

export default function DashboardPage() {
  return <FileList />;
}
