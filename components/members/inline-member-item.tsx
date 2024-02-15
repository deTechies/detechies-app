import { defaultAvatar } from "@/lib/constants";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import IPFSImageLayer from "../ui/layer";

interface MemberListDetails {
  memberId: string;
  display_name: string;
  avatar?: string[];
  role?: string;
  active?: boolean;
  info?: any;
}

export default function InlineMemberItem({
  avatar,
  display_name,
  role,
  active = false,
  info,
}: MemberListDetails) {
  if (!display_name)
    return (
      <div className="flex items-center py-4">
        <Avatar className="w-10 h-10">
          <IPFSImageLayer hashes={avatar? avatar : defaultAvatar} />
        </Avatar>

        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Unknown</p>
          <p className="text-sm text-muted-foreground">Unknown</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant="outline" shape="outline_sm">
            Member
          </Badge>
        </div>
      </div>
    );

  return (
    <div
      className={`flex items-center hover:bg-accent-secondary hover:text-accent-primary rounded-[4px] py-4 ${
        active && "bg-accent-secondary"
      }`}
    >
      <Avatar className="w-10 h-10">
        <IPFSImageLayer hashes={avatar ? avatar : defaultAvatar} />
      </Avatar>

      <div className="flex flex-col items-start gap-2 ml-4">
        <span className="text-title_s test-start">{display_name}</span>

        <Badge variant="outline" shape="outline_sm">
          {info.profile_details?.profession
            ? info.profile_details.profession
            : "미설정"}
        </Badge>
      </div>
    </div>
  );
}
