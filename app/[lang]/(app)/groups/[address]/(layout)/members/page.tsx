import MemberCard from "@/components/card/member-card";
import Search from "@/components/extra/search";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { getClub } from "@/lib/data/groups";
import { ClubMember } from "@/lib/interfaces";
import { Address } from "wagmi";
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

export default async function GroupMember({
  params,
  searchParams,
}: {
  params: { address: string; lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await getClub(params.address);

  const searchItem = searchParams.search as string;

  const dictionary = (await getDictionary(params.lang)) as any;

  let filteredData = data.members?.filter((item: any) => {
    if (!searchItem) return true;

    return item.user.display_name
      ?.toLowerCase()
      .includes(searchItem.toLowerCase());
  });

  return (
    <div className="max-w-[90vw]">
      <div className="max-w-[500px] mx-auto mb-8">
        <Search
          placeholder={dictionary.group.details.members.search_placeholder}
        />
      </div>

      <div className="grid items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredData &&
          filteredData.map((item: ClubMember, index: any) => {
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
      </div>
      
      {filteredData < 1 && (
        <div className="pt-5 pb-10 text-center text-subhead_s text-text-secondary">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
