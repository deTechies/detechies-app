"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { API_URL } from "@/lib/constants";
import useFetchData from "@/lib/useFetchData";
import { ArrowDown, CheckIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Loading from "../loading";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "../ui/use-toast";

const accountFormSchema = z.object({
  achievement: z.object({
    id: z.string().nonempty({ message: "Please select a token." }),
    group: z.object({
      addr: z.string(),
      name: z.string(),
    }),
    metadata: z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
    }),
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

interface Group {
  addr: string;
  name: string;
}

interface Achievement {
  id: string;
  group: Group;
  metadata: {
    name: string;
    description: string;
    image: string;
  };
}

export function RequestNftForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
  });
  const [requesting, setRequesting] = useState(false)
  const {address} = useParams();


  //make a fetch for all the token ids and anmes out there.
  const {
    data: achievements,
    loading: achievementLoading,
    error: achievementError,
  } = useFetchData<Achievement[]>("/achievement/all");

  async function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

      //@ts-ignore
  setRequesting(true);
      const submitData = {
        contract: data.achievement.group.addr,
        tokenId: data.achievement.id,
        type: "project",
        data: [""],
        requester: address, 
        tokenbound: address,
      }; 
      
  
      if (!submitData.contract || !submitData.tokenId || !submitData.data || !submitData.requester || !submitData.tokenbound) {
  
        toast({
          title: "Something went wrong with submitting the data", 
          description: "Please contact the admins to see if there is an issue with the contract"
        });
        console.log(submitData);
        
        return;
      }
      
  
      
      await fetch(`${API_URL}/achievement/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            toast({
              title: "Success",
              description: "Your request has been submitted",
            })
  
          } else {
            console.error("Error creating profile:", data.message);
            toast({
              title: "Something went wrong with submitting the data", 
              description: "Please contact the admins to see if there is an issue with the contract"
            });
          }
        })
        .catch((error) => {
          console.error("Error creating profile:", error);
          toast({
            title: "Something went wrong with submitting the data", 
            description: "Please contact the admins to see if there is an issue with the contract"
          });
        });
        
        setRequesting(false);

  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-8">
        <div className="grid grid-cols-1 gap-2">
          {
            achievementLoading ?
            <Loading /> : (
              <FormField
              control={form.control}
              name="achievement"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select Token</FormLabel>
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
                            ? achievements &&
                              achievements.find(
                                (achievement: Achievement) =>
                                  achievement.id === field.value?.id
                              )?.metadata?.name
                            : "Select a token"}
                          <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="w-full">
                        <CommandInput placeholder="Search token....." />
                        <CommandEmpty>No token found.</CommandEmpty>
                        <CommandGroup>
                          {achievements &&
                            achievements.map((achievement) => (
                              <CommandItem
                                value={achievement.id}
                                key={achievement.metadata.name}
                                className="my-4 w-[400px]"
                                onSelect={() => {
                                  form.setValue("achievement", achievement);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    achievement.id === field.value?.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <div className="flex flex-col  gap-2">
                                  <h5 className="font-medium">
                                    {achievement.metadata.name}
                                  </h5>
                                  <span className="text-text-secondary">
                                    {achievement.group.name}
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
            )
          }
        
        </div>
        <div className="relative w-[250px">
          {
            
          }
        </div>

        <Button type="submit">Request User</Button>
      </form>
    </Form>
  );
}
