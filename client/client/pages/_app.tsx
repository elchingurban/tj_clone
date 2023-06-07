import { CssBaseline, MuiThemeProvider } from "@material-ui/core";

import { theme } from "../theme";
import { Header } from "../components/Header";
import { wrapper } from "../redux/store";

import "../styles/globals.scss";
import "macro-css";

import { setUserData } from "../redux/slices/user";
import { AppProps } from "next/app";
import { Api } from "../utils/api";

function App({ Component, pageProps }: AppProps){
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

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ctx, Component}) => {
  try {
    const userData = await Api(ctx).user.getMe();
    
    store.dispatch(setUserData(userData));
  } catch (err) {
    if (ctx.asPath === '/write') {
      ctx.res.writeHead(302, {
        Location: '/403',
      });
      ctx.res.end();
    }
    console.log(err);
  }
  return {pageProps: {
    ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}): {})
  }};
})

export default wrapper.withRedux(App);
