import { Grommet, Box, ResponsiveContext } from "grommet";
import "styles/reset.css";
import Container from "components/Container";
import Header from "components/Header";
import PageHome from "pages/Home";
import PageStockDetail from "pages/StockDetail";
import SideBar from "components/SideBar";
import { lightTheme, darkTheme } from "etc/customTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TranslationContextProvider } from "components/Translation";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PageSearch from "pages/Search";
import { useDarkThemeContext } from "hooks/useDarkThemeContext";
// Initializing Chart Settings
import { defaults } from "react-chartjs-2";
import "fb";

defaults.font.family = "Montserrat";

const client = new ApolloClient({
  uri: "http://localhost:4000/dev/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const [isDarkTheme] = useDarkThemeContext();
  return (
    <Grommet theme={isDarkTheme ? darkTheme : lightTheme} className="App" full>
      <ApolloProvider client={client}>
        <TranslationContextProvider>
          <ResponsiveContext.Consumer>
            {(size) => (
              <Router>
                <Header />
                <Container
                  direction={size !== "small" ? "row" : "column"}
                  gap="medium"
                  pad={
                    size !== "small"
                      ? "medium"
                      : {
                          top: "medium",
                          bottom: "none",
                          left: "none",
                          right: "none",
                        }
                  }
                >
                  <Box flex gap="medium">
                    <Switch>
                      <Route path="/" exact component={PageHome} />
                      <Route
                        path="/search/:searchKeyword"
                        component={PageSearch}
                      />
                      <Route path="/search" component={PageSearch} />
                      <Route path="/:ticker" component={PageStockDetail} />
                    </Switch>
                  </Box>
                  <Box width={size !== "small" ? "small" : ""}>
                    <SideBar />
                  </Box>
                </Container>
              </Router>
            )}
          </ResponsiveContext.Consumer>
        </TranslationContextProvider>
      </ApolloProvider>
    </Grommet>
  );
};

export default App;
