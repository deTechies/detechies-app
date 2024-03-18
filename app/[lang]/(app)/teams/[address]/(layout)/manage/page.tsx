import { Button } from "@/components/ui/button";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n.config";
import { serverApi } from "@/lib/data/general";
import Link from "next/link";
import ManageNft from "./manage-nft";

export default async function GroupDetailManageLayout({
  params,
  searchParams,
}: {
  params: { address: string; lang: Locale };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data: club } = await serverApi(`/clubs/${params.address}`);
  const { data: missions } = await serverApi(`/mission/campaign/${club.id}`);
  const dictionary = (await getDictionary(params.lang)) as any;


  return (
    <div className="flex flex-col gap-md">

            <div className="flex items-start gap-3 grow">
              <Link
                href={`/teams/${params.address}/create/nft`}
                className="max-w-[212px] grow rounded-full"
              >
                <Button size="sm" variant="primary" className="w-full">
                  Create Achievement
                </Button>
              </Link>

             
            </div>

      <ManageNft details={club} lang={dictionary} />

     {/*  <ManageMission details={club} missions={missions} lang={dictionary} />

      <GroupSettings />
      <ManageContracts /> */}
    </div>
  );
}
