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
}

const baseInfoSchema = z.object({
  match: z
    .enum(["100", "80"], {
      required_error: "You need to select a matching performance.",
    })
    .optional(),
  hourly_rate: z.string().optional(),
  weekly_hours: z.string().optional(),
  reject_letter: z.string().optional(),
  rate_contributions: z.number().optional(),
  good_team_player: z.number().optional(),
  feedback_times: z.number().optional(),
  rate_requirements: z.number().optional(),
  rate_time_schedule: z.number().optional(),
});

type verifyWorkValues = z.infer<typeof baseInfoSchema>;

// This can come from your database or API.
export default function BasicEvaluationInfo({
  text,
  workId,
  verified,
  defaultValues,
  result = false,
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
    
    if (result.status == 'success') {
      router.push(`/work/${workId}/survey`);
    }

    if (data.match == "80") {
      router.push(`/project`);
    }
  }

  return (
    <main className="grow shrink">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <Card className=" flex gap-7 ">
            <h4 className="text-subhead_s">{text.basic_information}</h4>

            <section className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weekly_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.billable_hourly_wage}</FormLabel>
                    <Input
                      {...field}
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
                        className="flex flex-col space-y-1"
                        disabled={result}
                      >
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="80" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {text.more_than_20}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="100" />
                          </FormControl>
                          <FormLabel className="font-normal lowercase">
                            {text.all_match}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>
            {form.watch("match") == "80" && (
              <section className="flex flex-col gap-7">
                <FormField
                  control={form.control}
                  name="reject_letter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.reject}</FormLabel>
                      <Textarea
                        {...field}
                        placeholder={
                          text.please_evaluate_users_role_and_performance_in_this_project
                        }
                        disabled={result}
                      />
                    </FormItem>
                  )}
                />
              </section>
            )}
            {form.watch("match") == "100" && (
              <section className="space-y-7">
                <PercentageSliderField
                  name="rate_requirements"
                  form={form}
                  steps={10}
                  label={text.meet_requirements.label}
                  messages={text.meet_requirements.messages}
                  disabled={result}
                />
                <PercentageSliderField
                  name="rate_contributions"
                  form={form}
                  steps={10}
                  label={text.work_contribution.label}
                  messages={text.work_contribution.messages}
                  disabled={result}
                />
                <PercentageSliderField
                  name="rate_time_schedule"
                  form={form}
                  steps={10}
                  label={text.meet_schedule.label}
                  messages={text.meet_schedule.messages}
                  disabled={result}
                />
                <PercentageSliderField
                  name="feedback_times"
                  form={form}
                  steps={10}
                  label={text.feedback_times.label}
                  messages={text.feedback_times.messages}
                  disabled={result}
                />
                <PercentageSliderField
                  name="good_team_player"
                  form={form}
                  steps={10}
                  label={text.good_team_player.label}
                  messages={text.meet_schedule.messages}
                  disabled={result}
                />
              </section>
            )}

            {result ? (
              <Link href={`/work/${workId}`} passHref className="mx-auto">
                <Button variant="secondary" size="lg" type="button">
                  Modify
                </Button>
              </Link>
            ) : (
              <section className="flex justify-between">
                <Button variant="secondary" size="lg" type="button">
                  {text.go_back}
                </Button>
                {verified ? (
                  <Button
                    variant="primary"
                    size="lg"
                    type="button"
                    onClick={() => {
                      router.push(`/work/${workId}/survey`);
                    }}
                  >
                    {text.next}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Save
                  </Button>
                )}
              </section>
            )}
          </Card>
        </form>
      </Form>
    </main>
  );
}
