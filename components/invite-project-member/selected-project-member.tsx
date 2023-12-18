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
    <section className="flex flex-col items-center justify-center">
      <div className="mb-5 w-full">
        <PersonItem
          member={user}
          returnValue={() => onSelectValue("leave")}
          selected={true}
        />
      </div>

      <Label className="mb-3">Select Member</Label>

      <RadioGroup
        className="flex gap-9 py-4 mb-6"
        onValueChange={(value) => {
          setRole(value);
        }}
        defaultValue="member"
      >
        <div className="flex gap-3 items-center">
          <RadioGroupItem value="member" />
          <Label>팀원</Label>
        </div>
        <div className="flex gap-3 items-center">
          <RadioGroupItem value="admin" />
          <Label>관리자</Label>
        </div>
        <div className="flex gap-3 items-center">
          <RadioGroupItem value="client"/>
          <Label>클라이언트</Label>
        </div>
      </RadioGroup>

      {
        role == "admin" && <div className="mb-6 text-state-error">
        상대방을 관리자로 초대할 경우, 나의 관리자 권한은 소멸됩니다. 초대를 진행할까요?
      </div>
      }

      <div className="flex justify-center w-full gap-2">
        <DialogClose asChild>
          <Button
            variant={"secondary"}
            size="lg"
            className="max-w-[212px] grow"
          >
            나중에 할게요
          </Button>
        </DialogClose>

        <Button onClick={inviteMember} size="lg" className="max-w-[212px] grow">
          초대하기
        </Button>
      </div>
    </section>
  );
}
