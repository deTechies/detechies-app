import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";


export default function CompletedSuccess() {

  const router = useRouter();

  const onClickManageGroup = () => {
    // router.push(`/groups/${clubId}/nft`);
  }
  
  const onClickManageNft = () => {
    // router.push(`/groups/${clubId}/manage`);
  }

  return (
    <main>
      <Card className="flex flex-col justify-center gap-4">
        <div className="w-[4.125rem] aspect-square rounded-full bg-accent-primary flex items-center justify-center mx-auto">
          <Check
            className="text-background-layer-1 animate-pulse"
            size="48"
            strokeWidth={4}
          />
        </div>

        <h3 className="text-center text-subhead_s">한정판 NFT가 생성되었습니다!</h3>

        <h5 className="flex flex-col text-center text-body_m">
          <span>생성하신 NFT의 관리는 그룹 관리에서 가능하고,</span>
          <span>NFT 증명서에서는 적용 여부를 확인하실수 있어요.</span>
        </h5>

        <section className="flex justify-center gap-2 mt-4 shrink-0">
          <Button variant="secondary" size="lg" onClick={onClickManageGroup}>
            그룹 관리 바로가기
          </Button>
          <Button size="lg" onClick={onClickManageNft}>NFT 증명서 바로가기</Button>
        </section>
      </Card>
    </main>
  );
}
