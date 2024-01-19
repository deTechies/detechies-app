"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { uploadContent } from "@/lib/upload";
import { createProject } from "@/lib/data/project";
import { Club, PRIVACY_TYPE, ProjectType } from "@/lib/interfaces";

import MediaUploader from "@/components/extra/media-uploader";
import SelectGroupInScope from "./select-group-in-scope";

import Image from "@/components/ui/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormInlineItem,
  FormInlineLabel,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AlertCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  begin_date: z.string(),
  end_date: z.string(),
  description: z.string().max(5000).min(4),
  tags: z.array(z.string()),
  scope: z.string().optional(),
  image: z.string().optional(),
  type: z.nativeEnum(ProjectType, {
    required_error: "You need to select a type.",
  }),
});

type CreateProjectFormValues = z.infer<typeof projectFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateProjectFormValues> = {
  scope: PRIVACY_TYPE.PUBLIC,
};

export default function CreateProjectForm({ lang }: { lang: any }) {
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag
  const [selectedGroup, setSelectedGroup] = useState<Club[]>([]);
  // const dictionary = useDictionary()

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

  async function onSubmit(data: CreateProjectFormValues) {
    setLoading(true);

    if (file) {
      const uploadedImage = await uploadContent(file);
      data.image = uploadedImage ?? "";
    }

    if (present) {
      data.end_date = "";
    }

    const result = await createProject({
      image: data.image,
      name: data.name,
      description: data.description,
      begin_date: data.begin_date,
      end_date: data.end_date,
      tags: data.tags,
      scope: data.scope,
      type: data.type,
    });

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      router.push(`/project/${result.data.id}`);
    } else {
      setLoading(false);
    }
  }

  const selectFile = (file: any) => {
    setFile(file);
  };

  const onClickDeleteClub = (clickedGroup: Club) => {
    setSelectedGroup(selectedGroup.filter(_group => {
      return _group.id !== clickedGroup.id
    }))
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                {lang.project.list.create_project.name}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl className="mb-2">
                  <Input
                    placeholder={lang.project.list.create_project.name_dsc}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                {lang.project.list.create_project.type}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="max-w-[300px]">
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          lang.project.list.create_project.type_placeholder
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ProjectType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {lang.interface.project_type[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormInlineItem className="items-start relative">
          <FormInlineLabel className="mt-5">
            {lang.project.list.create_project.period}
            <span className="ml-1 text-state-error">*</span>
          </FormInlineLabel>
          <div className="flex flex-row gap-2 flex-wrap sm:flex-nowrap items-center w-full">
            <FormField
              control={form.control}
              name="begin_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Input type="date" {...field} />
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
                    present && "opacity-40"
                  }`}
                >
                  <Input type="date" {...field} disabled={present} />
                  {present && (
                    <div className="text-title_m text-text-placeholder px-4 py-5 absolute inset-0 bg-background-layer-2 rounded-sm">
                      {lang.project.list.create_project.in_progress}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end absolute bottom-full right-0 gap-1 pb-3">
            <Checkbox
              id="present"
              onCheckedChange={(_value: boolean) => {
                if (_value) {
                  form.setValue("end_date", "2099-12-31");
                } else {
                  form.setValue("end_date", "");
                }

                setPresent(!present);
              }}
            />
            <Label htmlFor="present">
              {lang.project.list.create_project.in_progress}
            </Label>
          </div>
        </FormInlineItem>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel>
                {lang.project.list.create_project.describe}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl className="mb-1">
                  <Textarea
                    placeholder={
                      lang.project.list.create_project.describe_placeholder
                    }
                    className="p-4 resize-none min-h-[132px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <FormInlineItem className="items-start">
          <FormInlineLabel className="items-start">
            {lang.group.create.form.cover_image}
          </FormInlineLabel>

          <MediaUploader
            key="image"
            onFileSelected={selectFile}
            width={140}
            height={140}
          >
            <div>
              <div className="mb-1 text-title_s text-text-secondary">
                {lang.group.create.form.image_guide}
              </div>

              <li className="text-text-placeholder text-label_s">
                {lang.project.list.create_project.image_guide1}
              </li>

              <li className="text-text-placeholder text-label_s">
                {lang.project.list.create_project.image_guide2}
              </li>
            </div>
          </MediaUploader>
        </FormInlineItem>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="mt-5">
                {lang.project.list.create_project.category}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <div className="grow">
                <FormControl className="mb-2">
                  <Input
                    placeholder={lang.project.list.create_project.category_dsc}
                    value={newTag}
                    onChange={handleNewTagChange}
                    onKeyDown={handleKeyDown}
                    disabled={
                      form.getValues("tags") &&
                      form.getValues("tags").length > 4
                    }
                  />
                </FormControl>

                <div className="mt-3 flex flex-wrap gap-2 items-start">
                  {form.getValues("tags") &&
                    form.getValues("tags")?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="accent"
                        shape="md"
                        className="flex items-center gap-1.5 max-w-[200px]"
                      >
                        <div className="truncate w-full">{tag}</div>
                        <X
                          className="cursor-pointer w-5 h-5"
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
                      </Badge>
                    ))}
                </div>
              </div>
            </FormInlineItem>
          )}
        />

        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormInlineItem className="items-start">
              <FormInlineLabel className="h-10 flex items-center">
                {lang.project.list.create_project.scope}
                <span className="ml-1 text-state-error">*</span>

                <Popover>
                  <PopoverTrigger className="ml-2">
                    <AlertCircle className="w-4 h-4"></AlertCircle>
                  </PopoverTrigger>

                  <PopoverContent className="max-w-full p-0">
                    {/* plan to make variant */}
                    <Card className="max-w-[500px] bg-background-tooltip rounded-sm p-4 ">
                      <ul className="text-body_m space-y-2 text-accent-on-primary">
                        {Object.values(PRIVACY_TYPE).map((type, index) => (
                          <li key={index}>
                            {lang.interface.privacy_type[type]}:{" "}
                            {
                              lang.project.list.create_project[
                                `tooltip_${type}`
                              ]
                            }
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </PopoverContent>
                </Popover>
              </FormInlineLabel>

              <div>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row flex-wrap gap-6 items-center"
                >
                  {Object.values(PRIVACY_TYPE).map((type) => (
                    <FormItem
                      key={type}
                      className="flex flex-wrap items-center space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>

                      <FormLabel className="font-normal capitalize">
                        {lang.interface.privacy_type[type]}
                      </FormLabel>
                    </FormItem>
                  ))}

                  {form.getValues("scope") == PRIVACY_TYPE.GROUP && (
                    <SelectGroupInScope
                      lang={lang}
                      selectedGroup={selectedGroup}
                      setSelectedGroup={setSelectedGroup}
                    ></SelectGroupInScope>
                  )}
                </RadioGroup>

                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedGroup.length > 0 &&
                    selectedGroup.map((group: Club, index: number) => {
                      return (
                        <Badge shape="outline" className="gap-2 my-1.5" key={index}>
                          <div className="shrink-0 w-5 h-5 rounded-full overflow-hidden">
                            <Image
                              src={`https://ipfs.io/ipfs/${group.image}`}
                              alt={group.name}
                              width="20"
                              height="20"
                            ></Image>
                          </div>

                          <div className="text-label_m max-w-[120px] truncate">
                            {group.name}
                          </div>

                          <X
                            className="shrink-0 w-5 h-5 cursor-pointer text-text-secondary"
                            onClick={() => onClickDeleteClub(group)}
                          ></X>
                        </Badge>
                      );
                    })}
                </div>
                <FormMessage />
              </div>
            </FormInlineItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            type="button"
            size="lg"
            onClick={() => {
              router.back();
            }}
          >
            {lang.project.list.create_project.back}
          </Button>

          <Button
            type="submit"
            size="lg"
            disabled={loading || !form.formState.isValid}
            loading={loading}
          >
            {lang.project.list.create_project.make}
          </Button>
        </div>
      </form>
    </Form>
  );
}
