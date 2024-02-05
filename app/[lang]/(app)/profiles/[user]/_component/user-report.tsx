"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollText } from "lucide-react";

export default function UserReport({
  profile,
  text,
}: {
  profile: any;
  text: any;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onClickView = () => {
    setLoading(true);
    router.push(`${profile.wallet}/report`);

    // using points
    // setLoading(false);
  }

  console.log(profile);

  return (
    <Card className="flex flex-col gap-0 w-[328px] px-6 pt-6 pb-7">
      <CardHeader className="mb-6 text-subhead_s">
        {profile.display_name} {text.profile.report_card.title}
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          {text.profile.report_card.total_experience}{" "}
          <span>ㅁㄴㅇㄻㄹㅇㄴ</span>
        </div>

        <div className="mb-3 text-title_s">
          {text.profile.report_card.total_evalucation}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="purple" shape="sm">
            {text.profile.report_card.admin_evalu}
          </Badge>
          <Badge variant="accent" shape="sm">
            {text.profile.report_card.member_evalu}
          </Badge>
          <Badge variant="info" shape="sm">
            {text.profile.report_card.client_evalu}
          </Badge>
        </div>

        <Dialog>
          <DialogTrigger className="w-full max-w-full">
            <Button size="lg" className="max-w-full">
              {text.profile.report_card.view}
            </Button>
          </DialogTrigger>

          <DialogContent className="flex flex-col gap-0 px-8 py-7">
            <h4 className="mb-4 text-subhead_s">
              {text.profile.report_popup.title}
            </h4>

            <p className="mb-6 text-body_m">{text.profile.report_popup.desc}</p>

            <div className="mb-3 text-title_s">
              {text.profile.report_popup.this_report}
            </div>

            <div className="flex flex-wrap items-center gap-5 px-5 py-4 mb-5 border rounded-md border-border-div">
              <div className="h-[52px] w-[52px] flex items-center justify-center rounded-full bg-background-layer-2">
                <ScrollText className="w-8 h-8 text-icon-secondary"></ScrollText>
              </div>

              <div>{text.profile.report_popup.total_report}</div>
            </div>

            <div className="mb-3 text-title_s">
              {text.profile.report_popup.point_to_need}
            </div>

            <div className="px-5 py-4 mb-6 border rounded-md border-border-div">
              <div className="mb-2 text-text-secondary text-label_m">
                {text.profile.report_popup.points_held}: {0} P
              </div>
              <div className="text-subhead_l">{0} P</div>
            </div>

            <div className="flex justify-center gap-2">
              <DialogClose className="w-full max-w-[212px]">
                <Button size="lg" variant="secondary" className="w-full">
                  {text.profile.report_popup.back}
                </Button>
              </DialogClose>

              <Button
                size="lg"
                onClick={onClickView}
                loading={loading}
                disabled={loading}
              >
                {text.profile.report_popup.view}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
