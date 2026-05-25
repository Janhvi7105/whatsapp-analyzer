import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

// Register chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

function Charts({ data }) {
  // ✅ Safe check
  if (!data || !data.userCount) {
    return (
      <div style={styles.container}>
        <p style={{ textAlign: "center" }}>No chart data available</p>
      </div>
    );
  }

  // 🔥 Sort users by message count (BEST UX)
  const sortedUsers = Object.entries(data.userCount)
    .sort((a, b) => b[1] - a[1]);

  const labels = sortedUsers.map(([user]) => user);
  const values = sortedUsers.map(([_, count]) => count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Messages",
        data: values,
        backgroundColor: [
          "#4facfe",
          "#00f2fe",
          "#43e97b",
          "#fa709a",
          "#f7971e",
          "#7f00ff",
          "#00ff87",
        ],
        borderRadius: 12,
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: { display: false },

      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (context) => `Messages: ${context.raw}`,
        },
      },

      datalabels: {
        anchor: "end",
        align: "top",
        color: "#fff",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value) => value,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ccc",
          font: { size: 12 },
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: "#ccc",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Messages Per User</h2>

      <div style={styles.card}>
        <div style={styles.chartWrapper}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#0f0c29",
    minHeight: "100vh",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "1.8rem",
  },
  card: {
    background: "#1a1a2e",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },

  // 🔥 Chart size control
  chartWrapper: {
    height: "350px",
    maxWidth: "800px",
    margin: "auto",
  },
};

export default Charts;