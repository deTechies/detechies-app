"use client";
import Search from "@/components/extra/search";
import GroupList from "./group-list";

export default function GroupPage() {
  return (
    <main className="flex flex-col gap-8 w-full max-w-6xl m-12">
      <Search placeholder="Search for groups" />

      <GroupList />
    </main>
  );
}
