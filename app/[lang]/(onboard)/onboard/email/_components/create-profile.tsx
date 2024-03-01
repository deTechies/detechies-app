"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { API_URL } from "@/lib/constants";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAccount, useDisconnect } from "wagmi";
import * as z from "zod";

export default function CreateProfile({ lang }: { lang: any }) {
  const profileFormSchema = z.object({
    display_name: z
      .string()
      .min(1, {
        message: lang.validation.onboard.username.require,
      })
      .min(2, {
        message: lang.validation.onboard.username.min,
      })
      .max(20, {
        message: lang.validation.onboard.username.max,
      })
      .regex(/^\S*$/, { message: lang.validation.onboard.username.regex }),
    email: z.string().email({
      message: lang.validation.onboard.email.email,
    }),
    verified: z.boolean().default(false),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {};

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { refresh, push } = useRouter();
  const { connector } = useAccount();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      push("/onboard");
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Error disconnecting:", error);
    },
  });

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
        "x-api-key": "API_KEY",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.messageCode === "username_already_exists") {
        form.setError("display_name", {
          type: "manual",
          message: lang.validation.onboard.username.already_use,
        });
      } else if (errorData.messageCode === "email_already_exists") {
        form.setError("email", {
          type: "manual",
          message: lang.validation.onboard.email.already_use,
        });
      } else {
        toast({
          title: "Error",
          description: errorData.message,
        });
      }

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
    <>
      <Form {...form}>
        <h1 className="mb-3 text-heading_s text-primary">
          {lang.onboard.verify_email.title}
        </h1>

        <form
          onSubmit={form.handleSubmit(sendVerification)}
          className="my-8 space-y-8"
        >
          <h4 className="text-text-secondary text-body_s">
            {lang.onboard.verify_email.body}
          </h4>
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{lang.onboard.verify_email.username}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={lang.onboard.verify_email.username_placeholder}
                    {...field}
                  />
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
                <FormLabel className="capitalize">
                  {lang.onboard.verify_email.email}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={lang.onboard.verify_email.email_placeholder}
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription className="font-light">
                We will send the verification email to this address
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center w-full gap-2">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => {
                signOut();
                refresh();
              }}
            >
              {lang.onboard.verify_email.cancel}
            </Button>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={
                isLoading || !form.watch("display_name") || !form.watch("email")
              }
              loading={isLoading}
            >
              {lang.onboard.verify_email.next}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
