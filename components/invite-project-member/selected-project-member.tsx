import { User } from "@/lib/interfaces";

import { postServer } from "@/lib/data/postRequest";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PersonItem from "../extra/add-member-item";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "../ui/use-toast";

export default function SelectedProjectMember({
  user,
  projectId,
  onSelectValue,
  lang,
  onInvite,
}: {
  user: User;
  projectId: string;
  onSelectValue: (value: string) => void;
  lang: any;
  onInvite?: Function;
}) {
  const [role, setRole] = useState<string>("member");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function inviteMember() {
    setLoading(true);

    const data = JSON.stringify({
      userId: [user.id],
      role: role,
      projectId: projectId,
    });
    //const result = await inviteProjectMembers([user.id], role, projectId);
    const result = await postServer("/project-member/invite", data);
    if (result) {
      toast({
        title: "Invited team member",
        description: (
          <span>
            You succesfully invited your team member, please wait for the member
            to accept the invitation.
          </span>
        ),
      });
      onSelectValue("leave");
      router.refresh();
    }

    setLoading(false);

    if (onInvite) {
      onInvite();
    }
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="w-full mb-5">
        <PersonItem
          member={user}
          returnValue={() => onSelectValue("leave")}
          selected={true}
        />
      </div>

      <Label className="mb-3">
        {lang.project.details.invite_member.member_type}
      </Label>

      <RadioGroup
        className="flex py-4 mb-6 gap-9"
        onValueChange={(value) => {
          setRole(value);
        }}
        defaultValue="member"
      >
        <div className="flex items-center">
          <RadioGroupItem value="member" />
          <Label>{lang.project.details.role_type.member}</Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="admin" />
          <Label>{lang.project.details.role_type.admin}</Label>
        </div>
        <div className="flex items-center">
          <RadioGroupItem value="client" />
          <Label>{lang.project.details.role_type.client}</Label>
        </div>
      </RadioGroup>

      {role == "admin" && (
        <div className="mb-6 text-state-error">
          상대방을 관리자로 초대할 경우, 나의 관리자 권한은 소멸됩니다. 초대를
          진행할까요?
        </div>
      )}

      <div className="flex justify-center w-full gap-2">
        <DialogClose asChild>
          <Button
            variant={"secondary"}
            size="lg"
            className="max-w-[212px] grow px-0"
          >
            {lang.project.details.invite_member.back}
          </Button>
        </DialogClose>

        <Button
          onClick={inviteMember}
          size="lg"
          className="max-w-[212px] grow px-0"
          disabled={loading}
          loading={loading}
        >
          {lang.project.details.invite_member.invite}
        </Button>
      </div>
    </section>
  );
}
