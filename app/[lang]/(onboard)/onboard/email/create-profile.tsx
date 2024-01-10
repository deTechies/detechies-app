"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Checkbox } from "@/components/ui/checkbox";
import { API_URL } from "@/lib/constants";

import { web3AuthInstance } from "@/app/[lang]/app";
import { Label } from "@radix-ui/react-label";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import * as z from "zod";

const profileFormSchema = z.object({
  display_name: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your name must not be longer than 30 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  terms_of_service: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms of service.",
  }),
  privacy_policy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy.",
  }),
  email_policy: z.boolean().optional(),
  verified: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export default function CreateProfile({ text }: { text: any }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();
  const { connector } = useAccount();

  if (connector?.id == "web3auth") {
    const getInfo = async () => {
      const result = await web3AuthInstance?.getUserInfo();

      if (result?.email) {
        form.setValue("email", result.email);
        form.setValue("verified", true);
      }
    };

    getInfo();
  }

  async function sendVerification(data: ProfileFormValues) {
    setIsLoading(true);
    const session = await getSession();

    if (!session) {
      toast({
        title: "Error",
        description: "Please login to your account account. ",
        variant: "destructive",
      });
      setIsLoading(false);

      return;
    }

    const credentials = {
      email: data.email,
      display_name: data.display_name,
      verified: data.verified,
      wallet: session.web3.address,
      login_method: connector?.id == "web3auth" ? "web3auth" : "metamask",
    };

    const response = await fetch(`${API_URL}/users`, {
      body: JSON.stringify(credentials),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast({
        title: "Error",
        description: errorData.message,
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Succesfully created the account",
      description: "Please check your email for the verification link",
    });

    refresh();
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendVerification)}
        className="space-y-8 my-8"
      >
        <h1 className="text-heading_s mb-6 text-primary">{text.title}</h1>
        <h4 className="text-text-secondary text-body_s">{text.body}</h4>
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter a username" {...field} />
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
              <FormLabel className="capitalize">{text.email}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  {...field}
                  disabled={connector?.id == "web3auth"}
                />
              </FormControl>
              <FormDescription className="font-light">
                We will send the verification email to this address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex flex-col">
          <FormField
            control={form.control}
            name="terms_of_service"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center  space-x-3 space-y-0 py-3 border-b border-border-div ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none w-full">
                  <Label className="text-title_m">
                    {text.accordion.terms_of_services}
                  </Label>
                </div>
                <ChevronRight className="text-text-secondary h-6 w-6 hover:text-accent-primary cursor-pointer" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="privacy_policy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 py-3 space-y-0 border-b border-border-div">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="my-auto"
                  />
                </FormControl>
                <div className="space-y-1 leading-none w-full">
                  <Label className="text-title_m flex-stretch">
                    {text.accordion.privacy_policy}
                  </Label>
                </div>
                <ChevronRight className="text-text-secondary h-6 w-6 hover:text-accent-primary cursor-pointer" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email_policy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-3 border-b border-border-div">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="my-auto"
                  />
                </FormControl>
                <div className="space-y-1 leading-none flex-stretch w-full">
                  <FormLabel className="text-title_m">
                    {text.accordion.reward_notification}
                  </FormLabel>
                </div>
                <ChevronRight className="text-text-secondary h-6 w-6 hover:text-accent-primary cursor-pointer" />
              </FormItem>
            )}
          />
        </section>

        <div className="flex items-center gap-8 w-full">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              signOut();
              refresh();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            loading={isLoading}
          >
            Create Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
