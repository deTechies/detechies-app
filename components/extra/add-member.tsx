"use client";


import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { defaultAvatar } from "@/lib/constants";

import { inviteProjectMembers } from "@/lib/data/project";
import useFetchData from "@/lib/useFetchData";
import { Plus } from "lucide-react";
import Loading from "../loading";
import { Badge } from "../ui/badge";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import PersonItem from "./add-member-item";
import Search from "./search";


export default function AddMemberModal({type}:{type?: string}) {
  const searchParams = useSearchParams()!

  const { address } = useParams();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const search = searchParams.get("search");
  const selected = searchParams.get("selected");
  const {data:members, loading, error} = useFetchData<any[]>("/users");

  const [isInviting, setIsInviting] = useState(false);


  useEffect(() => {
    if (!selected) return;
    setSelectedMembers(selected.split(","));
    
  }, [selected]);
  
  const inviteMembers = async () => {
    setIsInviting(true);
    const result = await inviteProjectMembers(selectedMembers, address as string);
    setIsInviting(false);
  }
  
  if(loading) return <Loading />
  if(error) return <div>{JSON.stringify(error)}</div>
  if(!members) return <div>No members found</div>
  //we can search it aswel
  const filteredData = search
  ? members.filter(item => 
    item.username.toLowerCase().includes(search.toLowerCase())
    ): members;
  
  
  
  return (
    <Dialog>
      <DialogTrigger>
        <Badge variant="secondary" className="cursor-pointer text-sm font-normal py-2 px-4">
         Invite <Plus size={16} className="inline-block ml-2" />
        </Badge>
      </DialogTrigger>

        <DialogContent>
          <h5 className="text-muted-foreground text-md my-4">
            Turn on switch of member if you want to invite
          </h5>
          <section className="flex flex-col gap-4">
            <Search placeholder="Search for members" />

            <div className="rounded-sm h-[30vh] overflow-x-auto my-4">
              {filteredData && filteredData.map((member: any, index: number) => (
                <PersonItem
                  key={index}
                  src={member.nft ? member.nft : defaultAvatar}
                  alt="Picture of the author"
                  name={member.display_name}
                  job={member.tba}
                  tba={member.id}
                />
              ))}
            </div>
          </section>
          <div className="flex justify-end gap-4 mt-4">
          <DialogClose asChild>
          <Button variant={"secondary"} >
              Cancel
            </Button>
          </DialogClose>
           
            <Button
              onClick={inviteMembers}
              disabled={isInviting}
            >Invite ({selectedMembers.length})</Button>
          </div>
        </DialogContent>
      
    </Dialog>
  );
}

