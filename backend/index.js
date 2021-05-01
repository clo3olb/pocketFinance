const { ApolloServer, gql } = require("apollo-server");
const yahooFinance = require("yahoo-finance");

const typeDefs = gql`
  type Price {
    maxAge: String
    preMarketChangePercent: String
    preMarketChange: String
    preMarketTime: String
    preMarketPrice: String
    preMarketSource: String
    postMarketChangePercent: String
    postMarketChange: String
    postMarketTime: String
    postMarketPrice: String
    postMarketSource: String
    regularMarketChangePercent: Float
    regularMarketChange: Float
    regularMarketTime: String
    priceHint: String
    regularMarketPrice: Float
    regularMarketDayHigh: Float
    regularMarketDayLow: Float
    regularMarketVolume: String
    averageDailyVolume10Day: String
    averageDailyVolume3Month: String
    regularMarketPreviousClose: Float
    regularMarketSource: String
    regularMarketOpen: String
    exchange: String
    exchangeName: String
    marketState: String
    quoteType: String
    symbol: String
    underlyingSymbol: String
    shortName: String
    longName: String
    currency: String
    quoteSourceName: String
    currencySymbol: String
  }

  type SummaryDetail {
    maxAge: String
    priceHint: String
    previousClose: String
    open: String
    dayLow: String
    dayHigh: String
    regularMarketPreviousClose: String
    regularMarketOpen: String
    regularMarketDayLow: String
    regularMarketDayHigh: String
    dividendRate: String
    dividendYield: String
    exDividendDate: String
    payoutRatio: String
    fiveYearAvgDividendYield: String
    beta: String
    trailingPE: String
    forwardPE: String
    volume: String
    regularMarketVolume: String
    averageVolume: String
    averageVolume10days: String
    averageDailyVolume10Day: String
    bid: String
    ask: String
    bidSize: String
    askSize: String
    marketCap: String
    fiftyTwoWeekLow: String
    fiftyTwoWeekHigh: String
    priceToSalesTrailing12Months: String
    fiftyDayAverage: String
    twoHundredDayAverage: String
    trailingAnnualDividendRate: String
    trailingAnnualDividendYield: String
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
    priceByTicker(ticker: String): Price
    summaryDetailByTicker(ticker: String): SummaryDetail
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
    async priceByTicker(parent, { ticker }, context, info) {
      try {
        const rawData = await yahooFinance.quote({
          symbol: ticker,
          modules: ["price"], // see the docs for the full list
        });
        return rawData.price;
      } catch (err) {
        console.error(err);
      }
    },
    async summaryDetailByTicker(parent, { ticker }, context, info) {
      try {
        const rawData = await yahooFinance.quote({
          symbol: ticker,
          modules: ["summaryDetail"], // see the docs for the full list
        });
        return rawData.summaryDetail;
      } catch (err) {
        console.error(err);
      }
    },
    async historyByTicker(parent, { ticker, from, to, period }, context, info) {
      try {
        const history = await yahooFinance.historical({
          symbol: ticker,
          from,
          to,
          period,
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
