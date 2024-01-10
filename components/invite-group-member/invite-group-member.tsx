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
  lang,
}: {
  groupId: string;
  lang: any;
}) {
  const searchParams = useSearchParams();
  const text = searchParams.get("search") || "";
  const [selected, setSelected] = useState<User | null>();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const [completeInviting, setCompleteInviting] = useState<boolean>(false);
  const { data: members, loading, error } = useFetchData<any[]>("/users");

  const router = useRouter();

  if (loading) return <Skeleton className="w-10 h-3 animate-pulse" />;
  if (error) return <div>{JSON.stringify(error)}</div>;
  // if (!members) return <div>{lang.details.invite_member.no_members_found}</div>;
  if (!members) return <div>no_members_found</div>;

  const filteredData = members.filter((member: any) => {
    return member.display_name.toLowerCase().includes(text || "");
  });

  const onClickGoManage = () => {
    router.push(`/groups/${groupId}/manage`);
    setSelected(null);
    setCompleteInviting(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="max-w-[212px] grow rounded-full">
        <Button size="lg" variant="primary" className="w-full">
          {lang.details.profile_card.invite.invite_member}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <div className="flex flex-col gap-4">
          {completeInviting ? (
            <div className="flex flex-col items-center">
              <h5 className="mb-4 text-subhead_s">
                {lang.details.profile_card.invite.sended}
              </h5>

              <div className="mb-6 text-center text-body_m">
                {lang.details.profile_card.invite.sended_desc}
              </div>

              <DialogClose>
                <Button size="lg" onClick={onClickGoManage}>
                  {lang.details.profile_card.invite.go_manage}
                </Button>
              </DialogClose>
            </div>
          ) : (
            <h5 className="mb-6 text-subhead_m">
              {lang.details.profile_card.invite.invite_group_member}
            </h5>
          )}
        </div>

        <section className="flex flex-col gap-6">
          {!byEmail && selected == null && !completeInviting && (
            <>
              <Search
                placeholder={
                  lang.details.profile_card.invite.search_placeholder
                }
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
                <span>{lang.details.profile_card.invite.no_name_found}</span>
                <span className="text-accent-primary">
                  {lang.details.profile_card.invite.invite_by_email}
                </span>
              </button>

              <div className="flex justify-center gap-4">
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="max-w-[212px] grow px-0"
                  >
                    {lang.details.profile_card.invite.back}
                  </Button>
                </DialogClose>

                <Button size="lg" className="max-w-[212px] grow px-0" disabled>
                  {lang.details.profile_card.invite.invite}
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
