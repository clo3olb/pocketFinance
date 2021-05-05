import StockPriceCard from "components/StockPriceCard"
import { useParams } from "react-router-dom"
import { Box } from "grommet"
import StockEarningsCard from "components/StockEarningsCard"
import StockRecommendationCard from "components/StockRecommendationCard"
import StockDividendCard from "components/StockDividendCard"

type PageStockDetailParamsType = {
  ticker: string
}

const PageStockDetail = () => {
  const { ticker } = useParams<PageStockDetailParamsType>()

  return (
    <Box gap="medium">
      <StockPriceCard ticker={ticker} />
      <StockEarningsCard ticker={ticker} />
      <StockDividendCard ticker={ticker} />
      <StockRecommendationCard ticker={ticker} />
    </Box>
  )
}

export default PageStockDetail
