"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AchievementLink({address}: {address: string}) {
  return (
    address && <Link  href={{
        pathname: `/nft/create/${address}`
      }}
      replace>
          <Badge 
            className="cursor-pointer" 
            variant={"accent"}
          >
           Create Achievement
          </Badge>
        </Link>
  )
}
