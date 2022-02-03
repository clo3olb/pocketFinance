import { Line } from "react-chartjs-2";
import { Box, Button, Spinner } from "grommet";
import { ChartType } from "types/QueryDataType";
import { HistoryLineChartOptions } from "etc/chartOptions";
import { memo, useState } from "react";
import { ChartDataType } from "types/ChartDataType";
import { parseTime } from "etc/smallFunctions";
import useChart, { IntervalType, RangeType, UseChartPropTypes } from "hooks/useChart";

const MemoLine = memo(Line);

const LineChart: React.FC<UseChartPropTypes> = ({ ticker, interval, range }) => {
    const chart: ChartType = useChart({
        ticker,
        interval,
        range,
    });

    if (!chart.indicators)
        return (
            <Box style={{ position: "relative" }}>
                <Box
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Spinner size="medium" />
                </Box>
                <MemoLine type="line" data={{}} options={HistoryLineChartOptions} />
                {/* This chart with no data is for placeholding */}
            </Box>
        );

    const lineChartData: ChartDataType = {
        labels: chart.timestamp.map((time) => parseTime(time * 1000)), //["1", "2", "3", "4", "5", "6"],
        datasets: [
            {
                data: chart.indicators.quote[0].close, // [12, 19, 3, 5, 2, 3],
                fill: false,
                backgroundColor: "#000000",
                borderColor: "#5bdda4", // color of the line
            },
        ],
    };
    return <Line type="line" data={lineChartData} options={HistoryLineChartOptions} />;
};

type HistoryLineChartProps = {
    ticker: string;
};

type RangeAndIntervalType = {
    range: RangeType;
    interval: IntervalType;
};
const rangeButtonArray: RangeAndIntervalType[] = [
    { range: "1d", interval: "2m" },
    { range: "5d", interval: "15m" },
    { range: "1mo", interval: "30m" },
    { range: "6mo", interval: "1d" },
    // { range: "ytd", interval: "1d" },
    // { range: "1y", interval: "1d" },
    // { range: "5y", interval: "1wk" },
    // { range: "max", interval: "1mo" },
];

const HistoryLineChart: React.FC<HistoryLineChartProps> = ({ ticker }) => {
    const [lineChartProps, setLineChartProps] = useState<UseChartPropTypes>({
        ticker,
        interval: "2m",
        range: "1d",
    });
    const handleRangeButtonClick = (args: RangeAndIntervalType) => {
        setLineChartProps({ ticker, ...args });
    };

    // return <p>{JSON.stringify(histories)}</p>;
    return (
        <Box gap="medium">
            <LineChart {...lineChartProps} />
            <Box direction="row" gap="xsmall" justify="center">
                {rangeButtonArray.map((item) => (
                    <Button
                        key={item.range}
                        label={item.range.toUpperCase()}
                        active={lineChartProps.range === item.range}
                        size="small"
                        onClick={() => handleRangeButtonClick(item)}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default memo(HistoryLineChart);
