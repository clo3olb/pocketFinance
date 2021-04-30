const { ApolloServer, gql } = require("apollo-server");
const yahooFinance = require("yahoo-finance");

const typeDefs = gql`
  type Quote {
    ticker: String
    regularMarketPreviousClose: Float
    regularMarketPrice: Float
    regularMarketDayHigh: Float
    regularMarketDayLow: Float
    regularMarketOpen: Float
    longName: String
  }

  type History {
    date: String
    open: Float
    high: Float
    low: Float
    close: Float
    adjClose: Float
    volume: Int
    symbol: String
  }

  # 최종
  type Query {
    quoteByTicker(ticker: String): Quote
    historyByTicker(
      ticker: String
      from: String
      to: String
      period: String
    ): [History]
  }
`;

const resolvers = {
  Query: {
    async quoteByTicker(parent, args, context, info) {
      try {
        const rawData = await yahooFinance.quote({
          symbol: args.ticker,
          modules: ["price"], // see the docs for the full list
        });

        const {
          regularMarketPreviousClose,
          regularMarketPrice,
          regularMarketDayHigh,
          regularMarketDayLow,
          regularMarketOpen,
          longName,
        } = rawData.price;
        const resQuote = {
          regularMarketPreviousClose,
          regularMarketPrice,
          regularMarketDayHigh,
          regularMarketDayLow,
          regularMarketOpen,
          longName,
          ticker: args.ticker,
        };
        return resQuote;
      } catch (err) {
        console.error(err);
      }
    },
    async historyByTicker(parent, args, context, info) {
      try {
        const history = await yahooFinance.historical({
          symbol: args.ticker,
          from: args.from,
          to: args.to,
          period: "d",
        });
        return history;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
