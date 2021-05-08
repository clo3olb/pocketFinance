const { gql } = require("apollo-server-lambda")
const yahooFinance = require("yahoo-finance2").default

const typeDefs = gql`
  type NewsItem {
    uuid: String
    title: String
    publisher: String
    link: String
    providerPublishTime: String
    type: String
  }
  type News {
    news: [NewsItem]
  }
`

const resolvers = {
  Query: {
    newsByTicker: async (parent, { ticker }, context, info) => {
      try {
        const data = await yahooFinance.search(ticker, {
          newsCount: 12,
        })
        return data
      } catch (err) {
        console.error(err)
        return err
      }
    },
  },
}

module.exports = { typeDefs, resolvers }

// (async () => {
//   const data = await require("yahoo-finance2").default.
//   console.log(data);
// })();
