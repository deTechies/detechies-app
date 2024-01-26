import {
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Line,
  ComposedChart,
} from "recharts";

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
