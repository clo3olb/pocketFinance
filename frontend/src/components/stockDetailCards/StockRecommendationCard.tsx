import React from "react"
import { useQuery } from "@apollo/client"
import { Card, CardHeader, CardBody } from "components/Card"
import { Box, Text } from "grommet"
import { GET_RECOMMENDATIONS_BY_TICKER, GET_PRICE_BY_TICKER } from "etc/graphQlQueries"
import LoadingSpinner from "components/LoadingSpinner"
import ErrorMessage from "components/ErrorMessage"
import NoDataMessage from "components/NoDataMessage"
import { RecommendationsType, PriceType } from "types/QueryDataType"
import { Link } from "react-router-dom"
import StockDetailCardTemplate from "template/StockDetailCardTemplate"
import { CaretDownFill, CaretUpFill, Group } from "grommet-icons"

const IconWrapper = () => <Group color="neutral-1" />

type RecommendProps = {
  ticker: string
}

const Recommend: React.FC<RecommendProps> = ({ ticker }) => {
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
  const changePercent = priceData.regularMarketChangePercent

  return (
    <Link to={`/${ticker}`}>
      <Card
        animation="fadeIn"
        onClick={() => {}} // Just for hoverIndicator
        hoverIndicator
        gap="none"
        fill
        background="light-1"
        round="small"
      >
        <CardHeader pad="small" direction="column" justify="start" align="start" gap="none" background="light-2">
          <Text size="xlarge" weight="bold">
            {priceData.symbol}
          </Text>
          <Text>{priceData.longName}</Text>
        </CardHeader>
        <CardBody gap="small" pad="small" direction="row" justify="between" align="end">
          <Box justify="between">
            <Text size="small">{priceData.currency}</Text>
            <Text weight="bold">{priceData.regularMarketPrice.toFixed(2)}</Text>
          </Box>
          <Box direction="row" justify="end">
            {changePercent > 0 ? <CaretUpFill color="green" /> : <CaretDownFill color="red" />}
            <Text color={changePercent > 0 ? "green" : "red"}>{`(${(changePercent * 100).toFixed(2)}%)`}</Text>
          </Box>
        </CardBody>
      </Card>
    </Link>
  )
}

type StockRecommendationCardProps = {
  ticker: string
}

const StockRecommendationCard: React.FC<StockRecommendationCardProps> = ({ ticker }) => {
  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS_BY_TICKER, {
    variables: { ticker },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />
  if (data.recommendations === null || data.recommendations === undefined)
    return (
      <StockDetailCardTemplate
        header={{ icon: <IconWrapper />, title: { en: "People Also Own", kr: "사람들이 함께 본 주식" } }}
        body={{ pad: "none" }}
      >
        <NoDataMessage />
      </StockDetailCardTemplate>
    )

  const recommendationsData: RecommendationsType = data.recommendations
  return (
    <StockDetailCardTemplate header={{ icon: <IconWrapper />, title: { en: "People Also Own", kr: "사람들이 함께 본 주식" } }} body={{ pad: "none" }}>
      <Box direction="row" overflow={{ horizontal: "scroll" }} gap="medium" pad="medium">
        {recommendationsData.recommendedSymbols.map((item) => (
          <Recommend key={item.symbol} ticker={item.symbol} />
        ))}
        <Box></Box>
      </Box>
    </StockDetailCardTemplate>
  )
}

export default StockRecommendationCard
