import { DEFAULT_AVATAR } from "@/lib/constants";
import { formatTimestampToTimeAgo } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function Reply({details}: {details: any}) {
  return (
    <div className="flex gap-2.5">
        <Avatar className="bg-success-clarity">
            <AvatarImage src={DEFAULT_AVATAR} alt="avatar" />
        </Avatar>
        <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-1">
            <h2 className="text-sm font-semibold">Anonymous</h2>
            <p className="text-sm text-gray-600">
                {formatTimestampToTimeAgo(details.timestamp)}
            </p>
        </div>
        <span className="text-2mdt text-gray-700">
            {details.payload.message}
        </span>
        </div>
    </div>
  )
}
