"use client";
import PercentageSliderField from "@/components/form/percentage-helper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { postServer } from "@/lib/data/postRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BasicEvaluationInfoProps {
  text: any;
  workId: string;
  verified: boolean;
  defaultValues: Partial<verifyWorkValues>;
  result?: boolean;
  projectId?: string;
}

const baseInfoSchema = z
  .object({
    match: z.enum(["100", "80"], {
      required_error: "You need to select a matching performance.",
    }),
    hourly_rate: z.string(),
    weekly_hours: z.string(),
    reject_letter: z.string().optional(),
    rate_contributions: z.number().optional(),
    rate_requirements: z.number().optional(),
    rate_time_schedule: z.number().optional(),
    feedback_times: z.number().optional(),
    good_team_player: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.match === "80") {
        return data.reject_letter !== undefined;
      }
      if (data.match === "100") {
        return (
          data.rate_contributions !== undefined &&
          data.rate_requirements !== undefined &&
          data.rate_time_schedule !== undefined &&
          data.feedback_times !== undefined &&
          data.good_team_player !== undefined
        );
      }
      return true;
    },
    {
      message: "Required fields are missing based on the match value.",
      path: [
        "reject_letter",
        "rate_contributions",
        "rate_requirements",
        "rate_time_schedule",
      ],
    }
  );

type verifyWorkValues = z.infer<typeof baseInfoSchema>;

// This can come from your database or API.
export default function BasicEvaluationInfo({
  text,
  workId,
  verified,
  defaultValues,
  result = false,
  projectId,
}: BasicEvaluationInfoProps) {
  const form = useForm<verifyWorkValues>({
    resolver: zodResolver(baseInfoSchema),
    defaultValues,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: verifyWorkValues) {
    setIsLoading(true);
    if (!workId) {
      toast({
        title: "No idea being found",
      });

      return;
    }
    const url = `/survey-response/matching`;

    const sendingData = JSON.stringify({
      projectWorkId: workId,
      matching: data,
    });
    const result = await postServer(url, sendingData);

    if (result.status == "success") {
      if (data.match == "100") {
        router.push(`/work/${workId}/survey`);
      }

      if (data.match == "80") {
        // router.push(`/project/${projectId}/`);
        router.back();
      }
    } else {
      setIsLoading(false);
    }
  }

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <main className="grow shrink">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Card className="gap-0">
            <h4 className="text-subhead_s mb-7">{text.basic_information}</h4>

            <section className="grid grid-cols-2 gap-4 mb-6">
              <FormField
                control={form.control}
                name="weekly_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.billable_hourly_wage}</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder={
                        text.please_evaluate_users_role_and_performance_in_this_project
                      }
                      disabled={result}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hourly_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.time_weekly}</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder={
                        text.please_evaluate_users_role_and_performance_in_this_project
                      }
                      disabled={result}
                    />
                  </FormItem>
                )}
              />
            </section>
            <section>
              <FormField
                control={form.control}
                name="match"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      {text.does_the_work_details_match_the_facts}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-0 mt-4 space-y-1"
                        disabled={result}
                      >
                        {(!result || form.getValues("match") == "80") && (
                          <FormItem className="flex items-center space-y-0">
                            <FormControl>
                              <RadioGroupItem value="80" />
                            </FormControl>
                            <FormLabel>{text.not_true}</FormLabel>
                          </FormItem>
                        )}
                        {(!result || form.getValues("match") == "100") && (
                          <FormItem className="flex items-center space-y-0">
                            <FormControl>
                              <RadioGroupItem value="100" />
                            </FormControl>
                            <FormLabel>{text.all_match}</FormLabel>
                          </FormItem>
                        )}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>

            {form.watch("match") == "80" && (
              <section className="flex flex-col mt-6 gap-7">
                <FormField
                  control={form.control}
                  name="reject_letter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.reject}</FormLabel>
                      <Textarea
                        {...field}
                        placeholder={text.reject_placeholder}
                        disabled={result}
                      />
                    </FormItem>
                  )}
                />

                {!result && (
                  <section className="flex justify-between">
                    <Button
                      variant="secondary"
                      size="lg"
                      type="button"
                      onClick={onClickGoBack}
                    >
                      {text.go_back}
                    </Button>

                    <Button
                      size="lg"
                      type="submit"
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {text.register_reason}
                    </Button>
                  </section>
                )}
              </section>
            )}
          </Card>

          {form.watch("match") == "100" && (
            <Card>
              <section className="space-y-7 mb-7">
                <h4 className="text-subhead_s mb-7">
                  {text.eval_rate_contributions}
                </h4>

                <PercentageSliderField
                  name="rate_contributions"
                  form={form}
                  steps={10}
                  text={text}
                  label={text.rate_contributions.label}
                  messages={text.rate_contributions.messages}
                  disabled={result}
                />
                <PercentageSliderField
                  name="rate_requirements"
                  form={form}
                  steps={10}
                  label={text.rate_requirements.label}
                  messages={text.rate_requirements.messages}
                  text={text}
                  disabled={result}
                />

                <PercentageSliderField
                  name="rate_time_schedule"
                  form={form}
                  steps={10}
                  text={text}
                  label={text.rate_time_schedule.label}
                  messages={text.rate_time_schedule.messages}
                  disabled={result}
                />
                <PercentageSliderField
                  name="feedback_times"
                  form={form}
                  steps={10}
                  text={text}
                  label={text.feedback_times.label}
                  messages={text.feedback_times.messages}
                  disabled={result}
                />
                <PercentageSliderField
                  name="good_team_player"
                  form={form}
                  steps={10}
                  text={text}
                  label={text.good_team_player.label}
                  messages={text.good_team_player.messages}
                  disabled={result}
                />
              </section>

              {!result && (
                <section className="flex justify-between">
                  <Button
                    variant="secondary"
                    size="lg"
                    type="button"
                    onClick={onClickGoBack}
                  >
                    {text.go_back}
                  </Button>

                  <Button
                    size="lg"
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {text.next}
                  </Button>
                </section>
              )}
            </Card>
          )}
        </form>
      </Form>
    </main>
  );
}
