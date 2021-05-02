import StockPriceCard from "components/StockPriceCard"
import { useParams } from "react-router-dom"
import { Box } from "grommet"
import StockEarningsCard from "components/StockEarningsCard"

type PageStockDetailParamsType = {
  ticker: string
}

const PageStockDetail = () => {
  const { ticker } = useParams<PageStockDetailParamsType>()
  return (
    <Box gap="medium">
      <StockPriceCard ticker={ticker} />
      <StockEarningsCard ticker={ticker} />
    </Box>
  )
}

export default PageStockDetail
