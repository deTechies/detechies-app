"use client";

import { useState } from "react";
import { Button } from "../ui/button";

import { User } from "@/lib/interfaces";
import useFetchData from "@/lib/useFetchData";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import PersonItem from "../extra/add-member-item";
import Search from "../extra/search";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import InviteByEmail from "./invite-by-email";
import SelectedProjectMember from "./selected-project-member";

export default function InviteProjectMember({
  projectId,
}: {
  projectId: string;
}) {
  const searchParams = useSearchParams()!;
  const search = searchParams.get("search") as string;

  const [selected, setSelected] = useState<User | null>();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const { data: members, loading, error } = useFetchData<any[]>("/users");

  if (loading) return <Skeleton className="h-3 w-10 animate-pulse" />;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!members) return <div>No members found</div>;

  console.log(members);

  /*   const filteredData = members.filter((member: any) => {
    return member.display_name.toLowerCase().includes(search.toLowerCase());
  }); */

  return (
    <Dialog>
      <DialogTrigger>
        <Badge
          variant="secondary"
          className="cursor-pointer text-sm font-normal py-2 px-4"
        >
          Invite <Plus size={16} className="inline-block ml-2" />
        </Badge>
      </DialogTrigger>

      <DialogContent className="gap-6">
        <div className="flex flex-col gap-4">
          <h5 className="text-subhead_m">멤버 초대하고 평가받기</h5>

          <p className="text-body_m">
            {/* At the same time as inviting team members, managers, and clients who
          worked on the project together, a request for evaluation of my
          performance is also sent. */}
            프로젝트를 함께 진행했던 팀원, 관리자, 클라이언트를 초대하는 것과
            동시에, 내 성과에 대한 평가요청도 전송돼요.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          {!byEmail && selected == null && (
            <>
              <Search placeholder="user1234@gmail.com" />

              <div className="rounded-sm max-h-[30vh] overflow-x-auto">
                {members &&
                  members.map((member: User, index: number) => (
                    <PersonItem
                      key={index}
                      member={member}
                      returnValue={(value: User) => {
                        setSelected(value);
                      }}
                    />
                  ))}
              </div>

              <button
                onClick={() => setByEmail(true)}
                className="flex gap-2 text-center mx-auto"
              >
                <span>닉네임을 찾을 수 없어요.</span>
                <span className="text-accent-primary">이메일로 초대하기</span>
              </button>

              <div className="flex justify-center gap-4">
                <DialogClose asChild>
                  <Button variant={"secondary"} size={"lg"} className="max-w-[212px] grow">나중에 할게요</Button>
                </DialogClose>
              </div>
            </>
          )}
          {selected && (
            <SelectedProjectMember
              projectId={projectId}
              user={selected}
              onSelectValue={() => setSelected(null)}
            />
          )}
          {byEmail && (
            <InviteByEmail
              projectId={projectId}
              cancelByEmail={() => setByEmail(false)}
            />
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
