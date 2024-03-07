
import Avatar from "@/components/metronic/avatar/avatar";
import { addURL, getTimezone } from "@/lib/utils";
import { Home2 } from "detechies-icons";
import { Briefcase, Clock } from "lucide-react";

export default function ViewProfileCard({ dictionary, profile }: any) {
 
  
  return (
    <div className="flex flex-col gap-10">
    <header className=" w-full gap-2 justify-center text-center bg-center	 bg-[url('/images/header-hex.png')]  ">
      <div className="flex flex-col gap-3.5 mx-auto  py-10">
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
        <div className="flex gap-4 divide-x  text-text-secondary mx-auto">
          {profile.profile_details?.hourly_rate && (
            <div className="flex gap-2 justify-center items-center">
                <Clock fontSize={24} color="#6B7684" />
                <span className="text-label_m">
                {profile.profile_details?.hourly_rate}
              </span>
            </div>
          )}
          {profile.profile_details?.timezone && (
            <div className="flex gap-2 justify-center items-center pl-3">
              <Home2 fontSize={24} color="#6B7684 "/>
              <span className="text-label_m">
                {getTimezone(profile.profile_details.timezone)}
              </span>
            </div>
          )}
          {profile.profile_details?.availability && (
            <div className="flex gap-2 justify-center items-center pl-3 text-text-secondary">
              <Briefcase color="#6B7684" />
              <span className="text-label_m">
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

