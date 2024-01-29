import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// const data_example = [
//   {
//     dataKey: "data1",
//     dataValue: 20,
//   },
//   ...
// ];

export default function SimpleRadarChart({
  data,
  dataKey,
  dataValue,
}: {
  data: any;
  dataKey: string;
  dataValue: string;
}) {
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

      <PolarAngleAxis
        dataKey={dataKey}
        tick={({ payload, x, y, ...rest }) => (
          <text
            {...rest}
            x={x}
            y={y}
            className="text-text-secondary text-title_s"
          >
            {payload.value}
          </text>
        )}
      />

      <Radar
        dataKey={dataValue}
        stroke="#101113"
        strokeOpacity={0.3}
        fill="#00D41D"
        fillOpacity={0.3}
        label={false}
      />
    </RadarChart>
  );
}
