import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

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

export default function SimpleBarChart({ dataKey }: { dataKey: string }) {
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
                console.log(entry);
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}


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
  