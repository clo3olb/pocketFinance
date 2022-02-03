import React from "react";
import { Card, CardHeader, CardBody } from "components/Card";
import { Box, Text } from "grommet";
import NoDataMessage from "components/NoDataMessage";
import { Link } from "react-router-dom";
import StockDetailCardTemplate from "template/StockDetailCardTemplate";
import { CaretDownFill, CaretUpFill, Group } from "grommet-icons";
import useRecommendation from "hooks/useRecommendation";
import usePrice from "hooks/usePrice";

const IconWrapper = () => <Group color="neutral-1" />;

type RecommendProps = {
    ticker: string;
};

const Recommend: React.FC<RecommendProps> = ({ ticker }) => {
    const price = usePrice(ticker);
    const scrollUp = () => {
        window.scrollTo(0, 0);
    };

    if (!price) return <p>NODATA</p>;

    return (
        <Link to={`/${ticker}`} onClick={scrollUp}>
            <Card
                animation="fadeIn"
                onClick={() => {}} // Just for hoverIndicator
                hoverIndicator
                gap="none"
                fill
                background="light-1"
                round="small"
            >
                <CardHeader
                    pad="small"
                    direction="column"
                    justify="start"
                    align="start"
                    gap="none"
                    background="light-2"
                >
                    <Text size="xlarge" weight="bold">
                        {price.symbol}
                    </Text>
                    <Text>{price.longName}</Text>
                </CardHeader>
                <CardBody gap="small" pad="small" direction="row" justify="between" align="end">
                    <Box justify="between">
                        <Text size="small">{price.currency}</Text>
                        <Text weight="bold">{price.regularMarketPrice.toFixed(2)}</Text>
                    </Box>
                    <Box direction="row" justify="end">
                        {price.regularMarketChangePercent > 0 ? (
                            <CaretUpFill color="green" />
                        ) : (
                            <CaretDownFill color="red" />
                        )}
                        <Text color={price.regularMarketChangePercent > 0 ? "green" : "red"}>{`(${(
                            price.regularMarketChangePercent * 100
                        ).toFixed(2)}%)`}</Text>
                    </Box>
                </CardBody>
            </Card>
        </Link>
    );
};

type StockRecommendationCardProps = {
    ticker: string;
};

// prettier-ignore
const StockRecommendationCard: React.FC<StockRecommendationCardProps> = ({ticker}) => {
  const recommends = useRecommendation(ticker)

  if (!recommends)
    return (
      <StockDetailCardTemplate
        header={{
          icon: <IconWrapper />,
          title: { en: "People Also Own", kr: "사람들이 함께 본 주식" },
        }}
        body={{ pad: "none" }}
      >
        <NoDataMessage />
      </StockDetailCardTemplate>
    );

  return (
    <StockDetailCardTemplate
      header={{
        icon: <IconWrapper />,
        title: { en: "People Also Own", kr: "사람들이 함께 본 주식" },
      }}
      body={{ pad: "none" }}
    >
      <Box
        direction="row"
        overflow={{ horizontal: "scroll" }}
        gap="medium"
        pad="medium"
      >
        {recommends.map((item) => (
          <Recommend key={item.symbol} ticker={item.symbol} />
        ))}
        <Box></Box>
      </Box>
    </StockDetailCardTemplate>
  );
};

export default StockRecommendationCard;
