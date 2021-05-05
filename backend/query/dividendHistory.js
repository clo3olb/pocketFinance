const { gql } = require("apollo-server");
const yahooFinance = require("yahoo-finance");

const typeDefs = gql`
  type DividendHistory {
    date: Float
    dividends: Float
    symbol: String
  }
`;

const resolvers = {
  Query: {
    dividendHistoryByTicker: async (
      parent,
      { ticker, from },
      context,
      info
    ) => {
      try {
        const dividendHistory = await yahooFinance.historical(
          {
            symbol: ticker,
            from,
            period: "v",
          }
        );
        return dividendHistory;
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
