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
import { postServer } from "@/lib/data/postRequest";
import { addMembersWork } from "@/lib/data/project";
import { PROFESSION_TYPE, Project } from "@/lib/interfaces";
import { useRef, useState } from "react";
import ProfessionTagType from "@/components/extra/profession-tag-type";
import { X } from "lucide-react";



export default function ProjectContributionForm({
  project,
  lang,
  workDetails,
  workId,
}: {
  project: Project;
  lang: any;
  workDetails?: any;
  workId?: string;
}) {
  const contributionFormSchema = z.object({
    begin_date: z.string(),
    end_date: z.string().optional(),
    description: z.string().max(5000, lang.validation.project.details.members.add_works.too_long_description).min(4, lang.validation.project.details.members.add_works.too_short_description),
    percentage: z.array(z.number().max(100)),
    role: z.nativeEnum(PROFESSION_TYPE, {
      required_error: "You need to select a type.",
    }),
    present: z.boolean().default(false),
    valid: z.boolean().optional(),
    tags: z.array(z.string()),
  });
  
  type ContributionFormData = z.infer<typeof contributionFormSchema>;


  const form = useForm<ContributionFormData>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: workDetails
      ? {
          role: workDetails.role,
          begin_date: workDetails.begin_date.split("T")[0],
          end_date: workDetails.end_date.split("T")[0],
          description: workDetails.description,
          present: workDetails.present,
          percentage: [workDetails.percentage],
          tags: workDetails.tags ? workDetails.tags : [],
        }
      : {
          role: PROFESSION_TYPE.DEVELOPMENT,
          percentage: [-1],
          present: false,
          valid: false,
          tags: [],
        },
    mode: "onChange",
  });
  const messageValue = form.watch("description", "");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // contributionPercentage is used for validation
  // It makes sure user doesn't submit 0% contribution
  // It's set to -1 initially so it doesn't trigger the 
  // error message
  // It's confirmed that the slider still goes up to 10 then 20
  // and so on.
  let contributionPercentage = form.watch("percentage", [-1]);
  
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

  const clickTagsBadge = (_job_item: string) => {
    const currentTags = form.getValues("tags") || [];
    !currentTags.includes(_job_item.trim()) &&
      form.setValue("tags", [...currentTags, _job_item.trim()], {
        shouldValidate: true,
      });
    setNewTag(""); // Clear the input field for new tag
  };

  const onSubmit = async (values: ContributionFormData) => {
    setLoading(true);

    if (workId) {
      const data = JSON.stringify({
        ...values,
        percentage: values.percentage[0],
        workId: workId,
      });
      const result = await postServer(`/project-work`, data);

      if (result) {
        toast({
          description: "You contribution has been added, thank you.",
        });
      }
    } else {
      const result = await addMembersWork(values, project.projectId);

      if (result.status === "success") {
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
    }

    setLoading(false);
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
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
                    id="present"
                    name="present"
                    defaultChecked={form.getValues("present")}
                    onCheckedChange={(e: boolean) => {
                      form.setValue("end_date", undefined);
                      form.setValue("present", e.valueOf());
                    }}
                  />

                  <Label htmlFor="present">
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
                        min={project.begin_date}
                        max={project.end_date}
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
                    <FormItem
                      className={`w-full relative space-y-0 ${
                        form.getValues("present") && "opacity-40"
                      }`}
                    >
                      <Input
                        type="date"
                        min={project.begin_date}
                        max={project.end_date}
                        disabled={form.watch("present", false)}
                        {...field}
                      />
                      {form.getValues("present") && (
                        <div className="absolute inset-0 px-4 py-5 rounded-sm text-title_m text-text-placeholder bg-background-layer-2">
                          {lang.project.list.create_project.in_progress}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormItem className="space-y-">
              <FormLabel>
                <div className="mb-2">
                  {lang.project.details.members.add_works.detail_work}
                </div>
              </FormLabel>

              <FormControl>
                <Input
                  placeholder={lang.project.details.members.add_works.type}
                  value={newTag}
                  onChange={handleNewTagChange}
                  onKeyDown={handleKeyDown}
                  disabled={
                    form.getValues("tags") && form.getValues("tags").length > 4
                  }
                />
              </FormControl>

              {newTag && (
                <ProfessionTagType
                  newTag={newTag}
                  onClickJobBadge={clickTagsBadge}
                  category="skill"
                ></ProfessionTagType>
              )}

              <div className="flex flex-wrap items-start gap-2 mt-3">
                {form.getValues("tags") &&
                  form.getValues("tags")?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      shape="md"
                      className="flex items-center gap-1.5 max-w-[200px]"
                    >
                      <div className="flex">
                        <div className="w-full truncate">{tag}</div>

                        <X
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => {
                            const currentTags = form.getValues("tags") || [];
                            const newTags = currentTags.filter(
                              (t) => t !== tag
                            );
                            form.setValue("tags", newTags, {
                              shouldValidate: true,
                            });
                          }}
                        ></X>
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
                  </FormDescription>
                </FormItem>
              )}
            />
            {contributionPercentage[0] == 0 ? (
              <p className="text-sm font-medium text-state-error mt-2 w-full">{lang.validation.project.details.members.add_works.no_0_contribution}</p>): ""
            }
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
            <Button variant={"secondary"} ref={closeButtonRef} size="lg">
              {lang.project.details.members.add_works.later}
            </Button>
          </DialogClose>

          <Button
            type="submit"
            disabled={loading || !form.formState.isValid || contributionPercentage[0] < 1}
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
