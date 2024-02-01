"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ScoreCard from "./score-card";
import SimpleRadarChart from "@/components/charts/radar-chart";
import StarRating from "@/components/charts/star-rating";
import SimpleBarChart from "@/components/charts/bar-chart";
import SimplePosNagChart from "@/components/charts/pos-nag-chart";
import { useEffect, useState } from "react";

export default function UserStatistics({
  lang,
  statistics,
}: {
  lang: any;
  statistics: any;
}) {
  const [totalData, setTotalData] = useState<any>([]);
  const [totalAverage, setTotalAverage] = useState(0);
  const [matchingData, setMatchingData] = useState<any>([]);
  const [matchingAverage, setMatchingAverage] = useState(0);
  const [statisticsDetail, setStatisticsDetail] = useState<any>({});

  // utils
  function rankToScore(totalRanks: number, currentRank: number) {
    const middleRank = Math.ceil(totalRanks / 2);
    return ((currentRank - middleRank) / (totalRanks - middleRank)) * 100;
  }

  function scoreToRank(currentScore: number) {
    let rank = Math.floor(currentScore / 20);
    if (rank === 5) {
      rank = 4;
    }
    return rank;
  }

  function getObjectArrayAverage(arr_data: {}[], data_key: string) {
    const sum = arr_data.reduce(
      (acc: number, item: any) => acc + parseFloat(item[data_key]),
      0
    );
    return arr_data.length > 0 ? sum / arr_data.length : 0;
  }

  useEffect(() => {
    // matchingData transform

    // console.log(statistics);

    if (statistics.matching) {
      const transformed = Object.keys(statistics.matching)
        .map((key) => {
          if (!lang.profile.statistics[key]) {
            return null;
          }

          return {
            question: lang.profile.statistics[key],
            response: statistics.matching[key].toString(),
            key: key,
          };
        })
        .filter((item) => !!item);

      setMatchingData(transformed);
    }

    // make totalData
    let totalResult = [] as any[];

    if (statistics.categories) {
      totalResult = Object.keys(statistics.categories).map((category: any) => {
        return {
          dataKey: category,
          dataValue: statistics.categories[category].average,
        };
      });

      totalResult = [
        ...totalResult,
        {
          dataKey: lang.profile.statistics.rate_requirements,
          dataValue: statistics.matching.rate_requirements,
        },
        {
          dataKey: lang.profile.statistics.rate_time_schedule,
          dataValue: statistics.matching.rate_time_schedule,
        },
        {
          dataKey: lang.profile.statistics.feedback_times,
          dataValue: statistics.matching.feedback_times,
        },
      ];
    }

    setTotalData(totalResult);

    const average = getObjectArrayAverage(totalResult, "dataValue");
    setTotalAverage(average);
  }, [statistics]);

  useEffect(() => {
    // matchingData average
    const average = getObjectArrayAverage(matchingData, "response");

    setMatchingAverage(average);
  }, [matchingData]);

  return (
    <div className="grid grid-cols-[2fr_5fr_5fr] gap-4">
      <ScoreCard score={totalAverage} lang={lang} />

      <Card className="gap-8 px-0 pt-8 pb-0">
        <CardHeader className="justify-center text-subhead_m">
          평판 보고서 요약
        </CardHeader>

        <CardContent>
          <SimpleRadarChart
            data={totalData}
            dataKey="dataKey"
            dataValue="dataValue"
          />
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
              <StarRating score={20} />
            </div>
          </div>

          <div className="flex flex-wrap items-center mb-4">
            <div className="text-title_m min-w-[100px] text-left">멤버</div>

            <div className="flex flex-wrap items-center justify-between gap-2 grow">
              <div className="text-title_m">5%</div>

              <div className="text-label_s text-text-placeholder">
                (총 155개 평가)
              </div>

              <StarRating score={5} />
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

              <StarRating score={99} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* project accomplishment */}
      {matchingData.length > 0 && (
        <Card className="col-span-3 gap-10">
          <CardHeader className="justify-center text-subhead_m">
            프로젝트 성과
          </CardHeader>

          <div className="flex gap-8">
            <ScoreCard
              score={matchingAverage}
              lang={lang}
              className="min-h-[234px] mb-7"
            />

            <SimpleBarChart
              data={matchingData}
              xKey="question"
              yKey="response"
              onClickBar={(_test: any) => {
                setStatisticsDetail({
                  ...statisticsDetail,
                  accomplishment: _test,
                });
              }}
            />
          </div>

          {statisticsDetail.accomplishment && (
            <div className="p-5 text-center border rounded-md bg-border-div border-border-input">
              <h3 className="mb-3 text-title_m">
                Q.
                {
                  lang.project.evaluate[statisticsDetail.accomplishment.key]
                    .label
                }
              </h3>

              <div className="text-body_m">
                {
                  lang.project.evaluate[statisticsDetail.accomplishment.key]
                    .messages[
                    scoreToRank(statisticsDetail.accomplishment.response)
                  ]
                }
              </div>
            </div>
          )}
        </Card>
      )}

      {/* categories */}
      {statistics.categories &&
        Object.keys(statistics.categories).map((category_key: any) => {
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
                  xKey="id"
                  yKey="response"
                  onClickBar={(_test: any) => {
                    setStatisticsDetail({
                      ...statisticsDetail,
                      [category_key]: _test,
                    });
                  }}
                />
              </div>

              {statisticsDetail[category_key] && (
                <div className="p-5 text-center border rounded-md bg-border-div border-border-input">
                  <h3 className="mb-3 text-title_m">
                    Q. {statisticsDetail[category_key]["en"].question}
                  </h3>

                  <div className="text-body_m">
                    {statisticsDetail[category_key]["en"].answer}
                  </div>
                </div>
              )}
            </Card>
          );
        })}

      {/* assessmentReport */}
      {statistics.assessmentReport && (
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
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
