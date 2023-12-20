"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { } from "@radix-ui/react-dialog";

export default function RequestEvaluation({
  memberId,
}: {
  memberId: string;
}) {
  async function requestEvaluation() {
    toast({
      description: "Succesfully requested evaluation to: " + memberId,
      variant: "success"
    });
  }
  return (
    <Dialog>
      <DialogTrigger>
        평가 요청하기
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <h4 className="text-title_m">내 성과 평가 요청을 보낼까요?</h4>
        <p className="text-body_s">
          내가 작성한 성과를 다른 구성원에게 평가받고 내 커리어를 인증해보세요.
          선택한 프로젝트 구성원에게 성과 평가 요청을 보낼까요?
        </p>
        <div className="flex justify-center gap-4" >
          <DialogClose>
            <Button size="lg" variant="secondary">
              뒤로가기
            </Button>
          </DialogClose>
          <Button size="lg" variant="primary" onClick={requestEvaluation}>
            평가 요청하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
