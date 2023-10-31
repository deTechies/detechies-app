import useFetchData from "@/lib/useFetchData";
import { Address } from "viem";

export default function Followers({ address }: { address: Address }) {
  const { data: followers } = useFetchData<any[]>(
    `/polybase/followers/${address}`
  );
  const { data: following } = useFetchData<any[]>(
    `/polybase/following/${address}`
  );

  return (
    <div className="grid grid-cols-2 border border-border-div rounded-sm">
      {followers ? (
        <ProfileStat name="followers" value={followers.length} />
      ) : (
        "loading"
      )}
      {following ? (
        <ProfileStat name="following" value={following.length} />
      ) : (
        "loading"
      )}
    </div>
  );
}

export function ProfileStat({ name, value }: { name: string; value: number }) {
  return (
    <div className="flex flex-col p-4 px-6 ">
      <h3 className="text-primary font-bold text-xl">{value}</h3>
      <span className="text-primary/50 capitalize">{name}</span>
    </div>
  );
}
