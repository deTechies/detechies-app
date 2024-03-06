"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

export default function PrivacyPolicy({
  lang,
  onClickAgree,
  children,
}: {
  lang: any;
  onClickAgree?: Function;
  children?: React.ReactNode;
}) {
  const content = children || (
    <ChevronRight className="w-6 h-6 cursor-pointer text-text-secondary hover:text-accent-primary" />
  );

  return (
    <Dialog>
      <DialogTrigger>{content}</DialogTrigger>

      <DialogContent className="max-w-[500px] gap-6 px-8">
        <h3 className="text-subhead_s">
          {lang.onboard.verify_email.accordion.privacy_policy_title}
        </h3>

        <div className="max-h-[calc(90vh-182px)] overflow-y-auto">
          Coming soon
        </div>

        <div className="flex justify-center gap-2">
          <DialogClose className="max-w-[212px] w-full">
            <Button size="lg" variant="secondary">
              {lang.onboard.verify_email.accordion.back}
            </Button>
          </DialogClose>

          {onClickAgree && (
            <DialogClose className="max-w-[212px] w-full">
              <Button size="lg" onClick={() => onClickAgree()}>
                {lang.onboard.verify_email.accordion.agree}
              </Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
