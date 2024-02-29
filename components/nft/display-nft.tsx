"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ABI } from "@/lib/constants";
import { Achievement } from "@/lib/interfaces";
import { truncateMiddle } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
// import Image from "next/image";
import Image from "@/components/ui/image";
import { postServer } from "@/lib/data/postRequest";
import { useEffect, useState } from "react";
import { Address, useContractRead } from "wagmi";
import NftListItem from "../card/nft-list-item";
import DisplayNFTModal from "./display-nft-modal";

interface IDisplayNFTProps {
  details: Achievement;
  contract?: string;
  showSelect?: boolean;
  lang?: any;
  showMintButton: boolean;
  blockRequest?: boolean
}

export default function DisplayNFT({
  details,
  contract,
  showSelect,
  lang,
  showMintButton,
  blockRequest
}: IDisplayNFTProps) {

  if (showSelect) {
    return <NftListItem item={details} showSelect={showSelect} lang={lang} />;
  }
  return (
    <Dialog>
      <DialogTrigger className="min-w-[150px] w-full grow">
        <NftListItem item={details} showSelect={showSelect} lang={lang} />
      </DialogTrigger>
      <DisplayNFTModal details={details} contract={contract} showSelect={showSelect} lang={lang} showMintButton={showMintButton} blockRequest={blockRequest}/>     
    </Dialog>
  );
}
