import { useQuery } from "@apollo/client"
import { Box, Text, Spinner } from "grommet"
import { Descend } from "grommet-icons"
import { Card, CardHeader, CardBody } from "components/Card"
import { useParams, Link } from "react-router-dom"
import Message from "components/Message"
import { useEffect, useState } from "react"
import Translation from "components/Translation"
import { AutoComplete } from "types/QueryDataType"
import { GET_SEARCH_RESULT_BY_QUERY } from "etc/graphQlQueries"

type PageSearchParamsType = {
  searchKeyword: string
}

const PageSearch = () => {
  const { searchKeyword } = useParams<PageSearchParamsType>()
  const [searchResultLimit, setSearchResultLimit] = useState(5)

  const { loading, error, data } = useQuery(GET_SEARCH_RESULT_BY_QUERY, {
    variables: { query: searchKeyword },
  })

  useEffect(() => {
    setSearchResultLimit(5)
  }, [searchKeyword])

  if (loading)
    return (
      <Box flex justify="center" align="center">
        <Spinner size="large" />
      </Box>
    )
  if (error) return <Message size="large" type="error" message={<Translation text={{ en: "Error :(", kr: "오류가 발생했습니다. :(" }} />} />
  if (data.autoComplete === null || data.autoComplete === undefined || data.autoComplete.result === undefined)
    return <Message size="large" type="unknown" message={<Translation text={{ en: "No Data Found", kr: "데이터를 찾을 수 없습니다." }} />} />

  const autoCompleteData: AutoComplete = data.autoComplete
  const filteredList = autoCompleteData.result

  return (
    <Box gap="small">
      {filteredList.length > 0 ? (
        filteredList.slice(0, searchResultLimit).map((item) => (
          <Link key={item.symbol} to={`/${item.symbol}`}>
            <Card key={item.symbol} onClick={() => {}} hoverIndicator>
              <CardHeader pad="small" background="light-2" direction="row">
                <Text weight="bold">{item.name}</Text>
              </CardHeader>
              <CardBody pad="small" direction="row" justify="between">
                <Text weight="bold">{item.symbol}</Text>
                <Text>{item.exchDisp}</Text>
              </CardBody>
            </Card>
          </Link>
        ))
      ) : (
        <Message size="large" message="No search data." />
      )}
      {filteredList.length > searchResultLimit && (
        <Box align="center">
          <Box pad="small" round="small" flex="shrink" onClick={() => setSearchResultLimit(searchResultLimit + 5)} hoverIndicator direction="row" gap="small">
            <Descend />
            <Text weight="bold">
              <Translation text={{ en: "More", kr: "더 보기" }} />
            </Text>
          </Box>
        </Box>
      )}
      <Message message="The data might not be up to date." />
    </Box>
  )
}

export default PageSearch
