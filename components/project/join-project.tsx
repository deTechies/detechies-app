"use client";

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
import { postServer } from "@/lib/data/postRequest";
import { ROLE_TYPE } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "../ui/use-toast";


interface JoinGroupProps {
  address: string;
  lang: any;
}

export default function JoinProject({ address, lang }: JoinGroupProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // --- Text & Labels ---
  const messageTooShortText = lang.validation.no_shorter_than_x.replace("${X}","10");
  const messageTooLongText = lang.validation.no_longer_than_x.replace("${X}","200");
  const messageRequiredText = lang.validation.this_field_is_required;
  const requestSentText = lang.validation.request_sent;

  const FormSchema = z.object({
    role: z.nativeEnum(ROLE_TYPE, {
      //  This is a radio button, it's impossible to not have a value
      required_error: "", 
    }),
    message: z
      .string({required_error: messageRequiredText})
      .min(10, {
        message: messageTooShortText,
      })
      .max(200, {
        message: messageTooLongText
      }),
  });

  const joinProjectFormSchema = z.object({
    message: z
      .string({required_error: messageRequiredText})
      .min(10, {
        message: messageTooShortText,
      })
      .max(200, {
        message: messageTooLongText
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
    setLoading(true);
    if (!data.role) {
      toast({
        title: "Error",
        description: "You need to select a role",
      });
      return;
    }
    
    const postData = JSON.stringify({
      projectId: address,
      message: data.message,
      role: data.role,
    })
    const result = await postServer(`/project-member/join`, postData);

    if (result) {
      toast({
        title: requestSentText
      });
      router.refresh()
      closeButtonRef.current?.click();
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="max-w-[212px] w-full">
        <Button variant="primary" className="px-5">
          {lang.project.details.join_project.button}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <h3 className="mb-4 text-subhead_s">
          {lang.project.details.join_project.title}
        </h3>

        <p className="mb-6 text-body_m">
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
            <div className="flex flex-row justify-center gap-2 mx-auto">
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
