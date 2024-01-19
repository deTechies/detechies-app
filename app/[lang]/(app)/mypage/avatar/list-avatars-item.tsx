"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { Achievement, AchievementReward } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import DisplayNFTModal from "@/components/nft/display-nft-modal";
import { useDictionary } from "@/lib/dictionaryProvider";
import ListAvatarItemTrigger from "./list-avatars-item-trigger";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogContent
} from "@/components/ui/dialog";

interface IListAvatarItem{
    details: Achievement;
    showSelect:boolean | undefined;
    lang:any;
    showMintButton: boolean;
    blockRequest:boolean;
}

export default function ListAvatarItem({
    details,
    showSelect,
    blockRequest
  }: IListAvatarItem) {
  
    const dictionary = useDictionary();

  return (  
    <Dialog>
        <DialogTrigger>
          <ListAvatarItemTrigger showSelect={showSelect} item={details} lang={dictionary} />
        </DialogTrigger>
        <DialogPortal >
            <DialogOverlay className="bg-blackA4 data-[state=open]:animate-overlayShow fixed inset-0"/>
            <DisplayNFTModal details={details} showMintButton={false} lang={dictionary}/>
        </DialogPortal>
    </Dialog>
  );
}
