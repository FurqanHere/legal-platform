import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const AreaChart = ({
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    label = 'Sales',
    dataset = [0, 0, 0, 0, 0, 17, 21, 29, 0, 0, 0, 0]
}) => {
    const data = {
        labels,
        datasets: [
            {
                label,
                data: dataset,
                backgroundColor: 'rgba(8, 38, 75, 0.2)',
                borderColor: 'rgba(8, 38, 75, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4 // Makes the curve smooth
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default AreaChart;
