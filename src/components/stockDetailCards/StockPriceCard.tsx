import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "components/Card";
import { Heading, Box, Text } from "grommet";
import { CaretUpFill, CaretDownFill } from "grommet-icons";
import HistoryLineChart from "components/stockDetailCards/HistoryLineChart";
import Translation from "components/Translation";
import NoDataMessage from "components/NoDataMessage";
import { toFixed } from "etc/smallFunctions";
import usePrice from "hooks/usePrice";

type StockPriceCardProps = {
  ticker: string;
};

const StockPriceCard: React.FC<StockPriceCardProps> = ({ ticker }) => {
  const price = usePrice(ticker);
  if (!price) return <NoDataMessage />;
  return (
    <Card animation={["slideUp", "fadeIn"]} className="stockPriceCard">
      <CardHeader direction="column" align="start" gap="small">
        <Box direction="row" fill="horizontal">
          <Box flex>
            <Heading margin="none" size="medium" color="neutral-1">
              {price.symbol}
            </Heading>
            <Text size="medium" color="neutral-1">
              {price.longName}
            </Text>
          </Box>
          {/* <Button icon={<Add />} /> */}
        </Box>
      </CardHeader>
      <CardBody>
        <Box margin={{ bottom: "medium" }} align="start" gap="small" wrap>
          <Box direction="row" gap="small" align="end">
            <Text weight="bold" size="2xl">
              {toFixed(price.regularMarketPrice, 2)}
            </Text>
            <Text size="large" color="dark-4" weight="bold">
              {price.currency}
            </Text>
          </Box>
          <Box direction="row" align="center">
            {price.regularMarketChange > 0 ? (
              <CaretUpFill color="accent-1" />
            ) : (
              <CaretDownFill color="accent-2" />
            )}
            <Text
              size="large"
              color={price.regularMarketChange > 0 ? "accent-1" : "accent-2"}
            >
              {toFixed(price.regularMarketChange, 2)}
              {`(${toFixed(price.regularMarketChangePercent, 2)}%)`}
            </Text>
          </Box>
        </Box>
        <HistoryLineChart ticker={ticker} />
      </CardBody>
      <CardFooter>
        <Box flex gap="xsmall">
          {[
            [
              <Translation text={{ en: "Open", kr: "시가" }} />,
              toFixed(price.regularMarketOpen, 2),
            ],
            [
              <Translation text={{ en: "High", kr: "고가" }} />,
              toFixed(price.regularMarketDayHigh, 2),
            ],
            [
              <Translation text={{ en: "Low", kr: "저가" }} />,
              toFixed(price.regularMarketDayLow, 2),
            ],
            [
              <Translation
                text={{ en: "52 Weeks Range", kr: "52주 최저-최고" }}
              />,
              `${toFixed(price.fiftyTwoWeekLow, 2)} - ${toFixed(
                price.fiftyTwoWeekHigh,
                2
              )}`,
            ],
            [
              <Translation text={{ en: "PE Ratio(TTM)", kr: "PER" }} />,
              toFixed(price.trailingPE, 2),
            ],
            [
              <Translation text={{ en: "Volume", kr: "거래량" }} />,
              price.regularMarketVolume,
            ],
          ].map((item, index) => (
            <Box key={index}>
              {index > 0 && <Box border="top"></Box>}
              <Box
                margin={index > 0 ? { top: "xsmall" } : undefined}
                direction="row"
                justify="between"
              >
                <Text weight="bold">{item[0]}</Text>
                <Text>{item[1]}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </CardFooter>
    </Card>
  );
};

export default StockPriceCard;
