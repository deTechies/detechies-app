import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getUserProfile } from "@/lib/data/user";
import Image from "next/image";

export default async function Profile({ text }: { text: any }) {
  const profile = await getUserProfile();
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex">
        <div>
          <Image
            src={
              profile?.avatar
                ? profile.avatar
                : "https://ipfs.io/ipfs/bafybeiaw4okk76pbpihg4tyfnrufkizy4f6y2g3xlbisvq6zk5xxuhrrju"
            }
            width={120}
            height={120}
            className=" rounded-sm bg-background-layer-2"
            alt={"avatar"}
          />
        </div>

        <div className="flex flex-col justify-between basis-auto ml-4">
          <div className="flex flex-col gap-3">
            <p className="text-title_l"># {profile.display_name}</p>
            <span className="text-title_m">{profile.profile_details?.full_name}</span>
          </div>
          <Button variant={"secondary"} size="sm">{text?.avatar_settings}</Button>
        </div>
      </div>

      <div className="grid px-5 py-3  border rounded-sm border-border-div">
        <div className="flex p-1">
          <div className="basis-1/2 gap-2">
            <p className="text-subhead_s font-semibold">2,334</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.following}
            </p>
          </div>
          <div className="basis-1/2">
            <p className="text-subhead_s font-semibold">15</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.followers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid border rounded-sm border-border-div">
        <div className="flex justify-between p-5 items-center">
          <div className="flex items-center">
            <figure className="flex items-center justify-center w-8 h-8 mr-2 bg-background-layer-2 rounded-full">
              <Image
                src={"/icons/token.png"}
                width={20}
                height={20}
                className="aspect-square"
                alt={"eth"}
              />
            </figure>
            <h4 className="text-title_m"> CZN {text?.token}</h4>
            
          </div>
          <h5 className="text-title_m mr-4 ">{profile?.credits }</h5>
        </div>
      </div>
    </Card>
  );
}