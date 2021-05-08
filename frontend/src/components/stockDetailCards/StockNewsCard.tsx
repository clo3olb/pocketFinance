import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { NewsType } from "types/QueryDataType"
import { Article, Descend } from "grommet-icons"
import { GET_NEWS_BY_TICKER } from "etc/graphQlQueries"
import LoadingSpinner from "components/LoadingSpinner"
import NoDataMessage from "components/NoDataMessage"
import StockDetailCardTemplate from "template/StockDetailCardTemplate"
import { Box, Text } from "grommet"
import { parseDate } from "etc/smallFunctions"
import Translation from "components/Translation"

const IconWrapper = () => <Article color="neutral-1" />

type StockNewsCardProps = {
  ticker: string
}

const StockNewsCard: React.FC<StockNewsCardProps> = ({ ticker }) => {
  const { loading, error, data } = useQuery(GET_NEWS_BY_TICKER, {
    variables: { ticker },
  })
  const [newsLimit, setNewsLimit] = useState(3)

  if (loading) return <LoadingSpinner />
  if (error || data.news === null || data.news === undefined)
    return (
      <StockDetailCardTemplate header={{ icon: <IconWrapper />, title: { en: "News", kr: "뉴스" } }}>
        <NoDataMessage />
      </StockDetailCardTemplate>
    )
  const newsData: NewsType = data.news.news

  return (
    <StockDetailCardTemplate header={{ icon: <IconWrapper />, title: { en: "News", kr: "뉴스" } }}>
      <Box gap="small">
        {newsData.slice(0, newsLimit).map((news, index) => (
          <Box gap="small" key={index}>
            <a href={news.link} key={news.uuid}>
              <Box onClick={() => {}} hoverIndicator pad="small" round="small" gap="xxsmall">
                <Text size="xsmall">{parseDate(news.providerPublishTime)}</Text>
                <Text weight="bold">{news.title}</Text>
                <Text>{news.publisher}</Text>
              </Box>
            </a>
            {index + 1 < newsData.length && <Box border={{ size: "1px" }}></Box>}
          </Box>
        ))}
        {newsData.length > newsLimit && (
          <Box align="center">
            <Box pad="small" round="small" flex="shrink" onClick={() => setNewsLimit(newsLimit + 3)} hoverIndicator direction="row" gap="small">
              <Descend />
              <Text weight="bold">
                <Translation text={{ en: "More", kr: "더 보기" }} />
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </StockDetailCardTemplate>
  )
}

export default StockNewsCard
