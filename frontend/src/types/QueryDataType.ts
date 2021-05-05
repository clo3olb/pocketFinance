export type PriceType = {
  maxAge: string
  preMarketChangePercent: string
  preMarketChange: string
  preMarketTime: string
  preMarketPrice: string
  preMarketSource: string
  postMarketChangePercent: string
  postMarketChange: string
  postMarketTime: string
  postMarketPrice: string
  postMarketSource: string
  regularMarketChangePercent: number
  regularMarketChange: number
  regularMarketTime: string
  priceHint: string
  regularMarketPrice: number
  regularMarketDayHigh: number
  regularMarketDayLow: number
  regularMarketVolume: number
  averageDailyVolume10Day: string
  averageDailyVolume3Month: string
  regularMarketPreviousClose: number
  regularMarketSource: string
  regularMarketOpen: number
  exchange: string
  exchangeName: string
  marketState: string
  quoteType: string
  symbol: string
  underlyingSymbol: string
  shortName: string
  longName: string
  currency: string
  quoteSourceName: string
  currencySymbol: string
}

export type SummaryDetailType = {
  maxAge: number
  priceHint: string
  previousClose: number
  open: number
  dayLow: number
  dayHigh: number
  regularMarketPreviousClose: number
  regularMarketOpen: number
  regularMarketDayLow: number
  regularMarketDayHigh: number
  dividendRate: number
  dividendYield: number
  exDividendDate: number
  payoutRatio: string
  fiveYearAvgDividendYield: number
  beta: string
  trailingPE: string
  forwardPE: string
  volume: string
  regularMarketVolume: string
  averageVolume: string
  averageVolume10days: string
  averageDailyVolume10Day: string
  bid: string
  ask: string
  bidSize: string
  askSize: string
  marketCap: string
  fiftyTwoWeekLow: number
  fiftyTwoWeekHigh: number
  priceToSalesTrailing12Months: string
  fiftyDayAverage: string
  twoHundredDayAverage: string
  trailingAnnualDividendRate: number
  trailingAnnualDividendYield: number
}

export type HistoryType = {
  date: number
  open: number
  high: number
  low: number
  close: number
  adjClose: number
  volume: number
  symbol: string
}

type QuarterlyEarningsData = {
  date: string
  actual: number
  estimate: number
}
type FinancialChartData = {
  date: string
  revenue: string
  earnings: string
}
type FinancialChart = {
  yearly: FinancialChartData[]
  quarterly: FinancialChartData[]
}
type EarningsChart = {
  quarterly: QuarterlyEarningsData[]
  currentQuarterEstimate: number
  currentQuarterEstimateDate: string
  currentQuarterEstimateYear: string
}
export type EarningsType = {
  maxAge: number
  earningsChart: EarningsChart
  financialsChart: FinancialChart
  financialCurrency: string
}

type AutoCompleteItem = {
  symbol: string
  name: string
  exch: string
  type: string
  exchDisp: string
  typeDisp: string
}

export type AutoComplete = {
  query: String
  result: AutoCompleteItem[]
}

export type RecommendationsType = {
  symbol: string
  recommendedSymbols: {
    symbol: string
    score: number
  }[]
}

export type CalendarEventsType = {
  maxAge: number
  earnings: {
    earningsDate: number
    earningsAverage: number
    earningsLow: number
    earningsHigh: number
    revenueAverage: number
    revenueLow: number
    revenueHigh: number
  }
  exDividendDate: number
  dividendDate: number
}

export type DividendHistoryType = {
  date: number
  dividends: number
  symbol: string
}[]
