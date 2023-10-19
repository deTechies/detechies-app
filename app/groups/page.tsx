"use client";
import Search from "@/components/extra/search";
import { Plus } from "lucide-react";
import Link from "next/link";
import GroupList from "./group-list";

export default function GroupPage() {
  return (
    <main className="flex flex-col gap-8 w-full max-w-6xl m-12">
      <div className="flex gap-4 w-full items-center">
        <Search placeholder="Search for groups" />
        <Link href="/groups/create" className="flex items-center gap-4 bg-accent-secondary py-3 px-3 rounded-sm text-accent-primary">
          <Plus className="w-6 h-6 text-accent-primary" />
          Create New
        </Link>
      </div>

      <GroupList />
    </main>
  );
}
