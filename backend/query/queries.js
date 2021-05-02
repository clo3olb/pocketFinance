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
    earningsByTicker(ticker: String): Earnings
  }
`;

module.exports = typeDefs;
