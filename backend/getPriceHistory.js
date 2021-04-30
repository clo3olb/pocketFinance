const yahooFinance = require("yahoo-finance");

const getPriceHistory = async (ticker, from, to) => {
  return await yahooFinance.historical({
    symbol: ticker,
    from,
    to,
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  });
};

module.exports = getPriceHistory;
