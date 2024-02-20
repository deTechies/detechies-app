import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilesLoading() {
  return (
    <main className="flex flex-col w-full gap-6">
      <Skeleton className="w-full h-8" />

      <ProfilesLoading />
    </main>
  );
}
