"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ABI, MUMBAI } from "@/lib/constants";
import { uploadContent } from "@/lib/upload";
import { DialogDescription } from "@radix-ui/react-dialog";
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
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;
const defaultValues: Partial<ProfileFormValues> = {
  introduction: "I am writing something unique about myself.",
  urls: [{ value: "https://google.com" }],
};

export default function CreateProject() {
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
    address: MUMBAI.projectRegistry,
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
      args: [data.projectName, image, form],
    });

    console.log(transactionData);

    setLoading(false);
  }

  const selectFile = (file: File) => {
    setFile(file);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Project</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Create Project</DialogTitle>
        <DialogDescription>
          <p>
            Create a project to share with the community. You can create a
            hackathon, side project or a contract.
          </p>
        </DialogDescription>
        <div>
          <Button>
            Import Project
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="flex gap-8">
              <div className="w-[200px]">
                <MediaUploader
                  onFileSelected={selectFile}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col gap-4 flex-grow">
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="side_project">
                            Side Project
                          </SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

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
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isValid}
                loading={isLoading || loading}
              >
                Create Project
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
