import { User } from "@/lib/interfaces";

import { inviteProjectMembers } from "@/lib/data/project";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import PersonItem from "../extra/add-member-item";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function SelectedProjectMember({
  user,
  projectId,
  onSelectValue,
}: {
  user: User;
  projectId: string;
  onSelectValue: (value: string) => void;
}) {
  const [role, setRole] = useState<string>("member");

  async function inviteMember() {
    const result = await inviteProjectMembers([user.id], role, projectId);
  }

  return (
    <section className="flex flex-col gap-6 my-4 items-center justify-center">
      <PersonItem
        member={user}
        returnValue={() => onSelectValue("leave")}
        selected={true}
      />

      <Label>Select Member</Label>
      <RadioGroup
        className="flex gap-4"
        onValueChange={(value) => {
          setRole(value);
        }}
        defaultValue="member"
      >
        <div className="flex gap-2 items-center">
          <RadioGroupItem value="admin" />
          <Label>Admin</Label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioGroupItem value="member" />
          <Label>Member</Label>
        </div>
        <div className="flex gap-2 items-center">
          <RadioGroupItem value="client" />
          <Label>Client</Label>
        </div>
      </RadioGroup>

      <div>
        <DialogClose asChild>
          <Button variant={"secondary"}>Cancel</Button>
        </DialogClose>
        <Button onClick={inviteMember}>Invite</Button>
      </div>
    </section>
  );
}
