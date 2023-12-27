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
import { submitVerifyWork } from "@/lib/data/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BasicEvaluationInfoProps {
  text: any;
  workId: string;
  verified: boolean;
  defaultValues: Partial<verifyWorkValues>;
}

const baseInfoSchema = z.object({
  match: z.enum(["100", "80"], {
    required_error: "You need to select a matching performance.",
  }).optional(),
  hourly_rate: z.string().optional(),
  weekly_hours: z.string().optional(),
  reject_letter: z.string().optional(),
  rate_contributions: z.number().min(0).max(100).optional(),
  rate_requirements: z.number().min(0).max(100).optional(),
  rate_time_schedule: z.number().min(0).max(100).optional(),
});

type verifyWorkValues = z.infer<typeof baseInfoSchema>;

// This can come from your database or API.
export default function BasicEvaluationInfo({
  text,
  workId,
  verified,
  defaultValues,
}: BasicEvaluationInfoProps) {
  const form = useForm<verifyWorkValues>({
    resolver: zodResolver(baseInfoSchema),
    defaultValues,
  });

  const router = useRouter();

  async function onSubmit(data: verifyWorkValues) {
    //TODO: build the data object to send to the backend

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    const result = await submitVerifyWork(data, workId);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(result, null, 2)}</code>
        </pre>
      ),
    });

    if (data.match == "80") {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(result, null, 2)}
            </code>
          </pre>
        ),
      });
      router.push(`/project`);
    }

    router.push(`/work/${workId}/survey`);
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
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="80" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {text.more_than_20}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
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
                  steps={20}
                  label={text.meet_requirements.label}
                  messages={text.meet_requirements.messages}
                />
                <PercentageSliderField
                  name="rate_contributions"
                  form={form}
                  steps={20}
                  label={text.work_contribution.label}
                  messages={text.work_contribution.messages}
                />
                <PercentageSliderField
                  name="rate_time_schedule"
                  form={form}
                  steps={20}
                  label={text.meet_schedule.label}
                  messages={text.meet_schedule.messages}
                />
              </section>
            )}
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
                <Button size="lg" type="submit"
                  disabled={!form.formState.isValid}
                >
                  Save
                </Button>
              )}
            </section>
          </Card>
        </form>
      </Form>
    </main>
  );
}
