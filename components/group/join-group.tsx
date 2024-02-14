"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useSession } from "next-auth/react";
import { toast } from "../ui/use-toast";

import { joinGroup } from "@/lib/data/groups";
import Image from "next/image";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";

export default function InviteProjectMember({
  groupId,
  details,
  lang,
}: {
  groupId: string;
  details: any;
  lang: any;
}) {
  const FormSchema = z.object({
    message: z.string().max(100, {
      message: "Message must not be longer than 100 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [ openDialog, setOpenDialog ] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //@ts-ignore
    setLoading(true);
    //implement the logic for joina project here..
    const result = await joinGroup({
      clubId: groupId,
      message: data.message,
    });

    if (result.status === "success") {
      toast({
        title: "Successfully requested to join project",
        description: "The project leader will review your request",
      });
      setOpenDialog(false);
    } else {
      toast({
        title: result.status,
        description: result.messageCode,
      });
    }

    setLoading(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="max-w-[230px] grow">
        <Button size="lg" variant="primary" className="w-full">
          {lang.details.profile_card.join_group.title}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6">
        <div className="flex flex-col gap-4">
          <h5 className="text-subhead_m">
            {lang.details.profile_card.join_group.title}
          </h5>

          <p className="text-body_m">
            {lang.details.profile_card.join_group.desc}
          </p>
        </div>

        <Card className="flex-row gap-5 p-6 border border-border-div">
          <Avatar className="w-[68px] h-[68px] mb-2">
            <AvatarImage
              src={details.image
                ? `https://ipfs.io/ipfs/${details.image}`
                : "/icons/group_default.png"}
              alt={details.name}
              className="rounded-md"
            />

            <AvatarFallback className="relative">
              <Image
                src="/images/careerzen.png"
                alt="no-item"
                fill={true}
                className="object-contain bg-no-repeat"
              />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center gap-3">
            <h3 className="truncate text-subhead_s">
              {details?.name ? details?.name : "Name not found"}
            </h3>

            <h4 className="truncate text-label_m">
              {details?.type ? details?.type : "Type not found"}
            </h4>
          </div>
        </Card>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-col items-center justify-center w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3">
                    {lang.details.profile_card.join_group.message}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        lang.details.profile_card.join_group.message_placeholder
                      }
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-4">
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="max-w-[212px] grow px-0"
                >
                  {lang.details.profile_card.join_group.back}
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="max-w-[212px] grow px-0"
                disabled={loading}
                loading={loading}
              >
                {lang.details.profile_card.join_group.send}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
