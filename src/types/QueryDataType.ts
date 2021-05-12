export type PriceType = {
  language: string;
  region: string;
  quoteType: string;
  quoteSourceName: string;
  triggerable: boolean;
  currency: string;
  exchange: string;
  shortName: string;
  longName: string;
  messageBoardId: string;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  gmtOffSetMilliseconds: number;
  market: string;
  esgPopulated: boolean;
  marketState: string;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  marketCap: number;
  forwardPE: number;
  priceToBook: number;
  sourceInterval: number;
  exchangeDataDelayedBy: number;
  averageAnalystRating: string;
  firstTradeDateMilliseconds: number;
  priceHint: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: number;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayRange: string;
  regularMarketDayLow: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  fullExchangeName: string;
  financialCurrency: string;
  regularMarketOpen: number;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  dividendDate: number;
  earningsTimestamp: number;
  earningsTimestampStart: number;
  earningsTimestampEnd: number;
  trailingAnnualDividendRate: number;
  trailingPE: number;
  trailingAnnualDividendYield: number;
  epsTrailingTwelveMonths: number;
  epsForward: number;
  epsCurrentYear: number;
  priceEpsCurrentYear: number;
  sharesOutstanding: number;
  bookValue: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  tradeable: boolean;
  displayName: string;
  symbol: string;
};

export type ChartType = {
  meta: {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: number;
    regularMarketTime: number;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose: number;
    previousClose: number;
    scale: number;
    priceHint: number;
    currentTradingPeriod: {
      pre: {
        timezone: string;
        start: number;
        end: number;
        gmtoffset: number;
      };
      regular: {
        timezone: string;
        start: number;
        end: number;
        gmtoffset: number;
      };
      post: {
        timezone: string;
        start: number;
        end: number;
        gmtoffset: number;
      };
    };
    tradingPeriods: {
      timezone: string;
      start: number;
      end: number;
      gmtoffset: number;
    }[][];
    dataGranularity: string;
    range: string;
    validRanges: string[];
  };
  timestamp: number[]; // JS에서는 1000을 곱해줘야 Date가 인식함.
  indicators: {
    quote: [
      {
        open: number[];
        low: number[];
        close: number[];
        high: number[];
        volume: number[];
      }
    ];
  };
};

export type SummaryDetailType = {
  maxAge: number;
  priceHint: string;
  previousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  dividendRate: number;
  dividendYield: number;
  exDividendDate: number;
  payoutRatio: string;
  fiveYearAvgDividendYield: number;
  beta: string;
  trailingPE: number;
  forwardPE: number;
  volume: number;
  regularMarketVolume: number;
  averageVolume: number;
  averageVolume10days: number;
  averageDailyVolume10Day: number;
  bid: number;
  ask: number;
  bidSize: string;
  askSize: string;
  marketCap: string;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  priceToSalesTrailing12Months: string;
  fiftyDayAverage: string;
  twoHundredDayAverage: string;
  trailingAnnualDividendRate: number;
  trailingAnnualDividendYield: number;
};

export type HistoryType = {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  symbol: string;
};

type QuarterlyEarningsData = {
  date: string;
  actual: number;
  estimate: number;
};
type FinancialChartData = {
  date: string;
  revenue: string;
  earnings: string;
};
type FinancialChart = {
  yearly: FinancialChartData[];
  quarterly: FinancialChartData[];
};
type EarningsChart = {
  quarterly: QuarterlyEarningsData[];
  currentQuarterEstimate: number;
  currentQuarterEstimateDate: string;
  currentQuarterEstimateYear: string;
};
export type EarningsType = {
  maxAge: number;
  earningsChart: EarningsChart;
  financialsChart: FinancialChart;
  financialCurrency: string;
};

export type SearchType = {
  explains: any[];
  count: number;
  quotes: {
    exchange: string;
    shortname: string;
    quoteType: string;
    symbol: string;
    index: string;
    score: number;
    typeDisp: string;
    longname: string;
    isYahooFinance: boolean;
  }[];
  news: {
    uuid: string;
    title: string;
    publisher: string;
    link: string;
    providerPublishTime: number;
    type: string;
  }[];
  nav: any[];
  lists: any[];
  researchReports: any[];
  totalTime: number;
  timeTakenForQuotes: number;
  timeTakenForNews: number;
  timeTakenForAlgowatchlist: number;
  timeTakenForPredefinedScreener: number;
  timeTakenForCrunchbase: number;
  timeTakenForNav: number;
  timeTakenForResearchReports: number;
};

export type RecommendationType = {
  symbol: string;
  score: number;
};

export type CalendarEventsType = {
  maxAge: number;
  earnings: {
    earningsDate: number;
    earningsAverage: number;
    earningsLow: number;
    earningsHigh: number;
    revenueAverage: number;
    revenueLow: number;
    revenueHigh: number;
  };
  exDividendDate: number;
  dividendDate: number;
};

export type DividendHistoryType = {
  date: number;
  dividends: number;
  symbol: string;
}[];

export type NewsType = {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: string;
  type: string;
}[];

export type TrendingsType = {
  count: number;
  quotes: {
    symbol: string;
  }[];
  jobTimestamp: number;
  startInterval: number;
};
