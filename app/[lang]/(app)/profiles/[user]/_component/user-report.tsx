"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function UserReport({
  profile,
  text,
}: {
  profile: any;
  text: any;
}) {
  
  return (
    <Card className="flex flex-col gap-0 w-[328px] px-6 pt-6 pb-7">
      <CardHeader className="mb-6 text-subhead_s">
        {profile.display_name} 의 평판 보고서
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          총 경력: <span>ㅁㄴㅇㄻㄹㅇㄴ</span>
        </div>

        <div className="mb-3 text-title_s">총 받은 평가</div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="purple" shape="sm">
            관리자 평가
          </Badge>
          <Badge variant="accent" shape="sm">
            동료 평가
          </Badge>
          <Badge variant="info" shape="sm">
            클라이언트 평가
          </Badge>
        </div>

        <Link href={`${profile.wallet}/report`}>
            <Button size="lg" className="max-w-full">
                열람하기
            </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
