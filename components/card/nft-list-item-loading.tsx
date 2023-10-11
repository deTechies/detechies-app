import { Skeleton } from "@/components/ui/skeleton";

export default function NftListItemLoading() {
  return (
    <div
      className={`rounded-sm shadow-custom bg-white p-0 min-w-[150px] my-4 `}
    >
      <Skeleton className="w-[150px] aspect-square m-0 bg-red h-150" />
       
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="truncate text-black text-center hover:text-green-800 font-medium h-10 w-full" />
        <Skeleton color="green h-10 w-[100px]" />
      </div>
    </div>
  );
}
