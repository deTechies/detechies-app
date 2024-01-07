"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { acceptProjectInvitation } from "@/lib/data/project";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AcceptInvitation({
  projectId,
  image,
}: {
  projectId: string;
  image: string;
}) {
  const router = useRouter();
  const acceptInvitation = async () => {
    const result = await acceptProjectInvitation(projectId);

    if (result.ok) {
      toast({
        title: "Accept invitation",
        description: "Thank you for accepting the members ship",
      });

      router.refresh();
    }
  };

  const rejectInvitation = async () => {
    router.push("/projects");
  };
  return (
    <Card className="flex flex-col max-w-md gap-8 m-8 mx-auto">
      <Image
        width="200"
        height="200"
        src={"https://ipfs.io/ipfs/" + image}
        alt="project_image"
        className="mx-auto rounded-sm"
      />
      <h1 className="text-center text-title_l">
        You have been invited to the project! {projectId}
      </h1>
      <div className="flex flex-col gap-4 text-center">
        To see more about the project please accept the membership
        <div className="flex items-center justify-center gap-4">
          <Button variant="destructive" size="lg" onClick={rejectInvitation}>
            Reject
          </Button>
          <Button size="lg" onClick={acceptInvitation}>
            Accept
          </Button>
        </div>
      </div>
    </Card>
  );
}
