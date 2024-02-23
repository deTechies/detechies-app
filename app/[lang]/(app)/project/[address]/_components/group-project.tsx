"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import JoinProject from "@/components/project/join-project";
import { Club } from "@/lib/interfaces";
import RequestGroupListItem from "@/components/request-nft/request-group-list-item";
import JoinGroup from "@/components/group/join-group";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function GroupProject({
  lang,
  groups,
}: {
  lang: any;
  groups: Club[];
}) {
  const router = useRouter();


  // --- Text & Labels ---
  const formatGroupNames = (groups: Club[]) => {
    if(!groups || groups.length == 0){return ""} 
    else{
      let namesString = '';

      if (groups.length > 1) {
        const names = groups.map(obj => obj.name);
        const lastTwoNames = names.slice(-2).join(' and ');
        namesString = [...names.slice(0, -2), lastTwoNames].join(', ');
      } else if (groups.length === 1) {
        namesString = groups[0].name;
      }
      namesString = " " + namesString;

      return(namesString);
    }
  }

  const accessRestrictedToGroupTitle = lang.project.group.title
  const accessRestrictedToGroupDescription = lang.project.group.desc.replace("${GroupName}",()=>{
    return formatGroupNames(groups);
  })

  return (
    <Card className="max-w-xl gap-0 mx-auto my-auto">
      <h1 className="mb-4 text-subhead_s">{accessRestrictedToGroupTitle}</h1>
      <p className="mb-6 text-body_m">{accessRestrictedToGroupDescription}</p>
      <div className="flex flex-col gap-3 mb-6">
        {groups &&
          groups.map((group, index) => {
            return (
              <JoinGroup
                groupId={group.id}
                details={group}
                lang={lang}
                key={index}
              >
                <DialogTrigger className="w-full text-start">
                  <RequestGroupListItem _group={group} />
                </DialogTrigger>
              </JoinGroup>
            );
          })}

        {(!groups || groups.length == 0) && (
          <div className="text-center text-state-error text-title_m">
            {lang.project.group.not_set_group}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2">
        <Button size="lg" variant="secondary" onClick={() => router.back()}>
          {lang.project.group.back}
        </Button>
      </div>
    </Card>
  );
}
