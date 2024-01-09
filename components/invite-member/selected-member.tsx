"use client";

import { User } from "@/lib/interfaces";

import { inviteProjectMembers } from "@/lib/data/project";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import PersonItem from "../extra/add-member-item";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "../ui/use-toast";
<<<<<<< HEAD:components/invite-group-member/selected-group-member.tsx
import { useRouter } from "next/navigation";
=======
import { Textarea } from "../ui/textarea";
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0:components/invite-member/selected-member.tsx

export default function SelectedProjectMember({
  user,
  id,
  onSelectValue,
}: // lang
{
  user: User;
  id: string;
  onSelectValue: (value: string) => void;
  // lang: any;
}) {
<<<<<<< HEAD:components/invite-group-member/selected-group-member.tsx
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function inviteMember() {
    setLoading(true);
    const result = await inviteGroupMember(
      user.id, 
      message,
      id,
    );
    
    console.log(result);

    setLoading(false);
    onCompleteInvite();
    router.refresh();
    
    toast({
      title: "invited team member",
      description: "Your team members has received an email with your invitiation"
    })
=======
  const [text, setText] = useState("");

  async function inviteMember() {
    // const result = await inviteProjectMembers([user.id], id);
    // toast({
    //   title: "invited team member",
    //   description: <pre>
    //     {JSON.stringify(result, null, 2)}
    //   </pre>
    // })
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0:components/invite-member/selected-member.tsx
  }

  return (
    <section className="flex flex-col">
      <div className="w-full mb-5">
        <PersonItem
          member={user}
          returnValue={() => onSelectValue("leave")}
          selected={true}
        />
      </div>

      <div className="mb-3 text-title_s text-state-">초대 메세지</div>
      <Textarea
        placeholder="안녕하세요. ㅇㅇ대학교 입니다."
        className="resize-none"
        onChange={(e) => {
          if (setText) {
            setText(e.target.value);
          }
        }}
      />
      <div className="mb-6 text-right text-label_s">
        <span className={`${text.length > 100 && "text-state-error"}`}>
          {text.length}
        </span>
        /100
      </div>

      <div className="flex justify-center w-full gap-2">
        <DialogClose asChild>
          <Button
            variant={"secondary"}
            size="lg"
            className="max-w-[212px] grow px-0"
          >
            뒤로가기
          </Button>
        </DialogClose>

        <Button
          onClick={inviteMember}
          size="lg"
          className="max-w-[212px] grow px-0"
<<<<<<< HEAD:components/invite-group-member/selected-group-member.tsx
          disabled={message.length > 100 || loading}
=======
          disabled={text.length > 100}
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0:components/invite-member/selected-member.tsx
        >
          초대하기
        </Button>
      </div>
    </section>
  );
}
