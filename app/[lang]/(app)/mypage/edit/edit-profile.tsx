"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { updateUserProfile } from "@/lib/data/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Your first name must be at least 2 characters.",
    })
    .optional(),
  last_name: z
    .string()
    .min(2, {
      message: "Your last name must be at least 2 characters.",
    })
    .optional(),
  profession: z.string().optional(),
  specialisation: z.string().optional(),
  description: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};


interface EditProfileProps {
    text: any;
    username: string;
    }

export default function EditProfile({text, username}: EditProfileProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);


    //@ts-ignore
    const result =await updateUserProfile(data)
    toast({
      title: "Creating profile...",
      description: <pre>
        {JSON.stringify(result, null, 2)}
        </pre>,
    });

    setLoading(false);
  }

  return (
    <>
      <Card className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="mb-8">
              <h1 className="mb-6 text-primary text-subhead_m capitalize">
                {text.edit_profile}
              </h1>
            </section>
            <section className="my-2">
              <div className="flex">
                <div className="flex flex-col basis-1/2">
                  <div>
                    <Label className="">{text?.full_name}</Label>
                    <div className="flex gap-2 items-center mt-2">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder={text?.first_name} {...field} />
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
                  <div className="my-10">
                    <Label className="">{text?.profession}</Label>
                      <FormField
                        control={form.control}
                        name="profession"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input placeholder={text?.profession} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                  </div>
                </div>
                <div className="basis-1/2 ml-6">
                <div className="">
                    <Label className="">{text?.username}</Label>
                    <Input placeholder={username} value={username} disabled/>
                  </div>
                  <div className="my-10">
                    <Label className="">{text?.specialisation}</Label>
                      <FormField
                        control={form.control}
                        name="specialisation"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input placeholder={text?.specialisation} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                  </div>
                </div>
              </div>
            </section>
            <section className="my-2">
              <div>
                <Label>{text?.profile_description}</Label>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
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
                type="submit"
                className="w-full h-[64px] text-1xl"
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
