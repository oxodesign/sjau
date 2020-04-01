import React from "react";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { LoginPage } from "./LoginPage";

export const OpenApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Switch>
  );
};
