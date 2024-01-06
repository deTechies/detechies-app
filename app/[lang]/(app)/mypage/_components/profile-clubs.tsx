"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

import { Member } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
export default function ProfileClubs({
  clubs,
  text,
}: {
  clubs: Member[];
  text: any;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <Card className="flex flex-row justify-between items-center">
        <h5 className="text-subhead_s">{text?.clubs}</h5>
        <Button size="sm" variant="secondary" onClick={()=>{
          router.push("/groups/create")
        }}>
          {text?.new_club}{" "}
          <PlusIcon size="16" className="text-text-secondary ml-2" />
        </Button>
      </Card>
      
      {clubs &&
        clubs.map((club: Member) => {
          return (
            <Card key={club.id} className="flex inline-flex flex-row items-start">
              <div className="w-[68px] h-[68px] relative aspect-square rounded-sm ">
                <Image
                  src={`https://ipfs.io/ipfs/${club.club.image}`}
                  alt="project image"
                  fill={true}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-4 grow shrink flex-wrap">
                <header className="flex gap-2 items-center">
                  <h5 className="text-subhead_s">{club.club.name}</h5>
                </header>
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-text-secondary text-label_m">
                      {text?.type}:{" "}
                      <span className="capitalize">{club.club.type}</span>
                    </span>
                    <span className="text-text-secondary text-label_m ">
                      {text?.date_joined}: {" "} {formatDate(club?.created_at.toString())}
                    </span>
                  </div>
                  <div className="flex flex-col basis-3/4">
                    <span className="text-text-secondary text-label_m">{club?.club.description}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between shrink-0">
                <Badge variant="info">{text?.training_certificate}</Badge>
              </div>
            </Card>
          );
        })}
    </div>
  );
}
