import { gql } from "@apollo/client"

export const GET_PRICE_BY_TICKER = gql`
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
      currency
    }
  }
`

export const GET_EARNINGS_BY_TICKER = gql`
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

export const GET_SEARCH_RESULT_BY_QUERY = gql`
  query autoComplete($query: String) {
    autoComplete: autoComplete(query: $query) {
      query
      result {
        symbol
        name
        exch
        type
        exchDisp
        typeDisp
      }
    }
  }
`

export const GET_RECOMMENDATIONS_BY_TICKER = gql`
  query recommendationsBySymbol($ticker: String) {
    recommendations: recommendationsBySymbol(ticker: $ticker) {
      symbol
      recommendedSymbols {
        symbol
        score
      }
    }
  }
`

export const GET_CALENDAR_EVENTS_BY_TICKER = gql`
  query calendarEventsByTicker($ticker: String) {
    calendarEvents: calendarEventsByTicker(ticker: $ticker) {
      maxAge
      earnings {
        earningsDate
        earningsAverage
        earningsLow
        earningsHigh
        revenueAverage
        revenueLow
        revenueHigh
      }
      exDividendDate
      dividendDate
    }
  }
`

export const GET_DIVIDENDS_INFORMATION_BY_TICKER = gql`
  query getCalendarEvents($ticker: String, $from: String) {
    calendarEvents: calendarEventsByTicker(ticker: $ticker) {
      maxAge
      earnings {
        earningsDate
        earningsAverage
        earningsLow
        earningsHigh
        revenueAverage
        revenueLow
        revenueHigh
      }
      exDividendDate
      dividendDate
    }
    dividendHistory: dividendHistoryByTicker(ticker: $ticker, from: $from) {
      date
      dividends
      symbol
    }
    summaryDetail: summaryDetailByTicker(ticker: $ticker) {
      dividendRate
      dividendYield
      exDividendDate
      fiveYearAvgDividendYield
      trailingAnnualDividendRate
      trailingAnnualDividendYield
    }
  }
`
