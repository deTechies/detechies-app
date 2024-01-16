import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getProjectWork } from "@/lib/data/project";
import EvaluateTeamForm from "./evaluate-team-form";

export default async function EvaluateTeamMember({
  params: { lang, app, id, member },
}: {
  params: { lang: Locale; app: string; id: string; member: string };
}) {
  const {data: details} = await getProjectWork(id);
  const dictionary = await getDictionary(lang);

  return <EvaluateTeamForm workId={id} surveyId={details.id} defaultValues={details.assessment} lang={dictionary} />;
}
