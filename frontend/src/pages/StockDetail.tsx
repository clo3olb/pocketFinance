import StockDataCard from "components/StockDataCard";
import { useParams } from "react-router-dom";

type PageStockDetailParamsType = {
  ticker: string;
};

const PageStockDetail = () => {
  const { ticker } = useParams<PageStockDetailParamsType>();
  return <StockDataCard ticker={ticker} />;
};

export default PageStockDetail;
