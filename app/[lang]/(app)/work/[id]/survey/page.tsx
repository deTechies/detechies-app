import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";


import { serverApi } from "@/lib/data/general";
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
  const { data: surveyData } = await serverApi(`/survey/match/${params.id}`);
  const { data: details } = await serverApi(`/survey-response/surveyByWork/${params.id}`);
  const dictionary = await getDictionary(params.lang);

  if(!details) redirect(`/work/${params.id}`)
  if (details.evaluator.role !== "admin" && details.evaluator.works[0].role === details.role) {
      redirect(`/work/${params.id}/feedback`);
  }

  return (
    <main className="flex flex-col gap-4 mx-auto mb-20 max-w-[1027px]">
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
    </main>
  );
}
