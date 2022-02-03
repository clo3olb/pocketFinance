import { useEffect, useState } from "react";
import axios from "axios";
import { defaultChartValues } from "./defaultValues";

// prettier-ignore
export type RangeType = "1d" | "5d" | "1mo" | "6mo" | "ytd" | "1y" | "5y" | 'max';
export type IntervalType = "2m" | "15m" | "30m" | "1d" | "1wk" | "1mo";

export type UseChartPropTypes = {
    ticker: string;
    range: RangeType;
    interval: IntervalType;
};

const useChart = ({ ticker, range, interval }: UseChartPropTypes) => {
    const [chart, setChart] = useState<any>({});
    //   const memoFrom = useMemo(() => from, [from]);
    useEffect(() => {
        const getChart = () => {
            setChart(defaultChartValues);
        };
        getChart();
        const intervalId = setInterval(() => {
            getChart();
        }, 5000);
        return () => clearInterval(intervalId);
    }, [range, interval]);
    return chart;
};

// const useChart = ({ ticker, range, interval }: UseChartPropTypes) => {
//   const [chart, setChart] = useState<any>({});
//   //   const memoFrom = useMemo(() => from, [from]);
//   useEffect(() => {
//     const getChart = () => {
//       const url = `/v8/finance/chart/${ticker}?interval=${interval}&range=${range}`;
//       axios({ url, method: "GET" }) // important)
//         .then((res) => {
//           if (res?.data?.chart?.result[0]) {
//             setChart(res.data.chart.result[0]);
//           }
//         })
//         .catch((err) => console.error(err));
//     };
//     getChart();
//     const intervalId = setInterval(() => {
//       getChart();
//     }, 5000);
//     return () => clearInterval(intervalId);
//   }, [range, interval]);
//   return chart;
// };

export default useChart;
