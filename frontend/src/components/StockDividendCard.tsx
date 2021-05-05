import React from "react"
import { useQuery } from "@apollo/client"
import { Card, CardHeader, CardBody } from "components/Card"
import { Box, Grommet, Tab, Table, TableBody, TableCell, TableHeader, TableRow, Tabs, Text, ThemeType } from "grommet"
import { Alert, Analytics } from "grommet-icons"
import Translation from "./Translation"
import { GET_DIVIDENDS_INFORMATION_BY_TICKER } from "etc/graphQlQueries"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import NoDataMessage from "./NoDataMessage"
import { CalendarEventsType, DividendHistoryType, SummaryDetailType } from "types/QueryDataType"
import { MS_IN_A_DAY, parseDate } from "etc/smallFunctions"
import { LanguageType } from "components/Translation"
import AppTheme from "customTheme"
import { deepMerge } from "grommet/utils"

const customTabsTheme: ThemeType = {
  tabs: {
    gap: "medium",
    header: {
      extend: "box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);",
    },
    background: {
      color: "brand",
      opacity: "weak",
    },
  },
  tab: {
    active: {
      color: "red",
    },
    hover: {
      background: "background-back",
    },
    border: {
      side: "bottom",
      color: "background-back",
      active: {
        color: "brand",
      },
      hover: {
        color: "background-back",
      },
    },
    pad: "small",
    margin: "none",
  },
}
const customTableTheme: ThemeType = {
  table: {
    header: {
      pad: {
        horizontal: "medium",
        vertical: "small",
      },

      align: "center",
      border: "bottom",
    },
    body: {
      pad: {
        horizontal: "medium",
        vertical: "small",
      },
      align: "center",
    },
    footer: {
      align: "start",
      border: undefined,
      pad: { horizontal: "large", vertical: "small" },
      verticalAlign: "bottom",
    },
  },
}

type DivInfoArrayType = [LanguageType, string]

type DivInfoTableCellProps = {
  item1: LanguageType
  item2: string | number
  index: number
}

const DivInfoTableCell: React.FC<DivInfoTableCellProps> = ({ item1, item2, index }) => {
  return (
    <TableRow>
      <TableCell background={`light-${(index % 2) + 1}`}>
        <Text weight="bold">
          <Translation text={item1} />
        </Text>
      </TableCell>
      <TableCell background={`light-${(index % 2) + 1}`}>
        <Text>{item2 ? item2 : "-"}</Text>
      </TableCell>
    </TableRow>
  )
}

type StockDividendCardProps = {
  ticker: string
}

const StockDividendCard: React.FC<StockDividendCardProps> = (props) => {
  const { ticker } = props

  const { loading, error, data: divInfo } = useQuery(GET_DIVIDENDS_INFORMATION_BY_TICKER, {
    variables: { ticker, from: parseDate(Date.now() - MS_IN_A_DAY * 365 * 5) },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />
  if (
    divInfo.calendarEvents === null ||
    divInfo.calendarEvents === undefined ||
    divInfo.dividendHistory === null ||
    divInfo.dividendHistory === undefined ||
    divInfo.summaryDetail === null ||
    divInfo.summaryDetail === undefined
  )
    return <NoDataMessage />

  const calendarData: CalendarEventsType = divInfo.calendarEvents
  const divHistory: DividendHistoryType = divInfo.dividendHistory
  const summary: SummaryDetailType = divInfo.summaryDetail
  console.log(calendarData)
  return (
    <Card animation={["slideUp", "fadeIn"]}>
      <CardHeader>
        <Analytics />
        <Text weight="bold" size="large">
          <Translation text={{ en: "Dividend Information", kr: "배당 정보" }} />
        </Text>
      </CardHeader>
      <CardBody gap="medium" pad="none">
        <Grommet theme={deepMerge(AppTheme, customTabsTheme, customTableTheme)}>
          <Tabs>
            <Tab title={<Translation text={{ en: "Basic Information", kr: "기본정보" }} />}>
              <Box>
                <Table>
                  <TableBody>
                    {([
                      [{ en: "Earnings Date", kr: "실적 발표일" }, parseDate(calendarData.earnings.earningsDate)],
                      [{ en: "Dividend Date", kr: "배당지급일" }, parseDate(calendarData.dividendDate)],
                      [{ en: "Ex-Dividend Date", kr: "배당락일" }, parseDate(calendarData.exDividendDate)],
                      [{ en: "Dividend Yield(5Y)", kr: "평균 배당 수익(최근 5년)" }, summary.fiveYearAvgDividendYield],
                      [{ en: "Dividend Rate(TTM)", kr: "연간 배당 수익(최근 1년)" }, summary.trailingAnnualDividendRate],
                      [{ en: "Dividend Yield(TTM)", kr: "배당 수익률(최근 1년)" }, `${(summary.trailingAnnualDividendYield * 100).toFixed(2)}%`],
                      [{ en: "Dividend Rate(FWD)", kr: "연간 배당 수익(예상)" }, summary.dividendRate],
                      [{ en: "Dividend Yield(FWD)", kr: "배당 수익률(예상)" }, `${(summary.dividendYield * 100).toFixed(2)}%`],
                    ] as DivInfoArrayType[]).map((listItem, index) => (
                      <DivInfoTableCell key={`${listItem[1]}${index}`} index={index} item1={listItem[0]} item2={listItem[1]} />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Tab>
            <Tab title={<Translation text={{ en: "Dividend History", kr: "배당 기록" }} />}>
              <Box>
                {divHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell scope="col" background={"light-1"}>
                          <Text weight="bold">
                            <Translation text={{ en: "Ex-Dividend Date", kr: "배당락일" }} />
                          </Text>
                        </TableCell>
                        <TableCell scope="col" background={"light-1"}>
                          <Text weight="bold" textAlign="end">
                            <Translation text={{ en: "Dividend/Share", kr: "배당금/1주" }} />
                          </Text>
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {divHistory
                        .slice()
                        .sort((itemA, itemB) => (itemA.date > itemB.date ? -1 : 1))
                        .slice(0, 7)
                        .map((history, index) => (
                          <TableRow key={history.date}>
                            <TableCell scope="row" background={`light-${(index % 2) + 1}`}>
                              {parseDate(history.date)}
                            </TableCell>
                            <TableCell fill background={`light-${(index % 2) + 1}`}>
                              <Text>{history.dividends}</Text>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Box background="status-unknown" pad="large" align="center" gap="medium">
                    <Alert size="large" />
                    <Text weight="bold">
                      <Translation text={{ en: "No Data Found", kr: "해당 정보를 찾을 수 없습니다." }} />
                    </Text>
                  </Box>
                )}
              </Box>
            </Tab>
          </Tabs>
        </Grommet>
      </CardBody>
    </Card>
  )
}

export default StockDividendCard
