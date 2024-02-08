import { useEffect, useState } from "react";
import {
  Bar,
  ComposedChart,
  LabelList,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
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
  const [positiveColor, setPositiveColor] = useState("");
  const [borderColor, setBorderColor] = useState("");

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    setPositiveColor(rootStyle.getPropertyValue("--accent-primary").trim());
    setBorderColor(rootStyle.getPropertyValue("--border-input").trim());
  }, []);

  const CustomXAxis = (value: number): string => {
    switch (value) {
      case -100:
        return "100";
      case 0:
        return "0";
      case 100:
        return "100";
      default:
        return value.toString();
    }
  };

  const CustomBarYAxis = (props: any) => {
    const { x, y, width, height, payload, position } = props;
    const [textColor, setTextColor] = useState("");
    const [placeholderColor, setPlaceholderColor] = useState("");

    const data_obj = data.find((_dataItem: any) => {
      return (
        _dataItem[yKey] === payload.value || _dataItem[yKey2] === payload.value
      );
    });

    const words = payload.value.split(" ");
    const lineHeight = 16;

    useEffect(() => {
      const rootStyle = getComputedStyle(document.documentElement);
      setTextColor(rootStyle.getPropertyValue("--text-primary").trim());
      setPlaceholderColor(
        rootStyle.getPropertyValue("--text-placeholder").trim()
      );
    }, []);

    return (
      <text
        x={x}
        y={y}
        dy={0}
        fill={
          (position == "right" && data_obj.value >= 50) ||
          (position == "left" && data_obj.value <= -50)
            ? textColor
            : placeholderColor
        }
        fontWeight={
          (position == "right" && data_obj.value >= 50) ||
          (position == "left" && data_obj.value <= -50)
            ? "bold"
            : "normal"
        }
        textAnchor={position == "right" ? "start" : "end"}
        dominantBaseline="auto"
      >
        {words.map((word: string, index: number) => {
          let dy = 0;
          if (index != 0) {
            dy = lineHeight;
          }

          return (
            <tspan key={index} x={x} dy={dy}>
              {word}
            </tspan>
          );
        })}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        height={500}
        data={data}
        margin={{
          right: 30,
          left: 30,
        }}
        layout="vertical"
      >
        <XAxis
          type="number"
          ticks={[-100, 0, 100]}
          tickFormatter={CustomXAxis}
          tickLine={false}
          axisLine={false}
          orientation="top"
          className="text-label_m text-text-secondary"
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          dataKey={yKey}
          type="category"
          // tick={<CustomBarYAxis position="left" />}
          tickLine={false}
          axisLine={false}
          className="text-label_s"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          dataKey={yKey2}
          type="category"
          // tick={<CustomBarYAxis position="right" />}
          tickLine={false}
          axisLine={false}
          className="text-label_s"
        />
        <Bar yAxisId="right" dataKey={xKey} fill={positiveColor} barSize={18} />
        <Line yAxisId="left" dataKey={xKey2} className="hidden" />
        <ReferenceLine
          yAxisId="right"
          x="0"
          strokeWidth={2}
          stroke={borderColor}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
