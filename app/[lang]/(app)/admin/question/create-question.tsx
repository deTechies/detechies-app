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
import { postServer } from "@/lib/data/postRequest";
import { QuestionCategory } from "@/lib/interfaces";
import { useState } from "react";

const questionFormSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(2).max(1000).optional(),
  language: z.string().default('kr'),
  category: z.string(),
  scale: z.number().default(5),
  baseWeight: z.number().min(0).max(100).optional(),
  messages: z.array(z.string().optional()).optional().transform(messages => messages ? messages.slice(0, 5) : []),
});

type QuestionValues = z.infer<typeof questionFormSchema>;

export default function CreateQuestion({
  defaultValues,
}: {
  defaultValues?: Partial<QuestionValues>;  
}) {
  if (defaultValues && defaultValues.messages) {
    defaultValues.messages = defaultValues.messages.slice(0, 5);
  }
  const form = useForm<QuestionValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: QuestionValues) {
    setLoading(true);
    
    console.log(data)
    const stringed= JSON.stringify(data)

    const result = await postServer('/question', stringed);

    if(result.status === 'success') {
      toast({
        title: "Question created",
        description: <span>Question has been created. </span>,
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
                <span>
                  Error 
                  {
                    <pre>
                      {JSON.stringify(form.formState.errors, null, 4)}
                    </pre>
                  }
                </span>
                <div className="grid grid-cols-3 gap-4">
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
                    name="baseWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>baseWeight</FormLabel>
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

            {
              Array.from({ length: 5 }, (_, index) => (
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

            <div className="flex items-center justify-center gap-8">
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
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
