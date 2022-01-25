import { ChartOptions } from "chart.js";

export const HistoryLineChartOptions: ChartOptions = {
    // animation: {
    //   duration: 0,
    // },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            mode: "index",
            intersect: false,
            displayColors: false,
            titleFont: {
                size: 12,
            },
            bodyFont: {
                weight: "bold",
                size: 16,
            },
            bodyColor: "#6FFFAF",
            bodyAlign: "center",
            titleAlign: "center",
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

export const EarningsBarChartOptions: ChartOptions = {
    plugins: {
        legend: {
            labels: {
                boxWidth: 14,
            },
        },
        tooltip: {
            usePointStyle: true,
            intersect: false,
            bodySpacing: 5,
            callbacks: {
                label: function (context) {
                    const {
                        formattedValue,
                        dataset: { label },
                    } = context;
                    if (formattedValue && label) return label.slice(0, 3) + ": " + formattedValue + "%";
                    return "Error";
                },
            },
        },
    },
    datasets: {
        bar: {
            barPercentage: 1,
            categoryPercentage: 0.4,
        },
    },

    hover: {
        mode: "x",
        intersect: false,
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                    return value + "%";
                },
            },
        },
        x: {
            ticks: {
                font: {
                    weight: "bold",
                },
            },
        },
    },
};
