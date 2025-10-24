import { pageMetadata } from "@/lib/utils";
import CreateTeamClient from "./CreateTeamClient";

export const metadata = pageMetadata.teamCreate;

export default function CreateTeam() {
  return <CreateTeamClient />;
}
