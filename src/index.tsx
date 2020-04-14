import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import * as Sentry from "@sentry/browser";
import { theme } from "./utils/theme";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { StandaloneSpinner } from "./components/StandaloneSpinner";

Sentry.init({
  dsn:
    "https://a8059afe0d95413c845cfeeb6209b0a3@o377848.ingest.sentry.io/5200511"
});

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "distribuert-dugnad.firebaseapp.com",
  databaseURL: "https://distribuert-dugnad.firebaseio.com",
  projectId: "distribuert-dugnad",
  storageBucket: "distribuert-dugnad.appspot.com",
  messagingSenderId: "194120926162",
  appId: "1:194120926162:web:3288095c3a2ea5e9967e0b",
  measurementId: "G-6VEEVQ5K8F"
};

const rootEl = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <SuspenseWithPerf
              fallback={<StandaloneSpinner />}
              traceId="root-app"
            >
              <Router>
                <App />
              </Router>
            </SuspenseWithPerf>
          </ThemeProvider>
        </FirebaseAppProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
