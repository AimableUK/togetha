import { pageMetadata } from "@/lib/utils";
import LandingClient from "./LandingClient";

export const metadata = pageMetadata.landing;

export default function Home() {
  return <LandingClient />;
}
