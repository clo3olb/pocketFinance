import React from "react"
import { useQuery } from "@apollo/client"
import { Card, CardHeader, CardBody, CardFooter } from "components/Card"
import { Heading, Box, Text, TableRow, TableBody, TableCell, Table } from "grommet"
import { CaretUpFill, CaretDownFill } from "grommet-icons"
import HistoryLineChart from "components/HistoryLineChart"
import { PriceType } from "types/QueryDataType"
import Translation from "./Translation"
import { GET_PRICE_BY_TICKER } from "etc/graphQlQueries"

import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import NoDataMessage from "./NoDataMessage"

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
  if (data.price === null || data.price === undefined) return <NoDataMessage />

  const priceData: PriceType = data.price
  const { regularMarketChange: change, regularMarketChangePercent: changePercent } = priceData
  const isChangePositive = change > 0
  return (
    <Card animation={["slideUp", "fadeIn"]} className="stockPriceCard">
      <CardHeader background="brand" direction="column" align="start" gap="small">
        <Box direction="row" fill="horizontal">
          <Box flex>
            <Heading margin="none" size="medium">
              {priceData.symbol}
            </Heading>
            <Text size="medium">{priceData.longName}</Text>
          </Box>
          {/* <Button icon={<Add />} /> */}
        </Box>
      </CardHeader>
      <CardBody>
        <Box margin={{ bottom: "medium" }} align="start" gap="small" wrap>
          <Box direction="row" gap="small" align="end">
            <Text weight="bold" size="2xl">
              {priceData.regularMarketPrice}
            </Text>
            <Text size="large" color="dark-4" weight="bold">
              {priceData.currency}
            </Text>
          </Box>
          <Box direction="row" align="center">
            {isChangePositive ? <CaretUpFill color="green" /> : <CaretDownFill color="red" />}
            <Text size="large" color={isChangePositive ? "green" : "red"}>
              {change.toFixed(2)}
              {`(${(changePercent * 100).toFixed(2)}%)`}
            </Text>
          </Box>
        </Box>
        <HistoryLineChart ticker={ticker} />
      </CardBody>
      <CardFooter>
        <Box flex>
          <Table>
            <TableBody>
              {[
                [<Translation text={{ en: "Open", kr: "시가" }} />, priceData.regularMarketOpen],
                [<Translation text={{ en: "Close", kr: "종가" }} />, priceData.regularMarketPreviousClose],
                [<Translation text={{ en: "High", kr: "고가" }} />, priceData.regularMarketDayHigh],
                [<Translation text={{ en: "Low", kr: "저가" }} />, priceData.regularMarketDayLow],
              ].map((row, i) => (
                <TableRow key={i} className="stockPriceCard__tableRow">
                  <TableCell className="stockPriceCard__tableCell">
                    <Text weight="bold">{row[0]}</Text>
                  </TableCell>
                  <TableCell justify="end" className="stockPriceCard__tableCell">
                    <Text textAlign="end">{row[1]}</Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardFooter>
    </Card>
  )
}

export default StockPriceCard
