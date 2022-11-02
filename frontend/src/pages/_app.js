/* eslint-disable react/forbid-prop-types */
import React from "react";
import Head from "next/head";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { AuthProvider } from "../hooks/useAuth";
import ErrorBoundary from "../components/ErrorBoundary";
import { useRouter } from "next/router";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = createTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#009374",
      },
    },
  });
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>ADAPTAR</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
