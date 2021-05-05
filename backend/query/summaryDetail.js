const { gql } = require("apollo-server");
const yahooFinance = require("yahoo-finance");

const typeDefs = gql`
  type SummaryDetail {
    maxAge: Int
    priceHint: String
    previousClose: Float
    open: Float
    dayLow: Float
    dayHigh: Float
    regularMarketPreviousClose: Float
    regularMarketOpen: Float
    regularMarketDayLow: Float
    regularMarketDayHigh: Float
    dividendRate: Float
    dividendYield: Float
    exDividendDate: Float
    payoutRatio: String
    fiveYearAvgDividendYield: Float
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
    fiftyTwoWeekLow: Float
    fiftyTwoWeekHigh: Float
    priceToSalesTrailing12Months: String
    fiftyDayAverage: String
    twoHundredDayAverage: String
    trailingAnnualDividendRate: Float
    trailingAnnualDividendYield: Float
  }
`;

const resolvers = {
  Query: {
    summaryDetailByTicker: async (
      parent,
      { ticker },
      context,
      info
    ) => {
      try {
        const rawData = await yahooFinance.quote({
          symbol: ticker,
          modules: ["summaryDetail"], // see the docs for the full list
        });
        return rawData.summaryDetail;
      } catch (err) {
        console.error(err);
        return err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
