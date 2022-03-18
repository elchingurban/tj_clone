import { Head } from 'next/document';

import '../styles/globals.scss';
import 'macro-css';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from '../theme';
import { Header}  from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <head><title>aue</title></head>
      <MuiThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>

  )
}

export default MyApp
