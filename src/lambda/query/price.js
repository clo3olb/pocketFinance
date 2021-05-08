const { gql } = require("apollo-server-lambda")
const yahooFinance = require("yahoo-finance")

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
    symbol: ID
    underlyingSymbol: String
    shortName: String
    longName: String
    currency: String
    quoteSourceName: String
    currencySymbol: String
  }
`

const resolvers = {
  Query: {
    priceByTicker: async (parent, { ticker }, context, info) => {
      try {
        const rawData = await yahooFinance.quote({
          symbol: ticker,
          modules: ["price"], // see the docs for the full list
        })
        return rawData.price
      } catch (err) {
        console.error(err)
        return err
      }
    },
  },
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
}
