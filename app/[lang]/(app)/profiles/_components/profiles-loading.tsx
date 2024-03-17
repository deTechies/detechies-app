import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilesLoading() {
  return (
    <div className="grid  w-full items-stretch gap-md mb-10 sm:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
    {/* <loop through profile */}
      {Array(10)
        .fill(0)
        .map((profile: any, index) => (
          <Skeleton key={index} className="h-[140px] w-full" />
        ))}
    </div>
  );
}
