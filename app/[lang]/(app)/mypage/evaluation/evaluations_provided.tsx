import { Card } from "@/components/ui/card";

export default function EvaluationProvided() {
    
    const stats = [
        {
            title: "평가 완료",
            value: "10",
            subtext: ""
        },
        {
            title: "평가 대기",
            value: "30,000",
            subtext: "30 CAZ"
        },
        {
            title: "평가 요청",
            value: "1,250",
            subtext: "1.25 CAZ"
        }
    ]
  return (
    <div>
        <section className="flex gap-4 flex-wrap">
            {
                stats.map((stat, index) => (
                    <EvaluationStat key={index} {...stat} />
                ))
            }
        </section>
    </div>
  )
}


interface EvaliuationStatProps {
    title?: any
    value: string
    subtext?: string
}

export function EvaluationStat({
    title, value, subtext
}: EvaliuationStatProps){
    return (

            <Card className="flex flex-col gap-2 min-w-[200px] p-6">
                <h4 className="text-title_m">{title}</h4>
                <div className="flex flex-col gap-1">
                <h1 className="text-subhead_s">{value}</h1>
                <span className="text-label_s text-text-secondary">{subtext}</span>
                    
                </div>
            </Card>
    )
}