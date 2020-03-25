import React from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { DugnadPage } from "./pages/DugnadPage";
import { NewDugnadPage } from "./pages/NewDugnadPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/ny">
          <NewDugnadPage />
        </Route>
        <Route path="/dugnad/:id">
          <DugnadPage />
        </Route>
        <Route path="/" exact>
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
