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
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { addMembersWork } from "@/lib/data/project";
import { PROFESSION_TYPE } from "@/lib/interfaces";
import { useRef, useState } from "react";
const contributionFormSchema = z.object({
  begin_date: z.string(),
  end_date: z.string().optional(),
  description: z.string().max(5000).min(4),
  percentage: z.array(z.number().min(0).max(100)),
  role: z.nativeEnum(PROFESSION_TYPE, {
    required_error: "You need to select a type.",
  }),
  present: z.boolean().default(false),
  valid: z.boolean().optional(),
  tags: z.array(z.string()),
});

export type ContributionFormData = z.infer<typeof contributionFormSchema>;

type ProjectContributionFormProps = {
  projectId: string;
};

export default function ProjectContributionInviteForm({
  projectId,
  lang,
  setInvite,
}: {
  projectId: string;
  lang: any;
  setInvite: () => void;
}) {
  const form = useForm<ContributionFormData>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: {
      role: PROFESSION_TYPE.DEVELOPMENT,
      percentage: [0],
      present: false,
      valid: false,
      tags: [],
    },
    mode: "onChange",
  });
  const messageValue = form.watch("description", "");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentPercentage = form.watch("percentage", [0]);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag

  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      const currentTags = form.getValues("tags") || [];
      form.setValue("tags", [...currentTags, newTag.trim()], {
        shouldValidate: true,
      });
      setNewTag(""); // Clear the input field for new tag
    }
  };

  const handleNewTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  const onSubmit = async (values: ContributionFormData) => {
    setLoading(true)

    try {
      const result = await addMembersWork(values, projectId);

      if(result.status === "success"){
        toast({
          title: "Success",
          description: "Your contribution has been added.",
        });
      } else {
        toast({
          title: "Failed",
          description: result.codeMessage,
        });
      }
      
      setLoading(false);
      if (closeButtonRef.current) {
        // closeButtonRef.current.click();
        setInvite();
      }
    } catch (error) {
      toast({
        title: "error",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="spaxe-y-8 ">
        <main className="p-5 mb-6 space-y-8 border rounded-md border-border-div">
          <section className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {lang.project.details.members.add_works.position}
                    </FormLabel>

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
                        {Object.values(PROFESSION_TYPE).map((type) => (
                          <SelectItem key={type} value={type}>
                            {lang.interface.profession_type[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="flex justify-between">
                <Label>{lang.project.details.members.add_works.date}</Label>
                <div className="flex items-center gap-1">
                  <Checkbox
                    onCheckedChange={(e: boolean) => {
                      form.setValue("present", e.valueOf());
                    }}
                  />
                  <Label>
                    {lang.project.details.members.add_works.in_progress}
                  </Label>
                </div>
              </div>

              <div className="flex flex-row items-center w-full gap-2">
                <FormField
                  control={form.control}
                  name="begin_date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Input
                        type="date"
                        {...field}
                      />
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
                        {...field}
                        disabled={form.watch("present", false)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormItem>
              <FormLabel>
                {lang.project.details.members.add_works.detail_work}
              </FormLabel>

              <FormControl>
                <Input
                  placeholder={lang.project.details.members.add_works.type}
                  value={newTag}
                  onChange={handleNewTagChange}
                  onKeyDown={handleKeyDown}
                  disabled={
                    form.getValues("tags") &&
                    form.getValues("tags").length > 4
                  }
                />
              </FormControl>

              <div className="flex flex-wrap gap-3">
              {/* py-4 px-5 border border-border-div rounded-sm */}
                {form.watch("tags")?.map((tag: any, index) => (
                  <Badge
                    key={index}
                    shape="outline"
                    variant="accent"
                    onClick={() => {
                      const currentTags = form.getValues("tags") || [];
                      const newTags = currentTags.filter((t) => t !== tag);
                      form.setValue("tags", newTags, { shouldValidate: true });
                    }}
                  >
                    <div className="truncate">
                      {tag}
                    </div>
                  </Badge>
                ))}
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {lang.project.details.members.add_works.attribute}
                  </FormLabel>
                  <FormControl>
                    <Slider
                      {...field}
                      step={10}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="flex">
                    <FormMessage className="w-full" />
                    {/* <span className="w-full text-right content-right">
                      {currentPercentage[0]} of 100
                    </span> */}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {lang.project.details.members.add_works.job_desc}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        lang.project.details.members.add_works
                          .job_desc_placeholder
                      }
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription className="flex">
                    <FormMessage className="w-full" />
                    <span className="w-full text-right content-right">
                      {messageValue.length} / 5000
                    </span>
                  </FormDescription>
                </FormItem>
              )}
            />
          </section>
        </main>

        <div className="flex items-center justify-center gap-2">
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              ref={closeButtonRef}
              size="lg"
            >
              {lang.project.details.members.add_works.later}
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={loading || !form.formState.isValid}
            loading={loading}
            variant="default"
            size="lg"
          >
            {lang.project.details.members.add_works.add}
          </Button>
        </div>
      </form>
    </Form>
  );
}
