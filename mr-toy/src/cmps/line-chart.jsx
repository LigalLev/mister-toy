import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export function LineChart() {
 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
};

const labels =  [
    "Jan 22", "Feb 22", "Mar 22", "Apr 22",
    "May 22", "Jun 22", "Jul 22", "Aug 22",
    "Sep 22", "Oct 22", "Nov 22", "Dec 22",
    "Jan 23", "Feb 23", "Mar 23", "Apr 23"
  ]

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data:  [
        268, 582, 451, 289, 506, 348, 499, 157,
        566, 375, 414, 185, 405, 527, 172, 336,
        596, 477, 231, 527, 394, 156, 498, 292
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
}

 {
  return <Line options={options} data={data} />;
}
}