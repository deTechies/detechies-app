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
import { ContributionType } from "@/lib/interfaces";
import { useRef, useState } from "react";
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
  tags: z.array(z.string()).optional(),
});

export type ContributionFormData = z.infer<typeof contributionFormSchema>;

type ProjectContributionFormProps = {
  projectId: string;
};

export default function ProjectContributionInviteForm({
  projectId,
  lang,
  setInvite
}: {
    projectId:string;
    lang:any;
    setInvite: (invite:false) => void;
}) {
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



//   const onSubmit = async (values: ContributionFormData) => {


//     try {
//       const result = await addMembersWork(values, projectId);

//       toast({
//         title: "Success",
//         description: "Your contribution has been added.",
//       });

//       if (closeButtonRef.current) {
//         closeButtonRef.current.click();
//       }
//     } catch (error) {
//       toast({
//         title: "error",
//       });
//     }
//   };

  return (
    <Form {...form}>
      <form className="spaxe-y-8 ">
        <main className="border p-5 rounded-sm space-y-8 mb-6">
          
          <section className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내가 담당한 역할</FormLabel>

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
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between">
                <Label>내 업무 기간</Label>
                <div className="flex items-center gap-1">
                  <Checkbox
                    onCheckedChange={(e: boolean) => {
                      form.setValue("present", e.valueOf());
                    }}
                  />
                  <Label>진행중</Label>
                </div>
              </div>

              <div className="flex flex-row gap-2 items-center w-full">
                <FormField
                  control={form.control}
                  name="begin_date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Input
                        type="date"
                        placeholder="Select a type"
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

            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type and press enter"
                  value={newTag}
                  onChange={handleNewTagChange}
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
              <div>
                {form.watch("tags")?.map((tag:any, index) => (
                  <Badge
                    key={index}
                    className="bg-background-layer-1 border border-accent-primary px-3 py-2 rounded-full text-xs mr-2"
                    onClick={() => {
                      const currentTags = form.getValues("tags") || [];
                      const newTags = currentTags.filter((t) => t !== tag);
                      form.setValue("tags", newTags, { shouldValidate: true });
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>업무 기여도</FormLabel>
                  <div className="flex w-full justify-between text-xs text-text-secondary">
                    <span>0</span>
                    <span className="content-center w-full text-right">50</span>
                    <span className="content-right text-right w-full">100</span>
                  </div>
                  <FormControl>
                    <Slider
                      {...field}
                      step={10}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="flex">
                    <FormMessage className="w-full" />
                    {/* <span className="content-right text-right w-full">
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
                  <FormLabel>업무 내용</FormLabel>
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
          </section>
        </main>

        <div className="flex items-center justify-center gap-2">
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              className="grow max-w-[212px]"
              ref={closeButtonRef}
            >
              나중에 할게요
            </Button>
          </DialogClose>
          <Button
            type="button"
            // onClick={()=>setInvite(true)}
            variant="default"
            className="grow max-w-[212px]"
          >
            등록하기
          </Button>
        </div>
      </form>
     
    </Form>
  );
}
