import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilesLoading() {
  return (
    <div className="grid grid-cols-2 gap-4 ">
      {/* <loop through profile */}
      {Array(10)
        .fill(0)
        .map((profile: any, index) => (
          <Skeleton key={index} className="h-[140px] w-full" />
        ))}
    </div>
  );
}
