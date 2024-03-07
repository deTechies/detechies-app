import { serverApi } from "@/lib/data/general";
import { SurveyResponse } from "@/lib/interfaces";
import RequestedEvaluationCard from "./_components/requested-evaluation-card";

export default async function Evaluations({ queries, lang }: { queries: any, lang:any }) {
  const filters = new URLSearchParams(queries).toString();
  const { data } = await serverApi(`/survey-response/filtered?${filters}`);

  if (data.length < 1) return <div className="my-10 text-xl" >No evaluation found.</div>;

  return (
    <div className="flex flex-col gap-4">
      {data.map((item: SurveyResponse, index: number) => (
        <RequestedEvaluationCard key={index} data={item} lang={lang}/>
      ))}
    </div>
  );
}
