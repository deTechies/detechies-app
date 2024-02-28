import UserChat from "@/components/extra/chat/user-chat";
import Avatar from "@/components/metronic/avatar/avatar";
import { serverApi } from "@/lib/data/general";
import { addURL, getTimezone } from "@/lib/utils";
import { Briefcase, Euro, MapPin } from "lucide-react";
import { Address } from "viem";

export default async function UserProfileHeader({
  userWallet,
}: {
  userWallet: string;
}) {
  const { data: user } = await serverApi(`/users/${userWallet}`);

  console.log(user);
  return (
    <div className="flex flex-col">
    <header className=" w-full gap-2 justify-center text-center bg-center	 bg-[url('/images/header-hex.png')]  ">
      <div className="flex flex-col gap-2 mx-auto ">
        <div className="mx-auto">
          <Avatar
            src={addURL(user.avatar_link)}
            shape="rounded"
            className="border-2 border-accent-primary"
            size={32}
          />
        </div>

        <div>
          <h1 className="text-subhead_m text-text-primary">
            {user.display_name}
          </h1>
        </div>
        <div className="flex gap-4 divide-x  text-text-secondary mx-auto">
          {user.profile_details?.hourly_rate && (
            <div className="flex gap-2 justify-center items-center">
              <Euro />
              <span className="text-label_m">
                {user.profile_details?.hourly_rate}
              </span>
            </div>
          )}
          {user.profile_details?.timezone && (
            <div className="flex gap-2 justify-center items-center pl-3">
              <MapPin />
              <span className="text-label_m">
                {getTimezone(user.profile_details.timezone)}
              </span>
            </div>
          )}
          {user.profile_details?.availability && (
            <div className="flex gap-2 justify-center items-center pl-3 text-text-secondary">
              <Briefcase />
              <span className="text-label_m">
                {user.profile_details?.availability}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
    <div className="w-full border-b pb-2 flex justify-between">
      <div>
        <h5 className="">Projects</h5>
      </div>
      <UserChat to={userWallet as Address} />
    </div>
    </div>
  );
}
