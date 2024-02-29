import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { MessagesSquare } from "lucide-react";
import { Address } from "wagmi";
import PushChat from "./push-chat";

export default function UserChat({ to }: { to: Address }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Badge
          variant={"info"}
          className="w-full py-2 text-label_m text-center justify-center rounded-[6px] "
        >
          <MessagesSquare size="16" className="inline-block mr-2" />
          Send Message
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:w-[60vw]">
        <PushChat chatTo={to} />
      </DialogContent>
    </Dialog>
  );
}
