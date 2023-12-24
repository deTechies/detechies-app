"use client";
import { acceptProjectMember } from "@/lib/data/project";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { toast } from "../ui/use-toast";

interface PendingMemberItemProps {
  image: string;
  name: string;
  role: string;
  id: string;
  status: string;
}
export default function PendingMemberItem({
  image,
  name,
  status,
  role,
  id,
}: PendingMemberItemProps) {
  //if accept then we need to put in

  async function acceptMember() {
    const result = await acceptProjectMember(id);

    if (result) {
      toast({
        description: <pre>{JSON.stringify(result, null, 2)}</pre>,
      });
    }
  }
  return (
    <div className="flex gap-5 py-4 border-b ">
      <div className="shrink-0">
        <Image
          height="80"
          width="80"
          src={image}
          alt={name}
          className="bg-background-layer-2 rounded-sm shrink-0"
        />
      </div>

      <div className="flex gap-4 grow items-center">
        <Dialog>
          <DialogTrigger className="flex flex-col gap-2 items-start">
            <span className="text-title_m ">{name}</span>
            <span className="text-label_m text-text-secondary">
              {status}: {role}
            </span>
          </DialogTrigger>
          <DialogContent>
            We will show more details about this later on...
          </DialogContent>
        </Dialog>
        <div className="flex gap-3 items-center flex-wrap justify-end">
          <Button size="sm" variant="secondary">
            Reject
          </Button>
          <Button size="sm" variant={"primary"} onClick={acceptMember}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
