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

import { Checkbox } from "@/components/ui/checkbox";
import { API_URL } from "@/lib/constants";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAccount, useDisconnect } from "wagmi";
import * as z from "zod";
import PrivacyPolicy from "./privacy-policy";
import RewardNotification from "./reward-notification";
import TermsOfService from "./terms-of-service";


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
    agree_with_all: z.boolean().optional(),
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

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { refresh } = useRouter();
  const { connector } = useAccount();
  const { disconnect } = useDisconnect();




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
                    disabled={
                      connector?.id == "web3auth" ||
                      localStorage.getItem("wagmi.wallet") === `"wepin"`
                    }
                  />
                </FormControl>
                {/* <FormDescription className="font-light">
                We will send the verification email to this address
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Alert variant="info">
            <AlertTitle className="text-state-info">
              {lang.onboard.verify_email.alert_title}
            </AlertTitle>

            <AlertDescription>
              {lang.onboard.verify_email.alert_body}
            </AlertDescription>
          </Alert>

          <section className="flex flex-col">
            <FormField
              control={form.control}
              name="agree_with_all"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center py-3 space-y-0 border-b border-border-div ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);

                        if (value) {
                          form.setValue("terms_of_service", true);
                          form.setValue("privacy_policy", true);
                          form.setValue("email_policy", true);
                        } else {
                          form.setValue("terms_of_service", false);
                          form.setValue("privacy_policy", false);
                          form.setValue("email_policy", false);
                        }
                      }}
                    />
                  </FormControl>
                  <div className="w-full ml-3 space-y-1 leading-none">
                    <Label className="text-title_m">
                      {lang.onboard.verify_email.accordion.agree_with_all}
                    </Label>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms_of_service"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center py-3 space-y-0 border-b border-border-div ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="w-full ml-3 space-y-1 leading-none">
                    <Label className="text-title_m">
                      {lang.onboard.verify_email.accordion.terms_of_services}
                    </Label>
                  </div>
                  <TermsOfService
                    onClickAgree={() => form.setValue("terms_of_service", true)}
                    lang={lang}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy_policy"
              render={({ field }) => (
                <FormItem className="flex flex-row py-3 space-y-0 border-b items-cente border-border-div">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="my-auto"
                    />
                  </FormControl>
                  <div className="w-full ml-3 space-y-1 leading-none">
                    <Label className="text-title_m flex-stretch">
                      {lang.onboard.verify_email.accordion.privacy_policy}
                    </Label>
                  </div>

                  <PrivacyPolicy
                    onClickAgree={() => form.setValue("privacy_policy", true)}
                    lang={lang}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email_policy"
              render={({ field }) => (
                <FormItem className="flex flex-row py-3 space-y-0 border-b items-cente border-border-div">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="my-auto"
                    />
                  </FormControl>
                  <div className="w-full ml-3 space-y-1 leading-none flex-stretch">
                    <FormLabel>
                      <div className="text-title_m mb-1.5">
                        {
                          lang.onboard.verify_email.accordion
                            .reward_notification
                        }
                      </div>
                      <div className="text-text-secondary text-label_m">
                        {
                          lang.onboard.verify_email.accordion
                            .reward_notification_description
                        }
                      </div>
                    </FormLabel>
                  </div>

                  <RewardNotification
                    onClickAgree={() => form.setValue("email_policy", true)}
                    lang={lang}
                  />
                </FormItem>
              )}
            />
          </section>

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
                isLoading ||
                !form.watch("display_name") ||
                !form.watch("email") ||
                !form.watch("terms_of_service") ||
                !form.watch("privacy_policy")
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
