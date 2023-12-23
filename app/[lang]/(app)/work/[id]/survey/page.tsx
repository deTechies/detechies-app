import { Card } from "@/components/ui/card";
import { getEvaluationSurvey } from "@/lib/data/survey";
import { SurveyForm } from "./surveyform";

export default async function EvaluateAsTeamLead({ params }: { params: any }) {
  //we need to find the correct survey to be displayed..
  //role of project member
  //role of evaluator

  const surveyData = await getEvaluationSurvey(params.id);

  return (
    <div className="flex flex-col gap-4 mb-20 max-w-3xl mx-auto">
      <Card>
        You are evaluating a frontend developer as a project lead. with the
        following form: {surveyData.name}
      </Card>

      <SurveyForm workId={params.id} survey={surveyData} />
    </div>
  );
}
