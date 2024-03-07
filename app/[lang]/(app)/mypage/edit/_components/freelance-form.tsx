"use client";

import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
import { toast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/lib/data/profile";
import { timezoneInt } from "@/lib/helpers/timezone";
import { AVAILABILITY_TYPE } from "@/lib/interfaces";

import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
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
}

export default function FreelanceForm({
  lang,
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

  return (
      <Card id="freelance">
        <CardHeader className="capitalize">Freelance Settings</CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <section className="flex flex-col gap-2">
                <FormItem className="flex flex-row items-center gap-2">
                  <FormLabel className="w-[200px]">
                    {lang.mypage.edit_profile?.skills}
                  </FormLabel>

                  <div className="flex flex-col gap-2 w-full">
                    <FormControl>
                      <Input
                        placeholder={
                          lang.mypage.edit_profile?.skills_placeholder
                        }
                        value={newTag}
                        onChange={handleNewTagChange}
                        onKeyDown={handleKeyDown}
                      />
                    </FormControl>
                  </div>
                </FormItem>
                <div className="flex flex-wrap items-start gap-2 ml-[200px]">
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
              </section>

              <div className="flex flex-row items-center gap-2">
                <Label className="w-[200px]">Hourly rate (€) </Label>
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

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 items-center">
                    <FormLabel className="capitalize w-[200px]">
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

              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem className="flex flex-row gap-2 items-center">
                    <FormLabel className="capitalize w-[200px]">
                      Timezone
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

              <div className="flex items-center justify-end mt-10">
                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                >
                  {lang.mypage.edit_profile?.save_changes}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
