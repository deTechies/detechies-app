"use client";
import IPFSImageLayer from "@/components/ui/layer";
import { defaultAvatar } from "@/lib/constants";
import { getUserProfile } from "@/lib/data/user";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
      icon: (
        <Image
          src="/icons/profile_career.png"
          alt="career"
          width={40}
          height={40}
        />
      ),
      title: lang.onboard.verify_email.finished_profile.expert,
      description: lang.onboard.verify_email.finished_profile.expert_desc,
      link: "/mypage/edit",
    },
    {
      icon: (
        <Image
          src="/icons/profile_client.png"
          alt="client"
          width={40}
          height={40}
        />
      ),
      title: lang.onboard.verify_email.finished_profile.client,
      description: lang.onboard.verify_email.finished_profile.client_desc,
      link: "/profiles",
    },
    {
      icon: (
        <Image
          src="/icons/profile_admin.png"
          alt="admin"
          width={40}
          height={40}
        />
      ),
      title: lang.onboard.verify_email.finished_profile.admin,
      description: lang.onboard.verify_email.finished_profile.admin_desc,
      link: "/teams",
    },
  ];

  useEffect(() => {
    const updateUserSession = async () => {
      const { data: user } = await getUserProfile();

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
    <section className="flex flex-col max-w-sm gap-8">
      <header>
        <h1 className="mb-3 text-heading_s">
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
    <Link href={item.link} className="flex items-center gap-6 group">
      <div className="shrink-0">{item.icon}</div>
      <div className="flex flex-col text-left grow">
        <h5 className="text-title_m">{item.title}</h5>
        <h6 className="text-label_m text-secondary">{item.description}</h6>
      </div>

      <ChevronRight className="w-8 h-8 shrink-0 text-icon-secondary" />
    </Link>
  );
}
