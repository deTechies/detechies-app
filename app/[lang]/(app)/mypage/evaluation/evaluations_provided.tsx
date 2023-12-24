import { Card } from "@/components/ui/card";
import { getAllContributed } from "@/lib/data/survey";

export default async function EvaluationProvided() {
  const data = await getAllContributed();
  const stats = [
    {
      title: "평가 완료",
      value: data.length,
      subtext: "",
    },
    {
      title: "평가 대기",
      value: "coming soon",
      subtext: "0 CAZ",
    },
    {
      title: "평가 요청",
      value: "coming soon",
      subtext: "0 CAZ",
    },
  ];
  return (
    <div>
      <section className="flex gap-4 flex-wrap">
        {stats.map((stat, index) => (
          <EvaluationStat key={index} {...stat} />
        ))}
      </section>
      <pre>{JSON.stringify(data, null, 2)}</pre>
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
    <Card className="flex flex-col gap-2 min-w-[200px] p-6">
      <h4 className="text-title_m">{title}</h4>
      <div className="flex flex-col gap-1">
        <h1 className="text-subhead_s">{value}</h1>
        <span className="text-label_s text-text-secondary">{subtext}</span>
      </div>
    </Card>
  );
}
