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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { cn, jobList } from "@/lib/utils";
import { ArrowDown, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

type Job = {
  id: number;
  groupName: string;
  name: string;
};

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

export default function EditProfile() {
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
          router.push("/onboard/mint");
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
      <section className="mb-8">
        <h1 className="text-4xl font-medium mb-6 text-primary">프로필 수정</h1>
      </section>
      <section className="my-2">
        <label className="">이메일</label>
        <div className="flex gap-2 items-center mt-2">
          <Input placeholder="email" />
          <Button className="w-[150px]">인증완료</Button>
        </div>
      </section>
      <Alert variant={"info"} className="my-8">
        <AlertTitle className="text-state-info">
          완벽한 개인정보 보안
        </AlertTitle>
        <AlertDescription>
          모든 개인정보는 암호화를 통해 저장되어 비공개 상태가 유지되요. 본인의
          승인하에만 상대방에게 공개될 수 있어요.
        </AlertDescription>
      </Alert>
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

        <div className="flex items-center w-full">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            loading={loading}
          >
            저장하기
          </Button>
        </div>
      </form>
    </Form>
  );
}
