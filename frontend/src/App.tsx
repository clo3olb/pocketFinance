import { Grommet, Box, ResponsiveContext } from "grommet";
import "scss/reset.scss";
import Container from "components/Container";
import Header from "components/Header";
import StockDataCard from "components/StockDataCard";
import SideBar from "components/SideBar";
import customTheme from "customTheme";

const App = () => {
  return (
    <Grommet background="light-1" theme={customTheme} className="App" full>
      <Header />
      <ResponsiveContext.Consumer>
        {(size) => (
          <Container
            direction={size !== "small" ? "row" : "column"}
            gap="medium"
          >
            <Box flex gap="medium">
              {/* Main Column */}
              <StockDataCard ticker="AAPL" />
            </Box>

            {/* Side Column */}
            <Box width={size !== "small" ? "small" : ""}>
              <SideBar />
            </Box>
          </Container>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default App;
