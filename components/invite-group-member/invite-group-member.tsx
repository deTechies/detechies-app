"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

import { serverApi } from "@/lib/data/general";
import { User } from "@/lib/interfaces";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PersonItem from "../extra/add-member-item";
import Search from "../extra/search";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import InviteByEmail from "./invite-by-email";
import SelectedGroupMember from "./selected-group-member";

export default function InviteGroupMember({
  groupId,
  lang,
  groupMembers,
}: {
  groupId: string;
  lang: any;
  groupMembers: any[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const text = searchParams.get("search") || "";
  const params = useParams();

  const [selected, setSelected] = useState<User | null>();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [completeInviting, setCompleteInviting] = useState<boolean>(false);

  const [userList, setUserList] = useState<any[]>([]);

  const array_member_id = groupMembers.map((member: any) => member.user.id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const newUrl = new URLSearchParams();
      const paramValue = searchParams.get("search") || "";
      newUrl.set("display_name", paramValue);

      const { data: users } = await serverApi(`/users`, newUrl.toString());
      const filteredUsers = users.data.filter((userItem: any) => {
        return (
          !array_member_id.includes(userItem.id) &&
          userItem.display_name.toLowerCase().includes(text.toLowerCase() || "")
        );
      });

      setUserList(filteredUsers);
      setLoading(false);
    };

    fetchData();
  }, [text, searchParams, groupMembers, array_member_id]);

  const onClickGoManage = () => {
    setTimeout(() => {
      router.push(`/${params.lang}/groups/${groupId}/manage?tab=members`);
    }, 500)
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setSelected(null);
      setCompleteInviting(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger className="max-w-[212px] rounded-full">
        <Button size="sm" variant="primary" className="">
          {lang.group.details.profile_card.invite.invite_member}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <div className="flex flex-col gap-4">
          {completeInviting ? (
            <div className="flex flex-col items-center">
              <h5 className="mb-4 text-subhead_s">
                {lang.group.details.profile_card.invite.sended}
              </h5>

              <div className="mb-6 text-center text-body_m">
                {lang.group.details.profile_card.invite.sended_desc}
              </div>

              <DialogClose>
                <Button size="lg" onClick={onClickGoManage}>
                  {lang.group.details.profile_card.invite.go_manage}
                </Button>
              </DialogClose>
            </div>
          ) : (
            <h5 className="mb-6 text-subhead_s">
              {lang.group.details.profile_card.invite.invite_group_member}
            </h5>
          )}
        </div>

        <section className="flex flex-col gap-6">
          {!byEmail && selected == null && !completeInviting && (
            <>
              <Search
                placeholder={"Search "
                }
              />

              <div className="rounded-sm max-h-[30vh] overflow-x-auto">
                {loading && (
                  <div className="pt-2 pb-5 text-center text-label_m text-text-secondary animate-pulse">
                    Loading...
                  </div>
                )}

                {!loading &&
                  userList &&
                  userList.map((member: User, index: number) => (
                    <PersonItem
                      key={index}
                      member={member}
                      returnValue={(value: User) => {
                        setSelected(value);
                      }}
                    />
                  ))}

                {!loading && userList.length < 1 && (
                  <div className="pt-2 pb-5 text-center text-label_m text-text-secondary">
                    No members gound
                  </div>
                )}
              </div>

              <button
                onClick={() => setByEmail(true)}
                className="flex gap-2 mx-auto text-center"
              >
                <span>
                  {lang.group.details.profile_card.invite.no_name_found}
                </span>
                <span className="text-accent-primary">
                  {lang.group.details.profile_card.invite.invite_by_email}
                </span>
              </button>

              <div className="flex justify-center gap-4">
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="max-w-[212px] grow px-0"
                  >
                    {lang.group.details.profile_card.invite.back}
                  </Button>
                </DialogClose>

                <Button size="lg" className="max-w-[212px] grow px-0" disabled>
                  {lang.group.details.profile_card.invite.invite}
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
              lang={lang}
            />
          )}
          {byEmail && !completeInviting && (
            <InviteByEmail
              id={groupId}
              cancelByEmail={() => setByEmail(false)}
              lang={lang}
            />
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
