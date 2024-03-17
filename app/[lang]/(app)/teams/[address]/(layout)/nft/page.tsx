import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { Suspense } from "react";
import NftList from "./nft-list";

export default async function GroupAchievements({
  params,
}: {
  params: { address: string; lang: Locale };
}) {


  const dictionary = (await getDictionary(params.lang)) as any;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NftList address={params.address}  lang={dictionary} />
    </Suspense>
  );
}
