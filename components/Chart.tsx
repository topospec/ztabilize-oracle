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
        label: "Investment in UVA",
        data: data.map((d) => d.Investment_UVA),
        borderColor: "orange",
        fill: true,
        pointStyle: "circle",
        pointRadius: 2,
        pointBackgroundColor: "orange",
      },
      {
        label: "Investment in USD",
        data: data.map((d) => d.Investment_USD),
        borderColor: "green",
        fill: true,
        pointStyle: "circle",
        pointRadius: 2,
        pointBackgroundColor: "green",
      },
      {
        label: "Investment adjusted by Inflation",
        data: data.map((d) => d.Investment_INFLA),
        borderColor: "gray",
        fill: true,
        pointStyle: "circle",
        pointRadius: 2,
        pointBackgroundColor: "gray",
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
