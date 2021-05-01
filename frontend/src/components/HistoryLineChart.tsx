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
  period: "d" | "w" | "m";
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { ticker, period } = props;

  const NUMBER_OF_DAYS_TO_QUERY = 120;
  const { loading, error, data } = useQuery(GET_HISTORY_BY_TICKER, {
    variables: {
      ticker,
      from: parseDate(Date.now() - NUMBER_OF_DAYS_TO_QUERY * (period === "d" ? 1 : period === "w" ? 7 : 30) * MS_IN_A_DAY),
      to: parseDate(Date.now()),
      period,
    },
  });

  if (loading) return <Line type="line" data={{}} options={LineChartOptions} />; // This chart with no data is for placeholding
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

type PeriodType = "d" | "w" | "m";

const HistoryLineChart: React.FC<HistoryLineChartProps> = (props) => {
  const { ticker } = props;
  const [period, setPeriod] = useState<PeriodType>("d");
  const handlePeriodButtonClick = (period: PeriodType) => {
    setPeriod(period);
  };

  // return <p>{JSON.stringify(histories)}</p>;
  return (
    <Box gap="medium">
      <LineChart ticker={ticker} period={period} />
      <Box direction="row" gap="small" justify="center">
        {(["d", "w", "m"] as PeriodType[]).map((buttonPeriod) => (
          <Button
            key={buttonPeriod}
            primary
            label={buttonPeriod.toUpperCase()}
            active={period === buttonPeriod}
            size="small"
            onClick={() => handlePeriodButtonClick(buttonPeriod)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HistoryLineChart;
