"use client";

import StarRating from "@/components/charts/star-rating";
import { useDictionary } from "@/lib/dictionaryProvider";
import { useEffect, useState } from "react";

export default function RecommendedScore({
  lang,
  recommendScoresByRole,
}: {
  lang: any;
  recommendScoresByRole: any;
}) {
  const [totalScore, setTotalScore] = useState(0);

  // accent-primary
  const GOOD_SCORE = 70;
  // ===================
  // secondary
  const SOSO_SCORE = 40;
  // ===================
  // state-error

  useEffect(() => {
    function calculateAverage() {
      let totalAverage = 0;
      let count = 0;

      for (const role in recommendScoresByRole) {
        if (recommendScoresByRole[role].totalRecommendations > 0) {
          totalAverage +=
            recommendScoresByRole[role].totalRecommendScore /
            recommendScoresByRole[role].totalRecommendations;
          count++;
        }
      }

      // 평균의 평균을 계산
      return count > 0 ? totalAverage / count : 0;
    }

    setTotalScore(calculateAverage() * 20);
  }, [recommendScoresByRole]);

  return (
    <>
      <div className="mb-3 text-text-secondary text-title_l">
        {lang.profile.statistics.recommendation_score}
      </div>

      <div
        className={`text-heading_m mb-[60px] ${
          totalScore >= GOOD_SCORE
            ? "border-accent-primary text-accent-primary"
            : totalScore >= SOSO_SCORE
            ? "border-text-secondary text-text-secondary"
            : "border-state-error text-state-error"
        }`}
      >
        {totalScore} {lang.profile.statistics.points}
      </div>

      {recommendScoresByRole?.admin &&
        recommendItem(
          lang.interface.role_type.admin,
          recommendScoresByRole.admin.totalRecommendScore,
          recommendScoresByRole.admin.totalRecommendations
        )}
      {recommendScoresByRole?.member &&
        recommendItem(
          lang.interface.role_type.member,
          recommendScoresByRole.member.totalRecommendScore,
          recommendScoresByRole.member.totalRecommendations
        )}
      {recommendScoresByRole?.client &&
        recommendItem(
          lang.interface.role_type.client,
          recommendScoresByRole.client.totalRecommendScore,
          recommendScoresByRole.client.totalRecommendations
        )}
    </>
  );
}

const recommendItem = (role: string, score: number, total: number) => {
  const [recommendScore, setRecommendScore] = useState(0);
  const [recommendTotal, setRecommendTotal] = useState(0);

  useEffect(() => {
    setRecommendScore((score * 20) / total);
    setRecommendTotal(total);
  }, [score, total]);

  const lang = useDictionary();

  return (
    <div className="flex flex-wrap items-center mb-4">
      <div className="text-title_m min-w-[100px] text-left">{role}</div>
      <div className="flex flex-wrap items-center justify-between gap-2 grow">
        <div className="text-title_m">{recommendScore}%</div>
        <div className="text-label_s text-text-placeholder">
          ({lang.profile.statistics.total_review_1} {recommendTotal} {" "}
          {lang.profile.statistics.total_review_2})
        </div>
        <StarRating score={recommendScore} />
      </div>
    </div>
  );
};
