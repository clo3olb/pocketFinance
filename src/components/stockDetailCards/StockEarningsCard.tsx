import React from "react";
import { useQuery } from "@apollo/client";
import { EarningsType } from "types/QueryDataType";
import { Bar } from "react-chartjs-2";
import { ChartDataType } from "types/ChartDataType";
import { EarningsBarChartOptions } from "etc/chartOptions";
import { BarChart } from "grommet-icons";
import { GET_EARNINGS_BY_TICKER } from "etc/graphQlQueries";
import LoadingSpinner from "components/LoadingSpinner";
import NoDataMessage from "components/NoDataMessage";
import StockDetailCardTemplate from "template/StockDetailCardTemplate";
// import useFinancial from "hooks/useFinancial";

const IconWrapper = () => <BarChart color="neutral-1" />;

type StockEarningsCardProps = {
  ticker: string;
};

const StockEarningsCard: React.FC<StockEarningsCardProps> = ({ ticker }) => {
  const { loading, error, data } = useQuery(GET_EARNINGS_BY_TICKER, {
    variables: { ticker },
  });
  // const financial = useFinancial("tsla");

  if (loading) return <LoadingSpinner />;
  if (error || data.earnings === null || data.earnings === undefined)
    return (
      <StockDetailCardTemplate
        header={{ icon: IconWrapper, title: { en: "Earnings", kr: "수익" } }}
        body={{ pad: "none" }}
      >
        <NoDataMessage />
      </StockDetailCardTemplate>
    );

  const earningsData: EarningsType = data.earnings;
  const {
    earningsChart: {
      currentQuarterEstimate: currEst,
      currentQuarterEstimateDate: currEstDate,
      currentQuarterEstimateYear: currEstYear,
      quarterly: earningsQuarterly,
    },
  } = earningsData;

  const earningsBarChartData: ChartDataType = {
    labels: [
      ...earningsQuarterly.map(
        (item) => `${item.date.slice(2)} - ${item.date.slice(0, 2)}`
      ),
      `${currEstYear} - ${currEstDate}`,
    ],
    datasets: [
      {
        label: "Estimate",
        data: [...earningsQuarterly.map((item) => item.estimate), currEst],
        backgroundColor: "#ace3cb",
        borderWidth: 0,
      },
      {
        label: "Actual",
        data: [...earningsQuarterly.map((item) => item.actual)],
        backgroundColor: "#5BDEA4",
        borderWidth: 0,
      },
    ],
  };
  return (
    <StockDetailCardTemplate
      header={{ icon: <IconWrapper />, title: { en: "Earnings", kr: "수익" } }}
    >
      <Bar
        data={earningsBarChartData}
        type="bar"
        options={EarningsBarChartOptions}
      />
    </StockDetailCardTemplate>
  );
};

export default StockEarningsCard;
