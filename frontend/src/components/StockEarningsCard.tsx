import React from "react"
import { useQuery, gql } from "@apollo/client"
import { Card, CardHeader, CardBody } from "components/Card"
import { Box, Text, Spinner } from "grommet"
import { EarningsType } from "types/QueryDataType"
import { Bar } from "react-chartjs-2"
import { ChartDataType } from "types/ChartDataType"
import { EarningsBarChartOptions } from "etc/chartOptions"
import Message from "./Message"

const GET_EARNINGS_BY_TICKER = gql`
  query earningsByTicker($ticker: String) {
    earnings: earningsByTicker(ticker: $ticker) {
      maxAge
      earningsChart {
        quarterly {
          date
          actual
          estimate
        }
        currentQuarterEstimate
        currentQuarterEstimateDate
        currentQuarterEstimateYear
      }
      financialsChart {
        yearly {
          date
          revenue
          earnings
        }
      }
      financialCurrency
    }
  }
`

type StockEarningsCardProps = {
  ticker: string
}

const StockEarningsCard: React.FC<StockEarningsCardProps> = (props) => {
  const { ticker } = props

  const { loading, error, data } = useQuery(GET_EARNINGS_BY_TICKER, {
    variables: { ticker },
  })

  if (loading)
    return (
      <Box flex justify="center" align="center">
        <Spinner size="large" />
      </Box>
    )
  if (error) return <Message size="large" type="error" message="Error :(" />
  if (!data?.earnings) return <Message size="large" type="unknown" message="No Data Found" />
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
      <CardHeader background="brand" direction="column" align="start" gap="small">
        <Text weight="bold" size="large">
          Earnings
        </Text>
      </CardHeader>
      <CardBody>
        <Bar data={earningsBarChartData} type="bar" options={EarningsBarChartOptions} />
      </CardBody>
    </Card>
  )
}

export default StockEarningsCard
