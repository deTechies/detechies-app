"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { uploadContent } from "@/lib/upload";
import { PrivacyType, ProjectType } from "@/lib/interfaces";
import { updateProject } from "@/lib/data/project";

import MediaUploader from "@/components/extra/media-uploader";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";


const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your project's name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your project's name must not be longer than 30 characters.",
    }),
  begin_date: z.string(),
  end_date: z.string(),
  description: z.string().max(5000).min(4),
  tags: z.array(z.string()),
  scope: z.string(),
  image: z.string().optional(),
  type: z.nativeEnum(ProjectType, {
    required_error: "You need to select a type.",
  }),
  id: z.string(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;

export default function ProjectEditForm({
  defaultValues,
  lang,
}: {
  defaultValues?: Partial<ProfileFormValues>;
  lang: any;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag

  const [createObjectURL, setCreateObjectURL] = useState(null);

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

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    if (file) {
      const uploadedImage = await uploadContent(file);
      data.image = uploadedImage ?? "";
    }

    const result = await updateProject({
      image: data.image,
      name: data.name,
      description: data.description,
      begin_date: data.begin_date,
      end_date: data.end_date,
      tags: data.tags,
      scope: data.scope,
      type: data.type,
      id: data.id,
    });

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Project Edit successfully",
      });
      router.push(`/project/${data.id}`);
    } else {
      setLoading(false);
    }
  }

  const selectFile = (file: File | null, base64: string | null) => {
    setFile(file);
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
                    placeholder={
                      lang.project.list.create_project.name_placeholder
                    }
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

        <FormInlineItem className="items-start">
          <FormInlineLabel className="mt-5">
            {lang.project.list.create_project.period}
            <span className="ml-1 text-state-error">*</span>
          </FormInlineLabel>
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
                    disabled={present}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    placeholder={lang.project.list.create_project.describe_placeholder}
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
                    disabled={form.getValues("tags") && form.getValues("tags").length > 4}
                  />
                </FormControl>

                <div className="mt-3 flex gap-2 items-start">
                  {form.getValues("tags") && form.getValues("tags")?.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="accent"
                      shape="md"
                      className="flex items-center gap-1.5"
                    >
                      {tag}
                      <X
                        className="cursor-pointer w-5 h-5"
                        onClick={() => {
                          const currentTags = form.getValues("tags") || [];
                          const newTags = currentTags.filter((t) => t !== tag);
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
            <FormInlineItem className="h-12">
              <FormInlineLabel>
                {lang.project.list.create_project.scope}
                <span className="ml-1 text-state-error">*</span>
              </FormInlineLabel>

              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row flex-wrap gap-6"
              >
                {Object.values(PrivacyType).map((type) => (
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
              </RadioGroup>

              <FormMessage />
            </FormInlineItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/project/${defaultValues?.id}`}
            className="w-full max-w-[212px]"
          >
            <Button variant="secondary" type="reset" size="lg">
              {lang.project.list.create_project.back}
            </Button>
          </Link>
          <Button
            type="submit"
            size="lg"
            disabled={loading || !form.formState.isValid}
            loading={loading}
          >
            {lang.project.list.edit}
          </Button>
        </div>
      </form>
    </Form>
  );
}