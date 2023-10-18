"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAccount } from "wagmi"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your name must not be longer than 30 characters.",
    }),
    username: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your name must not be longer than 30 characters.",
    }),
    job: z.enum(["developer", "marketeer", "designer", "other"], {
        required_error: "You need to select a notification type.",
      }),
  email: z
    .string({
      required_error: "Please enter your email to display.",
    })
    .email(),
  description: z.string().max(160).min(4).optional(),
})


type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  description: "I am writing something unique about myself.",
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  

  async function onSubmit(data: ProfileFormValues) {
        setLoading(true);
        
        
        //@ts-ignore
        data.address = address;
        const url = process.env.NEXT_PUBLIC_API || `http://localhost:4000`;
        fetch(`${url}/polybase/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data, 
            address: address
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status) {
              toast({
                title: "Profile created successfully.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                      <code className="text-white">{JSON.stringify({...data}, null, 2)}</code>
                    </pre>
                  ),
              })
              
              
              
              
              setLoading(false);
              router.replace("/onboard/mint")
              
            } else {
              console.error("Error creating profile:", data.message);
              toast({
                title: "Error creating profile.",
                description: "Please contact the owner on Telegram"
              })
            }
          });

    
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your passport name" {...field} />
              </FormControl>
              <FormDescription>
                Please provide your passport name. This will not be visible for the public
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter a username" {...field} />
              </FormControl>
              <FormDescription>
                It can be your real groups name or
                a pseudonym. 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-5 flex-wrap"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="developer" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Developer
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="marketeer" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Marketeer
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="designer" />
                    </FormControl>
                    <FormLabel className="font-normal">Designer</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
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
              <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                </FormControl>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description of yourself</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your group here"
                  className="resize-none rounded-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
               This description will be displayed on your groups profile page. 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center gap-8">
          <Button type="button" variant="secondary" >
            Cancel
          </Button>
          <Button type="submit"
            disabled={!form.formState.isValid || loading}
          >
            {loading ? <span className="flex gap-2"><RefreshCw className="animate-spin"/> Creating..</span> : "Create Profile"}
            </Button>
        </div>
        
      </form>
    </Form>
  )
}