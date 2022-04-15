import { Head } from 'next/document';

import '../styles/globals.scss';
import 'macro-css';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';

import { theme } from '../theme';
import { Header}  from '../components/Header';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <head><title>aue</title></head>
      <MuiThemeProvider theme={theme}>
        
        <CssBaseline />
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </MuiThemeProvider>
    </>

  )
}

export default MyApp
