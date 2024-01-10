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
import { createQuestion } from "@/lib/data/feedback";
import { QuestionCategory, QuestionType } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";

const questionFormSchema = z.object({
  content: z.string().min(2).max(1000).optional(),
  type: z.string(),
  comments: z.string().min(2).max(1000).optional(),
  language: z.string().min(2).max(1000).optional(),
  max_text: z.string().min(2).max(50).optional(),
  min_text: z.string().min(2).max(50).optional(),
  roles: z.array(z.string().optional()).optional(),
  category: z.nativeEnum(QuestionCategory, {
    required_error: "You need to select a category.",
  }),
  scale: z.number().min(0).max(10),
  baseWeight: z.number().min(0).max(100).optional(),
  messages: z.array(z.string().optional()).optional(),
});

type QuestionValues = z.infer<typeof questionFormSchema>;
const defaultValues: Partial<QuestionValues> = {};

export default function CreateQuestion() {
  const form = useForm<QuestionValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const scale = form.watch("scale", 0); // Watching scale value

  const selectedType = form.watch("type", "slider");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: QuestionValues) {
    setLoading(true);

    const result = await createQuestion(data);

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
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
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
                            {Object.values(QuestionType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            {Object.values(QuestionCategory).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="scale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scale</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
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
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="kr">Korean</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                {/*   <FormField
                    control={form.control}
                    name="roles" // Update the name to match the field name in your form
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available roles</FormLabel>
                        <FormControl>
                          <MultiSelectFormField
                            control={form.control}
                            name="roles"
                            options={[
                              { value: "option1", label: "Option 1" },
                              { value: "option2", label: "Option 2" },
                              { value: "option3", label: "Option 3" },
                              { value: "option4", label: "Option 4" },
                              // ...other options
                            ]}
                            // Pass other necessary props
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write out the question"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {selectedType == "slider" &&
              Array.from({ length: scale }, (_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`messages.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{`Message ${index + 1}`}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

            {selectedType == "circles" && (
              <section className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="min_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Write out the question"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Text</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Write out the question"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
            )}

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
