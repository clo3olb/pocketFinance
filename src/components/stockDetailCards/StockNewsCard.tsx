import React, { useState } from "react";
import { Article, Descend } from "grommet-icons";
import NoDataMessage from "components/NoDataMessage";
import StockDetailCardTemplate from "template/StockDetailCardTemplate";
import { Box, Text } from "grommet";
import { parseDate } from "etc/smallFunctions";
import Translation from "components/Translation";
import useSearch from "hooks/useSearch";

const IconWrapper = () => <Article color="neutral-1" />;

type StockNewsCardProps = {
  ticker: string;
};

const StockNewsCard: React.FC<StockNewsCardProps> = ({ ticker }) => {
  const search = useSearch(ticker);
  const [newsLimit, setNewsLimit] = useState(3);

  if (!search?.news || search.news.length <= 0)
    return (
      <StockDetailCardTemplate
        header={{ icon: <IconWrapper />, title: { en: "News", kr: "뉴스" } }}
      >
        <NoDataMessage />
      </StockDetailCardTemplate>
    );

  return (
    <StockDetailCardTemplate
      header={{ icon: <IconWrapper />, title: { en: "News", kr: "뉴스" } }}
    >
      <Box gap="small">
        {search.news.slice(0, newsLimit).map((news, index) => (
          <Box gap="small" key={index}>
            <a href={news.link} key={news.uuid}>
              <Box
                onClick={() => {}}
                hoverIndicator
                pad="small"
                round="small"
                gap="xxsmall"
              >
                <Text size="xsmall">{parseDate(news.providerPublishTime)}</Text>
                <Text weight="bold">{news.title}</Text>
                <Text>{news.publisher}</Text>
              </Box>
            </a>
            {index + 1 < search.news.length && (
              <Box border={{ size: "1px" }}></Box>
            )}
          </Box>
        ))}
        {search.news.length > newsLimit && (
          <Box align="center">
            <Box
              pad="small"
              round="small"
              flex="shrink"
              onClick={() => setNewsLimit(newsLimit + 3)}
              hoverIndicator
              direction="row"
              gap="small"
            >
              <Descend />
              <Text weight="bold">
                <Translation text={{ en: "More", kr: "더 보기" }} />
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </StockDetailCardTemplate>
  );
};

export default StockNewsCard;
