import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react'
import { labelService } from "../services/label.service"
ChartJS.register(ArcElement, Tooltip, Legend);

export function MyDoughnut({ priceData }) {
  console.log('priceData:', priceData)
  const [toyLabels, setToyLabels] = useState([])
  useEffect(() => {
    labelService.query()
      .then(labels => {
        setToyLabels(labels)
      })
    // eslint-disable-next-line
  }, [])
  const data = {
    labels: toyLabels.map(l => l.name),
    datasets: [
      {
        label: 'Average price',
        data: priceData,
        backgroundColor: toyLabels.map(l => l.color),
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      <Doughnut data={data} />
    </section>
  )
}