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
import SelectedMember from "./selected-member";

export default function InviteMember({
  id,
}: // lang,
{
  id: string;
  // lang: any;
}) {
  const [text, setText] = useState("");

  const [selected, setSelected] = useState<User | null>();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const { data: members, loading, error } = useFetchData<any[]>("/users");

<<<<<<< HEAD:components/invite-group-member/invite-group-member.tsx
  const router = useRouter();

=======
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0:components/invite-member/invite-member.tsx
  if (loading) return <Skeleton className="w-10 h-3 animate-pulse" />;
  if (error) return <div>{JSON.stringify(error)}</div>;
  // if (!members) return <div>{lang.details.invite_member.no_members_found}</div>;
  if (!members) return <div>no_members_found</div>;

  // console.log(members);

  const filteredData = members.filter((member: any) => {
    if (text == "") {
      return false;
    }

    return member.display_name.toLowerCase().includes(text.toLowerCase());
  });

  const onClickGoManage = () => {
    router.push(`/groups/${groupId}/manage`);
    setSelected(null);
    setCompleteInviting(false);
  }

  return (
      <Dialog>
        <DialogTrigger className="max-w-[230px] grow rounded-full">
          <Button size="lg" variant="primary" className="w-full">
            멤버 초대하기
          </Button>
        </DialogTrigger>

        <DialogContent className="gap-6">
          <div className="flex flex-col gap-4">
<<<<<<< HEAD:components/invite-group-member/invite-group-member.tsx
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
                    onClick={onClickGoManage}
                  >
                    멤버 관리로 이동하기
                  </Button>
                </DialogClose>
              </div>
            ) : (
              <h5 className="mb-6 text-subhead_m">그룹 멤버 초대하기</h5>
            )}
=======
            <h5 className="text-subhead_m">그룹 멤버 초대하기</h5>
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0:components/invite-member/invite-member.tsx
          </div>

          <section className="flex flex-col gap-6">
            {!byEmail && selected == null && (
              <>
                <Search
                placeholder="search email"
                />

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

                  <Button size="lg" className="max-w-[212px] grow px-0" disabled>
                    초대하기
                  </Button>
                </div>
              </>
            )}
            {selected && (
              <SelectedMember
                id={id}
                user={selected}
                onSelectValue={() => setSelected(null)}
                // lang={lang}
              />
            )}
            {byEmail && (
              <InviteByEmail
                id={id}
                cancelByEmail={() => setByEmail(false)}
                // lang={lang}
              />
            )}
          </section>
        </DialogContent>
      </Dialog>
  );
}
