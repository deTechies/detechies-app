"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject } from "@/lib/data/project";
import { uploadContent } from "@/lib/upload";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProjectCategory, ProjectType } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your groups name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your groups name must not be longer than 30 characters.",
    }),
  begin_date: z.string(),
  end_date: z.string(),
  description: z.string().max(5000).min(4),
  type: z.nativeEnum(ProjectType, {
    required_error: "You need to select a type.",
  }),
  category: z.nativeEnum(ProjectCategory, {
    required_error: "You need to select a category.",
  }),
});

type ProfileFormValues = z.infer<typeof projectFormSchema>;
const defaultValues: Partial<ProfileFormValues> = {
  description: "Amazing project built by the careerzenTeam.",
};

export default function CreateProject() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState(false);

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


    if (!image) {
      toast({
        title: "Error",
        description: "Make sure your have valid image file",
      });
      return;
    }

    const form = JSON.stringify({
      ...data,
      image: image,
    });

    //testing if they are valid string lenghts
    if (image.length < 30 || form.length < 30) {
      toast({
        title: "Error",
        description: "Make sure you have all the right credentails",
      });
      return;
    }
    
    if(present){
      data.end_date = "present";
    }

    const result = await createProject({
      image: image,
      name: data.name,
      description: data.description,
      begin_date: data.begin_date,
      end_date: data.end_date,
      category: data.category,
      type: data.type,
    });
    

    if (result.id) {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      router.push(`/project/${result.id}`);
    }

    setLoading(false);
  }



  const selectFile = (file: File | null) => {
    setFile(file);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="lg">Create Project</Button>
      </DialogTrigger>

      <DialogContent>
        <h3 className="text-subhead_s mb-4">Create Project</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <section className="flex gap-8">
              <div className="flex flex-col gap-4 flex-grow">
                <FormField
                  control={form.control}
                  name="name"
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
                <div className="grid grid-cols-2 gap-4">
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
                            {Object.values(ProjectType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
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
                            {Object.values(ProjectCategory).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between">
                    <Label>Period</Label>
                    <div className="flex items-center gap-3">
                      <Checkbox
                      onCheckedChange={() => {
                        setPresent(!present);
                      }}
                      />
                      <Label>Present</Label>

                    </div>
                  </div>

                  <div className="flex flex-row gap-2 items-center w-full">
                    <FormField
                      control={form.control}
                      name="begin_date"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Input
                            type="date"
                            placeholder="Select a type"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span>~</span>
                    <FormField
                      control={form.control}
                      name="end_date"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Input
                            type="date"
                            placeholder="Select a type"
                            {...field}
                            disabled={present}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </section>

            <FormField
              control={form.control}
              name="description"
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

            <div className="w-[200px] mx-auto">
              <MediaUploader
                onFileSelected={selectFile}
                width={50}
                height={50}
              />
            </div>

            <div className="flex items-center justify-center gap-8">
            <DialogClose asChild>
                <Button variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading || !form.formState.isValid}
                loading={loading}
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
