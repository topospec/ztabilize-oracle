// src/InteractiveChart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";
import { data } from "./data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  Date: string;
  Investment_UVA: number;
  Investment_USD: number;
  Investment_INFLA: number;
  MonthYear: string;
}

const Chart = () => {
  const chartData = {
    labels: data.map((d) => d.MonthYear),
    datasets: [
      {
        label: "UVA Token Price (ARS)",
        data: data.map((d) => d.UVA),
        borderColor: "orange",
        fill: true,
        pointStyle: "circle",
        pointRadius: 2,
        pointBackgroundColor: "orange",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Investment in ARS",
          color: "white",
          font: {
            family: "Merryweather",
          }
        },
      },
      x: {
        title: {
          display: true,
          text: "Month-Year",
          color: "white",
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box width={"100%"} height={"100%"} minHeight={"350px"}>
      <Line data={chartData} options={options} />
    </Box>
  );
};

export default Chart;
