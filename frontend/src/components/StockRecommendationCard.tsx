import React from "react"
import { useQuery } from "@apollo/client"
import { Card, CardHeader, CardBody, CardFooter } from "components/Card"
import { Box, Text } from "grommet"
import { Alert, Group, CaretUpFill, CaretDownFill } from "grommet-icons"
import Translation from "./Translation"
import { GET_RECOMMENDATIONS_BY_TICKER, GET_PRICE_BY_TICKER } from "etc/graphQlQueries"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import NoDataMessage from "./NoDataMessage"
import { RecommendationsType, PriceType } from "types/QueryDataType"
import { Link } from "react-router-dom"

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

const StockRecommendationCard: React.FC<StockRecommendationCardProps> = (props) => {
  const { ticker } = props

  const { loading, error, data } = useQuery(GET_RECOMMENDATIONS_BY_TICKER, {
    variables: { ticker },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />
  if (data.recommendations === null || data.recommendations === undefined) return <NoDataMessage />

  const recommendationsData: RecommendationsType = data.recommendations
  return (
    <Card animation={["slideUp", "fadeIn"]}>
      <CardHeader>
        <Group />
        <Text weight="bold" size="large">
          <Translation text={{ en: "People Also Own", kr: "사람들이 함께 본 주식" }} />
        </Text>
      </CardHeader>
      <CardBody direction="row" overflow={{ horizontal: "scroll" }} gap="medium">
        {recommendationsData.recommendedSymbols.map((item) => (
          <Recommend key={item.symbol} ticker={item.symbol} />
        ))}
        <Box></Box>
      </CardBody>
      <CardFooter justify="start">
        <Alert />
        <Text>
          <Translation text={{ en: "It's not an investment recommendation.", kr: "위 자료는 종목추천이 아닙니다." }} />
        </Text>
      </CardFooter>
    </Card>
  )
}

export default StockRecommendationCard
