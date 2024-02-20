"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import JoinProject from "@/components/project/join-project";
import { Club } from "@/lib/interfaces";
import RequestGroupListItem from "@/components/request-nft/request-group-list-item";
import JoinGroup from "@/components/group/join-group";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function GroupProject({
  projectId,
  isJoined,
  lang,
  groups,
}: {
  projectId: string;
  isJoined: boolean;
  lang: any;
  groups: Club[];
}) {
  const router = useRouter();

  return (
    <Card className="max-w-xl gap-0 mx-auto my-auto">
      <h1 className="mb-4 text-subhead_s">{lang.project.group.title}</h1>

      <p className="mb-6 text-body_m">{lang.project.group.desc}</p>

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

        {isJoined ? (
          <Button size="lg" disabled={true}>
            {lang.project.group.waiting}
          </Button>
        ) : (
          <JoinProject lang={lang} address={projectId} />
        )}
      </div>
    </Card>
  );
}
