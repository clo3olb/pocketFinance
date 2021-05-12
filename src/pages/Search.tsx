import { Box, Text } from "grommet";
import { Descend } from "grommet-icons";
import { Card, CardHeader, CardBody } from "components/Card";
import { useParams, Link } from "react-router-dom";
import Message from "components/Message";
import { useEffect, useState } from "react";
import Translation from "components/Translation";
import useSearch from "hooks/useSearch";

type PageSearchParamsType = {
  searchKeyword: string;
};

const PageSearch = () => {
  const { searchKeyword } = useParams<PageSearchParamsType>();
  const [searchResultLimit, setSearchResultLimit] = useState(5);

  useEffect(() => {
    setSearchResultLimit(5);
  }, [searchKeyword]);

  const search = useSearch(searchKeyword);

  if (!search?.quotes)
    return (
      <Message
        size="large"
        type="unknown"
        message={
          <Translation
            text={{ en: "No Data Found", kr: "데이터를 찾을 수 없습니다." }}
          />
        }
      />
    );

  return (
    <Box gap="small">
      {search.quotes.length > 0 ? (
        search.quotes.slice(0, searchResultLimit).map((item) => (
          <Link key={item.symbol} to={`/${item.symbol}`}>
            <Card key={item.symbol} onClick={() => {}} hoverIndicator>
              <CardHeader pad="small" background="light-2" direction="row">
                <Text weight="bold">{item.shortname}</Text>
              </CardHeader>
              <CardBody pad="small" direction="row" justify="between">
                <Text weight="bold">{item.symbol}</Text>
                <Text>{item.exchange}</Text>
              </CardBody>
            </Card>
          </Link>
        ))
      ) : (
        <Message size="large" message="No search data." />
      )}
      {search.quotes.length > searchResultLimit && (
        <Box align="center">
          <Box
            pad="small"
            round="small"
            flex="shrink"
            onClick={() => setSearchResultLimit(searchResultLimit + 5)}
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
      <Message message="The data might not be up to date." />
    </Box>
  );
};

export default PageSearch;
