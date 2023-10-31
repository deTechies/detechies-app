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

import MediaUploader from "@/components/extra/media-uploader";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import Loading from "@/components/loading";
import TransactionData from "@/components/screens/transaction-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ABI } from "@/lib/constants";
import { uploadContent } from "@/lib/upload";
import { XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Address, useAccount, useContractWrite } from "wagmi";

const attributeSchema = z.object({
  trait_type: z.string(),
  value: z.string(),
});


const createAchievementForm = z.object({
  nft_type: z.enum(["sbt", "tradeable"], {
    required_error: "Need to select a alid nft type",
  }),
  name: z.string({
    required_error: "Please enter a valid name",
  }),
  category: z.enum(["skill", "community", "contribution", "feedback", "other"], {
    required_error: "You need to select the type of reward.",
  }),
  description: z.string().max(250).min(4),
  recipients: z.enum(["project", "individual", "group"], {
    required_error: "Need to select on of the options",
  }),
  attributes: z.array(attributeSchema),
  created_by: z.string(),
  createdAt: z.string(),
});

type AchievementForm = z.infer<typeof createAchievementForm>;

// This can come from your database or API.
const defaultValues: Partial<AchievementForm> = {
  description:
    "Format of minimum requiremenst, reason for delivering this reward",
    createdAt: new Date().toISOString(),
  created_by: "0x0000000",
  attributes: [{ trait_type: "", value: "" }],

};

export function CreateAchievementForm() {
  const form = useForm<AchievementForm>({
    resolver: zodResolver(createAchievementForm),
    defaultValues,
    mode: "onChange",
  });
  //const { address: contract } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const { address } = useAccount();
  const searchParams = useSearchParams()!;
  //get the contract address from a search param

  const contract = searchParams.get("contract");

  const { write, isLoading, error, data } = useContractWrite({
    address: contract as Address,
    abi: ABI.group,
    functionName: "addAchievement",
  });

  async function onSubmit(data: AchievementForm) {


    if (!file) {
      toast({
        title: "Error",
        description: "Make sure your have valid image file",
      });
      return;
    }
    
    toast({
      title: "We are now uploading your files to the network:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <Loading />
          Uploading files.
        </pre>
      ),
    });

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex-col items-center justify-center"
      >
        <section className="flex flex-col md:flex-row gap-8 md:items-center">
          <div className="w-[200px]">
            <MediaUploader onFileSelected={selectFile} width={50} height={50} />
          </div>
          <div className="md:flex-grow flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of the achievement"
                      {...field}
                    />
                  </FormControl>
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
          </div>
        </section>
        
        <section className="grid md:grid-cols-2 gap-4">
          
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your nft type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="skill">
                    Skill Achievement
                  </SelectItem>
                  <SelectItem value="support">
                    Community Support
                  </SelectItem>
                  <SelectItem value="contribution">
                   Open Source Contribution
                  </SelectItem>
                  <SelectItem value="feedback">
                   Valuable feedback
                  </SelectItem>
                  <SelectItem value="other">
                   Other
                  </SelectItem>
                </SelectContent>
              </Select>

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
                  <SelectItem value="sbt">
                    SBT (Not tradable)
                  </SelectItem>
                  <SelectItem value="community">
                    Community
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="recipients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward to</FormLabel>
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
        </section>
        <section className="space-y-4">
          <h2 className="font-semibold">Attributes</h2>
          {form.watch("attributes").map((attribute, index) => (
            <div key={index} className="flex gap-4">
              <FormField
                control={form.control}
                name={`attributes.${index}.trait_type`}
                render={({ field }) => (
                  <Input placeholder="Trait Type" {...field} />
                )}
              />
              <FormField
                control={form.control}
                name={`attributes.${index}.value`}
                render={({ field }) => (
                  <Input placeholder="Value" {...field} />
                )}
              />
              {form.watch("attributes").length > 1 && (
                <Button
                variant={"destructive"}
                  onClick={() => {
                    form.setValue(
                      "attributes",
                      form.getValues("attributes").filter((_, idx) => idx !== index)
                    );
                  }}
                >
                  <XIcon size={16} />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() => {
              form.setValue("attributes", [
                ...form.getValues("attributes"),
                { trait_type: "", value: "" },
              ]);
            }}
          >
            Add Attribute
          </Button>
        </section>
     


        <div className="flex items-center justify-end gap-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Create Achievement
          </Button>
        </div>
      </form>
      
      <div>
        <TransactionData hash={data?.hash} />
    
      </div>
    </Form>
    
    
  );
}
