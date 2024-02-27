"use client";

import ProfessionTagType from "@/components/extra/profession-tag-type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/lib/data/profile";
import { timezoneInt } from "@/lib/helpers/timezone";
import { AVAILABILITY_TYPE, PROFESSION_TYPE } from "@/lib/interfaces";

import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: "Your first name must be at least 1 characters.",
    })
    .optional(),
  last_name: z
    .string()
    .min(1, {
      message: "Your last name must be at least 1 characters.",
    })
    .optional(),
  profession: z.string().optional(),
  description: z.string().optional(),
  hourly_rate: z.number().optional(),
  timezone: z.string().optional(),
  availability: z.string().optional(),
  skills: z.array(z.string().optional()).optional(),
  languages: z.array(z.string().optional()).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

interface EditProfileProps {
  lang: any;
  currentValues: Partial<any>;
  email: string;
  username: string;
}

export default function EditProfileForm({
  lang,
  username,
  email,
  currentValues,
}: EditProfileProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: currentValues,
    mode: "onChange",
  });
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag
  // const lang = useDictionary();

  // --- Text & Labels ---
  const updateSuccessfulTitle = lang.validation.mypage.edit_profile.saved_edits;
  const updateSuccessfulDescription = lang.validation.redirect;
  const updateFailedTitle = lang.validation.mypage.edit_profile.edit_fail_title;
  const updateFailedDescription =
    lang.validation.mypage.edit_profile.edit_fail_desc;
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      const currentTags = form.getValues("skills") || [];
      !currentTags.includes(newTag.trim()) &&
        form.setValue("skills", [...currentTags, newTag.trim()], {
          shouldValidate: true,
        });
      setNewTag(""); // Clear the input field for new tag
    }
  };

  const handleNewTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  const clickTagsBadge = (_job_item: string) => {
    const currentTags = form.getValues("skills") || [];
    !currentTags.includes(_job_item.trim()) &&
      form.setValue("skills", [...currentTags, _job_item.trim()], {
        shouldValidate: true,
      });
    setNewTag(""); // Clear the input field for new tag
  };

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    const result = await updateUserProfile(data);

    if (result.status == "success") {
      toast({
        title: updateSuccessfulTitle,
        description: updateSuccessfulDescription,
      });
    } else {
      toast({
        title: updateFailedTitle,
        description: updateFailedDescription,
      });
    }

    router.push(`/${params.lang}/mypage?updated=true`, { scroll: true });
    setLoading(false);
  }

  useEffect(() => {
    if (currentValues?.full_name) {
      const name = currentValues.full_name.split(" ");

      form.setValue("first_name", name[0]);
      form.setValue("last_name", name[1]);
    }
  }, [currentValues?.full_name, form]);

  return (
    <>
      <Card className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="mb-8">
              <h1 className="capitalize text-text-primary text-subhead_s">
                {lang.mypage.edit_profile.edit_profile}
              </h1>
            </section>
            <section className="my-2">
              <div className="flex flex-col gap-10">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="w-full">
                    <Label className="">
                      {lang.mypage.edit_profile?.full_name}
                    </Label>
                    <div className="flex items-center gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={
                                  lang.mypage.edit_profile?.first_name
                                }
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={
                                  lang.mypage.edit_profile?.last_name
                                }
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {lang.mypage.edit_profile?.profession}
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
                                  {lang.interface.profession_type[type] || type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="">
                    <Label className="mb-2 capitalize">
                      {lang.mypage.edit_profile?.username}
                    </Label>
                    <Input
                      placeholder={username}
                      value={username}
                      disabled
                      className="mt-2"
                    />
                  </div>
                  <div className="">
                    <Label className="mb-2 capitalize">
                      {lang.mypage.edit_profile?.email}
                    </Label>
                    <Input
                      placeholder={email}
                      value={email}
                      disabled
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="my-10">
              <FormItem className="space-y-">
                <FormLabel>
                  <div className="mb-2">{lang.mypage.edit_profile?.skills}</div>
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder={lang.mypage.edit_profile?.skills_placeholder}
                    value={newTag}
                    onChange={handleNewTagChange}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>

                {newTag && (
                  <ProfessionTagType
                    newTag={newTag}
                    onClickJobBadge={clickTagsBadge}
                    category="skill"
                  />
                )}

                <div className="flex flex-wrap items-start gap-2 mt-3">
                  {form.getValues("skills") &&
                    form.getValues("skills")?.map((tag, index) => (
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
                              const currentTags =
                                form.getValues("skills") || [];
                              const newTags = currentTags.filter(
                                (t) => t !== tag
                              );
                              form.setValue("skills", newTags, {
                                shouldValidate: true,
                              });
                            }}
                          ></X>
                        </div>
                      </Badge>
                    ))}
                </div>
              </FormItem>
            </section>

            <section>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="">Hourly rate (€) </Label>
                  <Input
                    type="number"
                    placeholder={"hourly_rate"}
                    {...form.register("hourly_rate", {
                      valueAsNumber: true, // Ensures the value is always treated as a number
                      required: "Hourly rate is required", // Basic validation to make the field required
                      min: {
                        value: 0,
                        message: "Hourly rate must be 0 or more",
                      }, // Minimum value validation
                      max: {
                        value: 1000,
                        message: "Hourly rate must be less than 1000",
                      }, // Maximum value validation (adjust according to your needs)
                    })}
                  />
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">
                          Availability
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
                            {Object.values(AVAILABILITY_TYPE).map((type) => (
                              <SelectItem key={type} value={type}>
                                {lang.interface.profession_type[type] || type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">Timezone</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[200px] overflow-scroll w-fit">
                            {timezoneInt.map(({ label, value }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <div className="flex flex-wrap items-start gap-2 mt-3">
                    {form.getValues("languages") &&
                      form.getValues("languages")?.map((tag, index) => (
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
                                const currentTags =
                                  form.getValues("languages") || [];
                                const newTags = currentTags.filter(
                                  (t) => t !== tag
                                );
                                form.setValue("languages", newTags, {
                                  shouldValidate: true,
                                });
                              }}
                            ></X>
                          </div>
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="my-10">
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">
                        {lang.mypage.edit_profile?.profile_description}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            lang.mypage.edit_profile?.profile_description_label
                          }
                          style={{ height: "200px" }}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <div className="flex items-center w-full mt-10">
              <Button
                className="w-full text-1xl"
                type="submit"
                disabled={loading}
                loading={loading}
              >
                {lang.mypage.edit_profile?.save_changes}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
