import StockPriceCard from "components/stockDetailCards/StockPriceCard";
import { useParams } from "react-router-dom";
import { Box } from "grommet";
import StockRecommendationCard from "components/stockDetailCards/StockRecommendationCard";
import StockNewsCard from "components/stockDetailCards/StockNewsCard";
// import StockEarningsCard from "components/stockDetailCards/StockEarningsCard";
// import StockDividendCard from "components/stockDetailCards/StockDividendCard";

type PageStockDetailParamsType = {
  ticker: string;
};

const PageStockDetail = () => {
  const { ticker } = useParams<PageStockDetailParamsType>();
  return (
    <Box gap="medium">
      <StockPriceCard ticker={ticker} />
      <StockNewsCard ticker={ticker} />
      <StockRecommendationCard ticker={ticker} />
      {/* <StockEarningsCard ticker={ticker} />
      <StockDividendCard ticker={ticker} /> */}
    </Box>
  );
};

export default PageStockDetail;
