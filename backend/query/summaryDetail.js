const { gql } = require("apollo-server");
const yahooFinance = require("yahoo-finance");

const typeDefs = gql`
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
