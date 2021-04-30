const getPriceHistory = require("./getPriceHistory");

const main = async () => {
  const history = await getPriceHistory("AAPL", "2021-01-01", "2021-04-29");
  console.log(history);
};

main();
