import { Card } from "@/components/ui/card";
import { serverApi } from "@/lib/data/general";
import RequestedEvaluationCard from "./_components/requested-evaluation-card";

export default async function EvaluationProvided({
  lang
}: {
  lang: any;
}) {
  const queries = {
    provided: "true",
    status: "finished",
  };
  const filters = new URLSearchParams(queries).toString();

  const { data } = await serverApi(`/survey-response/filtered?${filters}`);

  // console.log(data);
  const stats = [
    {
      title: lang.mypage.evaluations.stats.total_reviews,
      value: data.length,
      subtext: "",
    },
    {
      title: lang.mypage.evaluations.stats.total_earned,
      value: lang.mypage.evaluations.coming_soon,
      subtext: "0 CAZ",
    },
    {
      title: lang.mypage.evaluations.stats.average_rewards,
      value: lang.mypage.evaluations.coming_soon,
      subtext: "0 CAZ",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        {stats.map((stat, index) => (
          <EvaluationStat key={index} {...stat} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {data &&
          data.map((item: any, index: number) => (
            <RequestedEvaluationCard key={index} data={item} lang={lang} provided={true} />
          ))}
      </div>
    </div>
  );
}

interface EvaluationStatProps {
  title?: any;
  value: string;
  subtext?: string;
}

export async function EvaluationStat({
  title,
  value,
  subtext,
}: EvaluationStatProps) {
  return (
    <Card className="flex flex-col gap-2 w-[200px] p-6">
      <h4 className="text-title_m">{title}</h4>
      <div className="flex flex-col gap-1">
        <h1 className="text-subhead_s">{value}</h1>
        <span className="text-label_s text-text-secondary">{subtext}</span>
      </div>
    </Card>
  );
}
