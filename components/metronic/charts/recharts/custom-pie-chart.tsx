"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// Define the colors to match the image provided
const COLORS = ["#3182CE", "#31C48D", "#F6AD55"];

// Custom legend to match the image style
const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;
  return <span style={{ color }}>{value}</span>;
};

const CustomPieChart = ({
  data,
}: {
  data: {
    name: string;
    percentage: number;
  }[];
}) => {
  const formattedData = data.map((item) => ({
    name: item.name,
    value: item.percentage,
  }));

  return (
    <div className="flex gap-4 items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={false}
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <section className="flex flex-col gap-4 ">
        {data.map((language, index) => (
          <div key={index} className="flex items-center gap-3 justify-between">
            <div className="flex gap-2 items-center">
              
              <span
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>

            <h5 key={index} className="text-text-secondary text-label_m">{language.name}</h5>
            </div>
            <span className="text-label_m text-right">
              {` ${language.percentage.toFixed(2)}%`}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CustomPieChart;
