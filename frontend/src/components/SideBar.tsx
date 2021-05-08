import { Box, Text, Sidebar as GSidebar, Menu, ResponsiveContext } from "grommet"
import { PriceType, TrendingsType } from "types/QueryDataType"
import { useQuery, gql } from "@apollo/client"
import { Link } from "react-router-dom"
import Translation, { useLanguageContext } from "./Translation"

import { Language } from "grommet-icons"
import { GET_TRENDING } from "etc/graphQlQueries"
import LoadingSpinner from "components/LoadingSpinner"
import NoDataMessage from "./NoDataMessage"

const GET_PRICE_BY_TICKER = gql`
  query priceByTicker($ticker: String) {
    price: priceByTicker(ticker: $ticker) {
      symbol
      regularMarketPrice
      regularMarketChange
      longName
      currency
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
  if (error || !data.price) return <NoDataMessage />
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
          <Text size="xsmall">{priceData.longName.length > 17 ? priceData.longName.slice(0, 16) + "..." : priceData.longName}</Text>
        </Box>
        <Box align="end">
          <Text weight="bold" size="small">
            ${priceData.regularMarketPrice}
          </Text>
          <Text size="xsmall" color={priceData.regularMarketChange > 0 ? "accent-1" : "accend-2"}>
            {`$${priceData.regularMarketChange.toFixed(2)}`.replace("$-", "-$")}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}

const Trendings = () => {
  const { loading, error, data } = useQuery(GET_TRENDING)
  if (loading) return <LoadingSpinner />
  if (error || !data || !data.trendings || !data.trendings.quotes) return <NoDataMessage />
  const trendings: TrendingsType = data.trendings
  return (
    <Box background="light-1">
      {trendings.quotes.map((item, index) => (
        <SideBarItem key={index} ticker={item.symbol} index={index} />
      ))}
    </Box>
  )
}

const SideBar = () => {
  const [language, setLanguage] = useLanguageContext()
  return (
    <Box>
      <ResponsiveContext.Consumer>
        {(size) => (
          <GSidebar
            elevation="small"
            pad="none"
            gap="none"
            background="brand"
            round={size !== "small" ? "small" : "none"}
            header={
              <Box pad="small">
                <Text textAlign="center" weight="bold" size="medium" color="neutral-1">
                  <Translation text={{ en: "Popular Stocks", kr: "인기주식종목" }} />
                </Text>
              </Box>
            }
            footer={
              <Box direction="row" align="center" gap="small" justify="center">
                <Language color="neutral-1" />
                <Menu
                  color="neutral-1"
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
            <Trendings />
          </GSidebar>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  )
}

export default SideBar
