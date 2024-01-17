import { serverApi } from "@/lib/data/general";
import { SurveyResponse } from "@/lib/interfaces";
import RequestedEvaluationCard from "./_components/requested-evaluation-card";

export default async function Evaluations({ queries }: { queries: any }) {
  const filters = new URLSearchParams(queries).toString();
  const { data } = await serverApi(`/survey-response/filtered?${filters}`);

  if (data.length < 1) return <div>평가 요청이 없습니다.</div>;

  return (
    <div className="flex flex-col gap-4">
      {data.map((item: SurveyResponse, index: number) => (
        <RequestedEvaluationCard key={index} data={item} />
      ))}
    </div>
  );
}
