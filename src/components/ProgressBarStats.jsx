import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService"; // adjust path to your ApiService

const ProgressBarStats = ({ title, data }) => {
  const colors = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

  let maxCount = 0;
  if (data) {
    maxCount = Math.max(...data.map((item) => item.count), 1);
  }

  return (
    <div className="card-body pt-0">
      <h5 className="mb-3">{title}</h5>
      {data &&
        data.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="font-weight-bold">{item.name}</span>
              <span className="text-gray-800">{item.count}</span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                  backgroundColor: colors[index % colors.length],
                }}
                aria-valuenow={item.count}
                aria-valuemin="0"
                aria-valuemax={maxCount}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default function ProgressBar() {
  const [jobsData, setJobsData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await ApiService.request({
        method: "GET",
        url: "getDashboard", // adjust to your actual API endpoint
      });

      const data = response.data;
      if (data.status) {
        const charts = data.data.charts;

        // combine months + month_jobs into array of { name, count }
        const formatted = charts.months.map((month, index) => ({
          name: month,
          count: charts.month_jobs[index] || 0,
        }));

        setJobsData(formatted);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="container mt-4">
      <ProgressBarStats data={jobsData} />
    </div>
  );
}
