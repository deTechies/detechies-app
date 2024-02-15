"use client";
import { useDictionary } from "@/lib/dictionaryProvider";
import { Achievement, AchievementReward } from "@/lib/interfaces";
import DisplayNFTModal from "@/components/nft/display-nft-modal";
import ListAvatarItemTrigger from "./list-avatars-item-trigger";

import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IListAvatarItem {
  details: Achievement;
  showSelect: boolean | undefined;
  lang: any;
  showMintButton: boolean;
  blockRequest: boolean;
}

export default function ListAvatarItem({
  details,
  showSelect,
  blockRequest,
}: IListAvatarItem) {
  const dictionary = useDictionary();

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <ListAvatarItemTrigger
          showSelect={showSelect}
          item={details}
          lang={dictionary}
        />
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="bg-blackA4 data-[state=open]:animate-overlayShow fixed inset-0" />
        
        <DisplayNFTModal
          details={details}
          showMintButton={false}
          lang={dictionary}
        />
      </DialogPortal>
    </Dialog>
  );
}
