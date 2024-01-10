import MemberCard from "@/components/card/member-card";
import Search from "@/components/extra/search";
import { Address } from "wagmi";
import { getClub } from "@/lib/data/groups";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  username: string;
  avatar: string;
  organisation: string;
  image: string;
  industry: string;
}

export interface Member {
  memberId: Address;
  role: string;
  status: any;
  created_at: string;
  verified: boolean;
  user: any;
}

export default async function GroupMember({
  params,
  searchParams,
}: {
  params: { address: string; lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getClub(params.address);

  const searchItem = searchParams.search as string;

  const dictionary = (await getDictionary(params.lang)) as any;

  let filteredData = data.members?.filter((item: any) => {
    if (!searchItem) return true;

    return item.user.display_name
      ?.toLowerCase()
      .includes(searchItem.toLowerCase());
  });

  return (
    <div className="overflow-auto max-w-[90vw]">
      <div className="max-w-[500px] mx-auto mb-8">
        <Search
          placeholder={dictionary.group.details.members.search_placeholder}
        />
      </div>

      <div className="grid items-stretch gap-4 grid-cols:2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {filteredData &&
          filteredData.map((item: Member, index: any) => {
            if (index > 4) {
              return;
            }
            return (
              <MemberCard
                address={item.memberId}
                info={item.user}
                key={index}
                isOwner={data.owner == item.user.wallet}
                lang={dictionary}
              />
            );
          })}
        {filteredData < 1 && (
          <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
