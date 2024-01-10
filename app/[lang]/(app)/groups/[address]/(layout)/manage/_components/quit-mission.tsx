"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

export default function QuitMission({
  campaignId,
  lang,
}: {
  campaignId: string;
  lang: any;
}) {
  const [loading, setLoading] = useState(false);

  async function onClickQuit() {
    setLoading(true);

    setLoading(false);
  }

  const onClickTrigger = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    _event.stopPropagation();
  };

  const onClickContent: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    // 나머지 로직
  };

  return (
    <Dialog>
      <DialogTrigger className="grow" onClick={onClickTrigger}>
        <Button variant="secondary" size="lg" className="w-full">
          {lang.group.details.manage.mission.quit}
        </Button>
      </DialogTrigger>

      <DialogContent onClick={onClickContent}>
        <h3 className="mb-4 text-subhead_s">
          {lang.group.details.manage.mission.quit_title}
        </h3>

        <div className="mb-6 text-body_m">
          {lang.group.details.manage.mission.quit_desc}
        </div>

        <div className="flex justify-center gap-2">
          <DialogClose className="grow max-w-[212px]">
            <Button size="lg" variant="secondary" className="w-full">
              {lang.group.details.manage.mission.back}
            </Button>
          </DialogClose>

          <Button
            size="lg"
            variant="error"
            className="grow max-w-[212px]"
            onClick={onClickQuit}
          >
            {lang.group.details.manage.mission.mission_quit}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
