import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserProfile } from "@/lib/data/user";
import { MailQuestion } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Garderobe from "./avatar/garderobe";

export async function PopoverEvent() {
  const { data: user } = await getUserProfile();

  //check if user is member of club named deTechies
  //if yes, return null
  //if no, return the following

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10 fixed right-5 bottom-5">
        <Button
          variant="primary"
          size={"icon_circle"}
          className="outline outline-accent-primary"
        >
          <MailQuestion size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow mr-5 p-8 max-w-[500px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-heading_s">Community Channels</h3>
            <p className="text-text-secondary text-body_s">
              Follow us on social media to get the latest updates on deTecheis
              and be rewarded with a unique NFT!
            </p>
          </div>
          <div className="flex gap-4 flex-col ">
            <Garderobe />

            <div className="grid grid-cols-3 gap-4">
              <Link href="https://x.com/detechies" target="_blank" passHref>
                <div className="flex flex-col items-center justify-center gap-2 border border-text-primary hover:bg-[#afafb2] p-3 rounded-sm">
                  <Image
                    src="/images/socials/color/twitter.png"
                    width={32}
                    height={32}
                    alt="twitter_icon"
                  />
                </div>
              </Link>
              <Link
                href="https://t.me/detechies/1"
                target="_blank"
                passHref
              >
                <div className="flex flex-col items-center justify-center gap-2 border border-[#A9C9DD] hover:bg-[#A9C9DD] p-3 rounded-sm">
                  <Image
                    src="/images/socials/color/telegram.png"
                    width={32}
                    height={32}
                    alt="twitter_icon"
                  />
                </div>
              </Link>
            </div>
            
            <div>
              <Button variant="primary" className="w-full">
                Purchase
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
