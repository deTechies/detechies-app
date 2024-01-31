import {
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Line,
  ComposedChart,
} from "recharts";

// const data_example = [
//   {
//     yKey: "data1",
//     yKey2: "data2",
//     xKey: 40,
//     xKey2: 0, // not used, but required
//   },
//   ...
// ];

export default function SimplePosNagChart({
  data,
  xKey,
  xKey2,
  yKey,
  yKey2,
}: {
  data: any;
  xKey: string;
  xKey2: string;
  yKey: string;
  yKey2: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        height={500}
        data={data}
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
          dataKey={yKey}
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          dataKey={yKey2}
          type="category"
          tickLine={false}
          axisLine={false}
        />
        <Bar yAxisId="right" dataKey={xKey} fill="#00D41D" barSize={18} />
        <Line yAxisId="left" dataKey={xKey2} className="hidden" />
        <ReferenceLine yAxisId="right" x="0" strokeWidth={2} stroke="#BEC3CA" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
