import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";
import App from "./App";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "distribuert-dugnad.firebaseapp.com",
  databaseURL: "https://distribuert-dugnad.firebaseio.com",
  projectId: "distribuert-dugnad",
  storageBucket: "distribuert-dugnad.appspot.com",
  messagingSenderId: "194120926162",
  appId: "1:194120926162:web:3288095c3a2ea5e9967e0b"
};
const rootEl = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf fallback="Loading..." traceId="root-app">
        <Router>
          <App />
        </Router>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  </React.StrictMode>
);
