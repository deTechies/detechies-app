import Image from "next/image";

export default function ProjectMemberInline() {
  return (
    <div className="self-stretch p-5 rounded-[20px] border border-border-div gap-5 inline-flex">
      <div className="w-20 h-20 relative rounded-xl bg-background-layer-2">
        <Image
          src="https://ipfs.io/ipfs/bafybeia5px5av5fownigw6v5g2ql5cyv57vhgm2v6jtazdmvwgiy7wnmse"
          alt="robin12"
          layout="fill"
          className="rounded-xl"
        />
      </div>
      <div className="grow shrink basis-0 flex-col gap-4 inline-flex">
        <h5 className="text-title_m">Robin12 | 윤창진 | 팀원</h5>
        <div className="flex-col gap-2 flex">
          <div className="self-stretch gap-2 inline-flex">
            <span className="text-text-secondary text-label_m">
              디자이너
            </span>

            <span className="text-text-secondary text-label_m">
              | 기여도 90%
            </span>
          </div>
          <div className="self-stretch gap-2 inline-flex">
            <div className="text-text-secondary text-label_m ">
              업무기간:
            </div>

            <div className="text-text-secondary text-label_m tracking-wide">
              2015.09.01 ~ 2019.12.01
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
