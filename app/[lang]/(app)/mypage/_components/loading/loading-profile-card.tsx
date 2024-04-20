import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProfileCard() {
  return (

    <div className="flex flex-col justify-center gap-10">
      <Skeleton className="h-24 w-24 rounded-full animate-pulse" />
    </div>
  )
}
