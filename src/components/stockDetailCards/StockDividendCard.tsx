import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Text,
} from "grommet";
import { Alert, Analytics } from "grommet-icons";
import Translation from "components/Translation";
import { GET_DIVIDENDS_INFORMATION_BY_TICKER } from "etc/graphQlQueries";
import LoadingSpinner from "components/LoadingSpinner";
import NoDataMessage from "components/NoDataMessage";
import {
  CalendarEventsType,
  DividendHistoryType,
  PriceType,
  SummaryDetailType,
} from "types/QueryDataType";
import { MS_IN_A_DAY, parseDate } from "etc/smallFunctions";
import { LanguageType } from "components/Translation";
import StockDetailCardTemplate from "template/StockDetailCardTemplate";

const IconWrapper = () => <Analytics color="neutral-1" />;

type StockDividendCardPropsProps = {
  ticker: string;
};

const StockDividendCard: React.FC<StockDividendCardPropsProps> = ({
  ticker,
}) => {
  const { loading, error, data } = useQuery(
    GET_DIVIDENDS_INFORMATION_BY_TICKER,
    {
      variables: {
        ticker,
        from: parseDate(Date.now() - MS_IN_A_DAY * 365 * 5),
      },
    }
  );

  if (loading) return <LoadingSpinner />;
  if (
    error ||
    data.calendarEvents === null ||
    data.calendarEvents === undefined ||
    data.dividendHistory === null ||
    data.dividendHistory === undefined ||
    data.summaryDetail === null ||
    data.summaryDetail === undefined ||
    data.price === null ||
    data.price === undefined
  )
    return (
      <StockDetailCardTemplate
        header={{
          icon: <IconWrapper />,
          title: { en: "Dividend Information", kr: "배당 정보" },
        }}
        body={{ pad: "none" }}
      >
        <NoDataMessage />
      </StockDetailCardTemplate>
    );

  const calendarData: CalendarEventsType = data.calendarEvents;
  const divHistory: DividendHistoryType = data.dividendHistory;
  const summary: SummaryDetailType = data.summaryDetail;
  const price: PriceType = data.price;

  return (
    <StockDetailCardTemplate
      header={{
        icon: <IconWrapper />,
        title: { en: "Dividend Information", kr: "배당 정보" },
      }}
      body={{ pad: "none" }}
    >
      <Tabs>
        <Tab
          title={
            <Text weight="bold">
              <Translation text={{ en: "Basic Information", kr: "기본정보" }} />
            </Text>
          }
        >
          <Box>
            <Table>
              <TableBody>
                {([
                  [
                    { en: "Earnings Date", kr: "실적 발표일" },
                    parseDate(calendarData.earnings.earningsDate),
                  ],
                  [
                    { en: "Dividend Date", kr: "배당지급일" },
                    parseDate(calendarData.dividendDate),
                  ],
                  [
                    { en: "Ex-Dividend Date", kr: "배당락일" },
                    parseDate(calendarData.exDividendDate),
                  ],
                  [
                    {
                      en: "Dividend Yield(5Y)",
                      kr: "평균 배당 수익(최근 5년)",
                    },
                    `${summary.fiveYearAvgDividendYield} ${price.currency}`,
                  ],
                  [
                    {
                      en: "Dividend Rate(TTM)",
                      kr: "연간 배당 수익(최근 1년)",
                    },
                    `${summary.trailingAnnualDividendRate} ${price.currency}`,
                  ],
                  [
                    { en: "Dividend Yield(TTM)", kr: "배당 수익률(최근 1년)" },
                    `${(summary.trailingAnnualDividendYield * 100).toFixed(
                      2
                    )}%`,
                  ],
                  [
                    { en: "Dividend Rate(FWD)", kr: "연간 배당 수익(예상)" },
                    `${summary.dividendRate} ${price.currency}`,
                  ],
                  [
                    { en: "Dividend Yield(FWD)", kr: "배당 수익률(예상)" },
                    `${(summary.dividendYield * 100).toFixed(2)}%`,
                  ],
                ] as DivInfoArrayType[]).map((listItem, index) => (
                  <DivInfoTableCell
                    key={`${listItem[1]}${index}`}
                    index={index}
                    item1={listItem[0]}
                    item2={listItem[1]}
                  />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Tab>
        <Tab
          title={
            <Text weight="bold">
              <Translation text={{ en: "Dividend History", kr: "배당 기록" }} />
            </Text>
          }
        >
          <Box>
            {divHistory.length > 0 ? (
              <Table>
                <TableBody>
                  {divHistory
                    .slice()
                    .sort((itemA, itemB) => (itemA.date > itemB.date ? -1 : 1))
                    .slice(0, 7)
                    .map((history, index) => (
                      <TableRow key={history.date}>
                        <TableCell
                          scope="row"
                          background={`light-${(index % 2) + 1}`}
                        >
                          {parseDate(history.date)}
                        </TableCell>
                        <TableCell background={`light-${(index % 2) + 1}`}>
                          <Text weight="bold">
                            {history.dividends}{" "}
                            <Text weight="normal">{price.currency}</Text>
                          </Text>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <Box
                background="status-unknown"
                pad="large"
                align="center"
                gap="medium"
              >
                <Alert size="large" />
                <Text weight="bold">
                  <Translation
                    text={{
                      en: "No Data Found",
                      kr: "해당 정보를 찾을 수 없습니다.",
                    }}
                  />
                </Text>
              </Box>
            )}
          </Box>
        </Tab>
      </Tabs>
    </StockDetailCardTemplate>
  );
};

type DivInfoArrayType = [LanguageType, string];

type DivInfoTableCellProps = {
  item1: LanguageType;
  item2: string | number;
  index: number;
};

const DivInfoTableCell: React.FC<DivInfoTableCellProps> = ({
  item1,
  item2,
  index,
}) => {
  return (
    <TableRow>
      <TableCell background={`light-${(index % 2) + 1}`}>
        <Text>
          <Translation text={item1} />
        </Text>
      </TableCell>
      <TableCell background={`light-${(index % 2) + 1}`}>
        <Text weight="bold">{item2 ? item2 : "-"}</Text>
      </TableCell>
    </TableRow>
  );
};

export default StockDividendCard;
