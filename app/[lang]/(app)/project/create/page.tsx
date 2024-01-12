"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { uploadContent } from "@/lib/upload";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ProjectType } from "@/lib/interfaces";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MediaUploader from "@/components/extra/media-uploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createProject } from "@/lib/data/project";
import { useDictionary } from "@/lib/dictionaryProvider";


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
  description: z.string().max(160).min(4),
  tags: z.array(z.string().optional()),
  scope: z.string().optional(),
  image: z.string().optional(),
  type: z.nativeEnum(ProjectType, {
    required_error: "You need to select a  type.",
  }),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>




export default async function CreateProjectForm({
  params
}:{ params:any}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
  });

  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const search = useSearchParams()
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);

  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag
  const dictionary = useDictionary()



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
      data.image = await uploadContent(file);
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

    console.log(result);

    if (result.id) {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      router.push(`/project/${result.id}`);
    }

    setLoading(false);
  }

  const selectFile = (file: any) => {
    console.log(file)
    setFile(file);
  };

  return (
    <main className="m-8 mx-auto max-w-2xl">
      <Card>
        <h3 className="text-heading_s my-6 px-6" >{`${dictionary.project.list.create_project.create}`}</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-6">
            <FormElement label={`${dictionary.project.list.create_project.name}`}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem >
                    <FormControl>
                      <Input placeholder={`${dictionary.project.list.create_project.name_dsc}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormElement>
            <FormElement label={`${dictionary.project.list.create_project.type}`}>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="max-w-[300px]">
                        <SelectTrigger>
                          <SelectValue placeholder={`${dictionary.project.list.create_project.type_dsc}`}  />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ProjectType).map((type) => (
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
            </FormElement>
            <FormElement label={`${dictionary.project.list.create_project.period}`}>
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
                        disabled={present}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormElement>
            <FormElement label={`${dictionary.project.list.create_project.describe}`} className="flex items-start">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={`${dictionary.project.list.create_project.describe_dsc}`} 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormElement>

            <FormElement label={`${dictionary.project.list.create_project.image}`} className="flex items-start">
              <div className="flex gap-3">
                <MediaUploader
                  onFileSelected={selectFile}
                  width={140}
                  height={140}
                />
              </div>
            </FormElement>
            <FormElement label={`${dictionary.project.list.create_project.category}`}>
              <FormControl>
                <Input
                  placeholder={`${dictionary.project.list.create_project.category_dsc}`} 
                  value={newTag}
                  onChange={handleNewTagChange}
                  onKeyDown={handleKeyDown}
                />
              </FormControl>
              <div className="mt-3 flex gap-2 items-start">
                {form.watch("tags")?.map((tag, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      const currentTags = form.getValues("tags") || [];
                      const newTags = currentTags.filter((t) => t !== tag);
                      form.setValue("tags", newTags, { shouldValidate: true });
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </FormElement>
            <FormElement label={`${dictionary.project.list.create_project.scope}`}>
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <RadioGroup
                    className="flex gap-4"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem value="public" />
                      <Label>{`${dictionary.project.list.create_project.public}`}</Label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem value="private" />
                      <Label>{`${dictionary.project.list.create_project.private}`}</Label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <RadioGroupItem value="team" />
                      <Label>{`${dictionary.project.list.create_project.team}`}</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </FormElement>

            <div className="flex items-center justify-end gap-8">
              <Button variant="secondary" type="button" size="lg"
                onClick={() => {
                  router.back();
                }}
              >
                {dictionary.project.list.create_project.back}
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={loading || !form.formState.isValid}
                loading={loading}
              >
                {dictionary.project.list.create_project.make}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </main>
  );
}

const FormElement = ({ children, ...props }: any) => {
  return (
    <div className="flex items-center" {...props}>
      <Label className="flex-start shrink-0 w-[182px]">{props.label}</Label>
      <div className="grow items-start justify-start">{children}</div>
    </div>
  );
};
