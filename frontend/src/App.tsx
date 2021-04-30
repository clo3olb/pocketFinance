import {
  Grommet,
  Box,
  Main,
  ResponsiveContext,
  ThemeType,
  DataChart,
} from "grommet";
import { Card, CardHeader, CardBody, CardFooter } from "components/Card";
import "scss/reset.scss";
import Container from "components/Container";
import Header from "components/Header";

const theme: ThemeType = {
  global: {
    colors: {
      // brand: "#228BE6",
    },
    font: {
      family: "Montserrat",
      size: "14px",
    },
    focus: {
      outline: {
        size: "none",
      },
    },
    breakpoints: {
      small: {
        value: 600,
      },
    },
  },
};

const data = [
  { date: "2020-08-20", amount: 2 },
  { date: "2020-08-21", amount: 47 },
  { date: "2020-08-22", amount: 33 },
];
const App = () => {
  return (
    <Grommet background="light-1" theme={theme} className="App" full>
      <Main>
        <Header />
        <ResponsiveContext.Consumer>
          {(size) => (
            <Container
              direction={size !== "small" ? "row" : "column"}
              gap="medium"
            >
              {/* Main Column */}
              <Box flex>
                <Card>
                  <CardHeader pad="small">Stock Prices Chart</CardHeader>
                  <CardBody>
                    <DataChart
                      data={data}
                      series={["date", { property: "amount", prefix: "$" }]}
                      chart={[
                        {
                          property: "amount",
                          type: "line",
                          opacity: "medium",
                          thickness: "xsmall",
                        },
                        {
                          property: "amount",
                          type: "point",
                          point: "star",
                          thickness: "medium",
                        },
                      ]}
                    />
                  </CardBody>
                  <CardFooter>This is Card Footer</CardFooter>
                </Card>
              </Box>

              {/* Side Column */}
              <Box width={size !== "small" ? "small" : ""}>
                <Card flex>
                  <CardHeader>HEllo</CardHeader>
                </Card>
              </Box>
            </Container>
          )}
        </ResponsiveContext.Consumer>
      </Main>
    </Grommet>
  );
};

export default App;
