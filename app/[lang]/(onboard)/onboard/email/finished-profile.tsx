import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { Building2, ChevronRight, SearchCheck, UserCircle } from "lucide-react";
import Link from "next/link";

type Item = {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
};

export default function FinishedProfile() {
  const items = [
    {
      icon: <UserCircle className="h-9 w-9" />,
      title: "전문가",
      description: "내 커리어 인증하기",
      link: "/profile",
    },
    {
      icon: <SearchCheck size="32" />,
      title: "클라이언트",
      description: "우리 프로젝트에 맞는 전문가 찾기.",
      link: "/profiles",
    },
    {
      icon: <Building2 size="32" />,
      title: "기업, 기관, 커뮤니티 운영자",
      description: "우리 조직만의 NFT 생성하기.",
      link: "/groups",
    },
  ];
  return (
    <section className="flex flex-col gap-8 max-w-sm">
      <header>
        <h1 className="text-heading_s">커리어 아바타 생성 완료</h1>
        <h5 className="text-text-secondary text-body_s">
          블록체인 기반의 영구 인증 프로필에 성과, 학력 등을 추가하고 나만의
          커리어 아바타를 완성해보세요!
        </h5>
      </header>
      <div className="w-[350px] aspect-square relative m-0 z-0 bg-background-layer-2 rounded-md">
        <IPFSImageLayer hashes={defaultAvatar} />
      </div>
      <h5 className="text-title_s">어떤 것부터 할까요?</h5>

      <div className="flex flex-col gap-8">
        {items.map((item: any, index: any) => (
          <LinkItem item={item} key={index} />
        ))}
      </div>
    </section>
  );
}

type LinkItemProps = {
  item: Item;
};

export function LinkItem({ item }: LinkItemProps) {
  return (
    <Link
      href={item.link}
      className="flex gap-6 hover:text-accent-primary items-center"
    >
      {item.icon}
      <div className="flex flex-col grow text-left">
        <h5 className="text-title_m">{item.title}</h5>
        <h6 className="text-label_m text-text-secondary">{item.description}</h6>
      </div>
      <ChevronRight className="h-8  w-8 text-text-secondary" />
    </Link>
  );
}
