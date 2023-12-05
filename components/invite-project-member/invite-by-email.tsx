"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "@/components/ui/use-toast";

import { inviteByEmail } from "@/lib/data/project";
import { useState } from "react";

const projectFormSchema = z.object({
  name: z
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
  projectId,
  cancelByEmail,
}: {
  projectId: string;
  cancelByEmail: () => void;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    const result = await inviteByEmail(
      data.name,
      data.email,
       projectId,
    );

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
    })

    setLoading(false);
  }

  return (
    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your groupname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center gap-8">
            <Button variant="secondary" onClick={() => cancelByEmail()}>
              Go Back
            </Button>
            <Button
              type="submit"
              disabled={loading || !form.formState.isValid}
              loading={loading}
            >
              Invite member
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
