"use client"
import { useSearchParams } from "next/navigation";
import GroupListItem from "./group-list-item";

//TODO: Add type dependency
export default function GroupList({
  groups} : {groups: any[]}) {
  
  const searchParams = useSearchParams()!
  const filter = searchParams.get('filter')
  
  
  if(filter === 'me') {
    groups = groups.filter(group => group.isUserMember)
  }
  
  
  return <div className="w-full grid md:grid-cols-3 gap-5 items-stretch">

    { 
      groups.map((group: any, key:number) => {
        return <GroupListItem key={key} details={group} />
      })
    }
  </div>;
}

