"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { } from "@radix-ui/react-dialog";

export default function DeleteMember({
  memberId,
}: {
  memberId: string;
}) {
  async function deleteMember() {
    toast({
      description: "Succesfully requested evaluation to: " + memberId,
    });
  }
  return (
    <Dialog>
      <DialogTrigger>
        내보내기
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <h4 className="text-title_m">
            선택한 구성원을 프로젝트에서 내보낼까요?
        </h4>
        <p className="text-body_s">
            내보낼 경우 멤버의 프로젝트 활동 정보가 모두 삭제돼요. 정말로 내보낼까요?
        </p>
        <div className="flex justify-center gap-4">
          <DialogClose>
            <Button size="lg" variant="secondary">
              뒤로가기
            </Button>
          </DialogClose>
          <Button size="lg" variant="destructive" onClick={deleteMember}>
            평가 요청하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
