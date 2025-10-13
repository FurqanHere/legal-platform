import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const statusColors = {
  'Job Post': 'rgba(255, 99, 132, 0.7)',
  'Software Development': 'rgba(54, 162, 235, 0.7)',
  'Healthcare': 'rgba(255, 206, 86, 0.7)',
  'Accounting & Finance': 'rgba(75, 192, 192, 0.7)',
  'Marketing & Sales': 'rgba(153, 102, 255, 0.7)'
};

const PieChart = ({ labels = [], label = 'Data', dataset = [] }) => {
  // Prevent crash if labels or dataset are empty
  if (!labels.length || !dataset.length) {
    return <p>No data available</p>;
  }

  const data = {
    labels,
    datasets: [
      {
        label,
        data: dataset,
        backgroundColor: labels.map(status => statusColors[status] || '#cccccc'),
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Order Status Distribution',
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const lbl = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${lbl}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
