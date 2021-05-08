const { gql } = require("apollo-server");
const yahooFinance = require("yahoo-finance2").default;

const typeDefs = gql`
  type TrendingQuote {
    symbol: String
  }

  type Trendings {
    count: Int
    quotes: [TrendingQuote]
    jobTimestamp: Int
    startInterval: Int
  }
`;

const resolvers = {
  Query: {
    trendings: async (parent, args, context, info) => {
      try {
        const rawData = await yahooFinance.trendingSymbols(
          "US",
          { count: 5 }
        );
        return rawData;
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
