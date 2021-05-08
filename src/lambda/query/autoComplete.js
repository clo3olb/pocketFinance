const { gql } = require("apollo-server-lambda")
const yahooFinance = require("yahoo-finance2").default

const typeDefs = gql`
  type AutoCompleteItem {
    symbol: String
    name: String
    exch: String
    type: String
    exchDisp: String
    typeDisp: String
  }

  type AutoComplete {
    query: String
    result: [AutoCompleteItem]
  }
`

const resolvers = {
  Query: {
    autoComplete: async (parent, { query }, context, info) => {
      try {
        const rawData = await yahooFinance.autoc(query)
        return {
          query: rawData.Query,
          result: rawData.Result,
        }
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
