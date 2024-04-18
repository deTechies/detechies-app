import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { smallDate } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

export interface PoolListItemProps {
  status: string;
  name: string;
  poolID:string;
  description: string;
  start_date: string;
  end_date: string;
  total: number;
}

export default function PoolListItem({
  details,
}: {
  details: PoolListItemProps;
}) {
  return (
    <Link href={`funds/${details.poolID}`} passHref legacyBehavior>
    <Card className="hover:scale-[1.01] cursor-pointer hover:border-b-primary hover:border-b-2"          >
      <CardContent className="flex flex-col gap-[30px]">
        <div className="flex justify-between items-center">
          <div className="w-[50px] h-[50px] flex items-center justify-center bg-gray-100 rounded-md">
            <Image src="/images/detechies.png" alt="pool" width={30} height={30} />
          </div>
          <Badge variant={"success"}>{details.status}</Badge>
        </div>
        <div className="flex flex-col gap-2.5">
          <h4 className="text-lg font-medium">{details.name}</h4>
          <h5 className="text-md text-gray-600">{details.description}</h5>
        </div>
        <div className="flex text-2sm flex-row gap-5">
          <div className="flex gap-1 items-center">
            <span className="text-gray-600">Start:</span>
            <span className="text-2xs">{smallDate(details.start_date)}</span>
          </div>
          <div className="flex flex-row text-2xs gap-1 items-center">
            <span className="text-gray-600">End:</span>
            <span className="text-2xs">{smallDate(details.end_date)}</span>
          </div>
        </div>
        <div>
          <Progress value={details.total} max={100} />
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}