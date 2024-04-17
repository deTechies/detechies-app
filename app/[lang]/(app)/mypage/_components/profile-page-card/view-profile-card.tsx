
import Avatar from "@/components/metronic/avatar/avatar";
import { addURL, getTimezone } from "@/lib/utils";
import { BrifecaseTimer, Geolocation, Tag } from "detechies-icons";

export default function ViewProfileCard({ dictionary, profile }: any) {
 
  
  return (
    <div className="flex flex-col gap-10">
    <header className="w-full py-10 gap-2 justify-center text-center bg-center bg-[url('/images/header-hex.png')]  ">
      <div className="flex flex-col gap-3.5 mx-auto">
        <div className="mx-auto">
          <Avatar
            src={addURL(profile.avatar_link)}
            shape="rounded"
            className="border-[3px] border-accent-primary"
            size={32}
          />
        </div>

        <div>
          <h1 className="text-lg tracking-tighter font-semibold text-text-primary">
            {profile.display_name}
          </h1>
        </div>
        <div className="flex gap-[18px] text-gray-600 mx-auto">
          {profile.profile_details?.hourly_rate && (
            <div className="flex gap-[5px] justify-center items-center">
              <Tag fontSize={18} />
                <span className="text-md">
                {profile.profile_details?.hourly_rate}
              </span>
            </div>
          )}
          {profile.profile_details?.timezone && (
            <div className="flex gap-[5px] justify-center items-center pl-3">
              <Geolocation fontSize={18}/>
              <span className="text-md">
                {getTimezone(profile.profile_details.timezone)}
              </span>
            </div>
          )}
          {profile.profile_details?.availability && (
            <div className="flex gap-[5px] justify-center items-center pl-3 text-text-secondary">
              <BrifecaseTimer fontSize={18}  />
              <span className="text-md">
                {profile.profile_details?.availability}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
    </div>
  );
}

