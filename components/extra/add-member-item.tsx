"use client"



import { defaultAvatar } from "@/lib/constants";
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
      <button className={`flex justify-between items-center py-4 px-2 hover:bg-background-layer-2 w-full rounded-sm ${selected && 'bg-accent-secondary hover:bg-state-error-secondary'}`} onClick={() => {
         returnValue(member)
      }}>
        <figure className="flex gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-background-layer-2">
              <IPFSImageLayer hashes={member?.avatar ? member.avatar : defaultAvatar} />
          </div>

          <div className="text-left flex flex-col gap-1">
            <p className="text-title-s">{member?.display_name}</p>
            <p className="text-label-m text-muted-foreground">{'no jobtitle found'}</p>
          </div>
        </figure>
      </button>
    );
  }
  