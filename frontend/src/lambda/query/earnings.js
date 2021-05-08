const { gql } = require("apollo-server-lambda")
const yahooFinance = require("yahoo-finance")

const typeDefs = gql`
  type QuarterlyEarningsData {
    date: String
    actual: Float
    estimate: Float
  }
  type FinancialChartData {
    date: String
    revenue: String
    earnings: String
  }
  type FinancialChart {
    yearly: [FinancialChartData]
    quarterly: [FinancialChartData]
  }
  type EarningsChart {
    quarterly: [QuarterlyEarningsData]
    currentQuarterEstimate: Float
    currentQuarterEstimateDate: String
    currentQuarterEstimateYear: String
  }
  type Earnings {
    maxAge: Int
    earningsChart: EarningsChart
    financialsChart: FinancialChart
    financialCurrency: String
  }
`

const resolvers = {
  Query: {
    earningsByTicker: async (parent, { ticker }, context, info) => {
      try {
        const rawData = await yahooFinance.quote({
          symbol: ticker,
          modules: ["earnings"], // see the docs for the full list
        })
        return rawData.earnings
      } catch (err) {
        console.error(err)
        return err
      }
    },
  },
}

module.exports = { typeDefs, resolvers }
