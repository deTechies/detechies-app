
import { DEFAULT_AVATAR_LINK } from "@/lib/constants";

import { formatTimestampToTimeAgo } from "@/lib/utils";
import { Heart, MessageText } from "detechies-icons";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Replies from "./replies";

export default function Post({ details }: { details: any }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center">
          <Avatar className="bg-yellow-300">
            <AvatarImage src={DEFAULT_AVATAR_LINK} alt="avatar" />
          </Avatar>
          <div className="ml-2">
            <h2 className="text-lg font-semibold">Anonymous</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {formatTimestampToTimeAgo(details.timestamp)}
            </p>
          </div>
        </div>
        <p className="mt-4">{details.payload.message}</p>
        <div className="w-full flex gap-2 border-b border-dashed border-t py-1">
          <Badge
            className="text-primary shrink-0 inline-flex"
            variant={"accent"}
          >
            <div className="flex gap-1 items-center">
              <MessageText className="w-4 h-4 " />
              <span>2 Comments</span>
            </div>
          </Badge>
          <Badge className="text-gray-900 flex ">
            <div className="flex items-center gap-1">
              <Heart />
              <span>0 likes</span>
            </div>
          </Badge>
        </div>

        <Replies topic={`/detechies/1/replies-${details.payload.id}/proto`} />
      </CardContent>
    </Card>
  );
}
