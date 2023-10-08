import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import React from 'react'
import MyGroups from './my-groups'

export default function GroupsLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="m-12 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1600px]">
        <section className="flex-col gap-4 ">
            <h1>My Groups</h1>
            <MyGroups />
            <Link href="/groups/create" className="bg-accent-secondary text-accent-on-secondary rounded-md py-4 justify-center flex gap-4">
                <PlusIcon /> Create Group
            </Link>
        </section>
        <section className="sm:col-span-1 md:col-span-2 xl:col-span-3 flex items-stretch flex-grow flex-col gap-4">
            {children}
        </section>
    </main>
  )
}
