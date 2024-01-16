import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";

import { Card } from "@/components/ui/card";
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

  console.log(surveyData);
  if (details.evaluator.role !== "admin") {
    redirect(`/work/${params.id}/feedback`);
  }

  return (
    <div className="flex flex-col max-w-3xl gap-4 mx-auto mb-20">
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
      />
    </div>
  );
}
