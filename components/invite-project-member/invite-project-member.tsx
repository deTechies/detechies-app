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

      <DialogContent>
        <h5 className="text-subhead_m">Invite member</h5>
        <p className="text-body_m">
          At the same time as inviting team members, managers, and clients who
          worked on the project together, a request for evaluation of my
          performance is also sent.
        </p>
        <section className="flex flex-col gap-4">
          {!byEmail && selected == null &&  (
            <>
              <Search placeholder="Search for members" />
              <div className="rounded-sm max-h-[30vh] overflow-x-auto my-4">
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
                <span>I can not find my nickname.</span>
                <span className="text-accent-primary">Invite by email</span>
              </button>
              <div className="flex justify-center gap-4 mt-4">
                <DialogClose asChild>
                  <Button variant={"secondary"}>Cancel</Button>
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
