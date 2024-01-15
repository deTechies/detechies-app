"use client";
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
  opportunity: z.string(),
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
    setIsLoading(true)
    const result = await submitSwotAnalysis(data, workId, surveyResponseId);
    
    toast({
      description: result.message
    });

    if(result.status === 'success'){
      router.push(`/work/${workId}/result`);
    }
    
    setIsLoading(false)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <h5 className="text-subhead_s">윤창진님에게 남기는 마지막 피드백</h5>
        <section className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="strength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strengths</FormLabel>
                <Textarea {...field} />
              </FormItem>
            )}
          />
        </section>
        <section className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="weakness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weakness</FormLabel>
                <Textarea {...field} />
              </FormItem>
            )}
          />
        </section>
        <section className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="opportunity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advise</FormLabel>
                <Textarea {...field} />
              </FormItem>
            )}
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
            Back
          </Button>

          <Button type="submit" variant={"primary"} size="lg" 
            loading={isLoading}
            disabled={isLoading}
          >
            Save and Continue
          </Button>
        </section>
      </form>
    </Form>
  );
}
