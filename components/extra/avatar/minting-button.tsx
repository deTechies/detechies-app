import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

export default function MintAvatar() {
  return (
    <Dialog>
      <DialogTrigger className=" w-full text-text-secondary text-sm hover:text-text-primary">
        <Button className="text-md w-full">Mint NFT</Button>
      </DialogTrigger>
      <DialogContent className="bg-background-layer-1 p-8">
        <section>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center gap-2 border border-text-primary hover:bg-[#afafb2] p-3 rounded-sm">
              <Image
                src="/images/socials/color/twitter.png"
                width={24}
                height={24}
                alt="twitter_icon"
              />
              <Link href="https://x.com/careerzen" target="_blank">
                Twitter
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border border-[#fbe948] p-3 rounded-sm hover:bg-[#fbe948]">
              <Image
                src="/images/socials/color/kakao.png"
                width={24}
                height={24}
                alt="twitter_icon"
              />
              <Link href="https://open.kakao.com/o/gGdZ76If" target="_blank">
                Kakao
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border border-[#A9C9DD] hover:bg-[#A9C9DD] p-3 rounded-sm">
              <Image
                src="/images/socials/color/telegram.png"
                width={24}
                height={24}
                alt="twitter_icon"
              />
              <Link href="https://t.me/Careerzen_org/1" target="_blank">
                Telegram
              </Link>
            </div>
          </div>
         
        </section>
      </DialogContent>
    </Dialog>
  );
}
