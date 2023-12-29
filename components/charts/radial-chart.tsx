// components/SingleRadialCarChart.js
import React from 'react';
import ApexCharts from 'react-apexcharts';

interface SingleRadialCarChartProps {
  name: string;
  average: number;
  colorClass?: string;  // Made optional
}

const SingleRadialCarChart: React.FC<SingleRadialCarChartProps> = ({ 
  name, 
  average, 
  colorClass = '#266b6e'  // Default color
}) => {
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            color: "#000000",
          },
          value: {
            color: colorClass,
          }
        },
      },
    },
    colors: [colorClass],
    labels: [name],
  } as any;

  return <ApexCharts options={options} series={[average]} type="radialBar" />;
};

export default SingleRadialCarChart;
