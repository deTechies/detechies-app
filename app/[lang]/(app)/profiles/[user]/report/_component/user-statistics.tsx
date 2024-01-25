"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SimplePosNagChart, {
  ScoreCard,
  SimpleRadarChart,
  SimpleBarChart,
  StarRating,
} from "./statistics-item";
import { ThumbsUp } from "lucide-react";

export default function UserStatistics({
  profile,
  lang,
}: {
  profile: any;
  lang: any;
}) {
  return (
    <div className="grid grid-cols-[2fr_5fr_5fr] gap-4">
      <ScoreCard score={50} lang={lang} />

      <Card className="gap-8 px-0 pt-8 pb-0">
        <CardHeader className="justify-center text-subhead_m">
          평판 보고서 요약
        </CardHeader>

        <CardContent>
          <SimpleRadarChart></SimpleRadarChart>
        </CardContent>
      </Card>

      <Card className="gap-8 p-8">
        <CardHeader className="justify-center text-subhead_m">
          평판 점수
        </CardHeader>

        <CardContent className="text-center">
          <div className="mb-3 text-text-secondary text-title_l">
            추천 리뷰 총점
          </div>

          <div className="text-accent-primary text-heading_m mb-[60px]">
            {70} 점
          </div>

          <div className="flex">
            <div className="text-title_m">관리자</div>
            <div className="text-title_m">20%</div>
            <div className="text-label_s text-text-placeholder">
              (총 3개 평가)
            </div>
            <StarRating score={50}></StarRating>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3 gap-10">
        <CardHeader className="justify-center text-subhead_m">
          프로젝트 성과
        </CardHeader>

        <div className="flex gap-8">
          <ScoreCard score={50} lang={lang} className="min-h-[234px] mb-7" />

          <SimpleBarChart dataKey="project1"></SimpleBarChart>
        </div>
      </Card>

      <Card className="col-span-3 gap-10">
        <CardHeader className="justify-center text-subhead_m">
          프로젝트 성과
        </CardHeader>

        <div className="flex gap-8 h-[300px]">
          <SimplePosNagChart></SimplePosNagChart>
          <SimplePosNagChart></SimplePosNagChart>
        </div>
      </Card>
    </div>
  );
}
