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

interface INftInventoryItem{
    details: Achievement,
}

export default function NftInventoryItem({
    details
  }: INftInventoryItem) {
  const dictionary = useDictionary();

  return (  
    <Dialog>
        <DialogTrigger>
            <
        </DialogTrigger>
        <DialogPortal >
            <DialogOverlay className="bg-blackA4 data-[state=open]:animate-overlayShow fixed inset-0"/>
            <DisplayNFTModal details={details} showMintButton={false} lang={dictionary}/>
        </DialogPortal>
    </Dialog>
  );
}
