import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function ManageTeamLayout({children, params}: {children: any, params: any}) {
  return (
    <div className="flex flex-col gap-md">
        <div className="flex flex-row gap-md">
            <Link href={`/teams/${params.address}/manage`}
                className=""
            >
                <Button variant="secondary" size="sm">
                    NFTs
                </Button>
            </Link>
            <Link href={`/teams/${params.address}/manage/members`}>
                <Button variant="secondary" size="sm">
                    Members
                </Button>
            </Link>
            <Link href={`/teams/${params.address}/manage/missions`}>
                <Button variant="secondary" size="sm">
                    Missions
                </Button>
            </Link>
        </div>
        <Suspense fallback={<span>Loading...</span>}>
            {children}
        </Suspense>
    </div>
  )
}