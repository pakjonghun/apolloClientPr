import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const DARK = localStorage.getItem("dark");
export const darkModeVar = makeVar(DARK === "true");
const TOKEN = localStorage.getItem("token");
export const isLoggedInVar = makeVar(!!TOKEN);

export const loginActive = (token) => {
  if (!token) {
    return;
  }
  localStorage.setItem("token", token);
  isLoggedInVar(true);
};

export const logoutActive = (history) => {
  localStorage.removeItem("token");
  history.replace();
  isLoggedInVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
