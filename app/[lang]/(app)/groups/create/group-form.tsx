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
import { GROUP_TYPE } from "@/lib/interfaces";
import { uploadContent } from "@/lib/upload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDictionary } from "@/lib/dictionaryProvider";

export const GroupForm = () => {
  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    type: GROUP_TYPE.COMMUNITY,
    description: "",
  };

  const profileFormSchema = z.object({
    email: z.string().email(),
    certification_number: z.string().refine((data) => data === code, {
      message: "Invalid code",
    }),
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

  // email Verify
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(180);
  const [clickedSend, setClickedSend] = useState(false);
  const [verified, setVerified] = useState(false);

  // Dialog
  const [requestedCreate, onRequestedCreate] = useState(false);

  const lang = useDictionary();
  /*   const { fields, append } = useFieldArray({
    control: form.control,
    name: "urls",
  });
 */

  useEffect(() => {
    let interval = null as any;

    if (isEmailLoading) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isEmailLoading && timer === 0) {
      setTimer(180);
    }

    if (timer === 0) {
      clearInterval(interval);
      setIsEmailLoading(false);
    }

    return () => clearInterval(interval);
  }, [isEmailLoading, timer]);

  async function onSendEmail(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    _event.preventDefault();
    setIsEmailLoading(true);
    setClickedSend(true);

    // ==================================
    // send Verify Email
    const result = { status: "success" };
    // ==================================

    if (result.status !== "success") {
      setClickedSend(false);
      setIsEmailLoading(false);
    }
  }

  async function onVerifyCode(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    _event.preventDefault();

    // ==================================
    // Verify Code
    const result = { status: "success" };
    // ==================================

    if (result.status == "success") {
      setVerified(true);
    }
  }

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    let image = "" as any;

    if (icon) {
      image = await uploadContent(icon);
    }

    //const urls = data?.urls?.map((url) => url.value);

    const result = await createGroup({
      image: image,
      email: data.email,
      certification_number: data.certification_number,
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
                name="email"
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
                            disabled={isEmailLoading || verified}
                          />

                          <div className="flex flex-col items-center">
                            {isEmailLoading && !verified && (
                              <span className="mb-2 text-title_s">
                                {timer}
                                {lang.group.create.form.seconds}
                              </span>
                            )}

                            <Button
                              size="sm"
                              onClick={onSendEmail}
                              className="shrink-0"
                              disabled={
                                isEmailLoading ||
                                form.getFieldState("email").invalid ||
                                verified ||
                                !form.getValues("email")
                              }
                            >
                              {clickedSend
                                ? lang.group.create.form.resend
                                : lang.group.create.form.send_code}
                            </Button>
                          </div>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormInlineItem>
                )}
              />

              <FormField
                control={form.control}
                name="certification_number"
                render={({ field }) => (
                  <FormInlineItem className="items-start">
                    <FormInlineLabel />

                    <div className="grow">
                      <FormControl>
                        <div className="flex flex-wrap items-center gap-3">
                          <Input
                            className="max-w-[335px]"
                            placeholder={
                              lang.group.create.form.verify_code_placeholder
                            }
                            {...field}
                            disabled={verified}
                            type="password"
                          />

                          {clickedSend && (
                            <Button
                              size="sm"
                              onClick={onVerifyCode}
                              disabled={verified}
                            >
                              {lang.group.create.form.verify}
                            </Button>
                          )}
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
      <Dialog open={requestedCreate} onOpenChange={onRequestedCreate}>
        <DialogContent>
          <header className="flex flex-col gap-4">
            <h3 className="text-subhead_s">
              {lang.group.create.form.dialog_title}
            </h3>
            <div className="flex flex-col gap-6">
              <h6 className="text-body_m">
                {lang.group.create.form.dialog_desc}
              </h6>

              <div className="text-center text-title_s">
                {lang.group.create.form.dialog_email}
              </div>

              <div className="text-center text-title_m">
                {form.getValues("email")}
              </div>

              <div className="text-center text-title_s text-text-secondary">
                <div>{lang.group.create.form.dialog_information}</div>
                <div>Robin@Careerzen.org</div>
              </div>

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
