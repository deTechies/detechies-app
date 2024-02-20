import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

import Link from "next/link";

export default function CompletedSuccess({
  groupId,
  lang,
}: {
  groupId: string;
  lang: any;
}) {
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

        <h3 className="text-center text-subhead_s">
          {lang.group.details.profile_card.completed_success.title}
        </h3>
        <h5 className="flex flex-col text-center text-body_m">
          <span>{lang.group.details.profile_card.completed_success.desc1}</span>
          <span>{lang.group.details.profile_card.completed_success.desc2}</span>
        </h5>

        <section className="flex justify-center gap-2 mt-4 shrink-0">
          <Link href={`/groups/${groupId}/manage?tab=members`} passHref>
            <Button variant="secondary" size="lg">
              {lang.group.details.profile_card.completed_success.go_manage}
            </Button>
          </Link>

          <Link href={`/groups/${groupId}/nft`} passHref>
            <Button size="lg">
              {lang.group.details.profile_card.completed_success.go_nft}
            </Button>
          </Link>
        </section>
      </Card>
    </main>
  );
}
