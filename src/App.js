import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import routes from "./routes";
import { darkTheme, GlobalStyle, ligthTheme } from "./styles";
import "./api";
import { client } from "./apollo";
console.log(client);
function App() {
  const login = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route exact path={routes.signup} component={SignUp} />
              <Route exact path={routes.home}>
                {login ? <Home /> : <Login />}
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
