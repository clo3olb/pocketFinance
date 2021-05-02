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
  regularMarketChangePercent: string
  regularMarketChange: string
  regularMarketTime: string
  priceHint: string
  regularMarketPrice: string
  regularMarketDayHigh: string
  regularMarketDayLow: string
  regularMarketVolume: string
  averageDailyVolume10Day: string
  averageDailyVolume3Month: string
  regularMarketPreviousClose: string
  regularMarketSource: string
  regularMarketOpen: string
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
