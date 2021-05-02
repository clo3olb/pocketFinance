import { Box, Text } from "grommet";
import { Alert } from "grommet-icons";
import { Card, CardHeader, CardBody } from "components/Card";
import { useParams, useHistory } from "react-router-dom";
import symbolsList from "etc/symbols";

type PageSearchParamsType = {
  searchKeyword: string;
};

const PageSearch = () => {
  const { searchKeyword } = useParams<PageSearchParamsType>();
  const includesKeyword = (target: string | undefined, keyword: string | undefined) => {
    if (target && keyword) return target.toUpperCase().includes(keyword.toUpperCase());
  };
  const includesSearchKeyword = (target: string) => {
    return includesKeyword(target, searchKeyword);
  };
  const history = useHistory();
  const filteredList = symbolsList
    .filter((item) => includesSearchKeyword(item[0]) || includesSearchKeyword(item[1]))
    .slice(0, 5);

  return (
    <Box gap="small">
      {filteredList.length > 0 ? (
        filteredList.map((item) => (
          <Card direction="row" key={item[0]} onClick={() => history.push(`/${item[0]}`)} hoverIndicator>
            <CardHeader width="xsmall" pad="small" background="brand">
              <Text weight="bold">{item[0]}</Text>
            </CardHeader>
            <CardBody pad="small">
              <Text>{item[1]}</Text>
            </CardBody>
          </Card>
        ))
      ) : (
        <Card>
          <CardHeader pad="large" direction="column" background="light-3" justify="start">
            <Alert size="large" />
            <Text size="large" weight="bold">
              No search data.
            </Text>
          </CardHeader>
        </Card>
      )}
      <Card>
        <CardHeader pad="small" background="light-3" justify="start">
          <Alert />
          <Text>The data might not be up to date.</Text>
        </CardHeader>
      </Card>
    </Box>
  );
};

export default PageSearch;
