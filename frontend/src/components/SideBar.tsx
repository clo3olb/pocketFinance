import { useState } from "react";
import { Accordion, AccordionPanel, Box, Text } from "grommet";
import { PriceType } from "types/QueryDataType";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_PRICE_BY_TICKER = gql`
  query priceByTicker($ticker: String) {
    price: priceByTicker(ticker: $ticker) {
      symbol
      regularMarketPrice
      regularMarketChange
      longName
    }
  }
`;

type SideBarItemProps = {
  ticker: string;
  //   link?: string;
};

const SideBarItem: React.FC<SideBarItemProps> = (props) => {
  const { ticker } = props;
  const { loading, error, data } = useQuery(GET_PRICE_BY_TICKER, {
    variables: { ticker },
  });

  if (loading) return <Box></Box>;
  if (error)
    return (
      <Box>
        <Text>Error :( {JSON.stringify(error)}</Text>
      </Box>
    );
  if (data.price === null || data.price === undefined) return <p>NODATA</p>;
  const priceData: PriceType = data.price;

  return (
    <Link to={`/${ticker}`}>
      <Box animation="fadeIn" pad="small" background="light-2" direction="row" align="center" className="sideBarItem">
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
  );
};

const SideBar = () => {
  const [activeIndexArray, setActiveIndexArray] = useState<number>(0);
  const handlePanelClick = (clickedIndexAsArray: number[]) => {
    const [clickedIndex] = clickedIndexAsArray;
    if (clickedIndex !== undefined) setActiveIndexArray(clickedIndex);
    console.log({ clickedIndex });
  };
  return (
    <Accordion activeIndex={activeIndexArray} onActive={handlePanelClick} style={{ borderBottom: "0" }}>
      <AccordionPanel label="Stocks">
        <SideBarItem ticker="TSLA" />
        <SideBarItem ticker="MSFT" />
        <SideBarItem ticker="AAPL" />
        <SideBarItem ticker="CPNG" />
        <SideBarItem ticker="SPYG" />
      </AccordionPanel>
    </Accordion>
  );
};

export default SideBar;
