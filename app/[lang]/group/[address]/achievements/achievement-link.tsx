"use client"

import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function AchievementLink({address}: {address: string}) {
    const router = useRouter()
      const searchParams = useSearchParams()!

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )
  return (

          <Badge 
            className="cursor-pointer" 
            variant={"accent"}
            onClick={() => {

                router.push('/nft/create' + '?' + createQueryString('sort', 'asc'))
            }
            }
          >
           Create {address}
          </Badge>

  )
}
