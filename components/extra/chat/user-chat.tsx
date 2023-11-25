
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SendIcon } from "lucide-react";

import { Address } from "wagmi";
import PushChat from "./push-chat";

export default function UserChat({to} : {to: Address}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant={"accent"} className="text-md py-3 w-full text-center justify-center font-medium">
            <SendIcon size="16" className="inline-block mr-2" />
        Chat
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:w-[60vw]">
        <PushChat chatTo={to} />
        </DialogContent>
    </Dialog>
  )
}
 