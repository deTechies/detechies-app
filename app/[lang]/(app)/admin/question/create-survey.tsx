"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { createSurvey } from "@/lib/data/feedback";
import { useRouter } from "next/navigation";
import { useState } from "react";

const questionFormSchema = z.object({
  name: z.string().min(2).max(1000).optional(),
  description: z.string().min(2).max(1000).optional(),
  category: z.string().min(2).max(1000),
});

type QuestionValues = z.infer<typeof questionFormSchema>;
const defaultValues: Partial<QuestionValues> = {};

export default function CreateSurvey({questions}: {questions: any[]}) {
  const form = useForm<QuestionValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: QuestionValues) {
    setLoading(true);
    
    const questionIds = questions.map((q) => q.original.id);
    const result = await createSurvey({...data, questionIds: questionIds});

    if (result.id) {
      toast({
        title: "Success",
        description: "Created successfully",
      });
    }

    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create </Button>
      </DialogTrigger>

      <DialogContent>
        <h3 className="text-subhead_s font-medium mb-4">Create Question</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="flex gap-8">
              <div className="flex flex-col gap-4 flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              <SelectItem value="frontend_developer">
                                Frontend Developer
                              </SelectItem>
                              <SelectItem value="backend_developer">
                                Backend Developer
                              </SelectItem>
                              <SelectItem value="product_designer">
                                Product Designer
                              </SelectItem>
                              <SelectItem value="team_lead">
                                Team Lead
                              </SelectItem>
                              <SelectItem value="team_lead">
                                Dev Ops
                              </SelectItem>

                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description of survey"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <div className="flex items-center justify-center gap-8">
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading || !form.formState.isValid}
                loading={loading}
              >
                Create Question
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
