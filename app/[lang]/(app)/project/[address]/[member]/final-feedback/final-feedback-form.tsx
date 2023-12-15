"use client"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface BasicEvaluationInfoProps {
  text: any;
}

const finalFeedbackForm = z.object({
  strengths: z.string().optional(),
  weaknesses: z.string().optional(),
  advise: z.string().optional(),
});

type FinalFeedbackValues = z.infer<typeof finalFeedbackForm>;

// This can come from your database or API.
const defaultValues: Partial<FinalFeedbackValues> = {};

export default function FinalFeedbackForm({ text }: { text: any }) {
  const form = useForm<FinalFeedbackValues>({
    resolver: zodResolver(finalFeedbackForm),
    defaultValues,
  });
  const router = useRouter();

  function onSubmit(data: FinalFeedbackValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    
    router.push('/mypage/evaluation')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <h5 className="text-subhead_s">윤창진님에게 남기는 마지막 피드백</h5>
        <section className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="strengths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strengths</FormLabel>
                <Textarea
                  {...field}

                />
              </FormItem>
            )}
          />
        </section>
        <section className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="weaknesses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weakness</FormLabel>
                <Textarea
                  {...field}

                />
              </FormItem>
            )}
          />
        </section>
        <section className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="advise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advise</FormLabel>
                <Textarea
                  {...field}

                />
              </FormItem>
            )}
          />
        </section>
        <section className="flex justify-between">
            <Button variant="secondary" size="lg"
                onClick={() => {
                    router.back();
                }}
            >
                {text.go_back}
            </Button>
            <Button type="submit" variant={'primary'} size='lg'>
                {text.next}
            </Button>
        </section>
      </form>
    </Form>
  );
}
