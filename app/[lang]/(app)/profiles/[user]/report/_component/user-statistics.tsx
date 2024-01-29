"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ScoreCard from "./score-card";
import SimpleRadarChart from "@/components/charts/radar-chart";
import StarRating from "@/components/charts/star-rating";
import SimpleBarChart from "@/components/charts/bar-chart";
import SimplePosNagChart from "@/components/charts/pos-nag-chart";

export default function UserStatistics({
  projects,
  lang,
  statistics,
}: {
  projects: any;
  lang: any;
  statistics: any;
}) {

  function rankToScore(totalRanks: number, currentRank: number) {
    const middleRank = Math.ceil(totalRanks / 2);
    return ((currentRank - middleRank) / (totalRanks - middleRank)) * 100;
  }

  
  // console.log(statistics.categories);

  return (
    <div className="grid grid-cols-[2fr_5fr_5fr] gap-4">
      <ScoreCard score={50} lang={lang} />

      <Card className="gap-8 px-0 pt-8 pb-0">
        <CardHeader className="justify-center text-subhead_m">
          평판 보고서 요약
        </CardHeader>

        <CardContent>
          {/* <SimpleRadarChart
            data={}
            dataKey=""
            dataValue=""
          ></SimpleRadarChart> */}
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

          <div className="flex flex-wrap items-center mb-4">
            <div className="text-title_m min-w-[100px] text-left">관리자</div>
            <div className="flex flex-wrap items-center justify-between gap-2 grow">
              <div className="text-title_m">20%</div>
              <div className="text-label_s text-text-placeholder">
                (총 3개 평가)
              </div>
              <StarRating score={50}></StarRating>
            </div>
          </div>

          <div className="flex flex-wrap items-center mb-4">
            <div className="text-title_m min-w-[100px] text-left">멤버</div>

            <div className="flex flex-wrap items-center justify-between gap-2 grow">
              <div className="text-title_m">5%</div>
              <div className="text-label_s text-text-placeholder">
                (총 155개 평가)
              </div>
              <StarRating score={50}></StarRating>
            </div>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="text-title_m min-w-[100px] text-left">
              클라이언트
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 grow">
              <div className="text-title_m">99%</div>
              <div className="text-label_s text-text-placeholder">
                (총 155개 평가)
              </div>
              <StarRating score={50}></StarRating>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-3 gap-10">
        <CardHeader className="justify-center text-subhead_m">
          프로젝트 성과
        </CardHeader>

        <div className="flex gap-8">
          <ScoreCard score={50} lang={lang} className="min-h-[234px] mb-7" />

          {/* <SimpleBarChart dataKey="project1"></SimpleBarChart> */}
        </div>
      </Card>

      {/* categories */}
      {Object.keys(statistics.categories).map((category_key: any) => {
        const category_value = statistics.categories[category_key];

        return (
          <Card className="col-span-3 gap-10" key={category_key}>
            <CardHeader className="justify-center text-subhead_m">
              {category_key}
            </CardHeader>

            <div className="flex gap-8">
              <ScoreCard
                score={category_value.average}
                lang={lang}
                className="min-h-[234px] mb-7"
              />

              <SimpleBarChart
                data={category_value.answers}
                xKey="question"
                yKey="response"
              ></SimpleBarChart>
            </div>
          </Card>
        );
      })}

      {/* assessmentReport */}
      <Card className="col-span-3 gap-10">
        <CardHeader className="justify-center text-subhead_m">
          성향 평가
        </CardHeader>

        <div className="grid gap-8 sm:grid-cols-2">
          {Object.keys(statistics.assessmentReport).map(
            (assessment_key: any) => {

              const transformedArray = statistics.assessmentReport[
                assessment_key
              ].criteria.map((item: any) => ({
                minText: item.criterion.minText,
                maxText: item.criterion.maxText,
                value: rankToScore(item.criterion.ranks, item.rank),
                value2: 0,
              }));

              return (
                <div key={assessment_key}>
                  <h3 className="mb-5 text-center text-subhead_s">
                    {assessment_key}
                  </h3>
                  <div className=" h-[300px]">
                    <SimplePosNagChart
                      data={transformedArray}
                      xKey="value"
                      xKey2="value2"
                      yKey="minText"
                      yKey2="maxText"
                    ></SimplePosNagChart>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Card>
    </div>
  );
}
