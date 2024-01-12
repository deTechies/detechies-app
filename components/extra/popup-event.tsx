import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { MailQuestion, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PopoverEvent() {
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
      <PopoverContent className="w-sm mr-5 p-4">
        <div className="flex flex-col gap-4">
          <div className="text-title_s">Careerzen</div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <Twitter />
              <Link href="https://x.com/careerzen" target="_blank">
                Twitter 
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Image 
                src="/images/icons/colored/twitter.png"
                width={24}
                height={24}
                alt="twitter_icon"
                />
              <Link href="https://x.com/careerzen" target="_blank">
                Kakao
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Twitter />
              <Link href="https://x.com/careerzen" target="_blank">
                Twitter space
              </Link>
            </div>
          </div>
          <Link href="https://x.com/careerzen" target="_blank">
            Twitter space
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
