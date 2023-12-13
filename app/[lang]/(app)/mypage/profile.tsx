import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getUserProfile } from "@/lib/data/user";
import Image from "next/image";

export default async function Profile({ text }: { text: any }) {
  const profile = await getUserProfile();
  return (
    <Card className="grid">
      <div className="flex">
        <div>
          <Image
            src={
              profile?.avatar
                ? profile.avatar
                : "https://ipfs.io/ipfs/bafybeiaw4okk76pbpihg4tyfnrufkizy4f6y2g3xlbisvq6zk5xxuhrrju"
            }
            width={100}
            height={100}
            className=" rounded-sm bg-background-layer-2"
            alt={"avatar"}
          />
        </div>

        <div className="flex flex-col justify-between basis-auto ml-2">
          <div>
            <p className="text-title_m">#{profile.display_name}</p>
          </div>
          <Badge className="text-title_s">{text?.avatar_settings}</Badge>
        </div>
      </div>

      <div className="grid px-5 py-3 mt-2 border rounded-sm border-border-div">
        <div className="flex p-1">
          <div className="basis-1/2 gap-2">
            <p className="text-subhead_s">2,334</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.following}
            </p>
          </div>
          <div className="basis-1/2">
            <p className="text-subhead_s">15</p>
            <p className="text-title_m text-text-secondary capitalize">
              {text?.followers}
            </p>
          </div>
        </div>
      </div>

      <div className="grid mt-2 border rounded-sm border-border-div">
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
