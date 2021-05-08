const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    priceByTicker(ticker: String): Price
    summaryDetailByTicker(ticker: String): SummaryDetail
    historyByTicker(
      ticker: String
      from: String
      to: String
      period: String
    ): [History]
    dividendHistoryByTicker(
      ticker: String
      from: String
    ): [DividendHistory]
    earningsByTicker(ticker: String): Earnings
    autoComplete(query: String): AutoComplete
    recommendationsBySymbol(ticker: String): Recommendations
    calendarEventsByTicker(ticker: String): CalendarEvents
    newsByTicker(ticker: String): News
    trendings: Trendings
  }
`;

module.exports = typeDefs;
