import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, CardHeader, CardBody, CardFooter } from "components/Card";
import {
  Heading,
  Box,
  Button,
  Text,
  TableRow,
  TableBody,
  TableCell,
  Table,
  Spinner,
} from "grommet";
import { Add } from "grommet-icons";
import HistoryLineChart from "components/HistoryLineChart";
import { PriceType } from "types/QueryDataType";

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
`;

type StockDataCardType = {
  ticker: string;
};

const StockDataCard: React.FC<StockDataCardType> = (props) => {
  const { ticker } = props;

  const { loading, error, data } = useQuery(GET_PRICE_BY_TICKER, {
    variables: { ticker },
  });

  if (loading)
    return (
      <Box flex justify="center" align="center">
        <Spinner size="large" />
      </Box>
    );
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;
  if (data.price === null || data.price === undefined) return <p>NODATA</p>;

  const priceData: PriceType = data.price;
  return (
    <Card animation="slideUp" className="stockDataCard">
      <CardHeader
        background="brand"
        direction="column"
        align="start"
        gap="small"
      >
        <Box direction="row" fill="horizontal">
          <Box flex>
            <Heading margin="none" size="medium">
              {priceData.symbol}
            </Heading>
            <Text size="medium">{priceData.longName}</Text>
          </Box>
          <Button icon={<Add />} />
        </Box>
      </CardHeader>
      <CardBody>
        <Box
          margin={{ bottom: "medium" }}
          direction="row"
          align="end"
          gap="small"
          wrap
        >
          <Text weight="bold" size="2xl">
            ${priceData.regularMarketPrice}
          </Text>
          <Text size="large" color="green">
            {Number(priceData.regularMarketChange).toFixed(2)}
            {"("}
            {(priceData.regularMarketChangePercent * 100).toFixed(2)}%{")"}
          </Text>
        </Box>
        <HistoryLineChart ticker={ticker} />
      </CardBody>
      <CardFooter>
        <Box flex>
          <Table>
            <TableBody>
              {Object.keys(priceData).map((key) => (
                <TableRow key={key} className="stockDataCard__tableRow">
                  <TableCell className="stockDataCard__tableCell">
                    <Text size="small">
                      <strong>{key}</strong>
                    </Text>
                  </TableCell>
                  <TableCell justify="end" className="stockDataCard__tableCell">
                    <Text textAlign="end" size="small">
                      {priceData[key as keyof PriceType]}
                    </Text>
                  </TableCell>
                </TableRow>
              ))}
              {/* {[
                ["Previous Close", "$133.58"],
                ["Open", "$133.58"],
                ["High", "$133.58"],
                ["Low", "$133.58"],
              ].map((data) => (
                
              ))} */}
            </TableBody>
          </Table>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default StockDataCard;
