import { Card, CardContent, CardHeader } from "@/components/metronic/card/card";
import CardMemberItem from "@/components/metronic/custom/card/card-member-item";
import { Button } from "@/components/ui/button";
import { } from "@/components/ui/card";
import { serverApi } from "@/lib/data/general";
import Link from "next/link";

export default async function GroupMember({
  address,
  isCreator,
  lang,
}: {
  address: any;
  isCreator?: boolean;
  lang: any;
}) {
  const { data: clubInfo } = await serverApi(`/clubs/${address}`);

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-between">
        <h3>{lang.group.details.about.latest_member}</h3>
        {/* <h3 className="text-subhead_s">Members ({members?.length})</h3> */}
        <Link href={`/groups/${address}/members`} passHref>
          <Button size="sm" variant="secondary">
            {lang.group.details.about.all}
          </Button>
        </Link>
        {/* {
          isCreator && <Link href={pathName + '/members'}>Manage</Link>
        } */}
      </CardHeader>

      <CardContent>
        {clubInfo.members &&
          clubInfo.members.map(
            (item: any, index: any) => {
              if (index > 4) {
                return;
              }
              return <CardMemberItem key={index} details={item}/>;
            }

            // item.tokenboundAccount && (
            //   <MemberCard address={getAddress(item.address)} key={index} />
            // )
          )}
      </CardContent>
    </Card>
  );
}
