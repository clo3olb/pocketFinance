const { gql } = require("apollo-server-lambda")
const yahooFinance = require("yahoo-finance")

const typeDefs = gql`
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
`

const resolvers = {
  Query: {
    historyByTicker: async (parent, { ticker, from, period }, context, info) => {
      try {
        const history = await yahooFinance.historical({
          symbol: ticker,
          from,
          period,
        })
        return history
      } catch (err) {
        console.error(err)
        return err
      }
    },
  },
}

module.exports = { typeDefs, resolvers }
