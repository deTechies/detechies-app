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

// const data_example = [
//   {
//     xKey: "data1",
//     yKey: 40,
//   },
//   ...
// ];

export default function SimpleBarChart({
  data,
  xKey,
  yKey,
}: {
  data: any;
  xKey: string;
  yKey: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        height={260}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        barSize={36}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} tickLine={false} />
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
        <Bar dataKey={yKey} radius={[8, 8, 0, 0]}>
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry[yKey] < 30
                  ? "#FF3939"
                  : entry[yKey] < 70
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
