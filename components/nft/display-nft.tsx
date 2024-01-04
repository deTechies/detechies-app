"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { requestAchievement } from "@/lib/data/achievements";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import NftListItem, { NFTItem } from "../card/nft-list-item";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
export default function DisplayNFT({
  details,
  showSelect,
}: {
  details: NFTItem;
  showSelect?: boolean;
}) {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [showFull, setShowFull] = useState(false);
  const [showingImage, setShowingImage] = useState("");

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

  const handleRequestNFT = async () => {
    //@ts-ignore
    setRequesting(true);
    
    const result = await requestAchievement(details.id);
    
    //TODO: update message
    toast({
      title: 'requesting nft', 
      description: <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    })

    setRequesting(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="min-w-[150px] w-full grow max-w-[229px]">
        <NftListItem item={details} showSelect={showSelect} />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 max-w-[504px]">
        <div className="text-subhead_m">{details.name}</div>

        <div className="flex flex-col gap-4">
          <div className="relative object-scale-down w-full rounded-sm aspect-square bg-gradient-to-b from-state-info to-accent-primary">
            <Image
              src={DEFAULT_IPFS_URL + showingImage}
              alt={details.name}
              fill={true}
              className="rounded-sm"
            />

            <Button
              className="absolute w-12 h-12 bottom-2 right-2"
              onClick={onClickChangeImage}
            >
              Hi!
            </Button>
          </div>
          <div className="max-w-md p-0 border rounded-sm border-border-div">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
              <div className="text-label_m text-text-secondary ">NFT 유형</div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">
                  {details.nft_type == "sbt" ? "커리어" : "한정판"}
                </span>

                {/* <Badge variant="info" shape="category">
                  언어 인증서
                </Badge> */}
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-b border-border-div">
              <div className="text-label_m text-text-secondary ">NFT 속성</div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">
                  {details.avatar && details.image
                    ? "아바타 + 증명서"
                    : details.avatar
                    ? "아바타"
                    : "증명서"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-label_m text-text-secondary ">발행자</div>

              <div className="flex items-center gap-2 overflow-auto text-right">
                <span className="text-title_m">그룹 이름</span>
              </div>
            </div>

          </div>

          <div className="p-4 rounded-sm bg-background-layer-2">
            <div className="flex justify-between">
              <span className="mb-4 text-title_m">NFT 설명</span>

              <button
                onClick={() => {
                  setShowFull(!showFull);
                }}
                className="flex items-center gap-2 p-0 text-label_m text-text-secondary w-fit h-fit"
              >
                {showFull ? "hide" : "show_more"}
                {showFull ? <ChevronUp size="12" /> : <ChevronDown size="12" />}
              </button>
            </div>

            <p className={`text-body_m ${!showFull && "line-clamp-2"}`}>
              {details.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant={"secondary"}>다음에 할래요</Button>
          <Button onClick={handleRequestNFT}>발행 요청</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
