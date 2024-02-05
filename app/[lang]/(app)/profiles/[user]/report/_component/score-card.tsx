import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbsUp, AlertTriangle } from "lucide-react";
import { useDictionary } from "@/lib/dictionaryProvider";

export default function ScoreCard({
  score,
  lang,
  className,
  children,
}: {
  score: number;
  lang: any;
  className?: string;
  children?: React.ReactNode;
}) {
  const dictionary = useDictionary();

  // accent-primary
  const GOOD_SCORE = 70;
  // ===================
  // secondary
  const SOSO_SCORE = 40;
  // ===================
  // state-error

  return (
    <Card
      className={`p-5 border ${
        score >= GOOD_SCORE
          ? "border-accent-primary text-accent-primary"
          : score >= SOSO_SCORE
          ? "border-text-secondary text-text-secondary"
          : "border-state-error text-state-error"
      } ${className}`}
    >
      <CardHeader className="flex-col items-start justify-start text-title_m">
        {children && <div>{children}</div>}

        <div>{lang.profile.statistics.total_points}:</div>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center px-5 grow pb-9">
        {score >= GOOD_SCORE ? (
          <ThumbsUp className="w-8 h-8 mb-2" />
        ) : score >= SOSO_SCORE ? null : (
          <AlertTriangle className="w-8 h-8 mb-2" />
        )}

        <div className="truncate text-heading_m">
          {Math.round(score)} {lang.profile.statistics.points}
        </div>
      </CardContent>
    </Card>
  );
}
