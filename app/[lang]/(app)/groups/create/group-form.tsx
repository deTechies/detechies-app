"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import MediaUploader from "@/components/extra/media-uploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createGroup } from "@/lib/data/groups";
import { GROUP_TYPE } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  type: GROUP_TYPE.COMMUNITY,
  description: "",
};

export const GroupForm = ({ lang }: { lang: any }) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [icon, setIcon] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

/*   const { fields, append } = useFieldArray({
    control: form.control,
    name: "urls",
  });
 */
  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    
    
   let image = "" as any;
   
   if(icon){
     image = await uploadContent(icon);
   }

    

    //const urls = data?.urls?.map((url) => url.value);

    const result = await createGroup({
      image: image,
      name: data.name,
      description: data.description,
      type: data.type,
      urls: []
    });

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Group created successfully",
      });

      router.push(`/groups/${result.data.id}`);
    } else {
      if (!result.ok) {
        toast({
          description: result.message,
        });

        setIsLoading(false);
        return;
      }
    }
  }

  const selectIcon = (file: File | null, base64: string | null) => {
    setIcon(file);
  };
  const selectCover = (file: File | null, base64: string | null) => {
    setCover(file);
  };
/* 
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
 */
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
              <FormInlineItem>
                <FormInlineLabel>
                  {lang.group.create.form.type}
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
                      className="flex flex-wrap items-center space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={type}
                          disabled={type !== "community"}
                        />
                      </FormControl>

                      <FormLabel className="font-normal capitalize">
                        {lang.interface.group_type[type]}
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
              <FormInlineItem className="items-start">
                <FormInlineLabel className="mt-5">
                  {lang.group.create.form.name}
                  <span className="ml-1 text-state-error">*</span>
                </FormInlineLabel>

                <div className="grow">
                  <FormControl className="mb-2">
                    <Input
                      placeholder={lang.group.create.form.name_placeholder}
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
            name="description"
            render={({ field }) => (
              <FormInlineItem className="items-start">
                <FormInlineLabel>
                  {lang.group.create.form.desc}
                  <span className="ml-1 text-state-error">*</span>
                </FormInlineLabel>

                <div className="grow">
                  <FormControl className="mb-1">
                    <Textarea
                      placeholder={lang.group.create.form.desc_placeholder}
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
            <FormInlineLabel className="justify-start">
              {lang.group.create.form.image}
            </FormInlineLabel>

            <MediaUploader
              key="icon"
              onFileSelected={selectIcon}
              width={140}
              height={140}
            >
              <div>
                <div className="mb-1 text-title_s text-text-secondary">
                  {lang.group.create.form.image_guide}
                </div>

                <li className="mb-1 text-text-placeholder text-label_s">
                  {lang.group.create.form.guird}
                </li>
              </div>
            </MediaUploader>
          </FormInlineItem>

          <FormInlineItem className="items-start">
            <FormInlineLabel className="items-start">
              {lang.group.create.form.cover_image}
            </FormInlineLabel>
            <MediaUploader
              key="cover"
              onFileSelected={selectCover}
              width={256}
              height={192}
            >
              <div>
                <div className="mb-1 text-title_s text-text-secondary">
                  {lang.group.create.form.image_guide}
                </div>

                <li className="text-text-placeholder text-label_s">
                  {lang.group.create.form.rect}
                </li>

                <li className="text-text-placeholder text-label_s">
                  {lang.group.create.form.check}
                </li>
              </div>
            </MediaUploader>
          </FormInlineItem>
        </div>

        <div className="flex flex-col gap-2">
          {/* {[...fields].reverse().map((field, index) => {
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
                        <span>{lang.group.create.form.links}</span>
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
          })} */}

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
            {lang.group.create.form.cancel}
          </Button>

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            disabled={isLoading || !form.formState.isValid}
          >
            {lang.group.create.form.create_group}
          </Button>
        </div>
      </form>
    </Form>
  );
};
