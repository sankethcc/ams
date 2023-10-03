import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { dataPoints } from './data';

const ScreenTimeChart = ({ activeData }) => {

  const options = {
    chart: {
      id: 'screenTimeChart',
      toolbar: {
        show: true,
        tools: {
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
          download: false,
          customIcons: [],
        },
      },
    },
    xaxis: {
      categories: dataPoints,
    },
    fill: {
      type: 'gradient',
      colors: ['#4050E7'],
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#FFFFFF'],
        stops: [30, 110],
      },
    },      
    colors: ["#4F78FE"],

    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: 'Units Consumed',
      data: activeData.values,
    },
  ];

  const chartContainerStyle = {
    padding: '10px',
    margin: '10px',
  };

  return (
    <div className="chart-container" style={chartContainerStyle}>
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  );
};

export default ScreenTimeChart;
