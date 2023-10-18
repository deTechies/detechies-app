"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"


import useFetchData from "@/lib/useFetchData"
import { ArrowDown, CheckIcon } from "lucide-react"
import { Button } from "../ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { toast } from "../ui/use-toast"



const accountFormSchema = z.object({
    group: z.string({
        required_error: "Please enter a name.",
    }),
  token: z.string({
    required_error: "Please select a valid token",
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>


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
    }
}

export function RequestNftForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema)
  })
  
  //make a fetch for all the groups out there
  const { data:groups, loading:groupLoading, error:groupError } = useFetchData<Group[]>('/group/all');
  
  //make a fetch for all the token ids and anmes out there.
  const {data:achievements, loading:achievementLoading, error:achievementError} = useFetchData<Achievement[]>('/achievement/all');

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-8">
        <div className="grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Group</FormLabel>
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
                      { field.value
                        ? groups && groups.find(
                            (group) => group.addr === field.value
                          )?.name
                        : "Select group"}
                      <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command className="w-full">
                    <CommandInput placeholder="Search group..." />
                    <CommandEmpty>No groups found.</CommandEmpty>
                    <CommandGroup>
                      {groups && groups.map((group) => (
                        <CommandItem
                          value={group.addr}
                          key={group.name}
                          onSelect={() => {
                            form.setValue("group", group.addr)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              group.addr === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {group.name}
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
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Token</FormLabel>
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
                        ? achievements && achievements.find(
                            (achievement:Achievement) => achievement.id === field.value
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
                      {achievements && achievements.map((achievement) => (
                        <CommandItem
                          value={achievement.id}
                          key={achievement.metadata.name}
                          onSelect={() => {
                            form.setValue("token", achievement.id)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              achievement.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {achievement.metadata.name}
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
        </div>            
  
        <Button type="submit">Request User</Button>
      </form>
    </Form>
  )
}