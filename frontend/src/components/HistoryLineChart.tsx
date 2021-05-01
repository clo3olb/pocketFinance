import { useQuery, gql } from "@apollo/client";
import { Line } from "react-chartjs-2";
import { Box, Button, Spinner } from "grommet";
import { HistoryType } from "types/QueryDataType";
import { LineChartOptions } from "etc/chartOptions";
import { useState } from "react";
import { GraphDataType } from "types/ChartDataType";

const GET_HISTORY_BY_TICKER = gql`
  query historyByTicker($ticker: String, $from: String, $to: String, $period: String) {
    histories: historyByTicker(ticker: $ticker, from: $from, to: $to, period: $period) {
      date
      close
    }
  }
`;

type rangeType = 7 | 30 | 90 | 365 | 1825;

const parseDate = (inputDate: any) => {
  let dateObject = new Date(inputDate);
  const year = dateObject.getFullYear();
  let month: string | number = dateObject.getMonth() + 1;
  month = month < 10 ? "0" + month : "" + month;
  let date: string | number = dateObject.getDate();
  date = date < 10 ? "0" + date : date;
  return `${year}-${month}-${date}`;
};

const MS_IN_A_DAY = 60 * 60 * 24 * 1000; // milisecondes in a day

type LineChartProps = {
  ticker: string;
  range: rangeType;
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { ticker, range } = props;

  const { loading, error, data } = useQuery(GET_HISTORY_BY_TICKER, {
    variables: {
      ticker,
      from: parseDate(Date.now() - range * MS_IN_A_DAY),
      to: parseDate(Date.now()),
      period: "d",
    },
  });

  if (loading)
    return (
      <Box style={{ position: "relative" }}>
        <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <Spinner size="medium" />
        </Box>
        <Line type="line" data={{}} options={LineChartOptions} />
        {/* This chart with no data is for placeholding */}
      </Box>
    );
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  const queryHistories: HistoryType[] = data.histories;
  if (!queryHistories) return <p>No histories Found - Histoies Object: {JSON.stringify(queryHistories)}</p>;

  const histories = queryHistories.slice().reverse();
  const graphData: GraphDataType = {
    labels: histories.map((history: HistoryType) => parseDate(history.date * 1)), //["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: histories.map((history: HistoryType) => history.close), // [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "#000000",
        borderColor: "#6c6c6c", // color of the line
      },
    ],
  };
  // setGraphData(newGraphData);

  return <Line type="line" data={graphData} options={LineChartOptions} />;
};

type HistoryLineChartProps = {
  ticker: string;
};

const HistoryLineChart: React.FC<HistoryLineChartProps> = (props) => {
  const { ticker } = props;
  const [range, setRange] = useState<rangeType>(7);
  const handleRangeButtonClick = (range: rangeType) => {
    setRange(range);
  };

  // return <p>{JSON.stringify(histories)}</p>;
  return (
    <Box gap="medium">
      <LineChart ticker={ticker} range={range} />
      <Box direction="row" gap="small" justify="center">
        {([
          ["1W", 7],
          ["1M", 30],
          ["3M", 90],
          ["1Y", 365],
          ["5Y", 1825],
        ] as [string, rangeType][]).map((buttonRange) => (
          <Button
            key={buttonRange[0]}
            primary
            label={buttonRange[0]}
            active={range === buttonRange[1]}
            size="small"
            onClick={() => handleRangeButtonClick(buttonRange[1])}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HistoryLineChart;
