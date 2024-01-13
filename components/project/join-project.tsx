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
import { ROLE_TYPE } from "@/lib/interfaces";

const FormSchema = z.object({
  role: z.nativeEnum(ROLE_TYPE, {
    required_error: "You need to select an role",
  }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(200, {
      message: "Message must not be longer than 200 characters.",
    }),
});
interface JoinGroupProps {
  address: string;
  lang: any;
}

export default function JoinProject({ address, lang }: JoinGroupProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const joinProjectFormSchema = z.object({
    message: z
      .string()
      .min(10, {
        message: "Please send a message that is at least 10 characters.",
      })
      .max(200, {
        message: "The message must not be longer than 200 characters.",
      }),
    role: z.nativeEnum(ROLE_TYPE),
  });

  type JoinProjectFormValues = z.infer<typeof joinProjectFormSchema>;

  const defaultValues: Partial<JoinProjectFormValues> = {
    role: ROLE_TYPE.MEMBER,
  };
  

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const messageValue = form.watch("message", "");

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //@ts-ignore
    setLoading(true);
    //implement the logic for joina project here..
    if (!data.role) {
      toast({
        title: "Error",
        description: "You need to select a role",
      });
      return;
    }
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
          {lang.project.details.join_project.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <h3 className="text-subhead_s mb-4">
          {lang.project.details.join_project.title}
        </h3>

        <p className="text-body_m mb-6">
          {lang.project.details.join_project.body}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    {lang.project.details.join_project.role}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row gap-6 min-h-[3rem]"
                    >
                      {Object.values(ROLE_TYPE).map((type) => (
                        <FormItem className="flex items-center space-y-0" key={type}>
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="capitalize">
                            {lang.project.details.role_type[type]}
                          </FormLabel>
                        </FormItem>
                      ))}
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
                  <FormLabel>
                    {lang.project.details.join_project.message}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={lang.project.details.join_project.message_ex}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className={`text-right ${messageValue.length > 200 && "text-state-error"}`}>
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
                  size="lg"
                  ref={closeButtonRef}
                >
                  {lang.project.details.join_project.back}
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="lg"
                loading={loading}
                disabled={loading}
              >
                {lang.project.details.join_project.submit}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
