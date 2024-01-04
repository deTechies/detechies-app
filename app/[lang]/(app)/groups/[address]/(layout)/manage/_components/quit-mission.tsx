"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function QuitMission({ campaignId }: { campaignId: string }) {
  const [loading, setLoading] = useState(false);

  async function onClickQuit() {
    setLoading(true);

    //   const result = await -------(campaignId);

    //   console.log(result);

    //   if (result.id) {
    //     toast({
    //       title: "Success",
    //       description: "Quit successfully",
    //     });
    //   }

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
          강제종료
        </Button>
      </DialogTrigger>

      <DialogContent onClick={onClickContent}>
        <h3 className="mb-4 text-subhead_s">미션을 강제 종료 시킬까요?</h3>

        <div className="mb-6 text-body_m">
          미션을 강제 종료시킬 경우, 더 이상 미션 달성여부를 업데이트할 수
          없으며 멤버들은 NFT 보상을 수령할 수 없어요.
        </div>

        <div className="flex justify-center gap-2">
          <DialogClose className="grow max-w-[212px]">
            <Button size="lg" variant="secondary" className="w-full">
              뒤로가기
            </Button>
          </DialogClose>

          <Button
            size="lg"
            variant="error"
            className="grow max-w-[212px]"
            onClick={onClickQuit}
          >
            미션 강제종료
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
