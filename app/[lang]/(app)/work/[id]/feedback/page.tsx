import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import EvaluateTeamForm from "./evaluate-team-form";

export default async function EvaluateTeamMember({
  params: { lang, app, id, member },
}: {
  params: { lang: Locale; app: string; id: string; member: string };
}) {
  const { data: details } = await serverApi(`/survey-response/surveyByWork/${id}`);
  const dictionary = await getDictionary(lang);

  return (
    <main className="max-w-[1027px] mx-auto">
      <EvaluateTeamForm
        workId={id}
        surveyId={details.id}
        defaultValues={details.assessment}
        lang={dictionary}
      />
    </main>
  );
}
