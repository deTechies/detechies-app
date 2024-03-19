import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function ManageTeamLayout({children, params}: {children: any, params: any}) {
  return (
    <div className="flex flex-col gap-md">
        <div className="flex flex-row gap-md justify-end">
            <Link href={`/teams/${params.address}/manage`}
                className=""
            >
                <Button variant="primary" size="sm">
                    NFTs
                </Button>
            </Link>
            <Link href={`/teams/${params.address}/manage/members`}>
                <Button variant="primary" size="sm">
                    Members
                </Button>
            </Link>
            <Link href={`/teams/${params.address}/manage/missions`}>
                <Button variant="primary" size="sm">
                    Missions
                </Button>
            </Link>
            <Link href={`/teams/${params.address}/manage/settings`}>
                <Button variant="primary" size="sm">
                    Settings
                </Button>
            </Link>
        </div>
        <Suspense fallback={<span>Loading...</span>}>
            {children}
        </Suspense>
    </div>
  )
}