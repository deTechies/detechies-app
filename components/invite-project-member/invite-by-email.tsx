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

import { toast } from "@/components/ui/use-toast";

import { postServer } from "@/lib/data/postRequest";
import { useState } from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Your groups name must be at least 1 character.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  last_name: z
    .string()
    .min(1, {
      message: "Your groups name must be at least 1 character.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;

export default function InviteByEmail({
  projectId,
  cancelByEmail,
  lang,
}: {
  projectId: string;
  cancelByEmail: () => void;
  lang: any;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("member");

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    const submitData = JSON.stringify({
      name: data.name + " " + data.last_name,
      message: "You have been invited to join a project",
      email: data.email,
      entity_type: "project",
      entity_id: projectId,
    });
    const result = await postServer(`/referral`, submitData);

    if (result) {
      toast({
        description: "Invitation sent successfully",
      });
      setLoading(false);
      cancelByEmail();
      return;
    }

    setLoading(false);
  }

  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <Label>{lang.project.details.invite_member.name}</Label>

          <div className="flex gap-4 mb-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      placeholder={
                        lang.project.details.invite_member.first_name
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      placeholder={lang.project.details.invite_member.last_name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Label>{lang.project.details.invite_member.email}</Label>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormControl>
                  <Input placeholder="user1234@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center justify-center mb-2">
            <Label className="mb-3">
              {lang.project.details.invite_member.member_type}
            </Label>

            <RadioGroup
              className="flex py-3 gap-9"
              onValueChange={(value) => {
                setRole(value);
              }}
              defaultValue="member"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="member" />
                <Label>{lang.project.details.role_type.member}</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="admin" />
                <Label>{lang.project.details.role_type.admin}</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="client" />
                <Label>{lang.project.details.role_type.client}</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="max-w-[212px] grow px-0"
              onClick={() => cancelByEmail()}
            >
              {lang.project.details.invite_member.back}
            </Button>
            <Button
              type="submit"
              size="lg"
              className="max-w-[212px] grow px-0"
              disabled={loading || !form.formState.isValid}
              loading={loading}
            >
              {lang.project.details.invite_member.invite}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
