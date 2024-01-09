import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function CompletedSuccess() {
  return (
    <main>
    <Card className="flex flex-col justify-center items-center gap-4">
      <div className="w-24 aspect-square rounded-full bg-accent-primary flex items-center justify-center ">
        <Check
          className="text-background-layer-1 animate-pulse"
          size="48"
          strokeWidth={4}
        />
      </div>
      <h3>한정판 NFT가 생성되었습니다!</h3>
      <h5 className="flex flex-col gap-1">
        <span>생성하신 NFT의 관리는 그룹 관리에서 가능하고,</span>
        <span>NFT 증명서에서는 적용 여부를 확인하실수 있어요.</span>
      </h5>

<<<<<<< HEAD
        <h3 className="text-center text-subhead_s">
          한정판 NFT가 생성되었습니다!
        </h3>
        <h5 className="flex flex-col text-center text-body_m">
          <span>생성하신 NFT의 관리는 그룹 관리에서 가능하고,</span>
          <span>NFT 증명서에서는 적용 여부를 확인하실수 있어요.</span>
        </h5>

        <section className="flex justify-center gap-2 mt-4 shrink-0">
          <Link href={`/groups/${groupId}/manage`} passHref>
            <Button variant="secondary" size="lg">
              그룹 관리 바로가기
            </Button>
          </Link>

          <Link href={`/groups/${groupId}/nft`} passHref>
            <Button size="lg">NFT 증명서 바로가기</Button>
          </Link>
        </section>
      </Card>
    </main>
  );
=======
      <section className="flex gap-2">
        <Button variant="secondary">그룹 관리 바로가기</Button>
        <Button>NFT 증명서 바로가기</Button>
      </section>
    </Card>
  </main>
  )
>>>>>>> ffa0e7705dbc1fe13b69655d5f4927ddde057fe0
}
