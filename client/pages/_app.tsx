import { Head } from "next/document";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";

import { theme } from "../theme";
import { Header } from "../components/Header";
import { store, wrapper } from "../redux/store";

import "../styles/globals.scss";
import "macro-css";

export const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <head>
        <title>aue</title>
      </head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
