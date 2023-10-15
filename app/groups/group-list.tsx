"use client";
import Error from "@/components/screens/error";
import Loading from "@/components/screens/loading";
import useFetchData from "@/lib/useFetchData";
import GroupListItem from "./group-list-item";

export default function GroupList() {
  const { data, loading, error } = useFetchData<any[]>(`/group/all`);

  if (loading) return <Loading />;
  if (error) return <Error message="error" />;
  return <div className="w-full grid grid-cols-2 gap-8">
    {
      data && data.map((group: any, key:number) => {
        return <GroupListItem key={key} details={group} />
      })
    }
  </div>;
}

