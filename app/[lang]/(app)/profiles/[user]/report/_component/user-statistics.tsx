"use client";

import SimpleBarChart from "@/components/charts/bar-chart";
import SimplePosNagChart from "@/components/charts/pos-nag-chart";
import SimpleRadarChart from "@/components/charts/radar-chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ScoreCard from "./score-card";
import RecommendedScore from "./recommended-score";

export default function UserStatistics({
  lang,
  selectedLang,
  statistics,
}: {
  lang: any;
  selectedLang: string;
  statistics: any;
}) {
  const [totalData, setTotalData] = useState<any>([]);
  const [totalAverage, setTotalAverage] = useState(0);
  const [matchingData, setMatchingData] = useState<any>([]);
  const params = useParams();
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
    let totalResult = [] as any[];

    // Transform surveyResponses category data
    if (statistics.surveyReports && statistics.surveyReports.averageResponses) {
      const surveyCategoryData = statistics.surveyReports.averageResponses.map(
        (averageResponse: any) => {
          // console.log(averageResponse);
          return {
            dataKey: averageResponse.category,
            dataValue: averageResponse.categoryAverage,
          };
        }
      );

      totalResult = [...surveyCategoryData];
    }
    // if (statistics.assessments && statistics.assessments.byCategory) {
    //   const assessmentCategoryData = statistics.assessments.byCategory.map(
    //     (assessment: any) => {
    //       if (selectedLang == "en") {
    //         return {
    //           dataKey: assessment.averageRanks[0].en.category,
    //           dataValue: assessment.categoryAverageRank * 20,
    //         };
    //       }
    //       return {
    //         dataKey: assessment.averageRanks[0].ko.category,
    //         dataValue: assessment.categoryAverageRank * 20,
    //       };
    //     }
    //   );
    //   totalResult = [...totalResult, ...assessmentCategoryData];
    // }

    setTotalData(totalResult);


    // Calculate and set the average of totalData if needed
    const average = getObjectArrayAverage(totalResult, "dataValue");
    setTotalAverage(average);
  }, [statistics, selectedLang]);

  useEffect(() => {
    // matchingData average
    const average = getObjectArrayAverage(matchingData, "response");

    setMatchingAverage(average);
  }, [matchingData]);

  console.log(statistics);

  return (
    <div className="grid grid-cols-[2fr_5fr_5fr] gap-4">
      <ScoreCard
        score={totalAverage}
        lang={lang}
        className="col-span-3 md:col-span-1"
      >
        {lang.profile.statistics.total_report}
      </ScoreCard>

      <Card className="col-span-3 gap-8 px-0 pt-8 pb-0 md:col-span-1">
        <CardHeader className="justify-center text-subhead_m">
          {lang.profile.statistics.total_report_summary}
        </CardHeader>

        <CardContent className="flex justify-center">
          <SimpleRadarChart
            data={totalData}
            dataKey="dataKey"
            dataValue="dataValue"
          />
        </CardContent>
      </Card>

      <Card className="col-span-3 gap-8 p-8 md:col-span-1">
        <CardHeader className="justify-center text-subhead_m">
          {lang.profile.statistics.reputation_score}
        </CardHeader>

        <CardContent className="text-center">
          <RecommendedScore
            lang={lang}
            recommendScoresByRole={statistics.swotReports.recommendScoresByRole}
          />
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
      {statistics.surveyReports &&
        statistics.surveyReports.averageResponses &&
        statistics.surveyReports.averageResponses.map(
          (averageResponse: any, index: number) => {
            return (
              <Card className="col-span-3 gap-10" key={index}>
                <CardHeader className="justify-center text-subhead_m">
                  {averageResponse.category}
                </CardHeader>
                <div className="flex gap-8">
                  <ScoreCard
                    score={averageResponse.categoryAverage}
                    lang={lang}
                    className="min-h-[234px] mb-7"
                  />

                  <SimpleBarChart
                    data={averageResponse.answers}
                    xKey="id"
                    yKey="averageAnswer"
                    onClickBar={(_test: any) => {
                      setStatisticsDetail({
                        ...statisticsDetail,
                        [averageResponse.answers]: _test,
                      });
                    }}
                  />
                </div>

                {statisticsDetail[averageResponse.answers] && (
                  <div className="p-5 text-center border rounded-md bg-border-div border-border-input">
                    <h3 className="mb-3 text-title_m">
                      Q. {statisticsDetail[averageResponse.answers].en.question}
                    </h3>

                    <div className="text-body_m">
                      {statisticsDetail[averageResponse.answers].en.answer}
                    </div>
                  </div>
                )}
                {/*   {statisticsDetail[category_key] && (
                  <div className="p-5 text-center border rounded-md bg-border-div border-border-input">
                    <h3 className="mb-3 text-title_m">
                      Q. {statisticsDetail[category_key]["en"].question}
                    </h3>

                    <div className="text-body_m">
                      {statisticsDetail[category_key]["en"].answer}
                    </div>
                  </div>
                )}  */}
              </Card>
            );
          }
        )}
      {statistics.categories &&
        Object.keys(statistics.categories).map(
          (category_key: any, index: number) => {
            const category_value = statistics.categories[category_key];

            return (
              <Card className="col-span-3 gap-10" key={index}>
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
          }
        )}

      {/* assesdment */}
      {statistics.assessments && statistics.assessments.byCategory && (
        <Card className="col-span-3 gap-10">
          <CardHeader className="justify-center text-subhead_m">
            Propensity
          </CardHeader>

          <div className="grid gap-8 sm:grid-cols-2">
            {statistics.assessments.byCategory.map(
              (byCategory: any, index: number) => {
                const chartData = byCategory.averageRanks.map(
                  (averageRank: any) => ({
                    minText:
                      params.lang === "en"
                        ? averageRank.en.minValue
                        : averageRank.ko?.minValue, // Category name for the Y-axis
                    maxText:
                      params.lang === "en"
                        ? averageRank.en.maxValue
                        : averageRank.ko?.maxValue, // Additional information, not directly used for the bar
                    value: rankToScore(5, averageRank.averageRank), // The actual value for the bar
                    value2: 0, // If not used, ensure it's set to a default or omitted
                  })
                );
                return (
                  <div key={index}>
                    <h3 className="mb-5 text-center capitalize text-subhead_s">
                      {byCategory.category}
                    </h3>
                    <div className=" h-[300px] overflow-auto">
                      <SimplePosNagChart
                        data={chartData}
                        xKey="value"
                        xKey2="value2"
                        yKey="minText"
                        yKey2="maxText"
                      />

                      {/*   <pre>
                      {JSON.stringify(byCategory, null, 2)}
                    </pre> */}
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
