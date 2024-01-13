"use client";

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
import { PROFESSION_TYPE } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: "Your first name must be at least 2 characters.",
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
  skills: z.array(z.string().optional()).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

interface EditProfileProps {
  text: any;
  currentValues: Partial<any>;
  username: string;
}

export default function EditProfile({
  text,
  username,
  currentValues,
}: EditProfileProps) {
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: currentValues,
    mode: "onChange",
  });
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState(""); // New state for handling the input of new tag

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    await updateUserProfile(data);
    toast({
      title: "Creating profile...",
      description: "succesfully updated your profile",
    });

    push("/mypage");

    setLoading(false);
  }

  useEffect(() => {
    if (currentValues?.full_name) {
      const name = currentValues.full_name.split(" ");

      form.setValue("first_name", name[0]);
      form.setValue("last_name", name[1]);
    }
  }, [currentValues?.full_name, form]);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      e.preventDefault();
      const currentTags = form.getValues("skills") || [];
      form.setValue("skills", [...currentTags, newTag.trim()], {
        shouldValidate: true,
      });
      setNewTag(""); // Clear the input field for new tag
    }
  };

  const handleNewTagChange = (e: any) => {
    setNewTag(e.target.value);
  };

  return (
    <>
      <Card className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="mb-8">
              <h1 className="mb-6 capitalize text-primary text-subhead_m">
                {text.edit_profile}
              </h1>
            </section>
            <section className="my-2">
              <div className="flex flex-col gap-10">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="w-full">
                    <Label className="">{text?.full_name}</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={text?.first_name}
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
                              <Input placeholder={text?.last_name} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="">
                    <Label className="mb-2 capitalize">{text?.username}</Label>
                    <Input
                      placeholder={username}
                      value={username}
                      disabled
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-1">
                  <div>
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {text?.profession}
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
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="my-10">
              <div>
                <FormItem>
                  <FormLabel>{text?.skills ? text.skills : "Skills"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type and press enter"
                      value={newTag}
                      onChange={handleNewTagChange}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                  <div>
                    {form.watch("skills")?.map((tag, index) => (
                      <Badge
                        key={index}
                        className="px-3 py-2 mr-2 text-xs border rounded-full  text-accent-primary bg-accent-secondary border-accent-primary cursor-pointer hover:border-state-error hover:text-state-error hover:bg-state-error-secondary"
                        onClick={() => {
                          const currentTags = form.getValues("skills") || [];
                          const newTags = currentTags.filter((t) => t !== tag);
                          form.setValue("skills", newTags, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        {tag}
                        
                        <XIcon className="ml-1" size={16}/>
                      </Badge>
                    ))}
                  </div>
                </FormItem>
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
                        {text?.profile_description}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="익명으로 나를 소개할 정보를 입력해주세요. (이름, 연락처) 등의 개인정보를 입력할 경우, 강제 삭제될 수 있습니다."
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
                {text?.save_changes}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
