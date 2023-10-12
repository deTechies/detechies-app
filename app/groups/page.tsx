"use client"
import Search from "@/components/extra/search";
import GroupList from "./group-list";


export default function GroupPage() {
  return (
    <main className="flex flex-col gap-8 max-w-[1600px] m-12">

        <Search placeholder="Search for groups"/>

    <section className="sm:col-span-1 md:col-span-2 xl:col-span-3 flex items-stretch flex-grow flex-col gap-4">
    <div>
        <GroupList />
    </div>
    </section>
</main>
   
  )
}
