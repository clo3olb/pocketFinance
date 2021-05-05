import React from "react"
import { useQuery } from "@apollo/client"
import { Card, CardHeader, CardBody } from "components/Card"
import { Box, Text } from "grommet"
import { EarningsType } from "types/QueryDataType"
import { Bar } from "react-chartjs-2"
import { ChartDataType } from "types/ChartDataType"
import { EarningsBarChartOptions } from "etc/chartOptions"
import Translation from "./Translation"
import { BarChart } from "grommet-icons"
import { GET_EARNINGS_BY_TICKER } from "etc/graphQlQueries"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import NoDataMessage from "./NoDataMessage"

type StockEarningsCardProps = {
  ticker: string
}

const StockEarningsCard: React.FC<StockEarningsCardProps> = (props) => {
  const { ticker } = props

  const { loading, error, data } = useQuery(GET_EARNINGS_BY_TICKER, {
    variables: { ticker },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />
  if (data.earnings === null || data.earnings === undefined) return <NoDataMessage />
  const earningsData: EarningsType = data.earnings
  const {
    earningsChart: {
      currentQuarterEstimate: currEst,
      currentQuarterEstimateDate: currEstDate,
      currentQuarterEstimateYear: currEstYear,
      quarterly: earningsQuarterly,
    },
  } = earningsData

  const earningsBarChartData: ChartDataType = {
    labels: [
      ...earningsQuarterly.map((item) => `${item.date.slice(2)} - ${item.date.slice(0, 2)}`),
      `${currEstYear} - ${currEstDate}`,
    ],
    datasets: [
      {
        label: "Estimate",
        data: [...earningsQuarterly.map((item) => item.estimate), currEst],
        backgroundColor: "#cab7f0",
        borderWidth: 0,
      },
      {
        label: "Actual",
        data: [...earningsQuarterly.map((item) => item.actual)],
        backgroundColor: "#7D4CDB",
        borderWidth: 0,
      },
    ],
  }

  return (
    <Card animation={["slideUp", "fadeIn"]}>
      <CardHeader>
        <Box direction="row" align="center" gap="small">
          <BarChart />
          <Text weight="bold" size="large">
            <Translation text={{ en: "Earnings", kr: "수익" }} />
          </Text>
        </Box>
      </CardHeader>
      <CardBody>
        <Bar data={earningsBarChartData} type="bar" options={EarningsBarChartOptions} />
      </CardBody>
    </Card>
  )
}

export default StockEarningsCard
