"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { submitSwotAnalysis } from "@/lib/data/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BasicEvaluationInfoProps {
  text: any;
}

const finalFeedbackForm = z.object({
  strength: z.string(),
  weakness: z.string(),
  opportunity: z.string(),
  threat: z.string().optional(),
});

type FinalFeedbackValues = z.infer<typeof finalFeedbackForm>;

// This can come from your database or API.
const defaultValues: Partial<FinalFeedbackValues> = {};

export default function FinalFeedbackForm({
  text,
  workId,
}: {
  text: any;
  workId: any;
}) {
  const form = useForm<FinalFeedbackValues>({
    resolver: zodResolver(finalFeedbackForm),
    defaultValues,
  });
  const router = useRouter();

  async function onSubmit(data: FinalFeedbackValues) {
    const result = await submitSwotAnalysis(data, workId);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          <code className="text-white">{JSON.stringify(result, null, 2)}</code>
        </pre>
      ),
    });

    //router.push('/mypage/evaluation')
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
            {text.go_back}
          </Button>
          <Button type="submit" variant={"primary"} size="lg">
            {text.next}
          </Button>
        </section>
      </form>
    </Form>
  );
}
