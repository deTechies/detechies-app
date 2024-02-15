"use client";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RewardNotification({
  lang,
  onClickAgree,
}: {
  lang: any;
  onClickAgree: Function;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <ChevronRight className="w-6 h-6 cursor-pointer text-text-secondary hover:text-accent-primary" />
      </DialogTrigger>

      <DialogContent className="max-w-[500px] gap-6 px-8">
        <h3 className="text-subhead_s">
          {lang.onboard.verify_email.accordion.reward_notification}
        </h3>

        <div className="max-h-[calc(90vh-182px)] overflow-y-auto">Hi!</div>

        <div className="flex gap-2">
          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" variant="secondary">
              {lang.onboard.verify_email.accordion.back}
            </Button>
          </DialogClose>

          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" onClick={() => onClickAgree()}>
              {lang.onboard.verify_email.accordion.agree}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
