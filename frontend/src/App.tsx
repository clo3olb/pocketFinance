import { Grommet, Box, ResponsiveContext } from "grommet";
import "styles/reset.css";
import Container from "components/Container";
import Header from "components/Header";
import StockDataCard from "components/StockDataCard";
import SideBar from "components/SideBar";
import customTheme from "customTheme";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Grommet background="light-1" theme={customTheme} className="App" full>
      <ApolloProvider client={client}>
        <Header />
        <ResponsiveContext.Consumer>
          {(size) => (
            <Container
              direction={size !== "small" ? "row" : "column"}
              gap="medium"
            >
              <Box flex gap="medium">
                {/* Main Column */}
                <StockDataCard ticker="MSFT" />
                <StockDataCard ticker="AAPL" />
              </Box>

              {/* Side Column */}
              <Box width={size !== "small" ? "small" : ""}>
                <SideBar />
              </Box>
            </Container>
          )}
        </ResponsiveContext.Consumer>
      </ApolloProvider>
    </Grommet>
  );
};

export default App;
