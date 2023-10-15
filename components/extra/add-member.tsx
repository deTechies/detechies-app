"use client";


import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, useContractWrite } from "wagmi";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import ModalLayout from "../user/modal-layout";

import { ABI } from "@/lib/constants";
import PersonItem from "./add-member-item";
import Search from "./search";

export default function AddMemberModal({type}:{type?: string}) {
  const searchParams = useSearchParams();
  const [members, setMembers] = useState([]);
  const { address } = useParams();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const search = searchParams.get("search");
  const selected = searchParams.get("selected");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  
  const {write, isLoading, data} = useContractWrite({
      address: address as Address, 
      abi: type === 'project' ? ABI.project : ABI.groupRegistry, 
      functionName: type == 'project' ? "addMember" : "safeMint"
  })

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
    fetch(`${url}/polybase/profiles/all?search=${search}`)
      .then((res) => res.json())
      .then((data) => {

        setMembers(data);
      });
  }, [search]);
  
  useEffect(() => {
    if (!selected) return;
    setSelectedMembers(selected.split(","));
    
  }, [selected]);
  
  const mintTo = async () => {
    setIsMinting(true);

    if(selectedMembers.length == 0){
      toast({
        title: "No members selected",
        description: "Please select at least one member to invite",
      })
      return;
    }
    
    for(let i = 0; i < selectedMembers.length; i++){
      write({args: [selectedMembers[i]]});
    }
    
    setIsMinting(false);
  }
  
  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)} size="sm">Invite</Button>
      {isOpen && (
        <ModalLayout showModal={isOpen} title="Add Members">
          <h5 className="text-muted-foreground text-md my-4">
            Turn on switch of member if you want to invite
          </h5>
          <section className="flex flex-col gap-4">
            <Search placeholder="Search members Member Address" />

            <div className="rounded-sm h-[30vh] overflow-x-auto my-4">
              {members.map((member: any, index: number) => (
                <PersonItem
                  key={index}
                  src={member.nft}
                  alt="Picture of the author"
                  name={member.name}
                  job={member.job}
                  tba={member.TBA}
                />
              ))}
            </div>
          </section>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant={"secondary"} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={mintTo}
              disabled={isLoading || isMinting}
            >Invite ({selectedMembers.length})</Button>
          </div>
        </ModalLayout>
      )}
    </div>
  );
}

