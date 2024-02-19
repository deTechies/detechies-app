"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CustomNotFound({ lang }: { lang: any }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Image
        src="/images/404.png"
        width="503"
        height="354"
        alt="404"
        className="mb-8"
      />

      <div className="mb-3 text-heading_m">404 ERROR</div>

      <div className="mb-6 text-body_s text-text-secondary">
        <div>{lang.not_found.desc}</div>
        <div>{lang.not_found.desc2}</div>
        <div>{lang.not_found.desc3}</div>
      </div>

      <div className="flex items-center justify-center w-full gap-2">
        <Button size="lg" variant="secondary" onClick={() => router.back()}>
          {lang.not_found.back}
        </Button>

        <Link
          href="https://t.me/Careerzen_org"
          passHref
          className="max-w-[212px] w-full"
          target="_blank"
        >
          <Button size="lg">{lang.not_found.contact_us}</Button>
        </Link>
      </div>
    </div>
  );
}
