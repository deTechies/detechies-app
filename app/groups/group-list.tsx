"use client";
import Error from "@/components/screens/error";
import Loading from "@/components/screens/loading";
import { Card } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";

export default function GroupList() {
  const { data, loading, error } = useFetchData(`/group/all`);

  if (loading) return <Loading />;
  if (error) return <Error message="error" />;
  return <Card>
    
    DatA: 
    {JSON.stringify(data)}
  </Card>;
}
