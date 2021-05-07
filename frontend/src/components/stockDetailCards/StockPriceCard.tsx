import React from "react"
import { useQuery } from "@apollo/client"
import { Card, CardHeader, CardBody, CardFooter } from "components/Card"
import { Heading, Box, Text, TableRow, TableBody, TableCell, Table } from "grommet"
import { CaretUpFill, CaretDownFill } from "grommet-icons"
import HistoryLineChart from "components/stockDetailCards/HistoryLineChart"
import { PriceType, SummaryDetailType } from "types/QueryDataType"
import Translation from "components/Translation"
import { GET_PRICE_BY_TICKER } from "etc/graphQlQueries"

import LoadingSpinner from "components/LoadingSpinner"
import ErrorMessage from "components/ErrorMessage"
import NoDataMessage from "components/NoDataMessage"

type StockPriceCardProps = {
  ticker: string
}

const StockPriceCard: React.FC<StockPriceCardProps> = (props) => {
  const { ticker } = props

  const { loading, error, data } = useQuery(GET_PRICE_BY_TICKER, {
    variables: { ticker },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />
  if (!data.price || !data.summary) return <NoDataMessage />

  const priceData: PriceType = data.price
  const summaryData: SummaryDetailType = data.summary
  const { regularMarketChange: change, regularMarketChangePercent: changePercent } = priceData
  const isChangePositive = change > 0
  return (
    <Card animation={["slideUp", "fadeIn"]} className="stockPriceCard">
      <CardHeader direction="column" align="start" gap="small">
        <Box direction="row" fill="horizontal">
          <Box flex>
            <Heading margin="none" size="medium" color="neutral-1">
              {priceData.symbol}
            </Heading>
            <Text size="medium" color="neutral-1">
              {priceData.longName}
            </Text>
          </Box>
          {/* <Button icon={<Add />} /> */}
        </Box>
      </CardHeader>
      <CardBody>
        <Box margin={{ bottom: "medium" }} align="start" gap="small" wrap>
          <Box direction="row" gap="small" align="end">
            <Text weight="bold" size="2xl">
              {priceData.regularMarketPrice.toFixed(2)}
            </Text>
            <Text size="large" color="dark-4" weight="bold">
              {priceData.currency}
            </Text>
          </Box>
          <Box direction="row" align="center">
            {isChangePositive ? <CaretUpFill color="accent-1" /> : <CaretDownFill color="accent-2" />}
            <Text size="large" color={isChangePositive ? "accent-1" : "accent-2"}>
              {change.toFixed(2)}
              {`(${(changePercent * 100).toFixed(2)}%)`}
            </Text>
          </Box>
        </Box>
        <HistoryLineChart ticker={ticker} />
      </CardBody>
      <CardFooter>
        <Box flex gap="xsmall">
          {[
            [<Translation text={{ en: "Open", kr: "시가" }} />, summaryData.open.toFixed(2)],
            [<Translation text={{ en: "High", kr: "고가" }} />, summaryData.dayHigh.toFixed(2)],
            [<Translation text={{ en: "Low", kr: "저가" }} />, summaryData.dayLow.toFixed(2)],
            [
              <Translation text={{ en: "52 Weeks Range", kr: "52주 최저-최고" }} />,
              `${summaryData.fiftyTwoWeekLow.toFixed(2)} - ${summaryData.fiftyTwoWeekHigh.toFixed(2)}`,
            ],
            [<Translation text={{ en: "PE Ratio(TTM)", kr: "PER" }} />, summaryData.trailingPE.toFixed(2)],
            [<Translation text={{ en: "Volume", kr: "거래량" }} />, summaryData.regularMarketVolume],
          ].map((item, index) => (
            <>
              {index > 0 && <Box border="top"></Box>}
              <Box margin={index > 0 ? { top: "xsmall" } : undefined} key={index} direction="row" justify="between">
                <Text weight="bold">{item[0]}</Text>
                <Text>{item[1]}</Text>
              </Box>
            </>
          ))}
        </Box>
      </CardFooter>
    </Card>
  )
}

export default StockPriceCard
