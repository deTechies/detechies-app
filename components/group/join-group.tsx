"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { API_URL } from "@/lib/constants";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

import { Card } from "../ui/card";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

export default function InviteProjectMember({
  groupId,
  details,
}: // lang,
{
  groupId: string;
  details: any;
  // lang: any;
}) {
  const FormSchema = z.object({
    message: z.string().max(100, {
      message: "Message must not be longer than 100 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const join = async () => {
    //@ts-ignore
    setLoading(true);
    //TODO: still need to implement the tokenbound account here.
    const submitData = {
      contract: details.id,
      tokenId: "0",
      data: [""],
      requester: session?.web3.address,
      tokenbound: session?.web3.user.TBA,
    };

    fetch(`${API_URL}/polybase/requestMint`, {
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
            title: "You made a request to join",
            description:
              "You request is under review and you will be notified once it is done.",
          });
        } else {
          toast({
            title: "Already joined the company",
            description: data.message,
            variant: "destructive",
          });
        }
      });

    setLoading(false);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    join();
  }

  return (
    <Dialog>
      <DialogTrigger className="max-w-[230px] grow">
        <Button size="lg" variant="primary" className="w-full">
          그룹 가입하기
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6">
        <div className="flex flex-col gap-4">
          <h5 className="text-subhead_m">그룹 가입하기</h5>

          <p className="text-body_m">
            해당 그룹의 리더에게 가입 요청 메세지를 보내세요. 리더가 승인하면
            그룹 멤버가 될 수 있어요.
          </p>
        </div>

        <Card className="flex-row gap-5 p-6 border border-border-div">
          <div className="rounded-full w-[68px] h-[68px] flex justify-center items-center shrink-0 overflow-hidden">
            <Image
              src={
                details.image
                  ? `https://ipfs.io/ipfs/${details.image}`
                  : "/icons/group_default.png"
              }
              alt={`Layer company image`}
              className="object-scale-down aspect-square"
              width={68}
              height={68}
            />
          </div>

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
                  <FormLabel className="mb-3">요청 메세지</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="안녕하세요. 프론트엔드 개발자 홍길동 입니다."
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
                  뒤로가기
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="max-w-[212px] grow px-0"
                disabled={loading}
                loading={loading}
              >
                가입 요청하기
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
