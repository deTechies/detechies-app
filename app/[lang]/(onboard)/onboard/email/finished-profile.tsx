"use client";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";
import { Building2, ChevronRight, SearchCheck, UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

type Item = {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
};

export default function FinishedProfile({ lang }: { lang: any }) {
  const { data, update } = useSession();
  const items = [
    {
      icon: <UserCircle size="32" />,
      title: lang.onboard.verify_email.finished_profile.expert,
      description: lang.onboard.verify_email.finished_profile.expert_desc,
      link: "/mypage/edit",
    },
    {
      icon: <SearchCheck size="32" />,
      title: lang.onboard.verify_email.finished_profile.client,
      description: lang.onboard.verify_email.finished_profile.client_desc,
      link: "/profiles",
    },
    {
      icon: <Building2 size="32" />,
      title: lang.onboard.verify_email.finished_profile.admin,
      description: lang.onboard.verify_email.finished_profile.admin_desc,
      link: "/groups",
    },
  ];

  useEffect(() => {
    const updateUserSession = async () => {
      const user = await getUserProfile();

      if (!data || !data.web3.user) {
        return;
      }
      await update({
        ...data,
        web3: {
          ...data.web3,
          user: {
            ...data?.web3?.user,
            ...user,
          },
        },
      });
    };
    updateUserSession();
  }, [data, update]);

  return (
    <section className="flex flex-col gap-8 max-w-sm">
      <header>
        <h1 className="text-heading_s mb-3">
          {lang.onboard.verify_email.finished_profile.title}
        </h1>
        <h5 className="text-text-secondary text-body_s">
          {lang.onboard.verify_email.finished_profile.desc}
        </h5>
      </header>
      <div className="w-[350px] aspect-square relative m-0 z-0 bg-background-layer-2 rounded-md">
        <IPFSImageLayer hashes={defaultAvatar} />
      </div>

      <h5 className="text-title_s">
        {lang.onboard.verify_email.finished_profile.subtitle}
      </h5>

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
      className="group flex gap-6 hover:text-accent-primary items-center"
    >
      <div className="shrink-0">{item.icon}</div>
      <div className="flex flex-col grow text-left">
        <h5 className="text-title_m">{item.title}</h5>
        <h6 className="text-label_m group-hover:text-accent-primary">
          {item.description}
        </h6>
      </div>
      <ChevronRight className="h-8 shrink-0 w-8 group-hover:text-accent-primary" />
    </Link>
  );
}
