import { Card } from "@/components/ui/card";
import { getProjectWork } from "@/lib/data/project";
import { getEvaluationSurvey } from "@/lib/data/survey";
import { redirect } from "next/navigation";
import { SurveyForm } from "./surveyform";

export default async function EvaluateAsTeamLead({ params }: { params: any }) {
  //we need to find the correct survey to be displayed..
  //role of project member
  //role of evaluator

  const surveyData = await getEvaluationSurvey(params.id);
  const details = await getProjectWork(params.id);

  
  if(details.answers.length > 3){
    redirect(`/work/${params.id}/feedback`)
  }

  return (
    <div className="flex flex-col gap-4 mb-20 max-w-3xl mx-auto">

      <Card>
        You are evaluating a frontend developer as a project lead. with the
        following form: {surveyData.name}
      </Card>

      <SurveyForm workId={params.id} responseId={details.id} survey={surveyData}
        defaultValues={details.answers}
      />
    </div>
  );
}
