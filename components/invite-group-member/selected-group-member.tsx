"use client";

import { User } from "@/lib/interfaces";

import { inviteGroupMember } from "@/lib/data/groups";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PersonItem from "../extra/add-member-item";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

export default function SelectedGroupMember({
  user,
  id,
  lang,
  onSelectValue,
  onClickBack,
  onCompleteInvite,
}: {
  user: User;
  id: string;
  lang: any;
  onSelectValue: (value: string) => void;
  onClickBack: () => void;
  onCompleteInvite: () => void;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function inviteMember() {
    setLoading(true);
    const result = await inviteGroupMember(user.id, message, id);

    if (result.status == "success") {
      onCompleteInvite();
      router.refresh();
    } else {
      setLoading(false);
    }
    toast({
      title: `invited team member ${result.status}`,
      description: result.message,
    });
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

      <div className="mb-3 text-title_s text-state-">
        {lang.details.profile_card.invite.message}
      </div>

      <Textarea
        placeholder={lang.details.profile_card.invite.message_placeholder}
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
          {lang.details.profile_card.invite.back}
        </Button>
        {/* </DialogClose> */}

        <Button
          onClick={inviteMember}
          size="lg"
          className="max-w-[212px] grow px-0"
          disabled={message.length > 100 || loading}
        >
          {lang.details.profile_card.invite.invite}
        </Button>
      </div>
    </section>
  );
}
