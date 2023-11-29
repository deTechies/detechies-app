"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";
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
import Link from "next/link";
import { useForm } from "react-hook-form";
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

  async function sendVerification(data:ProfileFormValues){
    
    setIsLoading(true);
    const session = await getSession();
    console.log(session);
    if (session === null)
      return window.alert("You must be logged in to verify your email");


    const credentials = {
        email: data.email,
        display_name: data.display_name,
        user_id: session.web3.user.id,
        
    };

    console.log(session.web3.accessToken);

    await fetch("http://localhost:4000/users", {
      body: JSON.stringify(credentials),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.web3.accessToken}`,
      },
    })
      .then((result) => {
        console.log(result);
        toast({
          title: "Success",
          description: "Email verification sent",
        });

        //handle and submit this to update the user session
      })
      .catch((err) =>
        toast({
          title: "Error",
          description: "Error sending verification email",
          variant: "destructive",
        })
      );

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendVerification)}
        className="space-y-8 my-8"
      >

        <h1 className="text-4xl font-bold mb-6 text-primary">{text.title}</h1>
        <h4 className="text-text-secondary font-light tracking-wider">
          {text.body}
        </h4>

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
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormDescription className="font-light">
                We will send the verification email to this address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms_of_service"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{text.accordion.terms_of_services}</FormLabel>
                <FormDescription>
                  Click for more details about the {" "}
                  <Link
                    href="https://careerzen.org/terms-of-service"
                    className="text-accent-primary"
                  >
                    Terms of Service
                  </Link>
                  .
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="privacy_policy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{text.accordion.privacy_policy}</FormLabel>
                <FormDescription>
                  Click for more details about the {" "}
                  <Link
                    href="https://careerzen.org/privacy-policy"
                    className="text-accent-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email_policy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{text.accordion.reward_notification}</FormLabel>
                <FormDescription>
                  Click for more details about the {" "}
                  <Link
                    className="text-accent-primary"
                    href="https://careerzen.org/terms-of-service"
                  >
                    Notification Service
                  </Link>
                  .
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-8 w-full">
          <Button type="button" variant="secondary" className="w-full">
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
