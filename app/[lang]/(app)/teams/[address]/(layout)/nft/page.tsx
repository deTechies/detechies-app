import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import NftList from "./nft-list";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string; lang: Locale };
}) {
  const { data: achievements } = await serverApi(
    `/achievement/club/${params.address}`
  );


  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <NftList
      achievements={achievements}
      lang={dictionary}
    />
  );
}
