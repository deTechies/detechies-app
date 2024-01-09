"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { removeProjectMember } from "@/lib/data/project";
import { } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function DeleteMember({
  memberId,
}: {
  memberId: string;
}) {
  const router = useRouter();
  async function deleteMember() {
    
    const result = await removeProjectMember(memberId)
    toast({
      description: <pre>
        {JSON.stringify(result, null, 3)}
      </pre>
    });
    
    router.refresh()
  }
  return (
    <Dialog>
      <DialogTrigger>
        내보내기
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 px-8 py-7">
        <h4 className="mb-4 text-subhead_s">
            선택한 구성원을 프로젝트에서 내보낼까요?
        </h4>
        <p className="mb-6 text-body_m">
            내보낼 경우 멤버의 프로젝트 활동 정보가 모두 삭제돼요. 정말로 내보낼까요?
        </p>

        <div className="flex justify-center gap-2">
          <DialogClose className="w-full max-w-[212px]">
            <Button size="lg" variant="secondary" className="w-full">
              뒤로가기
            </Button>
          </DialogClose>
          
          <Button size="lg" variant="destructive" onClick={deleteMember}>
            내보내기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
