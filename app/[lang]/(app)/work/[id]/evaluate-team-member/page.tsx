import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import EvaluateTeamForm from "./evaluate-team-form";

export default async function EvaluateTeamMember({
  params: { lang, app, id, member },
}: {
  params: { lang: Locale; app: string; id: string; member: string };
}) {
  // Group criteria by category
  
  const dictionary = await getDictionary(lang);

  return <EvaluateTeamForm workId={id} />;
}
