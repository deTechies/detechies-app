import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";

export default function UserProfile({
    profile,
    text,
    }: {
    profile: any;
    text: any;
    }) {
    return (
        <Card className="flex flex-col gap-5 w-[328px]">
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-square rounded-md bg-background-layer-2">
          <IPFSImageLayer hashes={profile.avatar ? profile.avatar : defaultAvatar} />
        </div>
        <div className="flex flex-col justify-between basis-auto ml-4">
          <div className="flex flex-col gap-3">
            <p className="text-title_l"># {profile.display_name}</p>
          </div>
        </div>
      </div>

      <div className="grid px-5 py-3  border rounded-sm border-border-div">
        <div className="flex p-1">
          <div className="basis-1/2 gap-2">
            <p className="text-subhead_s font-semibold">0</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.following}
            </p>
          </div>
          <div className="basis-1/2">
            <p className="text-subhead_s font-semibold">0</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.followers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid border rounded-sm border-border-div">
        <div className="flex justify-between p-5 items-center">
          <div className="flex items-center mr-4 text-nowrap">
            {text?.address}
          </div>
          <a
            href={`https://polygonscan.com/address/${profile.wallet}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Badge>
              {profile.wallet.slice(0, 5) + "..." + profile.wallet.slice(-4)}
            </Badge>
          </a>
        </div>
      </div>
    </Card>
    );

    };
