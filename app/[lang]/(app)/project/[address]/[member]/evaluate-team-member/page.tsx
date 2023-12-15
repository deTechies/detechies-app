
import { Locale } from "@/i18n.config";
import EvaluateTeamForm from "./evaluate-team-form";

export default async function EvaluateTeamMember({
  params: { lang, app, address, member },
}: {
  params: { lang: Locale; app: string; address: string; member: string };
}) {
  // Group criteria by category

  return <EvaluateTeamForm projectId={address} userId={member} />;
}