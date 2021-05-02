import { Box, Button, Text } from "grommet"
import { Card, CardHeader, CardBody } from "components/Card"
import { useParams, useHistory } from "react-router-dom"
import symbolsList from "etc/symbols"
import Message from "components/Message"
import { useEffect, useState } from "react"

type PageSearchParamsType = {
  searchKeyword: string
}

const PageSearch = () => {
  const { searchKeyword } = useParams<PageSearchParamsType>()
  const [searchResultLimit, setSearchResultLimit] = useState(5)
  const includesKeyword = (target: string | undefined, keyword: string | undefined) => {
    if (target && keyword) return target.toUpperCase().includes(keyword.toUpperCase())
  }
  const includesSearchKeyword = (target: string) => {
    return includesKeyword(target, searchKeyword)
  }
  const history = useHistory()
  const filteredList = symbolsList.filter((item) => includesSearchKeyword(item[0]) || includesSearchKeyword(item[1]))
  useEffect(() => {
    setSearchResultLimit(5)
  }, [searchKeyword])
  return (
    <Box gap="small">
      {filteredList.length > 0 ? (
        filteredList.slice(0, searchResultLimit).map((item) => (
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
        <Message size="large" message="No search data." />
      )}
      {filteredList.length > searchResultLimit && (
        <Button label="more" onClick={() => setSearchResultLimit(searchResultLimit + 5)} />
      )}
      <Message message="The data might not be up to date." />
    </Box>
  )
}

export default PageSearch
