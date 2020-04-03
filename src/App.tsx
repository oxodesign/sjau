import React from "react";
import { AuthCheck } from "reactfire";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { OpenApp } from "./pages/OpenApp";

function App() {
  return (
    <AuthCheck fallback={<OpenApp />}>
      <AuthenticatedApp />
    </AuthCheck>
  );
}

export default App;
