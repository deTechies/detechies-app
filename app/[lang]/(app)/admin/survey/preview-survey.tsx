import PercentageSliderField from "@/components/form/percentage-helper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Survey } from "@/lib/interfaces";
import { useForm } from "react-hook-form";


export function PreviewSurvey({
  selected,
  setSelected,
}: {
  selected: Survey;
  setSelected: any;
}) {
  const form = useForm<any>({});
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <h3>
          {selected.name} ({selected.questions.length})
        </h3>
        <Button size="sm" onClick={() => setSelected(null)}>
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            {selected.questions.map((question: any) => {
              return (
                <PercentageSliderField
                    key={question.id}
                  form={form}
                  name={question.id}
                  label={question.content}
                  steps={100 / question.scale}
                  messages={question.messages}
                />
              );
            })}
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
