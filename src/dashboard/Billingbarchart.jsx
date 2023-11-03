/* eslint-disable */
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#008FFB', '#00E396'];

const Barchart = ({activeData}) => {
  const series = [
    {
      name: 'Total Amount',
      data: activeData,
    },
  ]
  const [chartData, setChartData] = useState({
     series: [
      {
        name: 'Total Amount',
        data: activeData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',

        toolbar: {
          show: true,
          tools: {
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
            download: false,
            customIcons: [],
          },
        },
      },
      
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      },
      export: {
        enabled: false
      }
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={series} type="bar" height={350} />
    </div>
  );
};

export default Barchart;
