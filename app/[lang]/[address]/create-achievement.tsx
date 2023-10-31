"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import MediaUploader from "@/components/extra/media-uploader";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ABI } from "@/lib/constants";
import { uploadContent } from "@/lib/upload";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Address, useAccount, useContractWrite } from "wagmi";

const createAchievementForm = z.object({
  nft_type: z.enum(["sbt", "tradeable"], {
    required_error: "Need to select a alid nft type",
  }),
  name: z.string({
    required_error: "Please enter a valid name",
  }),
  type: z.enum(["Skill Achievement", "Community Help", "Good Will", "Other"], {
    required_error: "You need to select the type of reward.",
  }),
  description: z.string().max(250).min(4),
  recipients: z.enum(
    ["project", "individual", "group"],
    { required_error: "Need to select on of the options" }
  ),
});

type AchievementForm = z.infer<typeof createAchievementForm>;

// This can come from your database or API.
const defaultValues: Partial<AchievementForm> = {
  description:
    "Format of minimum requiremenst, reason for delivering this reward",
};

export function CreateAchievement() {
  const form = useForm<AchievementForm>({
    resolver: zodResolver(createAchievementForm),
    defaultValues,
    mode: "onChange",
  });
  const { address: contract } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const { address } = useAccount();
  const { write, isLoading, error } = useContractWrite({
    address: contract as Address,
    abi: ABI.group,
    functionName: "addAchievement",
  });

  async function onSubmit(data: AchievementForm) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify({ ...data, image: file }, null, 2)}
          </code>
        </pre>
      ),
    });

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

    if (image.length < 30 || form.length < 30) {
      toast({
        title: "Error",
        description: "Make sure you have all the right credentails",
      });
      return;
    }


    write({
      args: [form, false],
    });
  }

  const selectFile = (file: File) => {
    setFile(file);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex-col items-center justify-center">
       
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name of the achievement" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="nft_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of NFT</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your nft type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sbt">SBT (Not tradable)</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your nft type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Skill Achievement">Skill Achievement</SelectItem>
                  <SelectItem value="Community Help">Community Help</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please give a full description of what the NFT represents. "
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
          name="recipients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipients</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select who will be rewarded" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="project">All Project members</SelectItem>
                  <SelectItem value="group">All Group Members</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />


        <div className="w-[200px]">
            <Label>Achievement Image</Label>
            <MediaUploader onFileSelected={selectFile} width={50} height={50} />
        </div>

        <div className="flex items-center justify-end gap-8">
          <Button type="button" variant="secondary" onClick={() => {form.reset()}}>
            Cancel
          </Button>
          <Button type="submit"
            disabled={isLoading}
            loading={isLoading}
          >Create Achievement</Button>
        </div>
      </form>
    </Form>
  );
}
