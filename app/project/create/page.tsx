"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import MediaUploader from "@/components/extra/media-uploader";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ABI, MUMBAI } from "@/lib/constants";
import { uploadContent } from "@/lib/upload";
import { useState } from "react";
import { useContractWrite } from "wagmi";

const projectFormSchema = z.object({
  projectName: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  introduction: z.string().max(160).min(4),
  type: z.enum(["hackathon", "side_project", "project"], {
    required_error: "You need to select a  type.",
  }),
  location: z.enum(["everywhere", "europe", "asia", "north-america", "africa", "south-america"], {
    required_error: "You need to select a region type.",
  }),

    requirementDeadline: z.date().min(new Date()).optional(),
    projectDeadline: z.date().min(new Date()).optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  introduction: "I am writing something unique about myself.",
  urls: [{ value: "https://google.com" }],
};

export default function ProjectForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [file, setFile] = useState<File | null>(null);
  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });
    const { write, isLoading, error, data } = useContractWrite({
    address:MUMBAI.projectRegistry,
    abi: ABI.projectRegsitry,
    functionName: "createProject",
  }); 
  
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ProfileFormValues) {
    
    setLoading(true);

    if (!file) {
      toast({
        title: "Error",
        description: "Make sure your have valid image file",
      });
      return;
    }

    const image = await uploadContent(file);
    console.log(image);

    if (!image) {
      toast({
        title: "Error",
        description: "Make sure your have valid image file",
      });
      return;
    }

    const form = await uploadContent(
      JSON.stringify({
        ...data,
        image: image,
      })
    );

    console.log(form);

    //testing if they are valid string lenghts
    if (image.length < 30 || form.length < 30) {
      toast({
        title: "Error",
        description: "Make sure you have all the right credentails",
      });
      return;
    }
    //name, image, details

     const transactionData = await write({
      args: [
        data.projectName,
        image,
        form,
      ], 
    }); 
    
    console.log(transactionData);
    
    setLoading(false);  
  }

  const selectFile = (file: File) => {
    setFile(file);
  };

  return (
    
    <Card className="max-w-4xl w-full m-8">
      <CardHeader className="flex items-center gap-4">
        Create Project
      </CardHeader>
      <CardContent className="my-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     
      <div className="w-[200px]">
          <MediaUploader onFileSelected={selectFile} width={50} height={50} />
        </div>
        <FormField
          control={form.control}
          name="projectName"
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
          name="introduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell more about your project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="side_project">Side Project</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a specific location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="north-america">North America</SelectItem>
                  <SelectItem value="south-america">South America</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="everywhere">Everywhere</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        </div>

    

        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Links
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                   You can add links to share more details about your project. 
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
          <Button type="button" variant="secondary" >
            Cancel
          </Button>
          <Button type="submit" 
            disabled={isLoading || !form.formState.isValid}
            loading={isLoading || loading}
          >
            Create Project
          </Button>
        </div>
      </form>
    </Form>
    </CardContent>
    </Card>
  );
}
