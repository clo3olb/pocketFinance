import { ChartOptions } from "chart.js";

export const LineChartOptions: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      displayColors: false,
      titleFont: {
        size: 10,
      },
      bodyFont: {
        weight: "bold",
        size: 16,
      },
      bodyColor: "#6FFFAF",
      callbacks: {
        label: function (this, data) {
          return "$" + data.formattedValue;
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0, // This removes point in the Graph
    },
    line: {
      tension: 0.1, // 숫자가 낮을수록 그래프 선이 뾰족함
    },
  },
  hover: {
    mode: "x", // 마우스 올려놓으면, x축을 기준으로 세로선을 그었을때 가까운 점을 기준으로 Tooltip을 띄움.
    intersect: false,
  },
  scales: {
    xAxes: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    yAxes: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};
