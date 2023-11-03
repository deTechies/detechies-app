"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { uploadContent } from "@/lib/upload";
import { ArrowDown, CheckIcon } from "lucide-react";
import { useState } from "react";
import { jobList } from "../../onboard/profile/page";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  introduction: z.string().max(160).min(4).optional(),
  job: z
    .object({
      id: z.number(),
      groupName: z.string(),
      name: z.string(),
    })
    .optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;
const defaultValues: Partial<ProfileFormValues> = {
  introduction: "Please leave your personal intro.",
  urls: [{ value: "https://google.com" }],
};

export default function ProfileEdit() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    const form = await uploadContent(
      JSON.stringify({
        ...data,
      })
    );

    console.log(form);

    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Personal Profile</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="grid md:grid-cols-2 gap-8 items-end">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your personal name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Job Type</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between rounded-sm",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? jobList.find(
                                  (job) => job.id === field.value?.id
                                )?.name
                              : "Select job type"}
                            <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-full ">
                          <CommandInput placeholder="Search job..." />
                          <CommandEmpty>Nothing found.</CommandEmpty>
                          <CommandGroup className="w-full max-h-[40vh] overflow-auto">
                            {jobList.map((job: any) => (
                              <CommandItem
                                value={job.name}
                                key={job.name}
                                className="my-4 w-[400px]"
                                onSelect={() => {
                                  form.setValue("job", job);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    job.name === field.value?.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col gap-2">
                                  <h5 className="font-medium">{job.name}</h5>
                                  <span className="text-text-secondary">
                                    {job.groupName}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

                
              </section>
            <section>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="introduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell more about your project"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              </section>
              <section className="w-full flex flex-col gap-2">
              {fields.map((field, index) => (
                <div className="flex gap-2 w-full items-end" key={field.id}>
                  <FormField
                    control={form.control}
                    name={`urls.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Links
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={"destructive"} size="sm" onClick={() => remove(index)}>Delete</Button>
                </div>
              ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mb-2"
                onClick={() => append({ value: "" })}
            >
                Add URL
            </Button>
            </section>

            <div className="flex items-center justify-end gap-8">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                loading={loading}
              >
                Create Profile
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
