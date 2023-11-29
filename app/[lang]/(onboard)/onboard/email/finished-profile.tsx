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
      icon: <UserCircle size={32} />,
      title: "커리어 아바타",
      description: "커리어 아바타를 생성하고 영구 인증 프로필에 추가해보세요.",
      link: "/profile",
    },
    {
      icon: <SearchCheck size="32" />,
      title: "커리어 아바타",
      description: "커리어 아바타를 생성하고 영구 인증 프로필에 추가해보세요.",
      link: "/profiles",
    },
    {
      icon: <Building2 size="32" />,
      title: "커리어 아바타",
      description: "커리어 아바타를 생성하고 영구 인증 프로필에 추가해보세요.",
      link: "/groups",
    },
  ];
  return (
    <section className="flex flex-col gap-8 max-w-sm">
      <header>
        <h1 className="text-2xl font-bold">커리어 아바타 생성 완료</h1>
        <h5 className="text-text-secondary font-light">
          블록체인 기반의 영구 인증 프로필에 성과, 학력 등을 추가하고 나만의
          커리어 아바타를 완성해보세요!
        </h5>
      </header>
      <div className="w-full aspect-square relative m-0 z-0 bg-background-layer-2 rounded-md">
        <IPFSImageLayer hashes={defaultAvatar} />
      </div>
      <h5 className="font-bold">어떤 것부터 할까요?</h5>

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
      className="flex gap-6 justify-between hover:text-accent-primary items-center"
    >
      {item.icon}
      <div className="text-sm">
        <h5 className="text-sm">{item.title}</h5>
        <p>{item.description}</p>
      </div>
      <ChevronRight />
    </Link>
  );
}
