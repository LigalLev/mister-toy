import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { chartService } from '../services/chart.service.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function InventoryChart({ toys }) {
    const toyCountByLabel = chartService.getToyCountByLabel(toys)
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

    const labels = toyCountByLabel.labels
    const data = {
        labels,
        datasets: [
            {
                label: '% of toys in stock',
                data: toyCountByLabel.values,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Bar options={options} data={data} />
}
    
