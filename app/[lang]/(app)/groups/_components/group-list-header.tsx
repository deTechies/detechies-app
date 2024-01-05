"use client"
import OnlySearch from "@/components/extra/only-search";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function GroupListHeader() {
  const searchParams = useSearchParams()!
  
  const router = useRouter()
  const pathname = usePathname()

  const filter = searchParams.get('filter')
 
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
 
  return (
    <div className="flex flex-col w-full items-center max-w-xl mx-auto">
        <header className="flex flex-col gap-1 text-center">
            <h2 className="text-heading_s text-text-secondary">간단하게 그룹에 가입요청하고</h2>
            <h3 className="text-heading_s">캐릭터 NFT와 수상 NFT를 받아보세요!</h3>
        </header>
      <section className="flex gap-2 mt-5 text-title_s">
      <button
      onClick={() => {
        if(filter === 'me') {
          router.push(pathname)
          return;
        }
        router.push(pathname + '?' + createQueryString('filter', 'me'))

      }}
          className="flex items-center gap-4 bg-background-layer-1 text-text-secondary rounded-md py-3 px-3"
        >
          {
            filter === 'me' ? 
            "All Groups" : "My Groups"
          }
        </button>
        <Link
          href="/groups/create"
          className="flex items-center gap-4 bg-accent-secondary py-3 px-3 rounded-md text-accent-primary"
        >
          Create New
        </Link>
      
      </section>
        <div className="w-full my-10">
            <OnlySearch placeholder="Search for groups" />    
        </div>
    </div>
  );
}
