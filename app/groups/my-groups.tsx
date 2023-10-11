"use client"

import Error from "@/components/screens/error";
import Loading from "@/components/screens/loading";
import NoData from "@/components/screens/no-data";
import { Card } from "@/components/ui/card";
import useFetchData from "@/lib/useFetchData";
import { useAccount } from "wagmi";

interface GroupItem {
    name: string,
    description: string,
    address: string
}

export default function MyGroups() {
    //what is the best and easiert way to do this? 
    //we getting the list of all the groups based on 
    const {address} = useAccount()
    //
    const {data, loading, error} = useFetchData<GroupItem[]>(`/group/me/${address}`);
    
    if(loading) return (<Loading />)
    if(error) return (<Error message="error" />);
    if(!data) return (<NoData />);

  return (
    <div className="overflow-x-scroll  flex flex-col gap-4 max-h-[80vh]">
        {
             data.length > 0 && data.map((group:GroupItem, index:number) => (
                <GroupItem key={index} group={group} />
            ))
        }
    </div>
  )
}


const GroupItem = ({group}: {group: GroupItem}) => {
    return (
        <Card className="flex flex-col space-y-4 gap-4">
            <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-2">
                    <div className="text-lg font-semibold">{group.name}</div>
                    <div className="text-sm">{group.description}</div>
                </div>
            </div>
        </Card>
    )
};