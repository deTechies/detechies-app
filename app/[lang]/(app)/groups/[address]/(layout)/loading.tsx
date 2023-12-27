import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingProfileDetails() {
  return (
    <div className="flex flex-col gap-8">
        <Skeleton className="animate-pulse bg-neutral-100 dark:bg-neutral-600 w-full h-64" />
        <Skeleton className="animate-pulse bg-neutral-100 dark:bg-neutral-600 w-full h-64" />
        <Skeleton className="animate-pulse bg-neutral-100 dark:bg-neutral-600 w-full h-64" />
    </div>
  )
}
