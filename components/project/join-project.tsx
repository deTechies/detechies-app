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
import { Badge } from "../ui/badge";
import { toast } from "../ui/use-toast";
import { PlusIcon } from "lucide-react";

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
  lang: any;
}

export default function JoinProject({ address, lang }: JoinGroupProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
      });

      closeButtonRef.current?.click();
    }

    setLoading(false);

  };
  
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary" size="lg" className="px-5">
          {lang.details.join_project.button}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <h3 className="text-subhead_s font-medium">
          {lang.details.join_project.title}
        </h3>
        <p className="text-body_m text-text-secondary mb-4">
          {lang.details.join_project.body}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{lang.details.join_project.role}</FormLabel>
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
                        <FormLabel className="capitalize">
                          {lang.details.role_type.admin}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="member" />
                        </FormControl>
                        <FormLabel className="capitalize">
                          {lang.details.role_type.member}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="client" />
                        </FormControl>
                        <FormLabel className="capitalize">
                          {lang.details.role_type.client}
                        </FormLabel>
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
                  <FormLabel>{lang.details.join_project.message}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={lang.details.join_project.message_ex}
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
            <div className="flex  flex-row justify-center gap-2 mx-auto">
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  ref={closeButtonRef}
                  className="max-w-[212px] grow"
                >
                  {lang.details.join_project.back}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-accent-secondary max-w-[212px] grow"
                loading={loading}
                disabled={loading}
              >
                {lang.details.join_project.submit}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
