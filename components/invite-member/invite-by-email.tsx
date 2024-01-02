"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "@/components/ui/use-toast";

import { inviteByEmail } from "@/lib/data/project";
import { useState } from "react";
import { Label } from "../ui/label";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;

export default function InviteByEmail({
  id,
  cancelByEmail,
  // lang,
}: {
  id: string;
  cancelByEmail: () => void;
  // lang: any;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    const result = await inviteByEmail(data.name, data.email, id);

    console.log(result);

    if (result) {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
    }

    toast({
      title: "Not yet implemented",
      description: "Sorry, this function is coming sooon!",
      variant: "destructive",
    });

    setLoading(false);
  }

  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Label>name</Label>

          <div className="flex gap-4 mb-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input
                      placeholder="first_name"
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
                      placeholder="last_name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Label>Email</Label>

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

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              className="max-w-[212px] grow px-0"
              onClick={() => cancelByEmail()}
            >
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              className="max-w-[212px] grow px-0"
              disabled={loading || !form.formState.isValid}
              loading={loading}
            >
              Invite
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}