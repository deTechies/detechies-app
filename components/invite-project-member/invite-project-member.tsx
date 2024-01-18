"use client";

import { useState } from "react";
import { Button } from "../ui/button";

import { User } from "@/lib/interfaces";
import useFetchData from "@/lib/useFetchData";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
import SelectedProjectMember from "./selected-project-member";
import { ProjectMember } from "@/lib/interfaces";

export default function InviteProjectMember({
  projectId,
  lang,
  projectMembers,
}: {
  projectId: string;
  lang: any;
  projectMembers: ProjectMember[];
}) {
  const searchParams = useSearchParams()!;
  const text = searchParams.get("search") || "";

  const [selected, setSelected] = useState<User | null>();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const { data: members, loading, error } = useFetchData<any[]>("/users");

  const [dialogOpen, setDialogOpen] = useState(false);

  if (loading) return <Skeleton className="w-10 h-3 animate-pulse" />;
  if (error) return <div>{JSON.stringify(error)}</div>;
  if (!members)
    return <div>{lang.project.details.invite_member.no_members_found}</div>;

  const array_member_id = projectMembers.map(
    (member: ProjectMember) => member.user.id
  );

  const filteredData = members.filter((member: any) => {
    return (
      !array_member_id.includes(member.id) &&
      member.display_name.toLowerCase().includes(text.toLowerCase() || "")
    );
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button variant="secondary" size="sm">
          {lang.project.details.invite_member.invite}
          <Plus size={16} className="inline-block ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-6">
        <div className="flex flex-col gap-4">
          <h5 className="text-subhead_m">
            {lang.project.details.invite_member.title}
          </h5>

          <p className="text-body_m">
            {/* At the same time as inviting team members, managers, and clients who
          worked on the project together, a request for evaluation of my
          performance is also sent. */}
            {lang.project.details.invite_member.body}
          </p>
        </div>

        <section className="flex flex-col gap-6">
          {!byEmail && selected == null && (
            <>
              <Search placeholder={lang.project.details.invite_member.search} />

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
                <span>{lang.project.details.invite_member.can_not_find}</span>
                <span className="text-accent-primary">
                  {lang.project.details.invite_member.invite_by_email}
                </span>
              </button>

              <div className="flex justify-center gap-4">
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="max-w-[212px] grow px-0"
                  >
                    {lang.project.details.invite_member.back}
                  </Button>
                </DialogClose>

                <Button size="lg" className="max-w-[212px] grow px-0" disabled>
                  {lang.project.details.invite_member.invite}
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
              onInvite={() => setDialogOpen(false)}
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
