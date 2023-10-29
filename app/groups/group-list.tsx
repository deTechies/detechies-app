"use client";
import Error from "@/components/screens/error";
import Loading from "@/components/screens/loading";
import useFetchData from "@/lib/useFetchData";
import { useSearchParams } from "next/navigation";
import GroupListItem from "./group-list-item";

export default function GroupList() {
  const { data, loading, error } = useFetchData<any[]>(`/group/all`);
  const searchParams = useSearchParams()!;
  const search = searchParams.get("search");
  if (loading) return <Loading />;
  if (error) return <Error message="error" />;
  if(!data) return <div>No groups found</div>
  
  
  const filteredData = search
  ? data.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
    ): data;
  
  
  
  return <div className="w-full grid md:grid-cols-2 gap-4 items-stretch">
    {
      filteredData && filteredData.map((group: any, key:number) => {
        return <GroupListItem key={key} details={group} />
      })
    }
  </div>;
}

