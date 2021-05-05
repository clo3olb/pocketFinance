const { gql } = require("apollo-server");
const yahooFinance = require("yahoo-finance2").default;

const typeDefs = gql`
  type RecommendedSymbols {
    symbol: String
    score: Float
  }

  type Recommendations {
    symbol: String
    recommendedSymbols: [RecommendedSymbols]
  }
`;

const resolvers = {
  Query: {
    recommendationsBySymbol: async (
      parent,
      { ticker },
      context,
      info
    ) => {
      try {
        const rawData = await yahooFinance.recommendationsBySymbol(
          ticker
        );
        return {
          symbol: rawData.symbol,
          recommendedSymbols: rawData.recommendedSymbols,
        };
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
