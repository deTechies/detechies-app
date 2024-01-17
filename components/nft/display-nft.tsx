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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
export default function DisplayNFT({
  details,
  contract,
  showSelect,
  lang,
}: {
  details: Achievement;
  contract?: string;
  showSelect?: boolean;
  lang?: any;
}) {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [showFull, setShowFull] = useState(false);
  const [showingImage, setShowingImage] = useState("");
  const { data, error } = useContractRead({
    address: contract as Address,
    abi: ABI.group,
    functionName: "achievementContract",
  });

  const DEFAULT_IPFS_URL = "https://ipfs.io/ipfs/";

  useEffect(() => {
    details.image
      ? setShowingImage(details.image)
      : setShowingImage(details.avatar);
  }, [details]);

  const onClickChangeImage = () => {
    if (!details.avatar || !details.image) {
      return;
    }

    showingImage == details.image
      ? setShowingImage(details.avatar)
      : setShowingImage(details.image);
  };

  const onClickContract = () => {
    if (!contract) {
      return;
    }

    //get the achievment contract
    console.log(data);

    window.open(
      `https://mumbai.polygonscan.com/nft/${data}/${details.tokenId}`,
      "_blank"
    );
  };

  const handleRequestNFT = async () => {
    setRequesting(true);
    const data = JSON.stringify({
      achievementId: details.id,
      message: "",
    });
    const result = await postServer("/achievement-rewards", data);
    if (result) {
      toast({
        title: "Congratulations!",
        description:
          "Please wait for the administrator to accept your nft request!",
      });
      setRequesting(false);

    }

  };

  if (showSelect) {
    return <NftListItem item={details} showSelect={showSelect} lang={lang} />;
  }
  return (
    <Dialog>
      <DialogTrigger className="min-w-[150px] w-full grow">
        <NftListItem item={details} showSelect={showSelect} lang={lang} />
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-6 max-w-[504px] pt-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-subhead_s">{details.name}</span>

          <Button variant="secondary" size="sm" onClick={onClickContract}>
            {contract ? truncateMiddle(contract, 13) : "no contract"}
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative object-scale-down w-full rounded-sm aspect-square bg-gradient-to-b from-state-info to-accent-primary">
            <Image
              src={DEFAULT_IPFS_URL + showingImage}
              alt={details.name}
              fill={true}
              className="rounded-sm"
            />

            {details.avatar && details.image && (
              <Button
                className="absolute w-12 h-12 bottom-2 right-2"
                onClick={onClickChangeImage}
                size="image"
              >
                <Image
                  src={
                    showingImage == details.avatar
                      ? "/icons/certificate.png"
                      : "/icons/avatar.png"
                  }
                  alt="avatar"
                  width="48"
                  height="48"
                ></Image>
              </Button>
            )}
          </div>
          <div className="max-w-md p-0 border rounded-sm border-border-div">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
              <div className="text-label_m text-text-secondary ">
                {lang.achievement.display_nft.nft_type}
              </div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">
                  {lang.interface.nft_type[details.nft_type]}
                </span>

                {details.nft_type == "sbt" && (
                  <Badge variant="info" shape="category">
                    {lang.interface.sbt_type[details.type]}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
              <div className="text-label_m text-text-secondary ">
                {lang.achievement.display_nft.nft_prop}
              </div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">
                  {details.avatar && details.image
                    ? lang.interface.nft_image_type["avatar+image"]
                    : details.avatar
                    ? lang.interface.nft_image_type.avatar
                    : lang.interface.nft_image_type.image}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-label_m text-text-secondary ">
                {lang.achievement.display_nft.publisher}
              </div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">
                  {lang.achievement.display_nft.group_name}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-background-layer-2">
            <div className="flex justify-between">
              <span className="mb-4 text-title_m">
                {lang.achievement.display_nft.nft_desc}
              </span>

              <button
                onClick={() => {
                  setShowFull(!showFull);
                }}
                className="flex items-center gap-2 p-0 text-label_m text-text-secondary w-fit h-fit"
              >
                {showFull
                  ? lang.achievement.display_nft.hide
                  : lang.achievement.display_nft.show_more}
                {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
              </button>
            </div>

            <p
              className={`text-body_m break-words ${
                !showFull && "line-clamp-2"
              }`}
            >
              {details.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"}>
              {lang.achievement.display_nft.close}
            </Button>
          </DialogClose>

          <Button onClick={handleRequestNFT}>
            {lang.achievement.display_nft.send_request}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
