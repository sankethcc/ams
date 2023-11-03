import React from 'react';
import ReactApexChart from 'react-apexcharts';



const BScreenTimeChart = ({activeData}) => {
    const dataPoints = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
    yaxis: {
      labels: {
        padding: 20, // Adjust the padding value to increase the distance between the y-axis values and the y-axis line
      },
    },
    fill: {
      type: 'gradient',
      colors: ['#4050E7'],
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.6,
        gradientToColors: ['#FFFFFF'],
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    // grid: {
    //   show: false, // Hide grid lines behind the bars
    // },
  };

  const series = [
    {
      name: 'User Created',
      data: activeData,
    },
  ];

  const chartContainerStyle = {
    paddingRight:'8px'
  };

  return (
    <div className="chart-container b-radius1" style={chartContainerStyle}> 
      <ReactApexChart options={options} series={series} type="area" height={300} />
    </div>
  );
};

export default BScreenTimeChart;

