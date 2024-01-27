import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, ThumbsUp } from "lucide-react";
import React from "react";

import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

function ScoreCard({
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

        <div className="truncate text-heading_m">{score} 점</div>
      </CardContent>
    </Card>
  );
}

function StarRating({ score }: { score: number }) {
  const totalStars = 5;

  // 점수에 따라 꽉 찬 별의 개수를 계산하는 함수
  const fullStars = (score: number) => {
    if (score >= 90) return 5;
    if (score >= 70) return 4;
    if (score >= 50) return 3;
    if (score >= 30) return 2;
    if (score >= 10) return 1;
    return 0;
  };

  const filledStars = fullStars(score); // 꽉 찬 별의 개수
  const emptyStars = totalStars - filledStars; // 빈 별의 개수

  return (
    <div className="flex flex-wrap gap-2">
      {Array(filledStars).fill(
        <Image
          src="/icons/star_filled.png"
          alt="Filled Star"
          width="24"
          height="24"
        />
      )}
      {Array(emptyStars).fill(
        <Image
          src="/icons/star_empty.png"
          alt="Empty Star"
          width="24"
          height="24"
        />
      )}
    </div>
  );
}

const data = [
  {
    subject: "완성도",
    A: 20,
    fullMark: 100,
  },
  {
    subject: "업무 지식",
    A: 98,
    fullMark: 100,
  },
  {
    subject: "협업 및 커뮤니케이션",
    A: 86,
    fullMark: 100,
  },
  {
    subject: "기술 전문성",
    A: 99,
    fullMark: 100,
  },
  {
    subject: "피드백 반영도",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "마감일 준수율",
    A: 65,
    fullMark: 100,
  },
];

function SimpleRadarChart() {
  return (
    <RadarChart
      cx="50%"
      cy="50%"
      width={500}
      height={330}
      outerRadius="70%"
      className="w-full aspect-square"
      data={data}
    >
      <PolarGrid gridType="polygon" />

      <PolarRadiusAxis
        domain={[0, 100]}
        tickCount={6}
        tick={false}
        axisLine={false}
      />

      <PolarAngleAxis dataKey="subject" />

      <Radar
        name="Mike"
        dataKey="A"
        stroke="#101113"
        strokeOpacity={0.3}
        fill="#00D41D"
        fillOpacity={0.3}
        label={false}
      />
    </RadarChart>
  );
}

const data2 = [
  {
    name: "Page A",
    uv: 40,
  },
  {
    name: "Page B",
    uv: 30,
  },
  {
    name: "Page E",
    uv: 90,
  },
  {
    name: "Page F",
    uv: 23,
  },
  {
    name: "Page G",
    uv: 90,
  },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: any;
  payload?: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-sm bg-background-tooltip text-text-fixed">
        <p className="label text-accent-on-primary">{`${payload[0].value}점`}</p>
      </div>
    );
  }

  return null;
};

function SimpleBarChart({ dataKey }: { dataKey: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        height={260}
        data={data2}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        barSize={36}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" tickLine={false} />
        <YAxis
          tickCount={6}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "black", color: "white" }}
          content={<CustomTooltip />}
          cursor={{ fill: "#00D41D", fillOpacity: 0.2 }}
        />
        <Bar dataKey="uv" radius={[8, 8, 0, 0]}>
          {data2.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.uv < 30
                  ? "#FF3939"
                  : entry.uv < 70
                  ? "#BEC3CA"
                  : "#00D41D"
              }
              className="cursor-pointer"
              onClick={() => {
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

const data3 = [
  {
    name: "Page A",
    name2: "PageA2",
    uv: 40,
    pv: 40,
  },
  {
    name: "Page B",
    name2: "PageB2",
    uv: -30,
    pv: -30,
  },
  {
    name: "Page C",
    name2: "PageC2",
    uv: -20,
    pv: -20,
  },
  {
    name: "Page D",
    name2: "PageD2",
    uv: 27,
    pv: 27,
  },
  {
    name: "Page E",
    name2: "PageE2",
    uv: -10,
    pv: -10,
  },
  {
    name: "Page F",
    name2: "PageF2",
    uv: 23,
    pv: 23,
  },
  {
    name: "Page G",
    name2: "PageG2",
    uv: 34,
    pv: 34,
  },
];

export default function SimplePosNagChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        height={500}
        data={data3}
        margin={{
          right: 20,
          left: 20,
        }}
        layout="vertical"
      >
        <XAxis
          type="number"
          ticks={[-100, 0, 100]}
          tickLine={false}
          axisLine={false}
          orientation="top"
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          dataKey="name2"
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <Line yAxisId="left" dataKey="uv" className="hidden" />
        <Bar yAxisId="right" dataKey="pv" fill="#00D41D" barSize={18} />
        <ReferenceLine yAxisId="right" x="0" strokeWidth={2} stroke="#BEC3CA" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export {
  ScoreCard, SimpleBarChart,
  SimplePosNagChart, SimpleRadarChart, StarRating
};

