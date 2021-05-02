import React from "react"
import { useQuery, gql } from "@apollo/client"
import { Card, CardHeader, CardBody, CardFooter } from "components/Card"
import { Heading, Box, Text, TableRow, TableBody, TableCell, Table, Spinner } from "grommet"
// import { Add } from "grommet-icons";
import HistoryLineChart from "components/HistoryLineChart"
import { PriceType } from "types/QueryDataType"
import Message from "./Message"

const GET_PRICE_BY_TICKER = gql`
  query priceByTicker($ticker: String) {
    price: priceByTicker(ticker: $ticker) {
      symbol
      regularMarketPreviousClose
      regularMarketPrice
      regularMarketDayLow
      regularMarketDayHigh
      regularMarketDayLow
      regularMarketOpen
      regularMarketChange
      regularMarketChangePercent
      longName
    }
  }
`

type StockPriceCardProps = {
  ticker: string
}

const StockPriceCard: React.FC<StockPriceCardProps> = (props) => {
  const { ticker } = props

  const { loading, error, data } = useQuery(GET_PRICE_BY_TICKER, {
    variables: { ticker },
  })

  if (loading)
    return (
      <Box flex justify="center" align="center">
        <Spinner size="large" />
      </Box>
    )
  if (error) return <Message size="large" type="error" message="Error :(" />
  if (data.price === null || data.price === undefined)
    return <Message size="large" type="unknown" message="No Data Found" />

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
        <Box margin={{ bottom: "medium" }} direction="row" align="end" gap="small" wrap>
          <Text weight="bold" size="2xl">
            ${priceData.regularMarketPrice}
          </Text>
          <Text size="large" color={isChangePositive ? "green" : "red"}>
            {("$" + Number(change).toFixed(2).toString()).replace("$-", "-$")}
            {`(${(changePercent * 100).toFixed(2)}%)`}
          </Text>
        </Box>
        <HistoryLineChart ticker={ticker} />
      </CardBody>
      <CardFooter>
        <Box flex>
          <Table>
            <TableBody>
              {[
                ["Open", priceData.regularMarketOpen],
                ["Close", priceData.regularMarketPreviousClose],
                ["High", priceData.regularMarketDayHigh],
                ["Low", priceData.regularMarketDayLow],
              ].map((row) => (
                <TableRow key={row[0]} className="stockPriceCard__tableRow">
                  <TableCell className="stockPriceCard__tableCell">
                    <Text size="small">
                      <strong>{row[0]}</strong>
                    </Text>
                  </TableCell>
                  <TableCell justify="end" className="stockPriceCard__tableCell">
                    <Text textAlign="end" size="small">
                      {row[1]}
                    </Text>
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
