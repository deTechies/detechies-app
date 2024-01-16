"use client";
import { Ranking } from "@/components/group/ranking";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { submitSwotAnalysis } from "@/lib/data/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const finalFeedbackForm = z.object({
  strength: z.string(),
  weakness: z.string(),
  opportunity: z.string().optional(),
  // team_building: z.string(),
});

type FinalFeedbackValues = z.infer<typeof finalFeedbackForm>;

// This can come from your database or API.

export default function FinalFeedbackForm({
  text,
  workId,
  surveyResponseId,
  defaultValues,
}: {
  text: any;
  workId: any;
  surveyResponseId: string;
  defaultValues: Partial<FinalFeedbackValues>;
}) {
  const form = useForm<FinalFeedbackValues>({
    resolver: zodResolver(finalFeedbackForm),
    defaultValues,
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  async function onSubmit(data: FinalFeedbackValues) {
    setIsLoading(true);
    const result = await submitSwotAnalysis(data, workId, surveyResponseId);

    toast({
      description: result.message,
    });

    if (result.status === "success") {
      router.push(`/work/${workId}/result`);
    } else {
      setIsLoading(false);
    }
  }



  const [teamBuildingRank, setTeamBuildingRank] = useState(3);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h5 className="text-subhead_s mb-7">
          {text.project.evaluate.feedback_title}
        </h5>

        <section className="flex flex-col gap-4 mb-7">
          <FormField
            control={form.control}
            name="strength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.project.evaluate.strength}</FormLabel>
                <Textarea {...field} />
              </FormItem>
            )}
          />
        </section>
        <section className="flex flex-col gap-4 mb-7">
          <FormField
            control={form.control}
            name="weakness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.project.evaluate.weakness}</FormLabel>
                <Textarea {...field} />
              </FormItem>
            )}
          />
        </section>
        
        <section className="flex flex-col gap-4 mb-20">
          <FormField
            control={form.control}
            name="opportunity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{text.project.evaluate.feedback}</FormLabel>
                <Textarea {...field} />
              </FormItem>
            )}
          />
        </section>

        <section className="flex flex-col mx-auto mb-20">
          <div className="mb-10 text-center text-subhead_s">
            {text.project.evaluate.again}
          </div>

          <Ranking
            key="team_building"
            ranks={5}
            minText={text.project.evaluate.no_team_building}
            maxText={text.project.evaluate.love_to}
            onSelectRank={(rank) => setTeamBuildingRank(rank)}
            activeRank={teamBuildingRank}
          />
        </section>

        <section className="flex justify-between">
          <Button
            variant="secondary"
            size="lg"
            type="button"
            onClick={() => {
              router.back();
            }}
          >
            {text.project.evaluate.go_back}
          </Button>

          <Button
            type="submit"
            variant={"primary"}
            size="lg"
            loading={isLoading}
            disabled={isLoading}
          >
            {text.project.evaluate.register}
          </Button>
        </section>
      </form>
    </Form>
  );
}
