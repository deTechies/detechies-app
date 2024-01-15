"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { acceptProjectInvitation } from "@/lib/data/project";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AcceptInvitation({
  projectId,
  image,
}: {
  projectId: string;
  image: string;
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
    setLoading(false);
  };

  const rejectInvitation = async () => {
    router.push("/projects");
  };
  return (
    <Card className="flex flex-col max-w-md gap-8 m-8 mx-auto">
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

      <h1 className="text-center text-title_l">
        You have been invited to the project! {projectId}
      </h1>
      
      <div className="flex flex-col gap-4 text-center">
        To see more about the project please accept the membership
        <div className="flex items-center justify-center gap-4">
          <Button variant="destructive" size="lg" onClick={rejectInvitation}>
            Reject
          </Button>

          <Button
            size="lg"
            onClick={acceptInvitation}
            loading={loading}
            disabled={loading}
          >
            Accept
          </Button>
        </div>
      </div>
    </Card>
  );
}
