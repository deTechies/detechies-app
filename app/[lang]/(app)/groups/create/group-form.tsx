"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import MediaUploader from "@/components/extra/media-uploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createGroup } from "@/lib/data/groups";
import { GROUP_TYPE } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useState } from "react";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  type: z.nativeEnum(GROUP_TYPE),
  description: z.string().max(4000).min(4),
  urls: z.array(
    z.object({
      value: z.string().url({ message: "Please enter a valid URL." }),
    })
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  description: "I am writing something unique about myself.",
  urls: [{ value: "https://" }],
};

export function GroupForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [icon, setIcon] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    const image = await uploadContent(icon);
    console.log(image);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify({ ...data, image: image }, null, 2)}
          </code>
        </pre>
      ),
    });

    if (!icon) {
      toast({
        title: "Error",
        description: "Make sure your have valid image file",
      });
      return;
    }

    //name, image and detail
    if (!image) {
      toast({
        title: "Error",
        description: "Make sure your have valid image file",
      });
      return;
    }

    const urls = data.urls.map((url) => url.value);

    await createGroup({
      image: image,
      name: data.name,
      description: data.description,
      type: data.type,
      urls: urls,
    });

    setIsLoading(false);
  }

  const selectIcon = (file: File | null, base64: string | null) => {
    setIcon(file);
  };
  const selectCover = (file: File | null, base64: string | null) => {
    setCover(file);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex justify-center flex-col "
      >
        <div className="flex flex-col space-y-8 ">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormInlineItem>
                <FormInlineLabel>Type</FormInlineLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-1 flex-wrap"
                >
                  {Object.values(GROUP_TYPE).map((type) => (
                    <FormItem
                      key={type}
                      className="flex items-center space-x-3 space-y-0 flex-wrap"
                    >
                      <FormControl>
                        <RadioGroupItem value={type} />
                      </FormControl>
                      <FormLabel className="font-normal capitalize">
                        {type}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>

                <FormMessage />
              </FormInlineItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInlineItem>
                <FormInlineLabel>Name</FormInlineLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormInlineItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormInlineItem>
                <FormInlineLabel className="items-start">
                  Description
                </FormInlineLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your group here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormInlineItem>
            )}
          />

          <FormInlineItem>
            <FormInlineLabel className="justify-start">Image</FormInlineLabel>
            <MediaUploader
              key="icon"
              onFileSelected={selectIcon}
              width={50}
              height={50}
            />
          </FormInlineItem>

          <FormInlineItem>
            <FormInlineLabel className="items-start">
              Cover Image
            </FormInlineLabel>
            <MediaUploader
              key="cover"
              onFileSelected={selectCover}
              width={256}
              height={192}
            />
          </FormInlineItem>
        </div>

        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormInlineItem>
                  <FormInlineLabel className={cn(index !== 0 && "sr-only")}>
                    Links
                  </FormInlineLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormInlineItem>
               
              )}
            />
            
          ))}
          <div className="justify-right items-end align-end">
          <Button
                 type="button"
                 variant="outline"
                 size="sm"
                 className="mt-2 justify-end text-right"
                 onClick={() => append({ value: "" })}
               >
                 Add URL
               </Button>
          </div>

        </div>

        <div className="flex items-center justify-end gap-8">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            Create Group
          </Button>
        </div>
      </form>
    </Form>
  );
}
