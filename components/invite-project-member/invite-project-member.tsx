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
  lang,
}: {
  projectId: string;
  lang: any;
}) {
  const searchParams = useSearchParams()!;
  const search = searchParams.get("search") as string;

  const [selected, setSelected] = useState<User | null>();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const { data: members, loading, error } = useFetchData<any[]>("/users");

  if (loading) return <Skeleton className="h-3 w-10 animate-pulse" />;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!members) return <div>{lang.details.invite_member.no_members_found}</div>;

  // console.log(members);

  /*   const filteredData = members.filter((member: any) => {
    return member.display_name.toLowerCase().includes(search.toLowerCase());
  }); */

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="cursor-pointer text-sm font-normal py-2 px-4"
        >
          {lang.details.invite_member.invite}
          <Plus size={16} className="inline-block ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6">
        <div className="flex flex-col gap-4">
          <h5 className="text-subhead_m">{lang.details.invite_member.title}</h5>

          <p className="text-body_m">
            {/* At the same time as inviting team members, managers, and clients who
          worked on the project together, a request for evaluation of my
          performance is also sent. */}
            {lang.details.invite_member.body}
          </p>
        </div>

        <section className="flex flex-col gap-6">
          {!byEmail && selected == null && (
            <>
              <Search placeholder={lang.details.invite_member.search} />

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
                <span>{lang.details.invite_member.can_not_find}</span>
                <span className="text-accent-primary">{lang.details.invite_member.invite_by_email}</span>
              </button>

              <div className="flex justify-center gap-4">
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="max-w-[212px] grow px-0"
                  >
                    {lang.details.invite_member.back}
                  </Button>
                </DialogClose>

                <Button
                  size="lg"
                  className="max-w-[212px] grow px-0"
                  disabled
                >
                  {lang.details.invite_member.invite}
                </Button>
              </div>
            </>
          )}
          {selected && (
            <SelectedProjectMember
              projectId={projectId}
              user={selected}
              onSelectValue={() => setSelected(null)}
              lang={lang}
            />
          )}
          {byEmail && (
            <InviteByEmail
              projectId={projectId}
              cancelByEmail={() => setByEmail(false)}
              lang={lang}
            />
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
