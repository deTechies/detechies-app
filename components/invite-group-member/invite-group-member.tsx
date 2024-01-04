"use client";

import { useState } from "react";
import { Button } from "../ui/button";

import { User } from "@/lib/interfaces";
import useFetchData from "@/lib/useFetchData";
import PersonItem from "../extra/add-member-item";
import Search from "../extra/search";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import InviteByEmail from "./invite-by-email";
import SelectedGroupMember from "./selected-group-member";
import { useRouter, useSearchParams } from "next/navigation";

export default function InviteGroupMember({
  groupId,
}: // lang,
{
  groupId: string;
  // lang: any;
}) {
  const [selected, setSelected] = useState<User | null>();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const [completeInviting, setCompleteInviting] = useState<boolean>(false);
  const { data: members, loading, error } = useFetchData<any[]>("/users");

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const router = useRouter();

  if (loading) return <Skeleton className="w-10 h-3 animate-pulse" />;
  if (error) return <div>{JSON.stringify(error)}</div>;
  // if (!members) return <div>{lang.details.invite_member.no_members_found}</div>;
  if (!members) return <div>no_members_found</div>;

  const filteredData = members.filter((member: any) => {
    return member.display_name.toLowerCase().includes(search || "");
  });

  return (
    <>
      <Dialog>
        <DialogTrigger className="max-w-[230px] grow rounded-full">
          <Button size="lg" variant="primary" className="w-full">
            멤버 초대하기
          </Button>
        </DialogTrigger>

        <DialogContent className="gap-0">
          <div className="flex flex-col gap-4">
            {completeInviting ? (
              <div className="flex flex-col items-center">
                <h5 className="mb-4 text-subhead_s">
                  초대 메세지를 전송했습니다!
                </h5>

                <div className="mb-6 text-center text-body_m">
                  메세지를 받은 유저가 초대를 승인하면 새로운 멤버로 추가됩니다.
                  초대 승인여부는 멤버관리해서 확인이 가능합니다.
                </div>

                <DialogClose>
                  <Button
                    size="lg"
                    variant={"secondary"}
                    onClick={() => router.push(`manage`)}
                  >
                    멤버 관리로 이동하기
                  </Button>
                </DialogClose>
              </div>
            ) : (
              <h5 className="mb-6 text-subhead_m">그룹 멤버 초대하기</h5>
            )}
          </div>

          <section className="flex flex-col gap-6">
            {!byEmail && selected == null && !completeInviting && (
              <>
                <Search placeholder="search email" />

                <div className="rounded-sm max-h-[30vh] overflow-x-auto">
                  {filteredData &&
                    filteredData.map((member: User, index: number) => (
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
                  className="flex gap-2 mx-auto text-center"
                >
                  <span>닉네임을 찾을 수 없어요.</span>
                  <span className="text-accent-primary">이메일로 초대하기</span>
                </button>

                <div className="flex justify-center gap-4">
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="max-w-[212px] grow px-0"
                    >
                      뒤로가기
                    </Button>
                  </DialogClose>

                  <Button
                    size="lg"
                    className="max-w-[212px] grow px-0"
                    disabled
                  >
                    초대하기
                  </Button>
                </div>
              </>
            )}
            {selected && !completeInviting && (
              <SelectedGroupMember
                id={groupId}
                user={selected}
                onSelectValue={() => setSelected(null)}
                onClickBack={() => setSelected(null)}
                onCompleteInvite={() => setCompleteInviting(true)}
                // lang={lang}
              />
            )}
            {byEmail && !completeInviting && (
              <InviteByEmail
                id={groupId}
                cancelByEmail={() => setByEmail(false)}
                // lang={lang}
              />
            )}
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
