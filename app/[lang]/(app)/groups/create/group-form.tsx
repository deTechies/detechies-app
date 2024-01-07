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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createGroup } from "@/lib/data/groups";
import { GROUP_TYPE } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { PlusIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
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
  type: GROUP_TYPE.COMMUNITY,
  description: "",
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
  const router = useRouter();


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

    const result = await createGroup({
      image: image,
      name: data.name,
      description: data.description,
      type: data.type,
      urls: urls,
    });

    if (!result.id) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });

      setIsLoading(false);
      return;
    }

    router.push(`/groups/${result.id}`);
  }

  const selectIcon = (file: File | null, base64: string | null) => {
    setIcon(file);
  };
  const selectCover = (file: File | null, base64: string | null) => {
    setCover(file);
  };

  const clickAddLinks = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    _event.preventDefault();
    append({ value: "" });
  };

  const clickDelLinks =
    (index: number) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    };

  const channelList = [
    {
      value: "facebook",
      url: "https://facebook.com/",
    },
    {
      value: "instagram",
      url: "https://instagram.com/",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center space-y-8"
      >
        <div className="flex flex-col space-y-8 ">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormInlineItem className="h-12">
                <FormInlineLabel>
                  Type
                  <span className="ml-1 text-state-error">*</span>
                </FormInlineLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row flex-wrap gap-6"
                >
                  {Object.values(GROUP_TYPE).map((type) => (
                    <FormItem
                      key={type}
                      className="flex flex-wrap items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={type}
                          disabled={type !== "community"}
                        />
                      </FormControl>

                      <FormLabel className="font-normal capitalize">
                        {type}
                      </FormLabel>
                    </FormItem>
                  ))}
                  <FormItem
                    key="school"
                    className="flex flex-wrap items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value="school" disabled />
                    </FormControl>
                    <FormLabel className="font-normal capitalize">
                      School
                    </FormLabel>
                  </FormItem>
                  <FormItem
                    key="authority"
                    className="flex flex-wrap items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value="authority" disabled />
                    </FormControl>
                    <FormLabel className="font-normal capitalize">
                      Authority
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex flex-wrap items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="company" disabled />
                    </FormControl>
                    <FormLabel className="font-normal capitalize">
                      Company
                    </FormLabel>
                  </FormItem>
                </RadioGroup>

                <FormMessage />
              </FormInlineItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInlineItem className="items-start">
                <FormInlineLabel className="mt-5">
                  Group Name
                  <span className="ml-1 text-state-error">*</span>
                </FormInlineLabel>

                <div className="grow">
                  <FormControl className="mb-2">
                    <Input placeholder="Enter group name" {...field} />
                  </FormControl>

                  <FormMessage />
                </div>
              </FormInlineItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormInlineItem className="items-start">
                <FormInlineLabel>
                  Description
                  <span className="ml-1 text-state-error">*</span>
                </FormInlineLabel>

                <div className="grow">
                  <FormControl className="mb-1">
                    <Textarea
                      placeholder="Tell us a little bit about your group here"
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
            <FormInlineLabel className="justify-start">Image</FormInlineLabel>

            <MediaUploader
              key="icon"
              onFileSelected={selectIcon}
              width={140}
              height={140}
            >
              <div>
                <div className="mb-1 text-title_s text-text-secondary">
                  이미지 가이드
                </div>

                <li className="mb-1 text-text-placeholder text-label_s">
                  1:1 비율 권장
                </li>
              </div>
            </MediaUploader>
          </FormInlineItem>

          <FormInlineItem className="items-start">
            <FormInlineLabel className="items-start">
              Cover Image
            </FormInlineLabel>
            <MediaUploader
              key="cover"
              onFileSelected={selectCover}
              width={256}
              height={192}
            >
              <div>
                <div className="mb-1 text-title_s text-text-secondary">
                  이미지 가이드
                </div>

                <li className="text-text-placeholder text-label_s">
                  4:3 비율 권장
                </li>

                <li className="text-text-placeholder text-label_s">
                  그룹 목록과 그룹상세보기에서 확인 가능합니다.
                </li>
              </div>
            </MediaUploader>
          </FormInlineItem>
        </div>

        <div className="flex flex-col gap-2">
          {[...fields].reverse().map((field, index) => {
            const reversedIndex = fields.length - 1 - index;

            const handleSelectChange = (selectedValue: string) => {
              form.setValue(`urls.${reversedIndex}.value`, selectedValue);
            };

            return (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${reversedIndex}.value`}
                render={({ field }) => (
                  <FormInlineItem>
                    <FormInlineLabel>
                      <div className={cn(index !== 0 && "sr-only")}>
                        <span>Links</span>
                        <span className="ml-1 text-state-error">*</span>
                      </div>
                    </FormInlineLabel>

                    <div className="grow">
                      <div className="flex items-center gap-3 mb-2">
                        <Select
                          onValueChange={handleSelectChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-[60px] max-w-[150px]">
                              <SelectValue placeholder="Channel" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {channelList.map((type) => (
                              <SelectItem key={type.value} value={type.url}>
                                {type.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormControl className="h-[60px]">
                          <Input {...field} />
                        </FormControl>

                        {fields.length == reversedIndex + 1 && (
                          <Button
                            size="icon"
                            className="rounded-md w-14 h-14 shrink-0"
                            onClick={clickAddLinks}
                          >
                            <PlusIcon></PlusIcon>
                          </Button>
                        )}

                        {fields.length != reversedIndex + 1 && (
                          <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-md w-14 h-14 shrink-0"
                            onClick={clickDelLinks(reversedIndex)}
                          >
                            <X />
                          </Button>
                        )}
                      </div>

                      <FormMessage />
                    </div>
                  </FormInlineItem>
                )}
              />
            );
          })}

          {/* <div className="items-end justify-right align-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="justify-end mt-2 text-right"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div> */}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            size="lg"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            disabled={isLoading}
          >
            Create Group
          </Button>
        </div>
      </form>
    </Form>
  );
}
