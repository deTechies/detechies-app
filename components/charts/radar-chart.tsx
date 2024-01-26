import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

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

export default function SimpleRadarChart() {
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
