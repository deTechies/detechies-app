import { useDictionary } from "@/lib/dictionaryProvider";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
  onClickBar,
}: {
  data: any;
  xKey: string;
  yKey: string;
  onClickBar?: Function;
}) {
  const [positiveColor, setPositiveColor] = useState("");
  const [commonColor, setCommonColor] = useState("");
  const [nagativeColor, setNagativeColor] = useState("");
  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    setPositiveColor(rootStyle.getPropertyValue("--accent-primary").trim());
    setCommonColor(rootStyle.getPropertyValue("--border-input").trim());
    setNagativeColor(
      rootStyle.getPropertyValue("--state-error-primary").trim()
    );
    setBorderColor(rootStyle.getPropertyValue("--border-div").trim());
  }, []);

  const lang = useDictionary() as any;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        height={260}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 8,
        }}
        barSize={36}
      >
        <CartesianGrid vertical={false} stroke={borderColor} />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          tick={<CustomTick />}
          className="text-label_s text-text-secondary"
          tickFormatter={(value: any) => " "}
        />
        <YAxis
          tickCount={6}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          className="text-label_m text-text-secondary"
        />
        <Tooltip
          contentStyle={{ backgroundColor: "black", color: "white" }}
          content={<CustomTooltip />}
          cursor={{ fill: positiveColor, fillOpacity: 0.2 }}
        />
        <Bar dataKey={yKey} radius={[8, 8, 0, 0]}>
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry[yKey] < 30
                  ? nagativeColor
                  : entry[yKey] < 70
                  ? commonColor
                  : positiveColor
              }
              className="cursor-pointer"
              onClick={() => {
                if (onClickBar) {
                  onClickBar(entry);
                }
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
        <p className="label text-accent-on-primary">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  const lang = useDictionary() as any;

  const text = lang.survey[payload.value]?.split(" ").join("\n") || "0";
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    setTextColor(rootStyle.getPropertyValue("--state-text-secondary").trim());
  }, []);

  return (
    <g transform={`translate(${x},${y + 8})`}>
      <text x={0} y={0} dy={0} textAnchor="middle" fill={textColor}>
        {/* {text} */}
        {text.split("\n").map((line: string, index: number) => {
          let dy = 0;
          if (index != 0) {
            dy = 16;
          }
          return (
            <tspan x="0" dy={dy} key={index}>
              {line}
            </tspan>
          );
        })}
      </text>
    </g>
  );
};
