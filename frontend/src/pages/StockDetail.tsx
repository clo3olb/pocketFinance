import StockPriceCard from "components/stockDetailCards/StockPriceCard"
import { useParams } from "react-router-dom"
import { Box } from "grommet"
import StockEarningsCard from "components/stockDetailCards/StockEarningsCard"
import StockRecommendationCard from "components/stockDetailCards/StockRecommendationCard"
import StockDividendCard from "components/stockDetailCards/StockDividendCard"
import StockNewsCard from "components/stockDetailCards/StockNewsCard"

type PageStockDetailParamsType = {
  ticker: string
}

const PageStockDetail = () => {
  const { ticker } = useParams<PageStockDetailParamsType>()

  return (
    <Box gap="medium">
      <StockPriceCard ticker={ticker} />
      <StockNewsCard ticker={ticker} />
      <StockEarningsCard ticker={ticker} />
      <StockDividendCard ticker={ticker} />
      <StockRecommendationCard ticker={ticker} />
    </Box>
  )
}

export default PageStockDetail
