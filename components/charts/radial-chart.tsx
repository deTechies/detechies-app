import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

const SingleRadialBarChart = ({ name, average, colorClass = '#266b6e' }:any) => {
  // Prepare the data for the RadialBarChart
  const data = [{ name, value: average }];

  return (
    <ResponsiveContainer width="100%" aspect={4.0 / 3.0} className="border">
      <RadialBarChart 
        innerRadius="10%" 
        outerRadius="80%" 
        data={data} 
        startAngle={180} 
        endAngle={0}
      >
        <PolarAngleAxis 
          type="number" 
          domain={[0, 100]} 
          angleAxisId={0} 
          tick={false}
        />
        <RadialBar 
          background 
          dataKey="value" 
          cornerRadius={10} 
          fill={colorClass} 
          label={{ position: 'insideStart', fill: '#fff' }}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default SingleRadialBarChart;
