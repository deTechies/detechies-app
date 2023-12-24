import PercentageSliderField from "@/components/form/percentage-helper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
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

  const onSubmit = (data: FormData) => {
    toast({
      title: "form results",
      description: <pre>{JSON.stringify(data, null, 2)}</pre>,
    });
  };
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              {selected.questions.map((question: any) => {
                if (question.type == "input") {
                  return (
                    <FormField
                      key={question.id}
                      control={form.control}
                      name={question.id}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{question.content}</FormLabel>
                          <Input {...field} />
                        </FormItem>
                      )}
                    />
                  );
                }

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

              <Button type="submit">show result</Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
