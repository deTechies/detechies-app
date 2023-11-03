"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import useFetchData from "@/lib/useFetchData";
import { cn } from "@/lib/utils";
import { ArrowDown, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

type Job = {
  id: number;
  groupName: string;
  name: string;
};

export const jobList: Job[] = [
  { id: 1, groupName: "Developer", name: "Front-end Developer" },
  { id: 2, groupName: "Developer", name: "Back-end Developer" },
  { id: 3, groupName: "Developer", name: "Data Scientist" },
  { id: 4, groupName: "Developer", name: "BI Engineer" },
  { id: 5, groupName: "Developer", name: "Data Engineer" },
  { id: 6, groupName: "Developer", name: "DBA" },
  { id: 7, groupName: "Developer", name: "Embeded Developer" },
  { id: 8, groupName: "Developer", name: "DevOps" },
  { id: 9, groupName: "Developer", name: "QA" },
  { id: 10, groupName: "Developer", name: "Android Developer" },
  { id: 11, groupName: "Developer", name: "IOS Developer" },
  { id: 12, groupName: "Developer", name: "Security Specialist" },
  { id: 13, groupName: "Developer", name: "Blockchain Developer" },
  { id: 14, groupName: "Developer", name: "AI Developer" },
  { id: 15, groupName: "Developer", name: "Game Developer" },
  { id: 16, groupName: "Developer", name: "System Analyst" },
  { id: 17, groupName: "Developer", name: "Full-stack Developer" },
  { id: 18, groupName: "Developer", name: "CIO" },
  { id: 19, groupName: "Developer", name: "CTO" },
  { id: 20, groupName: "Designer", name: "UI/UX Designer" },
  { id: 21, groupName: "Designer", name: "Graphic Designer" },
  { id: 22, groupName: "Designer", name: "Contents Designer" },
  { id: 23, groupName: "Designer", name: "Product Designer" },
  { id: 24, groupName: "Designer", name: "Game Art Designer" },
  { id: 25, groupName: "Designer", name: "NFT Art Designer" },
  { id: 27, groupName: "Designer", name: "Brand Designer" },
  { id: 28, groupName: "Designer", name: "UX Writer" },
  { id: 29, groupName: "Designer", name: "UX Researcher" },
  { id: 30, groupName: "Business", name: "Product Manager" },
  { id: 31, groupName: "Business", name: "Project Manager" },
  { id: 32, groupName: "Business", name: "Scrum Master" },
  { id: 33, groupName: "Business", name: "Business Development" },
  { id: 34, groupName: "Business", name: "Data Analyst" },
  { id: 35, groupName: "Business", name: "Sales Manager" },
  { id: 36, groupName: "Business", name: "CPO" },
  { id: 37, groupName: "Business", name: "Lead PM" },
  { id: 38, groupName: "Business", name: "Finance Manager" },
  { id: 39, groupName: "Business", name: "Tax Specialist" },
  { id: 40, groupName: "Business", name: "Certified Public Accountant" },
  { id: 41, groupName: "Business", name: "Internal Auditor" },
  { id: 42, groupName: "Business", name: "Bookkeeper" },
  { id: 43, groupName: "Business", name: "Treasury Manager" },
  { id: 44, groupName: "Business", name: "CFO" },
  { id: 45, groupName: "Business", name: "Strategic Planner" },
  { id: 46, groupName: "Business", name: "General Affairs" },
  { id: 47, groupName: "Business", name: "Communication Manager" },
  { id: 48, groupName: "Business", name: "CSO" },
  { id: 49, groupName: "Business", name: "COO" },
  { id: 50, groupName: "Marketing", name: "Community Manager" },
  { id: 51, groupName: "Marketing", name: "Performance Marketer" },
  { id: 52, groupName: "Marketing", name: "CMO" },
  { id: 53, groupName: "Marketing", name: "SNS Marketer" },
  { id: 54, groupName: "Marketing", name: "Influencer" },
  { id: 55, groupName: "Marketing", name: "Youtuber" },
  { id: 56, groupName: "HR", name: "HR Specialist" },
  { id: 57, groupName: "HR", name: "HR Coordinator" },
  { id: 58, groupName: "HR", name: "HR Analyst" },
  { id: 59, groupName: "HR", name: "HR Manager" },
  { id: 60, groupName: "HR", name: "Talent Acquisition Specialist" },
  { id: 61, groupName: "HR", name: "DEIB Officer" },
  { id: 62, groupName: "HR", name: "Comp & Ben Specialist" },
  { id: 63, groupName: "HR", name: "HR Data Scientist" },
  { id: 64, groupName: "HR", name: "Learning & Development Manager" },
  { id: 65, groupName: "HR", name: "Head of Digital HR" },
  { id: 66, groupName: "HR", name: "Head Hunter" },
];

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters.",
    })
    .max(30, {
      message: "Your name must not be longer than 30 characters.",
    }),
  job: z.object({
    id: z.number(),
    groupName: z.string(),
    name: z.string(),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export default function OnboardProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    data,
    error,
    loading: profileLoading,
  } = useFetchData(`${API_URL}/polybase/${address}`);

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);

    //@ts-ignore
    data.address = address;

    fetch(`${API_URL}/polybase/profile/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username.toString(),
        name: "",
        email: "",
        job: data.job.name,
        description: "",
        address: address,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          toast({
            title: "Profile created successfully.",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-state-info-secondary p-4">
                <code className="text-state-info">
                  Sucessfully created your profile, we send 0.01 MATIC to your
                  account. You are now able to use our platform! Please continue
                  and mint your unique character
                </code>
              </pre>
            ),
          });

          setLoading(false);
          router.replace("/onboard/mint");
        } else {
          console.error("Error creating profile:", data.message);
          toast({
            title: "Error creating profile.",
            description: "Please contact the owner on Telegram",
          });

          setLoading(false);
        }
      });
  }

  return (
    <Form {...form}>
      <h1 className="text-2xl font-medium mb-6">Create a account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter a username" {...field} />
              </FormControl>
              <FormDescription className="font-light">
                This name will be displayed to the public.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Job Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between rounded-sm",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? jobList.find((job) => job.id === field.value?.id)
                            ?.name
                        : "Select job type"}
                      <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full ">
                    <CommandInput placeholder="Search job..." />
                    <CommandEmpty>Nothing found.</CommandEmpty>
                    <CommandGroup className="w-full max-h-[40vh] overflow-auto">
                      {jobList.map((job: Job) => (
                        <CommandItem
                          value={job.name}
                          key={job.name}
                          className="my-4 w-[400px]"
                          onSelect={() => {
                            form.setValue("job", job);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              job.name === field.value?.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col gap-2">
                            <h5 className="font-medium">{job.name}</h5>
                            <span className="text-text-secondary">
                              {job.groupName}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
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
            disabled={loading}
            loading={loading}
          >
            Create Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
