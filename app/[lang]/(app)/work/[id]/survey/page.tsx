import { Card } from "@/components/ui/card";
import { getProjectWork } from "@/lib/data/project";
import { getEvaluationSurvey } from "@/lib/data/survey";

import { redirect } from "next/navigation";
import { SurveyForm } from "./surveyform";

export default async function EvaluateAsTeamLead({ params }: { params: any }) {
  const {data: surveyData} = await getEvaluationSurvey(params.id)
  const {data: details} = await getProjectWork(params.id);

  console.log(details);
  if (details.evaluator.role !== "admin") {
    redirect(`/work/${params.id}/feedback`);
  }
  
  console.log()

  return (
    <div className="flex flex-col gap-4 mb-20 max-w-3xl mx-auto">
      <Card>
        You are evaluating a frontend developer as a project lead. with the
        following form: {surveyData.name}
      </Card>

      <SurveyForm
        workId={params.id}
        responseId={details.id}
        survey={surveyData}
        defaultValues={details.answers}
      />
    </div>
  );
}
