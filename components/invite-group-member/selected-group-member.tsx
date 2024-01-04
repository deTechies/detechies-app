"use client";

import { User } from "@/lib/interfaces";

import { inviteGroupMember } from "@/lib/data/groups";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import PersonItem from "../extra/add-member-item";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

export default function SelectedGroupMember({
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
  const [message, setMessage] = useState("");

  async function inviteMember() {
    const result = await inviteGroupMember(
      user.id, 
      message,
      id,
    );
    
    console.log(result);

     toast({
       title: "invited team member",
       description: "Your team members has received an email with your invitiation"
     })
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
          disabled={message.length > 100}
        >
          초대하기
        </Button>
      </div>
    </section>
  );
}
