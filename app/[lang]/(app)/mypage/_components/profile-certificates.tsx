"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

import { Member } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import DisplayNFT from "@/components/nft/display-nft";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogContent } from "@radix-ui/react-dialog";

interface IProfileClubsProps{
  clubMemberships: Member[];
  text: any;
}

interface IClubCertificateProps{
  certificateName: string;
  certificateType: string;
  certificateAttribute: string;
  certificateIssuer: string;
  certificateDescription: string;
  text: any;
  clubImageSrc: string;
}

export default function ProfileCertificates({
  clubMemberships,
  text,
}: IProfileClubsProps) {
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
      
      {clubMemberships &&
        clubMemberships.map((membership: Member) => {
          console.log(membership.club);
          return (
            <Card key={membership.id} className="flex inline-flex flex-row items-start">
              <div className="w-[68px] h-[68px] relative aspect-square rounded-sm ">
                <Image
                  src={`https://ipfs.io/ipfs/${membership.club.image}`}
                  alt="project image"
                  fill={true}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col gap-4 grow shrink flex-wrap">
                <header className="flex gap-2 items-center">
                  <h5 className="text-subhead_s">{membership.club.name}</h5>
                </header>
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col gap-2 basis-1/4">
                    <span className="text-text-secondary text-label_m">
                      {text?.group_type}:{" "}
                      <span className="capitalize">{membership.club.type}</span>
                    </span>
                    <span className="text-text-secondary text-label_m ">
                      {text?.date_joined}: {" "} {formatDate(membership?.created_at.toString())}
                    </span>
                  </div>
                  <div className="flex flex-col basis-3/4">
                    <span className="text-text-secondary text-label_m">{membership?.club.description}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between shrink-0">
                <ClubCertificate 
                  certificateName = "Certificate 1"
                  certificateType = "Type 2"
                  certificateAttribute= "Water"
                  certificateIssuer={membership.club.name}
                  certificateDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  text={text}
                  clubImageSrc={membership.club.image}
                />
              </div>
            </Card>
          );
        })}
    </div>
  );
}

function ClubCertificate({
  certificateName,
  certificateType,
  certificateAttribute,
  certificateIssuer,
  certificateDescription,
  text,
  clubImageSrc
}:IClubCertificateProps){
  return(
    <Dialog>
      <DialogTrigger>
        <Badge variant="info">{text?.training_certificate}</Badge>
      </DialogTrigger>
      <DialogPortal >
        <DialogOverlay className="bg-blackA4 data-[state=open]:animate-overlayShow fixed inset-0 z-10"/>
        <DialogContent className="z-20 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <DialogTitle>
            <div className="flex items-start mb-2">
              <span className="basis-3/4">{certificateName}</span>
              <Badge className="basis-1/4">{"df432..f49er"}</Badge>
            </div>
          </DialogTitle>
          <div className="flex justify-center">
            <Image
                    src={`https://ipfs.io/ipfs/${clubImageSrc}`}
                    alt="project image"
                    width={300}
                    height={300}
                    className="rounded-sm justify-self-center"
            />
          </div>
          <div className="grid border rounded-sm border-[1px] mt-2">
            <div className="flex justify-between p-2 items-center border-b-[1px]">
              <div className="flex items-center">
                <span>CZN {text?.token}</span>
              </div>
              <span>CZN {text?.token}</span>
            </div>
            <div className="flex justify-between p-2 items-center border-b-[1px]">
              <div className="flex items-center">
                <span>CZN {text?.token}</span>
              </div>
              <span>CZN {text?.token}</span>
            </div>
            <div className="flex justify-between p-2 items-center">
              <div className="flex items-center">
              <span>CZN {text?.token}</span>
              </div>
              <span>CZN {text?.token}</span>
            </div>
          </div>
 

        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
