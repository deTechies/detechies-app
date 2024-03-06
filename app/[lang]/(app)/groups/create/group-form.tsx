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

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import MediaUploader from "@/components/extra/media-uploader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createGroup } from "@/lib/data/groups";
import { useDictionary } from "@/lib/dictionaryProvider";
import { GROUP_TYPE } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const GroupForm = () => {
  const lang = useDictionary();
  // --- Text & Labels ---
  const groupNameTakenDescription =
    lang.validation.group.new_group.group_name_taken;

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    type: GROUP_TYPE.COMMUNITY,
    description: "",
  };

  const profileFormSchema = z.object({
    owner_email: z.string().email(),
    //   certification_number: z.string().refine((data) => data === code, {
    //    message: "Invalid code",
    //  }),
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

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [icon, setIcon] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Dialog
  const [requestedCreate, onRequestedCreate] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    let image = "" as any;

    if (icon) {
      image = await uploadContent(icon);
    }

    //const urls = data?.urls?.map((url) => url.value);

    const result = await createGroup({
      image: image,
      owner_email: data.owner_email,
      name: data.name,
      description: data.description,
      type: data.type,
      urls: [],
    });

    if (result.status === "success") {
      toast({
        title: "Success",
        description: "Group created successfully",
      });

      // router.push(`/groups/${result.data.id}`);
      onRequestedCreate(true);
    } else {
      if (!result.ok) {
        console.log("Message code: ", result.messageCode);
        if (result.messageCode === "group_name_already_exists") {
          toast({
            description: groupNameTakenDescription,
          });
        } else {
          toast({
            description: result.message,
          });
        }

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
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center space-y-8"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
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
                      className="flex flex-row flex-wrap gap-6 "
                    >
                      {Object.values(GROUP_TYPE).map((type) => (
                        <FormItem
                          key={type}
                          className="flex flex-wrap items-center space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
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
                name="owner_email"
                render={({ field }) => (
                  <FormInlineItem className="items-start">
                    <FormInlineLabel />

                    <div className="grow">
                      <FormControl>
                        <div className="flex flex-wrap items-center gap-3">
                          <Input
                            className="max-w-[335px]"
                            placeholder={
                              lang.group.create.form.email_placeholder
                            }
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormInlineItem>
                )}
              />
            </div>

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
          </div>

          <div className="flex flex-col gap-2"></div>

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

      <Dialog open={requestedCreate} onOpenChange={onRequestedCreate}>
        <DialogContent>
          <header>
            <h3 className="mb-4 text-subhead_s">
              {lang.group.create.form.dialog_title}
            </h3>

            <h6 className="mb-6 text-body_m">
              {lang.group.create.form.dialog_desc}
            </h6>

            <div className="mb-3 text-center text-title_s">
              {lang.group.create.form.dialog_email}
            </div>

            <div className="px-4 py-5 mb-6 text-center rounded-sm bg-border-div text-title_m opacity-40">
              {form.getValues("owner_email")}
            </div>

            <div className="mb-6 text-center text-label_m text-text-secondary">
              <div>{lang.group.create.form.dialog_information}</div>
              <div>{"support@detechies.com"}</div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="mx-auto"
                onClick={() => router.push("/groups")}
              >
                {lang.group.create.form.ok}
              </Button>
            </div>
          </header>
        </DialogContent>
      </Dialog>
    </>
  );
};
