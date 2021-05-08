!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var a in e)t.d(n,a,function(r){return e[r]}.bind(null,a));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=3)}([function(e,r){e.exports=require("apollo-server-lambda")},function(e,r){e.exports=require("yahoo-finance")},function(e,r){e.exports=require("yahoo-finance2")},function(e,r,t){const{ApolloServer:n}=t(0),a=t(4),i=t(5),o=t(6),s=t(7),l=t(8),c=t(9),u=t(10),y=t(11),g=t(12),p=t(14),m=t(15),d=new n({typeDefs:[l,a.typeDefs,i.typeDefs,o.typeDefs,s.typeDefs,c.typeDefs,u.typeDefs,y.typeDefs,g.typeDefs,p.typeDefs,m.typeDefs],resolvers:[a.resolvers,i.resolvers,o.resolvers,s.resolvers,c.resolvers,u.resolvers,y.resolvers,g.resolvers,p.resolvers,m.resolvers]});r.handler=d.createHandler()},function(e,r,t){const{gql:n}=t(0),a=t(1),i=n`
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
`,o={Query:{priceByTicker:async(e,{ticker:r},t,n)=>{try{return(await a.quote({symbol:r,modules:["price"]})).price}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),a=t(1),i=n`
  type SummaryDetail {
    maxAge: Int
    priceHint: String
    previousClose: Float
    open: Float
    dayLow: Float
    dayHigh: Float
    regularMarketPreviousClose: Float
    regularMarketOpen: Float
    regularMarketDayLow: Float
    regularMarketDayHigh: Float
    dividendRate: Float
    dividendYield: Float
    exDividendDate: Float
    payoutRatio: String
    fiveYearAvgDividendYield: Float
    beta: String
    trailingPE: Float
    forwardPE: Float
    volume: Float
    regularMarketVolume: Float
    averageVolume: Float
    averageVolume10days: String
    averageDailyVolume10Day: String
    bid: String
    ask: String
    bidSize: String
    askSize: String
    marketCap: String
    fiftyTwoWeekLow: Float
    fiftyTwoWeekHigh: Float
    priceToSalesTrailing12Months: String
    fiftyDayAverage: String
    twoHundredDayAverage: String
    trailingAnnualDividendRate: Float
    trailingAnnualDividendYield: Float
  }
`,o={Query:{summaryDetailByTicker:async(e,{ticker:r},t,n)=>{try{return(await a.quote({symbol:r,modules:["summaryDetail"]})).summaryDetail}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),a=t(1),i=n`
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
`,o={Query:{historyByTicker:async(e,{ticker:r,from:t,period:n},i,o)=>{try{return await a.historical({symbol:r,from:t,period:n})}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),a=t(1),i=n`
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
`,o={Query:{earningsByTicker:async(e,{ticker:r},t,n)=>{try{return(await a.quote({symbol:r,modules:["earnings"]})).earnings}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),a=n`
  type Query {
    priceByTicker(ticker: String): Price
    summaryDetailByTicker(ticker: String): SummaryDetail
    historyByTicker(ticker: String, from: String, to: String, period: String): [History]
    dividendHistoryByTicker(ticker: String, from: String): [DividendHistory]
    earningsByTicker(ticker: String): Earnings
    autoComplete(query: String): AutoComplete
    recommendationsBySymbol(ticker: String): Recommendations
    calendarEventsByTicker(ticker: String): CalendarEvents
    newsByTicker(ticker: String): News
    trendings: Trendings
  }
`;e.exports=a},function(e,r,t){const{gql:n}=t(0),a=t(2).default,i=n`
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
`,o={Query:{autoComplete:async(e,{query:r},t,n)=>{try{const e=await a.autoc(r);return{query:e.Query,result:e.Result}}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),a=t(2).default,i=n`
  type RecommendedSymbols {
    symbol: String
    score: Float
  }

  type Recommendations {
    symbol: String
    recommendedSymbols: [RecommendedSymbols]
  }
`,o={Query:{recommendationsBySymbol:async(e,{ticker:r},t,n)=>{try{const e=await a.recommendationsBySymbol(r);return{symbol:e.symbol,recommendedSymbols:e.recommendedSymbols}}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),a=t(1),i=n`
  type DividendHistory {
    date: Float
    dividends: Float
    symbol: String
  }
`,o={Query:{dividendHistoryByTicker:async(e,{ticker:r,from:t},n,i)=>{try{return await a.historical({symbol:r,from:t,period:"v"})}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),{GraphQLScalarType:a,Kind:i}=t(13),o=t(1),s=n`
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
`,l={Query:{calendarEventsByTicker:async(e,{ticker:r},t,n)=>{try{return(await o.quote({symbol:r,modules:["calendarEvents"]})).calendarEvents}catch(e){return console.error(e),e}}},Date:new a({name:"Date",description:"Date custom scalar type",serialize:e=>new Date(1e3*e).getTime(),parseValue:e=>new Date(e),parseLiteral:e=>e.kind===i.INT?new Date(parseInt(e.value,10)):null})};e.exports={typeDefs:s,resolvers:l}},function(e,r){e.exports=require("graphql")},function(e,r,t){const{gql:n}=t(0),a=t(2).default,i=n`
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
`,o={Query:{newsByTicker:async(e,{ticker:r},t,n)=>{try{return await a.search(r,{newsCount:12})}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}},function(e,r,t){const{gql:n}=t(0),a=t(2).default,i=n`
  type TrendingQuote {
    symbol: String
  }

  type Trendings {
    count: Int
    quotes: [TrendingQuote]
    jobTimestamp: Int
    startInterval: Int
  }
`,o={Query:{trendings:async(e,r,t,n)=>{try{return await a.trendingSymbols("US",{count:5})}catch(e){return console.error(e),e}}}};e.exports={typeDefs:i,resolvers:o}}]));