"use client";
import PercentageSliderField from "@/components/form/percentage-helper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { submitEvaluationSurvey } from "@/lib/data/survey";
import { Survey } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SurveyForm({
  workId,
  responseId,
  survey,
  defaultValues,
  result = false,
  lang,
  selectedLanguage,
}: {
  workId: string;
  responseId: string;
  survey: Survey;
  defaultValues: any;
  result?: boolean;
  selectedLanguage?: string;
  lang: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const createSurveySchema = (answers: any) => {
    const schemaFields = answers.questions.reduce((acc: any, question: any) => {
      acc[question.id] = z.number();
      return acc;
    }, {});

    return z.object(schemaFields);
  };

  const surveySchema = createSurveySchema(survey);

  const form = useForm<any>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
  });

  const allFields = form.watch();

  useEffect(() => {
    form.trigger().then((isValid) => {
      setIsValid(isValid);
    });
  }, [allFields, form]);

  //setting default values

  useEffect(() => {
    const transformAnswersToDefaultValues = (answers: any) => {
      return answers.reduce((acc: any, answer: any) => {
        acc[answer.questionId] = parseInt(answer.response);
        return acc;
      }, {});
    };

    // Assuming `answers` is the array of data you provided
    if (!defaultValues) return;
    const defaultFormValues = transformAnswersToDefaultValues(defaultValues);
    form.reset(defaultFormValues);
  }, [defaultValues, form]);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    if (
      Object.values(data).some(
        (value) => value === null || value === "" || value === undefined
      )
    ) {
      toast({ title: "Error", description: "Please fill in all the fields." });

      setIsLoading(false);
      return;
    }

    const result = await submitEvaluationSurvey(data, workId, responseId);

    router.push(`/work/${workId}/feedback`);
  };

  const categoryOrder = ["기술 전문성", "협업 및 커뮤니케이션", "업무 지식"];

  const questionsByCategory = survey.questions.reduce(
    (acc: any, question: any) => {
      const category: string = question.category || ("Others" as string); // Default category if none is provided
      acc[category] = acc[category] || [];
      acc[category].push(question);
      return acc;
    },
    {}
  );

  const sortedCategories = Object.keys(questionsByCategory).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          {sortedCategories.map((category, index) => {
            return (
              <Card key={category}>
                <h5 className="text-subhead_s mb-7">{category}</h5>{" "}
                {/* Display the category */}
                <div className="flex flex-col gap-6">
                  {questionsByCategory[category].map((question: any) => {
                    // Display the questions based on language
                    const existingTranslation = question.translations?.find(
                      (translation: any) =>
                        translation.language === selectedLanguage
                    );
                    if (question.type === "input") {
                      return null;
                    } else {
                      return (
                        <PercentageSliderField
                          key={question.id}
                          form={form}
                          name={question.id}
                          label={
                            existingTranslation?.content
                              ? existingTranslation.content
                              : question.content
                          }
                          steps={100 / 10}
                          messages={
                            existingTranslation?.messages
                              ? existingTranslation.messages
                              : question.messages
                          }
                          disabled={result}
                          text={lang}
                        />
                      );
                    }
                  })}
                </div>
                {!result &&
                  Object.keys(questionsByCategory).length - 1 == index && (
                    <div className="flex flex-row justify-between mt-3">
                      <Button
                        type="button"
                        size="lg"
                        variant={"secondary"}
                        onClick={() => {
                          router.back();
                        }}
                      >
                        {lang.project.evaluate.go_back}
                      </Button>

                      <Button
                        type="submit"
                        size="lg"
                        loading={isLoading}
                        disabled={isLoading || !isValid}
                      >
                        {lang.project.evaluate.next}
                      </Button>
                    </div>
                  )}
              </Card>
            );
          })}
        </form>
      </Form>
    </div>
  );
}
