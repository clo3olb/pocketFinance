import { Box, Text, Sidebar as GSidebar, Menu } from "grommet"
import { PriceType } from "types/QueryDataType"
import { useQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"
import Translation, { useLanguageContext } from "./Translation"

import { Language } from "grommet-icons"

const GET_PRICE_BY_TICKER = gql`
  query priceByTicker($ticker: String) {
    price: priceByTicker(ticker: $ticker) {
      symbol
      regularMarketPrice
      regularMarketChange
      longName
    }
  }
`

type SideBarItemProps = {
  ticker: string
  index?: number
  //   link?: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ ticker, index }) => {
  const { loading, error, data } = useQuery(GET_PRICE_BY_TICKER, {
    variables: { ticker },
  })

  if (loading) return <Box></Box>
  if (error)
    return (
      <Box>
        <Text>Error :( {JSON.stringify(error)}</Text>
      </Box>
    )
  if (data.price === null || data.price === undefined) return <p>NODATA</p>
  const priceData: PriceType = data.price

  return (
    <Link to={`/${ticker}`}>
      <Box
        animation="fadeIn"
        pad="small"
        direction="row"
        align="center"
        onClick={() => {}} // Just for hoverIndicator
        background={index ? `light-${1 + (index % 2)}` : undefined}
        hoverIndicator
      >
        <Box flex>
          <Text size="large" weight="bold">
            {priceData.symbol}
          </Text>
          <Text size="xsmall">
            {priceData.longName.length > 17 ? priceData.longName.slice(0, 16) + "..." : priceData.longName}
          </Text>
        </Box>
        <Box align="end">
          <Text weight="bold" size="small">
            ${priceData.regularMarketPrice}
          </Text>
          <Text size="xsmall">{`$${priceData.regularMarketChange.toFixed(2)}`}</Text>
        </Box>
      </Box>
    </Link>
  )
}

const SideBar = () => {
  const [language, setLanguage] = useLanguageContext()
  return (
    <Box>
      <GSidebar
        elevation="small"
        pad="none"
        gap="none"
        background="brand"
        round="small"
        header={
          <Box pad="small">
            <Text textAlign="center" weight="bold" size="medium">
              <Translation text={{ en: "Popular Stocks", kr: "인기주식종목" }} />
            </Text>
          </Box>
        }
        footer={
          <Box direction="row" align="center" gap="small" justify="center">
            <Language />
            <Menu
              style={{ wordBreak: "keep-all" }}
              label={language === "en" ? "English" : "한국어"}
              items={[
                {
                  label: "English",
                  onClick: () => {
                    setLanguage("en")
                  },
                  background: "white",
                },
                {
                  label: "한국어",
                  onClick: () => {
                    setLanguage("kr")
                  },
                },
              ]}
            />
          </Box>
        }
      >
        <Box background="light-1">
          {["TSLA", "MSFT", "CPNG", "AAPL", "SPYG"].map((ticker, index) => (
            <SideBarItem key={index} ticker={ticker} index={index} />
          ))}
        </Box>
      </GSidebar>
    </Box>
  )
}

export default SideBar
