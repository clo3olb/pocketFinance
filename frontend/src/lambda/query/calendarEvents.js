const { gql } = require("apollo-server-lambda")
const { GraphQLScalarType, Kind } = require("graphql")
const yahooFinance = require("yahoo-finance")

const typeDefs = gql`
  scalar Date
  type CalendarEventsEarnings {
    earningsDate: Date
    earningsAverage: Float
    earningsLow: Float
    earningsHigh: Float
    revenueAverage: Float
    revenueLow: Float
    revenueHigh: Float
  }
  type CalendarEvents {
    maxAge: Int
    earnings: CalendarEventsEarnings
    exDividendDate: Float
    dividendDate: Float
  }
`

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return new Date(value * 1000).getTime() // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value) // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }
    return null // Invalid hard-coded value (not an integer)
  },
})

const resolvers = {
  Query: {
    calendarEventsByTicker: async (parent, { ticker }, context, info) => {
      try {
        const data = await yahooFinance.quote({
          symbol: ticker,
          modules: ["calendarEvents"], // optional; default modules.
        })
        return data.calendarEvents
      } catch (err) {
        console.error(err)
        return err
      }
    },
  },
  Date: dateScalar,
}

module.exports = { typeDefs, resolvers }
