import React from "react";
import { AuthCheck } from "reactfire";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { OpenApp } from "./pages/OpenApp";

function App() {
  return (
    <div className="App">
      <AuthCheck fallback={<OpenApp />}>
        <AuthenticatedApp />
      </AuthCheck>
    </div>
  );
}

export default App;
