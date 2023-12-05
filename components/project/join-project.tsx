"use client";

import { joinProject } from "@/lib/data/project";
import { useRef, useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
  role: z.enum(["admin", "member", "client"], {
    required_error: "You need to select an role",
  }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(200, {
      message: "Message must not be longer than 160 characters.",
    }),
});
interface JoinGroupProps {
  address: string;
}

export default function JoinProject({ address }: JoinGroupProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const closeButtonRef =  useRef<HTMLButtonElement>(null);

  const messageValue = form.watch("message", "");

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //@ts-ignore
    setLoading(true);
    //implement the logic for joina project here..
    const result = await joinProject({
      projectId: address,
      message: data.message,
      role: data.role,
    });
    
    if (result) {
      toast({
        title: "Successfully requested to join project",
        description: "The project leader will review your request",
      })
  
      closeButtonRef.current?.click();

      
      
    }

    setLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button loading={loading} className="w-full">
          Join Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="text-subhead_s font-medium">
          프로젝트 참여하기 | Join Project
        </h3>
        <p className="text-body_m text-text-secondary mb-4">
          프로젝트에서 어떤 역할을 했는지 선택하고, 리더에게 참여 요청 메세지를
          보내세요. 리더가 승인하면 프로젝트 멤버가 될 수 있어요.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-6"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="admin" />
                        </FormControl>
                        <FormLabel className="capitalize">Admin</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="member" />
                        </FormControl>
                        <FormLabel className="capitalize">member</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="client" />
                        </FormControl>
                        <FormLabel className="capitalize">client</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-right">
                    {messageValue.length} / 200
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex  flex-row justify-center gap-4 mx-auto">
              <DialogClose asChild>
                <Button variant="secondary" ref={closeButtonRef}>
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-accent-secondary">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
