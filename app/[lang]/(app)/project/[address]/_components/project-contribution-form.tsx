"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { addMembersWork } from "@/lib/data/project";
import { ContributionType } from "@/lib/interfaces";
import { useState } from "react";

const contributionFormSchema = z.object({
  begin_date: z.string(),
  end_date: z.string().optional(),
  description: z.string().max(160).min(4),
  percentage: z.array(z.number().min(0).max(100)),
  name: z.nativeEnum(ContributionType, {
    required_error: "You need to select a  type.",
  }),
  present: z.boolean().default(false),
  valid: z.boolean().optional(),
  tags: z.array(z.string()),
});

export type ContributionFormData = z.infer<typeof contributionFormSchema>;

type ProjectContributionFormProps = {
  projectId: string;
};

export default function ProjectContributionForm({
  projectId,
}: ProjectContributionFormProps) {
  const form = useForm<ContributionFormData>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: {
      name: ContributionType.DEVELOPMENT,
      percentage: [0],
      present: false,
      valid: false,
      tags: [],
    },
    mode: "onChange",
  });
  const messageValue = form.watch("description", "");
  const currentPercentage = form.watch("percentage", [0]);

  const [loading, setLoading] = useState(false);


  const onSubmit = async (values: ContributionFormData) => {
    console.log(values);
    const result = await addMembersWork(values, projectId);

    toast({
      title: "Success",
      description: <pre>{JSON.stringify(result, null, 2)}</pre>,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border p-3 rounded-sm "
      >
        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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
                      {Object.values(ContributionType).map((type) => (
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
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <Label>Period</Label>
              <div className="flex items-center gap-3">
                <Checkbox
                  onCheckedChange={(e: boolean) => {
                    form.setValue("present", e.valueOf());
                  }}
                />
                <Label>Present</Label>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center w-full">
              <FormField
                control={form.control}
                name="begin_date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Input type="date" placeholder="Select a type" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span>~</span>
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Input
                      type="date"
                      placeholder="Select a type"
                      {...field}
                      disabled={form.watch("present", false)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>

        <section>
        <Controller
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type and press enter"
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const newTags = [
                              ...form.watch("tags"),
                              e.currentTarget.value,
                            ];
                            form.setValue("tags", newTags, { shouldValidate: true });
                            e.currentTarget.value = "";
                            e.preventDefault(); // Prevent form submit
                          }
                        }}
                      />
                    </FormControl>
                    <div>
{/*                       {form.watch("tags").map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-full text-xs mr-2"
                        >
                          {tag}
                        </span>
                      ))} */}
                    </div>
                  </FormItem>
                )}
              />
        </section>

        <section>
          <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribution Percentage</FormLabel>
                <div className="flex w-full justify-between text-xs text-text-secondary">
                  <span>0</span>
                  <span className="content-center w-full text-right">50</span>
                  <span className="content-right text-right w-full">100</span>
                </div>
                <FormControl>
                  <Slider {...field} step={10} onValueChange={field.onChange} />
                </FormControl>
                <FormDescription className="flex">
                  <FormMessage className="w-full" />
                  <span className="content-right text-right w-full">
                    {currentPercentage[0]} of 100
                  </span>
                </FormDescription>
              </FormItem>
            )}
          />
        </section>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell more about your project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex">
                <FormMessage className="w-full" />
                <span className="content-right text-right w-full">
                  {messageValue.length} / 5000
                </span>
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center gap-8">
          <Button
            type="submit"
            disabled={loading || !form.formState.isValid}
            loading={loading}
            size="sm"
          >
            Save Contribution
          </Button>
        </div>
      </form>
    </Form>
  );
}
