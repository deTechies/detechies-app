"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
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
import { cn } from "@/lib/utils"


import MediaUploader from "@/components/extra/media-uploader"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ABI, MUMBAI } from "@/lib/constants"
import { uploadContent } from "@/lib/upload"
import { useState } from "react"
import { useAccount, useContractWrite } from "wagmi"

const profileFormSchema = z.object({
  groupName: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
    type: z.enum(["company", "community", "education", "hackathon_group"], {
        required_error: "You need to select a notification type.",
      }),
  email: z
    .string({
      required_error: "Please enter your email to display.",
    })
    .email(),
  introduction: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  introduction: "I am writing something unique about myself.",
  urls: [
    { value: "https://google.com" },
  ],
}

export function GroupForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const [file, setFile] = useState<File | null>(null);
  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })
  const {address} = useAccount();
  const { write, isLoading, error } = useContractWrite({
    address: MUMBAI.groupRegistry,
    abi: ABI.groupRegistry,
    functionName: "createGroup",
  }); 

  async function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify({...data, image: file}, null, 2)}</code>
        </pre>
      ),
    })
    
    
    
    if(!file){  
        toast({
            title: "Error",
            description: "Make sure your have valid image file",
        });
        return;
    }

    
    const image = await uploadContent(file);
    console.log(image);
   
    
    if(!image){
        toast({
            title: "Error",
            description: "Make sure your have valid image file",
        });
        return;
    }
    
    const form = await uploadContent(JSON.stringify({
        ...data, image: image
    }));
    
    

    if(image.length < 30 || form.length < 30){
        toast({
            title: "Error",
            description: "Make sure you have all the right credentails",
        });
        return;
    }

    //name, image and details
     write({
      args: [
        data.groupName,
        image,
        form,
      ],
    }); 
  }
  
  const selectFile = (file: File) => {
    setFile(file);
  };

  return (
    <Form {...form}>
        <Alert>
            <AlertTitle>Clubs image, type and name can not be changed after group is created</AlertTitle>
            <AlertDescription>
            Please enter correct information of group. The image, type and name of group are storing on NFT and cannot be changed after group is created
            </AlertDescription>
        </Alert>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="w-[200px]">
              <MediaUploader
                onFileSelected={selectFile}
                width={50}
                height={50}
              />
            </div>
            <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Group Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-5"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="company" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Company
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="education" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Educational Institution
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="community" />
                    </FormControl>
                    <FormLabel className="font-normal">Community</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hackathon_group" />
                    </FormControl>
                    <FormLabel className="font-normal">Hackathon Group</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your groupname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Introduction of your Group</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your group here"
                  className="resize-none"
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
              <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Offical Channels
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div>
        
        <div className="flex items-center justify-end gap-8">
          <Button type="button" variant="secondary" size="sm">
            Cancel
          </Button>
          <Button type="submit" size="sm">Update profile</Button>
        </div>
        
      </form>
    </Form>
  )
}