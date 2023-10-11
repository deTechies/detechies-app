"use client";
import Error from "@/components/screens/error";
import Loading from "@/components/screens/loading";
import { Card } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";
import Link from "next/link";

export default function GroupList() {
  const { data, loading, error } = useFetchData<any[]>(`/group/all`);

  if (loading) return <Loading />;
  if (error) return <Error message="error" />;
  return <div className="grid grid-cols-2 gap-2">
    {
      data && data.map((group: any, key:number) => {
        return <GroupItem key={key} group={group} />
      })
    }
  </div>;
}


export const GroupItem = ({ group }: { group: any }) => {
  return (
    <Link href={`/groups/${group.addr}`}>
    <Card>
      <h1>{group.name}</h1>
      <div>{group.description}</div>
      <div>{group.image}</div>
      <span>{group.creator}</span>
    </Card>
    </Link>
  );
}
