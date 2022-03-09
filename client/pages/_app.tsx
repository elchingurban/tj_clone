import '../styles/globals.scss';
import 'macro-css';

import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </MuiThemeProvider>

  )
}

export default MyApp
