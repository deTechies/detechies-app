"use client"



import { User } from "@/lib/interfaces";
import IPFSImageLayer from "../ui/layer";

export default function PersonItem({
    member,
    returnValue,
    selected
  }: {
    member: User
    returnValue: any;
    selected?: boolean;
  }) {
    
    //on select 

    return (
      <button className={`flex justify-between items-center p-4 hover:bg-background-layer-2 w-full rounded-sm ${selected && 'bg-accent-secondary hover:bg-state-error-secondary'}`} onClick={() => {
         returnValue(member)
      }}>
        <figure className="flex gap-4">
          <div className="relative w-12 h-12 rounded-[6px] bg-background-layer-2">
              <IPFSImageLayer hashes={[]} />
          </div>
          <div className="text-left">
            <p className="font-bold">{member?.display_name}</p>
            <p className="text-muted-foreground">{'no jobtitle found'}</p>
          </div>
        </figure>
      </button>
    );
  }
  