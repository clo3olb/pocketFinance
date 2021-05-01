import { Grommet, Box, ResponsiveContext } from "grommet";
import "styles/reset.css";
import Container from "components/Container";
import Header from "components/Header";
import PageHome from "pages/Home";
import PageStockDetail from "pages/StockDetail";
import SideBar from "components/SideBar";
import customTheme from "customTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Grommet background="light-1" theme={customTheme} className="App" full>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <ResponsiveContext.Consumer>
            {(size) => (
              <Container direction={size !== "small" ? "row" : "column"} gap="medium">
                {/* Main Column Begins*/}
                <Box flex gap="medium">
                  <Switch>
                    <Route path="/" exact>
                      <PageHome />
                    </Route>
                    <Route path="/:ticker">
                      <PageStockDetail />
                    </Route>
                  </Switch>
                </Box>
                {/* Main Column Ends */}

                {/* Side Column */}
                <Box width={size !== "small" ? "small" : ""}>
                  <SideBar />
                </Box>
              </Container>
            )}
          </ResponsiveContext.Consumer>
        </Router>
      </ApolloProvider>
    </Grommet>
  );
};

export default App;
