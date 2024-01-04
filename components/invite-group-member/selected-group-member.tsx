"use client";

import { User } from "@/lib/interfaces";

import { inviteProjectMembers } from "@/lib/data/project";
// import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import PersonItem from "../extra/add-member-item";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

export default function SelectedGroupMember({
  user,
  id,
  onSelectValue,
  onClickBack,
  onCompleteInvite
}: // lang
{
  user: User;
  id: string;
  onSelectValue: (value: string) => void;
  onClickBack: () => void;
  onCompleteInvite: () => void;
  // lang: any;
}) {
  const [message, setMessage] = useState("");

  async function inviteMember() {
    // const result = await inviteProjectMembers([user.id], id);
    // toast({
    //   title: "invited team member",
    //   description: <pre>
    //     {JSON.stringify(result, null, 2)}
    //   </pre>
    // })


    onCompleteInvite();
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
          if (setMessage) {
            setMessage(e.target.value);
          }
        }}
      />
      <div className="mb-6 text-right text-label_s">
        <span className={`${message.length > 100 && "text-state-error"}`}>
          {message.length}
        </span>
        /100
      </div>

      <div className="flex justify-center w-full gap-2">
        {/* <DialogClose asChild> */}
          <Button
            variant={"secondary"}
            size="lg"
            className="max-w-[212px] grow px-0"
            onClick={onClickBack}
          >
            뒤로가기
          </Button>
        {/* </DialogClose> */}

        <Button
          onClick={inviteMember}
          size="lg"
          className="max-w-[212px] grow px-0"
          disabled={message.length > 100}
        >
          초대하기
        </Button>
      </div>
    </section>
  );
}
