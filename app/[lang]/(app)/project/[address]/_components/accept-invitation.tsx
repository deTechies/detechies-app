"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

import { postServer } from "@/lib/data/postRequest";

export default function AcceptInvitation({
  name,
  projectId,
  image,
  lang,
}: {
  projectId: string;
  name: string;
  image: string;
  lang: any;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const acceptInvitation = async () => {
    setLoading(true);
    const result = await postServer(`/project-member/accept/invite/${projectId}`, '');

    if (result.status === "success") {
      toast({
        title: "Accept invitation",
        description: "Thank you for accepting the members ship",
      });

      router.refresh();
    }

    if (result.status !== "success") {
      setLoading(false);
    }
  };

  const rejectInvitation = async () => {
    router.push("/project");
  };
  return (
    <Card className="flex flex-col max-w-[500px] gap-0 px-8 mx-auto text-center py-7">
      <Avatar className="rounded-sm mx-auto w-[200px] h-[200px] mb-6">
        <AvatarImage
          src={"https://ipfs.io/ipfs/" + image}
          alt="project_image"
        />

        <AvatarFallback className="relative">
          <Image
            src="/images/detechies.png"
            alt="no-item"
            fill={true}
            className="object-contain bg-no-repeat"
          />
        </AvatarFallback>
      </Avatar>

      <div className="text-heading_s">{name}</div>

      <div className="mb-4 text-heading_s">
        {lang.project.details.invited_to_project.title}
      </div>

      <div className="mb-6 text-text-secondary">
        {lang.project.details.invited_to_project.desc}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Dialog>
          <DialogTrigger className="max-w-[212px] grow w-full">
            <Button variant="secondary" size="lg">
              {lang.project.details.invited_to_project.reject}
            </Button>
          </DialogTrigger>

          <DialogContent className="gap-0">
            <h3 className="mb-4 text-subhead_s">
              {lang.project.details.invited_to_project.popup_title}
            </h3>

            <div className="mb-6 text-body_m">
              {lang.project.details.invited_to_project.popup_content}
            </div>

            <div className="flex justify-center gap-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={rejectInvitation}
                disabled={loading}
              >
                {lang.project.details.invited_to_project.reject}
              </Button>

              <Button
                size="lg"
                onClick={rejectInvitation}
                disabled={loading}
              >
                {lang.project.details.invited_to_project.later}
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
          {lang.project.details.invited_to_project.accept}
        </Button>
      </div>
    </Card>
  );
}
