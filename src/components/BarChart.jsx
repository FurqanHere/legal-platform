import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ labels, label, dataset, backgroundColor = 'rgba(253, 205, 38, 0.8)', borderColor = 'rgba(253, 205, 38, 0.7)' }) => {
    // Chart data
    const data = {
        labels,
        datasets: [
            {
                label,
                data: dataset,
                backgroundColor,
                borderColor,
                borderWidth: 1,
                borderRadius: 4, // Rounded corners for bars
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;