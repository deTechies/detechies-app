"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
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
  sameRole: boolean;
  defaultValues: Partial<verifyWorkValues>;
  result?: boolean;
}

const nonAdminContributionSchema = z.object({
  reject_letter: z.string().optional(),
  match: z.enum(["100", "80"], {
    required_error: "You need to select a matching performance.",
  }),
});

type verifyWorkValues = z.infer<typeof nonAdminContributionSchema>;

// This can come from your database or API.
export default function NonAdminContributionForm({
  text,
  workId,
  defaultValues,
  result,
  sameRole,
}: BasicEvaluationInfoProps) {
  const form = useForm<verifyWorkValues>({
    resolver: zodResolver(nonAdminContributionSchema),
    defaultValues,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: verifyWorkValues) {
    setIsLoading(true);
    if (!workId) {
      toast({
        title: "No id being found",
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
      //based on the role we continue to either survey or feedback
      if (sameRole) {
        router.push(`/work/${workId}/survey`);
      } else {
        router.push(`/work/${workId}/feedback`);
      }
    }

    if (data.match == "80") {
      router.push(`/project`);
    }
  }

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <main className="grow shrink">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <Card className="gap-0">
            <h4 className="text-subhead_s mb-7">{text.basic_information}</h4>
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
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="80" />
                          </FormControl>
                          <FormLabel>{text.not_true}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0">
                          <FormControl>
                            <RadioGroupItem value="100" />
                          </FormControl>
                          <FormLabel>{text.all_match}</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>
            <section>
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
              </section>
            )}
            </section>
            <section className="mt-8">
            {result ? (
              <Link href={`/work/${workId}`} passHref className="mx-auto">
                <Button variant="secondary" size="lg" type="button">
                  {text.modify}
                </Button>
              </Link>
            ) : (
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
          </Card>
        </form>
      </Form>
    </main>
  );
}
