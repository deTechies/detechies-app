"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

import { postServer } from "@/lib/data/postRequest";

export default function AcceptGroupInvitation({
  id,
  image,
  name,
  lang,
}: {
  id: string;
  image: string;
  name: string;
  lang: any;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const acceptInvitation = async () => {
    setLoading(true);

    const result = await postServer(`/members/accept/invite/${id}`, "");

    if (result) {
      toast({
        title: "Accept invitation",
        description: "Thank you for accepting the membersship",
      });

      router.refresh();
    }
  };

  const rejectInvitation = async () => {
    setLoading(true);
    const result = await postServer(`/members/reject/invite/${id}`, "");
    
    if(result.status == "success") {
      router.push("/groups");
    } else {
      setLoading(false);
    }

    toast({
      title: result.status,
      description: result.message,
    });
  };

  const doItLater = async () => {
    router.push("/groups");
  };
  return (
    <Card className="flex flex-col max-w-[500px] gap-0 px-8 mx-auto text-center py-7">
      <Avatar className="rounded-sm mx-auto w-[200px] h-[200px] mb-6">
        <AvatarImage
          src={"https://ipfs.io/ipfs/" + image}
          alt="group_image"
        />

        <AvatarFallback className="relative">
          <Image
            src="/images/connectfast.png"
            alt="no-item"
            fill={true}
            className="object-contain bg-no-repeat"
          />
        </AvatarFallback>
      </Avatar>

      <div className="text-heading_s">{name}</div>

      <div className="mb-4 text-heading_s">
        {lang.group.details.invited_to_group.title}
      </div>

      <div className="mb-6 text-text-secondary">
        {lang.group.details.invited_to_group.desc}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Dialog>
          <DialogTrigger className="max-w-[212px] grow w-full">
            <Button variant="secondary" size="lg">
              {lang.group.details.invited_to_group.reject}
            </Button>
          </DialogTrigger>

          <DialogContent className="gap-0">
            <h3 className="mb-4 text-subhead_s">
              {lang.group.details.invited_to_group.popup_title}
            </h3>

            <div className="mb-6 text-body_m">
              {lang.group.details.invited_to_group.popup_content}
            </div>

            <div className="flex justify-center gap-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={rejectInvitation}
                disabled={loading}
              >
                {lang.group.details.invited_to_group.reject}
              </Button>

              <Button size="lg" onClick={doItLater} disabled={loading}>
                {lang.group.details.invited_to_group.later}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          size="lg"
          onClick={acceptInvitation}
          loading={loading}
          disabled={loading}
        >
          {lang.group.details.invited_to_group.accept}
        </Button>
      </div>
    </Card>
  );
}
