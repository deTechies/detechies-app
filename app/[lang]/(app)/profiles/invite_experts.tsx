"use client";

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { postServer } from "@/lib/data/postRequest";
import { Label } from "@/components/ui/label";

const inviteExportFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "expert's name must be at least 1 character.",
    })
    .max(20, {
      message: "expert's name must not be longer than 20 characters.",
    }),
  email: z.string().email(),
});

type InviteExpertsFormValues = z.infer<typeof inviteExportFormSchema>;

export default function InviteExperts({ lang }: { lang: any }) {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm<InviteExpertsFormValues>({
    resolver: zodResolver(inviteExportFormSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);

  const onClickReject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpenDialog(false);
  };

  async function onSubmit(data: InviteExpertsFormValues) {
    // setLoading(true);
    // const result = await postServer( ~~~ );
    // if(result.status === "success") {
    //     setOpenDialog(false);
    //     form.reset();
    // }
    //
    // toast({
    //     title: result.status,
    //     description: result.message,
    //   });
    // setLoading(false);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <div className="underline text-border-input">
          {lang.profile_filter.info_text}
        </div>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <h3 className="mb-4 text-subhead_s">
              {lang.profile_filter.popup_title}
            </h3>

            <div className="mb-4 text-body_m">
              {lang.profile_filter.popup_desc}
            </div>

            <div className="mb-6">
              <Label className="mb-3">{lang.profile_filter.name}</Label>

              <div className="flex gap-4 mb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl className="h-[60px]">
                        <Input
                          placeholder={lang.profile_filter.name_placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Label className="mb-3">{lang.profile_filter.email}</Label>

              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormControl className="h-[60px]">
                      <Input
                        placeholder={lang.profile_filter.email_placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center gap-2">
              <Button size="lg" variant="secondary" onClick={onClickReject}>
                {lang.profile_filter.reject}
              </Button>

              <Button
                type="submit"
                size="lg"
                disabled={loading || !form.formState.isValid}
                loading={loading}
              >
                {lang.profile_filter.request}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
