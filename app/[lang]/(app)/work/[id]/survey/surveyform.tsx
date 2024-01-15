"use client";
import PercentageSliderField from "@/components/form/percentage-helper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { submitEvaluationSurvey } from "@/lib/data/survey";
import { Survey } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function SurveyForm({
  workId,
  responseId,
  survey,
  defaultValues,
  result = false,
}: {
  workId: string;
  responseId: string;
  survey: Survey;
  defaultValues: any;
  result?: boolean;
}) {
  const form = useForm<any>({});
  //setting default values
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const transformAnswersToDefaultValues = (answers: any) => {
      return answers.reduce((acc: any, answer: any) => {
        acc[answer.questionId] = answer.response;
        return acc;
      }, {});
    };

    // Assuming `answers` is the array of data you provided
    if (!defaultValues) return console.log("no default values");
    const defaultFormValues = transformAnswersToDefaultValues(defaultValues);
    form.reset(defaultFormValues);
  }, [defaultValues, form]);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const result = await submitEvaluationSurvey(data, workId, responseId);
    toast({
      title: "form results",
      description: <span>Thank you for filling in the form. </span>,
    });

    router.push(`/work/${workId}/feedback`);
    
    setIsLoading(false);
  };

  const questionsByCategory = survey.questions.reduce(
    (acc: any, question: any) => {
      const category: string = question.category || ("Others" as string); // Default category if none is provided
      acc[category] = acc[category] || [];
      acc[category].push(question);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          {Object.keys(questionsByCategory).map((category) => {
            return (
              <Card key={category}>
                <h5 className="text-subhead_s mb-7">{category}</h5> {/* Display the category */}
                <div className="flex flex-col gap-6">
                {questionsByCategory[category].map((question: any) => {
                  // Render each question
                  if (question.type === "input") {
                    return null;
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
                    />;
                  } else {
                    return (
                      <PercentageSliderField
                        key={question.id}
                        form={form}
                        name={question.id}
                        label={question.content}
                        steps={100 / 10}
                        messages={question.messages}
                        disabled={result}
                      />
                    );
                  }
                })}
                </div>
              </Card>
            );
          })}

          {!result && (
            <Card className="flex flex-row justify-between">
              <Button type="button" variant={"secondary"}>
                Go Back
              </Button>
              <Button type="submit"
                loading={isLoading}
                disabled={isLoading}
              >Save</Button>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
}
