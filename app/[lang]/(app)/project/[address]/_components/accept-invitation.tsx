"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { acceptProjectInvitation } from "@/lib/data/project";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    const result = await acceptProjectInvitation(projectId);

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
    <Card className="flex flex-col max-w-md gap-6 m-8 mx-auto">
      <Avatar className="rounded-sm mx-auto w-[200px] h-[200px] mb-2 aspect-square bg-state-info-secondary">
        <AvatarImage
          src={"https://ipfs.io/ipfs/" + image}
          alt="project_image"
          className=""
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

      <h1 className="text-center">
        <div className="mb-3 text-title_l">
          {lang.project.details.invited_to_project.title}
        </div>
        <div className="text-subhead_s">{name}</div>
      </h1>

      <div className="flex flex-col gap-8 text-center">
        {lang.project.details.invited_to_project.desc}

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="destructive"
            size="lg"
            onClick={rejectInvitation}
            disabled={loading}
          >
            {lang.project.details.invited_to_project.reject}
          </Button>

          <Button
            size="lg"
            onClick={acceptInvitation}
            loading={loading}
            disabled={loading}
          >
            {lang.project.details.invited_to_project.accept}
          </Button>
        </div>
      </div>
    </Card>
  );
}
