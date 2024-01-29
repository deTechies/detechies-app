import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbsUp, AlertTriangle } from "lucide-react";

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
  return (
    <Card
      className={`p-5 border ${
        score >= 70
          ? "border-accent-primary text-accent-primary"
          : score >= 40
          ? "border-text-secondary text-text-secondary"
          : "border-state-error text-state-error"
      } ${className}`}
    >
      <CardHeader className="text-title_m">
        {children && <div>{children}</div>}

        <div>총점:</div>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center px-5 grow">
        {score >= 70 ? (
          <ThumbsUp className="w-8 h-8 mb-2" />
        ) : score >= 40 ? null : (
          <AlertTriangle className="w-8 h-8 mb-2" />
        )}

        <div className="truncate text-heading_m">{Math.round(score)} 점</div>
      </CardContent>
    </Card>
  );
}
