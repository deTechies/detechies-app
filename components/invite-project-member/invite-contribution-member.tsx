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
import { getUsers } from "@/lib/data/user";
import { Form } from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const inviteMemberFormSchema = z.object({
  search: z.string()
})
type InviteMemberFormValue = z.infer<typeof inviteMemberFormSchema>;


export default function InviteContributionMember({
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
  // const { data: members, loading, error } = useFetchData<any[]>("/users");


  // if (loading) return <Skeleton className="w-10 h-3 animate-pulse" />;
  // if (error) return <div>{JSON.stringify(error)}</div>;
  // if (!members) return <div>{lang.details.invite_member.no_members_found}</div>;


  const form = useForm<InviteMemberFormValue>({
    resolver: zodResolver(inviteMemberFormSchema),
    mode: "onChange",
  });


  return (

    <main className="flex flex-col gap-4">
      <Form {...form}>
        <form className="flex flex-col gap-3">
      
        <div className="flex flex-col gap-4">
          <h5 className="text-subhead_m">aaaa</h5>

          <p className="text-body_m">
            {/* At the same time as inviting team members, managers, and clients who
          worked on the project together, a request for evaluation of my
          performance is also sent. */}
            aaaa
          </p>
        </div>

        </form>
      </Form>
    </main>
  );
}
