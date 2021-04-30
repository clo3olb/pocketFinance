import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "components/Card";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Heading,
  Box,
  Button,
  Text,
  TableRow,
  TableBody,
  TableCell,
  Table,
} from "grommet";
import { Add } from "grommet-icons";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    xAxes: {
      display: true,
      grid: {
        display: false,
      },
    },
    yAxes: {
      ticks: {
        display: false,
      },
      min: 0,
      grid: {
        display: false,
      },
    },
  },
};

type StockDataCardType = {
  ticker: string;
};

const StockDataCard: React.FC<StockDataCardType> = (props) => {
  const { ticker } = props;

  return (
    <Card animation="slideUp" className="stockDataCard">
      <CardHeader
        background="brand"
        direction="column"
        align="start"
        gap="small"
      >
        <Box direction="row" fill="horizontal">
          <Box flex>
            <Heading margin="none" size="medium">
              {ticker}
            </Heading>
            <Text size="medium">Apple Inc.</Text>
          </Box>
          <Button icon={<Add />} />
        </Box>
      </CardHeader>
      <CardBody>
        <Box
          margin={{ bottom: "medium" }}
          direction="row"
          align="end"
          gap="small"
        >
          <Text weight="bold" size="2xl">
            $133.34
          </Text>
          <Text size="large" color="green">
            -$2.43(-0.7%)
          </Text>
        </Box>
        <Line type="line" data={data} options={options} />
        <Box direction="row" gap="small" justify="center">
          <Button primary label="1D" active size="small" />
          <Button primary label="1W" size="small" />
          <Button primary label="1M" size="small" />
          <Button primary label="6M" size="small" />
          <Button primary label="1Y" size="small" />
          <Button primary label="5Y" size="small" />
        </Box>
      </CardBody>
      <CardFooter>
        <Box flex>
          <Table>
            <TableBody>
              {[
                ["Previous Close", "$133.58"],
                ["Open", "$133.58"],
                ["High", "$133.58"],
                ["Low", "$133.58"],
              ].map((data) => (
                <TableRow key={data[0]} className="stockDataCard__tableRow">
                  <TableCell className="stockDataCard__tableCell">
                    <Text size="small">
                      <strong>{data[0]}</strong>
                    </Text>
                  </TableCell>
                  <TableCell justify="end" className="stockDataCard__tableCell">
                    <Text textAlign="end" size="small">
                      {data[1]}
                    </Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default StockDataCard;

/**

Previous Close	133.58
Open	136.47
Bid	0.00 x 1000
Ask	0.00 x 2200
Day's Range	132.45 - 137.07
52 Week Range	71.46 - 145.09
Volume	151,101,053
Avg. Volume	100,094,588
Market Cap	2.241T
Beta (5Y Monthly)	1.22
PE Ratio (TTM)	36.20
EPS (TTM)	3.69
Earnings Date	Jul 27, 2021 - Aug 01, 2021
Forward Dividend & Yield	0.82 (0.61%)
Ex-Dividend Date	Feb 04, 2021
1y Target Est	157.04


 */
