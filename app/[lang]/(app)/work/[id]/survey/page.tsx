import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { getProjectWork } from "@/lib/data/project";
import { getEvaluationSurvey } from "@/lib/data/survey";

import { redirect } from "next/navigation";
import { SurveyForm } from "./surveyform";

export default async function EvaluateAsTeamLead({
  params,
}: {
  params: {
    lang: Locale;
    id: string;
  };
}) {
  const { data: surveyData } = await getEvaluationSurvey(params.id);
  const { data: details } = await getProjectWork(params.id);
  const dictionary = await getDictionary(params.lang);

  if(!details) redirect(`/work/${params.id}`)
  if (details.evaluator.role !== "admin" && details.evaluator.works[0].role === details.role) {
      redirect(`/work/${params.id}/feedback`);
  }

  return (
    <div className="flex flex-col gap-4 mx-auto mb-20">
      {/* <Card>
        You are evaluating a frontend developer as a project lead. with the
        following form: {surveyData.name}
      </Card> */}

      <SurveyForm
        workId={params.id}
        responseId={details.id}
        survey={surveyData}
        defaultValues={details.answers}
        lang={dictionary}
        selectedLanguage={params.lang}
      />
    </div>
  );
}
