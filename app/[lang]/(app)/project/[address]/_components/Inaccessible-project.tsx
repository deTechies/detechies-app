"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import JoinProject from "@/components/project/join-project";

export default function InaccessibleProject({
  projectId,
  isJoined,
  lang,
}: {
  projectId: string;
  isJoined: boolean;
  lang: any;
}) {
  const router = useRouter();

  return (
    <Card className="max-w-xl mx-auto my-auto mt-20">
      <h1 className="text-subhead_s">{lang.project.private.title}</h1>

      <p className="mb-8 text-body_m">{lang.project.private.desc}</p>

      <div className="flex items-center justify-center mb-8">
        <Image
          src="/images/private-project.png"
          alt="private project"
          width="280"
          height="280"
        ></Image>
      </div>

      <div className="flex justify-center gap-2">
        <Button size="lg" variant="secondary" onClick={() => router.back()}>
          {lang.project.private.back}
        </Button>

        {isJoined ? (
          <Button size="lg" disabled={true}>
            {lang.project.private.waiting}
          </Button>
        ) : (
          <JoinProject lang={lang} address={projectId} />
        )}
      </div>
    </Card>
  );
}
