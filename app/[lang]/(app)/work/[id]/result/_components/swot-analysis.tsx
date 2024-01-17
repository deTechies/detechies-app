import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LastFeedbackResult({ data, lang }: { data: any; lang: any }) {
  if (!data) {
    <Card>This form has not been submitted yet..</Card>;
  }
  return (
    <Card>
      <section className="flex flex-col gap-8">
        <h5 className="text-subhead_s">
          {lang.project.evaluate.feedback_title}
        </h5>
        <div>
          <Label>{lang.project.evaluate.strength}</Label>
          <Textarea value={data?.strength} disabled />
        </div>
        <div>
          <Label>{lang.project.evaluate.weakness}</Label>
          <Textarea value={data?.weakness} disabled />
        </div>
        <div>
          <Label>{lang.project.evaluate.feedback}</Label>
          <Textarea value={data?.opportunity} disabled />
        </div>
      </section>
    </Card>
  );
}
