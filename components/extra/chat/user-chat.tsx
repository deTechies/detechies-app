import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Address } from "wagmi";
import PushChat from "./push-chat";

export default function UserChat({ to }: { to: Address }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"primary"}
          size={"square"}
          className="w-full py-2 text-label_m text-center justify-center rounded-[6px] "
        >
          <MessageCircle size="16" className="inline-block" />
          <span className="ml-2">Start Chatting</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[60vw]">
        <PushChat chatTo={to} />
      </DialogContent>
    </Dialog>
  );
}
